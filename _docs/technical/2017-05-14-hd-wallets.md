---
layout: default
title: HD wallets
permalink: /technical/hd-wallets/
group: technical
visible: true
---
<!-- Reviewed at cd26fb28eb48f893a4ca2d045a10da19c211b807 -->

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
child secret keys out of parent secret keys. Thus, for to derive a child key for
a hardened, you have to own private key. **Non-hardened** keys allow one to
derive a child public key out of a parent public key (not having a secret key
available).

Each child is assigned a 4-byte index `i`

-   `i ≤ 2³¹ - 1` for **non-hardened** keys
-   `i > 2³¹ - 1` for **hardened** keys

## Requirements

Let `A(K)` denote the address which holds information about keypair `K`. Let
`child(K, i)` denote the `i`-th child keypair of `K`. Let `tree(K)` denote the
tree of addresses for keypairs, derived from `K` (and having positive balance)
and held in **utxo**.

`a -> b` denotes `b` is derivable form `a`. `a -x b` denotes `b` is not
derivable from `a` (under no circumstances):

     priv(K) -> pub(K)
     pub(K) -> A(K)
     pub(K) -x priv(K)

For **hardened** keys:

    A(K) -x pub(K)
    A(K) -x A(child(K, i))
    pub(K) -x pub(child(K, i))
    (priv(K), utxo) -> tree(K)
    priv(K) -> priv(child(K, i))

For **non-hardened** keys

    A(K) -x pub(K)
    (pub(K), utxo) -> tree(K)
    pub(K) -> pub(child(K, i))
    priv(K) -> priv(child(K, i))

## Properties:

1.  The tree structure is kept in root address. Users need to copy their public
    key and pass it to anyone they want to be able to restore tree.

## Address format

We use `PubKey` address (already present in system) and add the attributes
field. In the attribute indexed by `0` (**HD wallets attribute**) we store tree
data.

Tree is stored as list of **derivation paths**. Each **derivaion path** is
specified as list of **derivation indices**. Each **derivation index** is 4-byte
unsigned int.

The resulting object is serialized and encrypted with symmetric scheme
(*ChaChaPoly1305* algorithm) with the passphrase computed as SHA-512 hash of the
root public key. This won’t allow an adversary to map all addresses on chain to
their root as long as we don’t actually store any funds on the root key (which
isn't forced by consensus rules, rather by UI).

**Crucial point in design:** root public keys aren't used to actually store
money.

## Use cases

#### Financial audit

One should provide the auditor hash of a root public key to let auditor find all
keys in hierarchy.

#### Payment server

(applicable for **non-hardened** keys only)

For server to be able to derive subsequent addresses to receive payments to
them, one needs to upload there either:

-   Root public key

-   Payload of:

    -   Public key `PK` of level `i`

    -   Hash of root public key

    -   Tree path for `PK`

#### Wallet

For wallet to operate over some subtree, one needs to provide either:

-   Root secret key

-   Payload of:

    -   Secret key `SK` of level `i`

    -   Hash of root public key

    -   Tree path for `SK`

## Derivation crypto interface

#### Notation:

-   `kp` denotes a private key with index `p`.

    Just a **Ed25519** private key

-   `Kp` denotes public key with index `p`.

    Just a **Ed25519** public key

-   `cp` denotes chain code with index `p`.

###### Entropy

In BTC, they use 512-bit hash, but `kp` is only 256 bit. For this reason we need
to comply key to 512 bit, so we don't reduce hashing space.

-   Extended private key is a pair denoted as `(ki, ci)`

-   Extended public key is a pair denoted as `(Ki, ci)`.

From application perspective, HD wallets (as for BIP-32) introduce following
crypto primitives:

-   `CKDpriv :: ((kpar, cpar), i) → (ki, ci)`

    Computes a child extended private key from the parent extended private key.

-   `CKDpub :: ((Kpar, cpar), i) → (Ki, ci)`

    Сomputes a child extended public key from the parent extended public key.

# Daedalus HD wallets

This section describes the way the HD wallets feature is actually used. It's
split into two parts:

1.  Extension of wallet backend API to support HD wallet structure locally (as
    it is done in Bitcoin)

2.  Extension to blockchain handling to utilize new address attribute to keep HD
    structure on several client instances in sync.

## Local storage

### Old storage

Old wallet storage stored list of addresses. Each address was associated a name
and was derived from separate secret key (backed up by mnemonics and encrypted
with spending password).

### New storage

Wallet storage is extended to store a list of **wallets**. Each wallet corresponds
to a single root secret key (backed up by mnemonics and encrypted with spending
password).

Each wallet contains a number of **accounts**.

Each account contains a number of **addresses** (i.e. an address is a key of the
2nd level in HD tree).

This maps to HD tree:

-   Wallet set corresponds to key of 0-th level (*root*)

-   Wallet corresponds to key of 1-th level (children of root)

-   Address corresponds to key of 2-th level (grandchildren of root)

Money are kept only on addresses.

When money are spent from one or several addresses, a new one is to be generated
for money remainder, if any.

### Usability

User is able to:

-   import/export an arbitrary number of **wallets**

-   generate an arbitrary number of **accounts**

-   assign name to **wallets** and **accounts**

-   generate an arbitrary number of **addresses**

-   change **wallet** spending password.

## Read HD wallet data from blockchain

There are two ways of importing/exporting wallet:

-   Via **mnemonics**

**Mnemonics** is generated on frontend side and allows to deterministically
generate secret key. Names won't be restored.

-   Via export file

This file allows to restore whole wallet structure.

#### Import

In both cases we have a secret root key. The following procedure should be
applied for import:

-   Root key is checked to be absent in local storage.

-   **utxo** is traversed to find all addresses with positive balance
    corresponding to this root key and add them to storage along with their
    parents (wallets).

-   In case of file import, structure resulted from step 2 is labeled with
    names. Also wallets/addresses which existed in file and were not spent are
    created.

#### New transaction handling

When a new transaction gets available (appears either in block or in mempool),
inputs are analyzed. If the input corresponds to public key address with **HD
wallet attribute**, it is checked if this address corresponds to one of our
*wallet*s. If it does, the address is imported to structure (to show balance in
user interface).
