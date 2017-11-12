---
layout: default
title: HD wallets
permalink: /technical/hd-wallets/
group: technical
visible: true
---
<!-- Reviewed at 866fd6a29a15c503e54426f17b91bd8b0903c5dc -->

# HD wallets

HD wallets is a feature which allows users to derive keys in deterministic way
from a common seed. Basically, you generate an initial secret key `SK₀` out of a
random seed. Then you can derive children `SK₀-₀`, `SK₀-₁` out of `SK₀`. From
these children, you can derive `SK₀-₀-₀`, `SK₀-₀-₁`, `SK₀-₁-₀` and so on
(derivations for a tree of arbitrary depth).

<!-- For subscripts and other symbols: https://help.ubuntu.com/community/ComposeKey -->

We distinguish two types of keys:

-   **Hardened**
-   **Non-hardened**

The only distinction here is that **hardened** keys allow only generation of
child secret keys out of parent secret keys. Thus, to derive a child key for
a hardened key, you have to own the private key. **Non-hardened** keys allow one to
derive a child public key out of a parent public key (not having the secret key
available).

Each child is assigned a 4-byte index `i`:

-   `i ≤ 2³¹ - 1` for **non-hardened** keys,
-   `i > 2³¹ - 1` for **hardened** keys.

## Properties:

1.  The tree structure is kept in root address. Users need to copy their public
    key and pass it to anyone they want to be able to restore tree.

## Address format

We use `PublicKey` address (already present in the system) and add the attributes
field. In the attribute indexed by `0` (**HD wallets attribute**) we store tree
data.

Tree is stored as a list of **derivation paths**. Each **derivaion path** is
specified as a list of **derivation indices**. Each **derivation index** is 4-byte
unsigned int.

The resulting object is serialized and encrypted with symmetric scheme
(*ChaChaPoly1305* algorithm) with the passphrase computed as SHA-512 hash of the
root public key. This will not allow an adversary to map all addresses on the chain to
their root as long as we do not actually store any funds on the root key (which
is not forced by consensus rules, rather by UI).

**Crucial point in design:** root public keys are not used to actually store
money.

## Use cases

### Financial audit

One should provide the auditor hash of a root public key to let auditor find all
keys in hierarchy.

### Payment server

_It is applicable for **non-hardened** keys only._

For server to be able to derive subsequent addresses to receive payments to
them, one needs to upload there either:

-   Root public key

-   Payload of:

    -   Public key `PK` of level `i`

    -   Hash of root public key

    -   Tree path for `PK`

### Wallet

For wallet to operate over some subtree, one needs to provide either:

-   Root secret key

-   Payload of:

    -   Secret key `SK` of level `i`

    -   Hash of root public key

    -   Tree path for `SK`

## Requirements

Let `A(K)` denote the address that holds information about keypair `K`. Let
`child(K, i)` denote the `i`-th child keypair of `K`. Let `tree(K)` denote the
tree of addresses for keypairs, derived from `K` (and having positive balance)
and held in **utxo**.

`a -> b` denotes `b` is derivable form `a`. `a -x b` denotes `b` is not
derivable from `a` (under no circumstances):

    priv(K) -> pub(K)
    pub(K) -> A(K)
    pub(K) -x priv(K)
    A(K) -x pub(K)
    A(K) -x A(child(K, i))

For **hardened** keys:

    (priv(K), utxo) -> tree(K)
    pub(K) -x pub(child(K, i))
    priv(K) -> priv(child(K, i))

For **non-hardened** keys

    (pub(K), utxo) -> tree(K)
    pub(K) -> pub(child(K, i))
    priv(K) -> priv(child(K, i))

## Derivation Crypto Interface

### Notation:

-   `kp` denotes a private key with index `p`. Just an **Ed25519** private key.

-   `Kp` denotes public key with index `p`. Just an **Ed25519** public key.

-   `cp` denotes chain code with index `p`.

### Entropy

In BTC, they use 512-bit hash, but `kp` is only 256 bit. For this reason we need
to comply key to 512 bit, so we do not reduce hashing space.

-   Extended private key is a pair denoted as `(ki, ci)`.

-   Extended public key is a pair denoted as `(Ki, ci)`.

From application perspective, HD wallets (as for BIP-32) introduce following
crypto primitives:

-   `CKDpriv :: ((kpar, cpar), i) → (ki, ci)`

    Computes a child extended private key from the parent extended private key.

-   `CKDpub :: ((Kpar, cpar), i) → (Ki, ci)`

    Сomputes a child extended public key from the parent extended public key.

# Daedalus HD wallets

This section describes the way the HD wallets feature is used. It is
split into two parts:

1.  Extension of wallet backend API to support HD wallet structure locally (as
    it is done in Bitcoin).

2.  Extension to blockchain handling to utilize new address attribute to keep HD
    structure on several client instances in sync.

## Local storage

### Old storage

The old wallet storage stored a list of addresses. Each address was associated with a name
and was derived from separate secret key (backed up by mnemonics and encrypted
with the spending password).

### New storage

Wallet storage is extended to store a list of **wallets**. Each wallet corresponds
to a single root secret key (backed up by mnemonics and encrypted with spending
password).

Each wallet contains a number of **accounts**.

Each account contains a number of **addresses** (i.e. an address is a key of the
2nd level in a HD tree).

This maps to a HD tree:

-   wallet set corresponds to key of 0-th level (*root*),

-   wallet corresponds to key of 1-th level (children of root),

-   address corresponds to key of 2-th level (grandchildren of root).

Money are kept only on addresses.

When money are spent from one or several addresses, a new one is to be generated
for money remainder, if any.

### Usability

A user is able to:

-   import/export an arbitrary number of **wallets**,

-   generate an arbitrary number of **accounts**,

-   assign name to **wallets** and **accounts**,

-   generate an arbitrary number of **addresses**,

-   change **wallet** spending password.

## Read HD Wallet Data from Blockchain

There are two ways of importing/exporting wallet:

-   via **mnemonics**,
-   via export file.

**Mnemonics** is generated on front end side and allows to deterministically
generate secret key. Names will not be restored.

Export file allows to restore the whole wallet structure.

### Import

In both cases we have a secret root key. The following procedure should be
applied for import:

-   Root key is checked to be absent in local storage.

-   **utxo** is traversed to find all addresses with positive balance
    corresponding to this root key and add them to storage along with their
    parents (wallets).

-   In case of file import, the structure that resulted from step 2 is labeled with
    names. Also, the wallets/addresses listed in the imported file and not spent at the moment are
    created.

### New transaction handling

When a new transaction gets available (appears either in block or in mempool),
inputs are analyzed. If the input corresponds to public key address with **HD
wallet attribute**, it is checked if this address corresponds to one of our
*wallet*s. If it does, the address is imported to structure (to show balance in
user interface).
