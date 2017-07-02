---
layout: default
title: Addresses
permalink: /cardano/addresses/
group: cardano
---
<!-- Reviewed at a6a1cdf72c7e167a13f500c0679c01fe4cfa0ca8 -->

# Addresses in Cardano SL

To send and receive value, addresses are used in virtually all cryptocurrencies.
Cardano supports 3 main types of addresses:

1.  `PubKeyAddress`,
2.  `ScriptAddress`,
3.  `RedeemAddress`.

`PubKeyAddress` is a normal address like in any other cryptocurrency. It is
a hashed public key. Read more about public key addresses [below](#public-key-addresses).

`ScriptAddress` is used in so-called "Pay to Script Hash" (P2SH) transactions.
It operates autonomously and acts somewhat like a bank deposit: you can send
money to it, but in order to redeem it you have to satisfy certain conditions,
determined by a script associated with the address. The address itself contains
the hash of the serialized script. Read more about P2SH [below](#pay-to-script-hash).

`RedeemAddress` is a special type of address for ADA redemption. Read more about redeem
addresses [below](#redeem-addresses).

Moreover, Cardano SL support `UnknownAddressType` as well. This type will allow us to use
custom types of addresses in the future.

## What Does an Address Look Like?

Addresses are `base58`-encoded bytestrings, consisting of:

-   1 byte: address type;
-   28 bytes: hash of some data structure (different for each type);
-   4 bytes: CRC32 checksum.

All addresses are 33 bytes long.

`Base58` is the same encoding as used in Bitcoin. It uses a 58-symbol alphabet
to encode data, hence the name. Here is the alphabet we are using:

    123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz

It avoids both non-alphanumeric characters and letters which might look
ambiguous when printed (`0`, `O`, `I`, `l`); therefore it is suitable for human
users who enter the data manually, copying it from some visual source, and also
allows easy copy and paste by double-clicking which usually selects the whole
string.

Here are the `type`s for each supported address:

| `type`           | Address type         |
|------------------|----------------------|
| `0`              | `PubKeyAddress`      |
| `1`              | `ScriptAddress`      |
| `2`              | `RedeemAddress`      |
| arbitrary number | `UnknownAddressType` |

For hashing, we use a combination of `SHA3-256` and `BLAKE2b-224` hashes, i.e.:

    address_hash(x) = BLAKE2b_224(SHA3_256(x))

Please see about [hash functions](https://en.wikipedia.org/wiki/Hash_function)
for more info. See also sections below for a description of what `x` is in each case.

We also adopt a way to make sure that an address is entered correctly by
appending a 32-bit Cyclic Redundancy Code checksum (`CRC32`) to the end of the
address. This way, the full address is generated with the following rule, where
`+` means concatenation:

    address' ← type + address_hash(x)
    address ← toBase58(address' + crc32(address'))

Here is an example of a valid address:

    1fsAhhf4E1LQDB8agSds8teuD4E7U8JsRESngEX52kinBhi

It can be decoded into the byte string like this one (with spaces separating
type, hash and checksum):

    00 C8B9519459F5D4E42B002EF06AE94DC9C0A5B87E52D0D0375FD83ECE C52CEB43

## Public Key Addresses

As mentioned in the [Introduction](/introduction/#you-own-your-money), the wallets
you can see in the user interface are a convenient representation of the fact that
you own a secret key to spend money in this particular wallet. But how is such
spending verified by the network and how can you receive money from others? The
answer is that along with the secret key which is used to control the value in
your wallets, a public key is generated. This public component can be known by
anybody, hence the name.

A `PubKeyAddress` contains the hash of this public key.

Public keys are also used for verifying your identity when your create a
transaction and other auxiliary purposes.

To sum up, a public key address represents your personal account. It is
constructed as

    address' ← 0x00 + address_hash(public_key)
    address ← toBase58(address' + crc32(address'))

## Pay to Script Hash

The idea of Pay to Script Hash (P2SH) is to provide a lot of flexibility for
formulating complex rules for spending money. Instead of sending a transaction
to a public key address, we create a validator script that can take a so-called
redemption script as a parameter. To redeem funds, we pass the redemption script
to the validator and evaluate it. If it evaluates to `success`, money is sent as
specified by the redeemer. Otherwise nothing happens.

To quote Bitcoin Wiki,

> Using P2SH, you can send bitcoins to an address that is secured in various
> unusual ways without knowing anything about the details of how the security is
> set up. The recipient might need the signatures of several people to spend
> these bitcoins, or a password might be required, or the requirements could be
> completely unique.

`ScriptHash` addresses are constructed as follows:

    address' ← 0x01 + address_hash(serialize(validator_script))
    address ← toBase58(address' + crc32(address'))

## Redeem Addresses

Redeem addresses are Pay To PubKey Hash (P2PKH). Such an address contains the hash
of redeem public key, and this key is actually [Ed25519](http://ed25519.cr.yp.to/)
public key.

Redeem addresses are constructed as follows:
 
    address' ← 0x02 + address_hash(redeem_public_key)
    address ← toBase58(address' + crc32(address'))

## Other Address Types

In the future, we may use the update system to introduce other address types
with different values in the `type` field. [See
more](/cardano/update-mechanism/#soft-fork-updates) on extending the system in
non-breaking fashion.
