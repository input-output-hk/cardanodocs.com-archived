---
layout: default
title: Bootstrap Era
permalink: /timeline/bootstrap/
group: timeline
---

<!-- Reviewed at c23493d7a33a82d559d5bd9d289486795cf6592f -->

# Bootstrap Era

After the Cardano SL Testnet era and release of Cardano SL, the network will
operate in “bootstrap mode” for a period of time called Bootstrap era. As people
who purchased Ada redeem their coins, the stake will automatically get delegated
to a pool of trusted nodes that will maintain the network. During this time no
block rewards will be issued — we will maintain the network pro bono. This is
required because in order for the protocol to function properly, some of the
stakeholders who jointly posses majority of stake have to be online, which in
reality won't be the case during the first months of network operation.

The Bootstrap era will lead to the [Reward era](/timeline/reward), during which
updates to the protocol will be issued, and the major stakeholders will be
provided with convenient options to run their nodes on personal servers in the
cloud.

## Stake Locking

The Bootstrap era is the period of Cardano SL existence that allows only fixed predefined
users to have control over the system. The set of such users (the bootstrap stakeholders)
is defined in [`gcdBootstrapStakeholders`](https://github.com/input-output-hk/cardano-sl/blob/f73d41b2bbd0a823911490974a71608fb4dbe014/core/Pos/Core/Genesis/Types.hs#L74). The Bootstrap era will end when bootstrap stakeholders
will vote for it. Special update proposal will be formed, where a particular constant will
be set appropriately to trigger Bootstrap era end at the point update proposal gets adopted.
Please see [`isBootstrapEra`](https://github.com/input-output-hk/cardano-sl/blob/18997b4e3db62ed9e9c9d69baf8ef2a8800fbf1f/core/Pos/Core/Slotting.hs#L137) function for more details.

The next era after Bootstrap is called [the Reward era](/timeline/reward/).

Every transaction output (which is a pair `(address,coin)`) is accompanied by transaction
output distribution (`txOutDistr`). [`TxOutDistribution`](https://github.com/input-output-hk/cardano-sl/blob/f73d41b2bbd0a823911490974a71608fb4dbe014/txp/Pos/Txp/Core/Types.hs#L132) type is `[(StakeholderId, Coin)]` and it defines
stake distribution of the output. Unlike balance (real amount of coins on the balance),
stake gives user power to control different algorithm parts: being the slot leader, voting
in update system, taking part in MPC/SSC. `txOutDistr` is an ad hoc way to delegate the stake
without using more elaborate and complex delegation scheme. If `[]` is a set in `txOutDistr`,
it is supposed to be `[(address_i, coin_i)]` (for tx out `(address_i, coin_i)`), so stake
goes to where output tells. It is important to notice that the sum of coins in `txOutDistr`
should be equal to `coin`.

Let us now present the Bootstrap era solution:

1.  Initial `utxo` contains all the stake distributed among `gcdBootstrapStakeholders`. Initial `utxo`
    consists of `(txOut, txOutDistr)` pairs, so we just set `txOutDistr` in a way it sends all coins
    to `gcdBootstrapStakeholders`. Let `txOut = (address, coin)`. The distribution technique inside
    attributes `coin / (length gcdBootstrapStakeholders)` to every party in `gcdBootstrapStakeholders`,
    remainder to arbitrary `b ∈ gcdBootstrapStakeholders` (based on `hash coin`).
2.  While the Bootstrap era takes place, users can send transactions changing initial `utxo`. We enforce
    spreading `txDistr` to `gcdBootstrapStakeholders` in our wallet/client and forbid transactions that
    move stake out of `gcdBootstrapStakeholders` set. This effectively makes stake distribution is system
    constant.
3.  When the Bootstrap era is over, we disable restriction on `txOutDistr`. System operates the same way as in
    Bootstrap era, but users need to explicitly state they understand owning their stake leads to
    responsibility to handle the node. For user to get his stake back he should send a transaction
    to delegate key(s). It may be the key owned by user himself or the key of some delegate (which may
    also be one or few of `gcdBootstrapStakeholders`).

Please read about [Stake Delegation in Cardano SL](/technical/delegation/) for more details about
delegation mechanism.
