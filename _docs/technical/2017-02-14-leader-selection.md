---
layout: default
title: Leader Selection in Cardano SL
permalink: /technical/leader-selection/
group: technical
visible: true
---
[//]: # (Reviewed at e1d0f9fb37a3f1378341716916f0321fb55698df)

# Leader Selection in Cardano SL

This guide describes slot-leader selection process.

## Follow the Satoshi

As mentioned [earlier](/cardano/proof-of-stake/#follow-the-satoshi),
Cardano SL uses Follow the Satoshi (FTS) algorithm to choose slot-leaders. Slot-leaders for the
current epoch (i.e. for each slot of the current epoch) are computed by FTS in the beginning of current epoch.
So genesis block contains a list of selected slot-leaders. The number of selected slot-leaders corresponds to a
number of slots in epoch, and this number [depends](https://github.com/input-output-hk/cardano-sl/blob/3c6b3ca2158efdd5374a630d9c94671117fd76cf/core/Pos/Core/Constants.hs#L71) on fundamental security parameter `k` defined in [configuration file](https://github.com/input-output-hk/cardano-sl/blob/3c6b3ca2158efdd5374a630d9c94671117fd76cf/core/constants-prod.yaml#L2).

FTS uses a [shared seed](https://github.com/input-output-hk/cardano-sl/blob/3c6b3ca2158efdd5374a630d9c94671117fd76cf/core/Pos/Core/Types.hs#L257) which is result of [Multi Party Computation (MPC)](/cardano/proof-of-stake/#multi-party-computation)
algorithm for previous epoch: in the result of MPC some nodes reveal their seeds, xor of these seeds is called _shared seed_.
Actually shared seed is a bytestring.

The probability that a stakeholder will be chosen as a slot-leader is proportional to the
number of coins this stakeholder holds. The same stakeholder can be picked as a leader more than once.

## Algorithm

Theoretical aspects of the Slot-leader Selection Process is described in [paper](/glossary/#paper), page 11.

The node sorts all unspent outputs (`utxo`) in a deterministic way (lexicographically), so result
is an ordered [sequence](https://github.com/input-output-hk/cardano-sl/blob/53e73b7d7b6be4f5a302f60d7494bd38f75556f2/src/Pos/Lrc/FtsPure.hs#L50) of pairs `(StakeholderId, Coin)`, where [`StakeholderId`](https://github.com/input-output-hk/cardano-sl/blob/3c6b3ca2158efdd5374a630d9c94671117fd76cf/core/Pos/Core/Types.hs#L122) is an id of stakeholder (its public key hash) and `Coin` is an amount of coins this stakeholder has.
It's assumed that `utxo` [isn't empty](https://github.com/input-output-hk/cardano-sl/blob/53e73b7d7b6be4f5a302f60d7494bd38f75556f2/src/Pos/Lrc/FtsPure.hs#L41).

Then the node chooses several random `i`s between `1` and [amount of Lovelaces in the system](https://github.com/input-output-hk/cardano-sl/blob/53e73b7d7b6be4f5a302f60d7494bd38f75556f2/src/Pos/Lrc/FtsPure.hs#L51). To find owner of `i`th coin node finds the lowest `x` such that 
sum of all coins in this list up to 'i'th is not less than 'i' (and then 'x'th address is the owner of `i`th coin).

The result is a non-empty [sequence](https://github.com/input-output-hk/cardano-sl/blob/53e73b7d7b6be4f5a302f60d7494bd38f75556f2/src/Pos/Lrc/FtsPure.hs#L38) of `StakeholderId`, ids of selected stakeholders. This sequense of [`SlotLeaders`](https://github.com/input-output-hk/cardano-sl/blob/4bd49d6b852e778c52c60a384a47681acec02d22/core/Pos/Core/Types.hs#L264) is storing in the [node's runtime context](https://github.com/input-output-hk/cardano-sl/blob/53f1d94c63ba6b632c18488393bf71e728fe04b7/src/Pos/Context/Context.hs#L94).

With P2SH addresses, node doesn't know who is going to end up with funds sent to them.
Therefore, P2SH addresses can contain 'addrDestination' which specifies which addresses
should count as “owning” funds for the purposes of follow-the-satoshi.
