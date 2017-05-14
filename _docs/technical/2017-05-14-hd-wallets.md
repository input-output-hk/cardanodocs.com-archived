---
layout: default
title: HD wallets
permalink: /technical/hd-wallets/
group: technical
visible: true
---
[//]: # (Reviewed at <no commit>)

# HD wallets

HD wallets is feature which allows user to derive keys in deterministic way from common seed.
Basically, you generate initial secret key `SK`<sub>`0`</sub> out of random seed. Then you can derive children SK0_0, SK_0_1
out of SK_0. Then SK_0_0_0, SK_0_1_0, SK_0_1_1 and so on (derivations for a tree of arbitrary depth).

We distinguish two types of keys:

* **Hardened**
* **Non-hardened**

Only distinction here is that **hardened** keys allow only secret key out of secret key generation,
while **non-hardened** allow one to derive child public key out of parent public key (not having secret key available).
(For hardened keys to compute child key, you have to own private key).

Each child is assigned a 4-byte index i

* `i > 2³¹ - 1` for **non-hardened**
* `i <= 2³¹ - 1` for **hardened**

## Requirements

Let `A(K)` denote address, which holds information about keypair `K`.
Let `child(K, i)` denote `i`-th child keypair of `K`.
Let `tree(K)` denote tree of addresses for keypairs, derived from `K` (all which have positive balance) held in **UTXO**.

`a -> b` denotes `b` is derivable form `a`.
`a -x b` denotes `b` is not derrivable from `a` (under no circumstances)

     priv(K) -> pub(K)
     pub(K) -> A(K)
     pub(K) -x priv(K)


For **Hardened** keys:

    A(K) -x pub(K)
    A(K) -x A(child(K, i))
    pub(K) -x pub(child(K, i))
    priv(K) -> UTXO -> tree(K)
    priv(K) -> priv(child(K, i))


For **Non-hardened** keys

    A(K) -x pub(K)
    pub(K) -> UTXO -> tree(K)
    pub(K) -> pub(child(K, i))
    priv(K) -> priv(child(K, i))

#### Properties:

1. Tree structure is held in root address. User needs to copy his public key and pass it to everyone he wants to be able to restore tree.

### Address format

We use `PubKey` address (already present in system) and add attributes field.
In attribute indexed by 0 we store tree data.

Tree is stored as list of **derivation paths**.

Each **derivaion path** is specified as list of **derivation indices**

Each **derivation index** is 4-byte unsigned int.
<!-- TODO: refer to binary spec section? -->

Resulting object is serialized, and encrypted with symmetric scheme (*ChaChaPoly1305* algorithm) with passphrase computed as hash of root public key. This won’t allow adversary to map all addresses on chain to their root as long as we don’t actually store any funds on root key (which isn't forced by consensus rules, rather by UI).

**Crucial point in design:** root public key isn't be used to actually store money.

## Usecases

#### Financial audit.

One should provide auditor hash of root public key to let auditor find all keys in hierarchy.

#### Payment server
(applicable for **non-hardened** only)

For server to be able to derive subsequent addresses to receive payment to them, one needs to upload there either:

* Root public key
* Payload of:
  * Public key `PK` of level `i`
  * Hash of root public key
  * Tree path for `PK`

#### Wallet

For wallet to operate over some subtree one needs to provide either:

* Root secret key
* Payload of :
  * Secret key `SK` of level `i`
  * Hash of root public key
  * Tree path for `SK`

## Derivation crypto interface

<!-- TODO: this section -->

Notation:

    kp  denotes private key with index p
        Just a Ed25519 private key
    Kp  denotes public key with index p
        Just a Ed25519 public key
    cp  denotes chain code with index p
        Entropy,. In BTC they use 512-bit hash, but k p is only 256 bit, for this reason we need to comply key to 512 bit for not to reduce hashing space
    Extended private key is a pair denoted as (ki, ci)
    Extended public key is a pair denoted as (Ki, ci)


From application perspective HD wallets (as for BIP-32) introduce following crypto primitives:

    CKDpriv :: ((kpar, cpar), i) → (ki, ci)
        Computes a child extended private key from the parent extended private key.
    CKDpub :: ((Kpar, cpar), i) → (Ki, ci)
        Сomputes a child extended public key from the parent extended public key.

<!-- TODO: CSLREQ-24 -->
