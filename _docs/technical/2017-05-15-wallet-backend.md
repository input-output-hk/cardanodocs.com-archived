---
layout: default
title: Cardano SL Wallet Backend
permalink: /technical/wallet-backend/
group: technical
visible: true
---
<!-- Reviewed at ac0126b2753f1f5ca6fbfb555783fbeb1aa141bd -->

# Cardano SL Wallet Backend

While addresses discussed in [Addresses](/cardano/addresses/) section are
fundamental to send and receive funds, wallets are a way to simplify these
processes for end-users.

## What is a Wallet?

In Cardano, wallets are defined in the following manner:

``` haskell
data CWallet = CWallet
    { cwId       :: !CWalletAddress
    , cwMeta     :: !CWalletMeta
    , cwAccounts :: ![CAccount]
    , cwAmount   :: !CCoin
    }
```

where `CWalletMeta` is a type that presently indicates whether the wallet is
shared or personal, the currency that this wallet uses, and the wallet's name.
With this, the wallet type is easily extensible, as any additional features can
be added to the `CWalletMeta` type, leaving other fields untouched. Every
wallet, regardless of name, type and currency, must have the said fields.

## Transactions and Wallets

In the [Transactions](/cardano/transactions/) section, the structure of
transactions is defined. However, to facilitate client operations, transactions
are represented differently in clients. They are represented as

``` haskell
data CTx = CTx
    { ctId            :: CTxId
    , ctAmount        :: CCoin
    , ctConfirmations :: Word
    , ctMeta          :: CTxMeta
    , ctInputAddrs    :: [CAddress Acc]
    , ctOutputAddrs   :: [CAddress Acc]
    }
```

Essentially, a client transaction is composed by the actual transaction `Id`, by
the amount the wallet in question received, the number of confirmations this
transaction has received (i.e., the number of blocks that are currently on top
of the block containing the transaction in question), input and output
addresses. Meta-information - the datatype `CTxMeta` - indicates the
transaction's currency, its title or name, its description and the
POSIX-formatted date of sending it.

## Wallet Backend API

Currently, the wallet's API provides a series of methods to work with wallets.
The `servant` Haskell library that provides a modular approach to API-building
is used. This library uses combinators both to build atomic HTTP actions and to
glue these atomic methods together to form larger and more complete APIs.

Please notice that wallet web API is available only if you run a node with
`--wallet` option. Default port for this API is `8090` which can be changed with
the `--wallet-port` option.

Documentation for wallet web API is available
[here](https://cardanodocs.com/technical/wallet/api/).

### TLS Connections

The Wallet Web API uses TLS for secure communication. Calls to the API need
to send a client CA certificate that was used when launching the node and
identifies the client as being permitted to invoke the server API.

Note that the client certificate file is the one which was supplied as the
`--tlsca` option, when launching the node.

For example, If that file is available as `ca.crt`, then a curl call to a node
running on `localhost:8090` can be made like so -

``` bash
curl --cacert ca.crt -v https://localhost:8090/api/settings/sync/progress
```

If that request succeeds, then you have configured TLS properly.

### Handling errors

If the event requests fail, there is a `WalletError` type, which is simply a
wrapper over `Text` to show what happened.
