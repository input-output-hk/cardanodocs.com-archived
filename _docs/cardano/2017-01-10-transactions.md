---
layout: default
title: Transactions
permalink: /cardano/transactions/
group: cardano
---
<!-- Reviewed at a6a1cdf72c7e167a13f500c0679c01fe4cfa0ca8 -->

# Transactions in Cardano SL

## Overview

A transaction (*tx*) is a special data which represents the *act* of the value
transferring between nodes (from the user's point of view, transferring between
wallets). Thus, when the user *Alice* sends money to the user *Bob*, the new
transaction emerges. Let's call this transaction `Tx1`, the node under *Alice*'
wallet `N1`, and the node under *Bob*'s wallet `N2`.

Thus, the node `N1` does the following steps:

1.  Creating transaction `Tx1` and signs it with its private key.
2.  Sending it to all known nodes (i.e. neighbors).
3.  Saving it in its local data.

Each of `N1`'s neighbors sends `Tx1` transaction to its neighbors and so on, and
some slot leader will store this transaction in some block in the ledger. Please
note that if the network is under high load, it may take a lot of time for
transaction to be actually added to the block.

## Design

Each transaction contains a list of *inputs* and a list of *outputs*; outputs of
the transaction `Tx0` can be used as inputs of the other transaction `Tx1`, and
so on:

                Tx0                           Tx1
      +----------------------+      +----------------------+
      |                      |      |                      |
      |  Inputs     Outputs  |      |  Inputs     Outputs  |
      | +------+   +-------+ |      | +------+   +-------+ |
      | | In0  |   | Out0  + |      | | In0  |   | Out0  | |
      | +------+   +-------+ |      | +------+   +-------+ |
      | | In1  |   | Out1  | |      | | In1  |   | Out1  | |
      | +------+   +-------+ |      | +------+   +-------+ |
      | | ...  |   | ...   | |      | | ..   |   | ...   | |
      | +------+   +-------+ |      | +------+   +-------+ |
      | | InN  |   | OutM  | |      | | InN  |   | OutM  | |
      | +------+   +-------+ |      | +------+   +-------+ |
      |                      |      |                      |
      +----------------------+      +----------------------+     ...

Inputs and outputs carry information about *money flow*: inputs inform where the
money came from, and outputs inform where the money come to. Please notice that
there's `N` and `M`, because the actual number of inputs and outputs can be
different.

Thus, each input contains:

1.  An ID of transaction `TxN`, whose output is used for this input. Transaction
    ID is a BLAKE2b-256 hash of the transaction, something like
    `f9bcbe752aee4512457f1fd350200cf870906b7e6e836688c9a3779645c86c01`.
2.  An index of the using output in `TxN`'s outputs.

Each output contains:

1.  An address of the node `N` we want to send a value to. An address is a
    BLAKE2b-224 hash of the hash of the public key of the `N` node, something
    like `1fsAhhf4E1LQDB8agSds8teuD4E7U8JsRESngEX52kinBhi`. Please read about
    [Addresses in Cardano SL](/cardano/addresses/) for more info.
2.  Amount of money we want to send. This value is 64-bit unsigned integer with
    maximum value `45000000000000000`.

For example:

      Tx 891971a4cc31e32..                           Tx f9bcbe752aee4512..
    ------------------------+           +----------------------------------------------+
    \                       |           |                                              |
    /        Outputs        |           |       Inputs                  Outputs        |
    \  +------------------+ |           | +-----------------+     +------------------+ |
    /  | Out0             | |           | | In0             |     | Out0             | |
    \  | +--------------+ | |           | | +-------------+ |     | +--------------+ | |
    /  | | Value        | | |           | | | Tx id       | |     | | Value        | | |
    \  | | 100 ADA      | | |           | | | 891971a4c.. | |     | | 100 ADA      | | |
    /  | +--------------+------->>  ------>>+-------------+ |     | +--------------+------->>
    \  | | Node address | | |           | | | Out index   | |     | | Node address | | |
    /  | | a00e4bb2..   | | |           | | | 0           | |     | | 88ca7f79..   | | |
    \  | +--------------+ | |           | | +-------------+ |     | +--------------+ | |
    /  | ...              | |           | | ...             |     | ...              | |
    \  +------------------+ |           | +-----------------+     +------------------+ |
    /                       |           |                                              |
    ------------------------+           +----------------------------------------------+

Node `a00e4bb2..` generates transaction `f9bcbe752aee4512..`, and this
transaction informs us that:

1.  We want to send 100 ADA from the current node with address `a00e4bb2..` to
    the node with address `88ca7f79..`.
2.  This money corresponds to `0`th output of the previous transaction with an
    ID `891971a4c..`.

## Verification

As mentioned above, the transaction's output becomes the input of the other
transaction. In this case we treat such output as *spent transaction output*.
Thus, an output `Out0` of the transaction `891971a4cc31e32..` is a spent output,
because it already is an input of the `f9bcbe752aee4512..` transaction.

But such spendings do not occur immediately, so an output that *isn't yet* an
input of another transaction is called an *unspent transaction output*. Only
unspent outputs can be used as inputs for other transactions, to prevent
[double-spending](https://en.bitcoin.it/wiki/Double-spending).

So every node in the network not only accepts transactions, but also
verifies them. To do it, every node have to keep track of unspent outputs, it
allows to validate that inputs in a published transaction are indeed the unspent
outputs. Actually, all unspent outputs called *utxo*, and this is a part of the
special key-value database called *Global State*.

## Proofs of Transaction Legitimacy

Each transaction in Cardano SL is accompanied by a proof (also called a **witness**)
that this transaction is legitimate. Even if the output is an unspent one, we
have to prove that we have *a right* to spend it. Since a `TxN` transaction can
have many inputs, the witness for it consists of the witnesses of all `TxN`'s
inputs, and only if all the inputs are legitimate, `TxN` is legitimate too. If a
particular transaction isn't legitimate, it will be rejected by the network.

Because of [two available types of node
address](/cardano/addresses/#what-does-an-address-look-like) we use two
corresponding versions of the witness: based on *public key* and based on
*script*.

For example, the first option works with a public key `PK` and a transaction
signature: legitimate input must be signed with a private key corresponding to `PK`.
So it's possible to check this signature and either accept that input or reject it.

Witnesses are stored in the blockchain and anybody can see, inspect and
independently verify them. But after some time a node may delete old proofs in
order to save space. The technique of storing transactions separately from their
proofs is called "segregated witness" (you may have heard of it being recently
[implemented in
Bitcoin](https://bitcoincore.org/en/2016/01/26/segwit-benefits/)). Under this
scheme, transactions and proofs are stored in two separate places in a block,
and can be processed independently.

## Transaction Distribution

As a part of address design, we introduced transaction distribution feature.

Suppose we have an address `A`. Which stakeholders should benefit from money
stored on this address? For [`PublicKey`](/cardano/addresses/)-address it's
obvious and straightforward, though it's not for
[`ScriptAddress`](/cardano/addresses/) (e.g. for `2-of-3` multisig address
implemented via script we might want to have distribution
`[(A, 1/3), (B, 1/3), (C, 1/3)]`). For any new address' type introduced via
softfork in the future it might be useful as well because we don't know in
advance about semantics of the new address' type and which stakeholder it should
be attributed to.

Transaction distribution is a value associated with each transaction's output,
holding information on which stakeholder should receive which particular amount
of money on his stake. Technically it's a list of pairs composed from stakeholder's
identificator and corresponding amount of money. E.g. for output `(A, 100)`
distribution might be `[(B, 10), (C, 90)]`.

Transaction distributions are considered by both [slot-leader election
process](/technical/leader-selection/) and Richmen Computations.

This feature is very similar to [delegation](/technical/delegation/), but there
are differences:

1.  There is no certificate(s): to revoke delegation `A` has to move funds,
    providing different distribution.
2.  Stake is delegated partially (with regular delegation types, it's done for
    whole address' stake).
3.  Only part of `A`'s balance associated with this transaction output is
    delegated.

By consensus, transaction distribution for `PublicKey`-address should be set to
empty.

Binary representation of transaction distribution is described
[here](/technical/protocols/binary-protocols/#transaction-distribution).
