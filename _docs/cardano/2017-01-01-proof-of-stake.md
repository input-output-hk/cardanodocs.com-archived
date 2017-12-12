---
layout: default
title: Ouroboros Proof of Stake Algorithm
permalink: /cardano/proof-of-stake/
group: cardano
visible: true
---
<!-- Reviewed at c4c45ce9a7a8f4aa6d88a32829755196a017f6a1 -->

# Ouroboros Proof of Stake Algorithm

Ouroboros Proof of Stake Algorithm is the most important part of the protocol.
It defines the way nodes reach consensus about the state of [ledger](/glossary/#ledger).

Ouroboros is unique as it is the first blockchain protocol based on proof of
stake that is scientifically proved to be secure.

## Why Proof of Stake?

The most important thing about picking proof of stake (PoS) algorithm over proof of
work (PoW) — the one adopted by Bitcoin — is the energy consumption considerations.
Running the Bitcoin protocol is a tremendously expensive endeavor. It is
estimated that 3.8 American households can be powered for a day by the energy
spent to generate one Bitcoin transaction. These energy requirements for running
the Bitcoin protocol only grow as more and more Bitcoin miners sink money into
mining, and the difficulty of the problems that their computers (mining rigs)
are cracking increases. This is why researchers did their best to investigate
alternative ways to reach consensus — such as using the so-called BFT (Byzantine
Fault Tolerant) consensus algorithms and PoS algorithms.

## What is Proof of Stake?

### Proof

The “proof” part of “proof of stake” is about having evidence that blocks of
transactions are legitimate.

### Stake

“Stake” means “the relative value held by addresses on the node”. By “relative
value” we mean “all value held by wallets on a particular node divided by total
value in the Cardano SL system”. Please read about [Balance and Stake in Cardano
SL](/cardano/balance-and-stake/) for more details.

## Slot Leaders

Nodes with a positive stake are called stakeholders, and only stakeholders may
participate in running the protocol. Moreover, to be able to generate new blocks
for the blockchain, stakeholder must be elected as a slot leader. Slot leader may
listen to transactions announced by other nodes, make a block of those transactions,
sign this block with its secret key and publish it to the network.

You can think of a slot leader as a miner in Bitcoin, but consensus mentioned above
defines who will be able to mine, when and how much.

## Epochs and Slots

Ouroboros protocol divides the physical time into **epochs**, and each epoch is
divided into **slots**:

```
+----------+----------+-------+----------+--------------------> t
|  slot 0  |  slot 1  |  ...  |  slot N  |

 \                                      / \
  -------------- epoch M ---------------   -- epoch M+1 -- ...
```

Please note that slot is relatively short period of time (for example, 20 seconds).

Each slot has one and only one leader (slot leader, SL):

```
+----------+----------+-------+----------+----> t
|  slot 0  |  slot 1  |  ...  |  slot N  |

    SL 0       SL 1               SL N
```

Slot leader has a (sole) right to produce one and only one block during his slot:

```
  +------+   +------+           +------+
  | Bl 0 |<--| Bl 1 |<-- ... <--| Bl N |
  +------+   +------+           +------+
+----------+----------+-------+----------+----> t
|  slot 0  |  slot 1  |  ...  |  slot N  |

    SL 0       SL 1               SL N
```

It means that the number of slot leaders is strictly equal to the number of slots
in epoch (let's call this number `N`), so it is impossible to produce more than `N`
blocks during an epoch.

If slot leader missed his slot (for example, he was offline at that moment), he
lost his right to produce a block until he will be elected again. So one or more
slots can remain empty (i.e. without generated blocks), but please note that the
most of blocks (i.e. at least 50% + 1) **must** be generated during an epoch.

## Slot Leaders Election

Slot leaders are elected from among all stakeholders. Please note that not all stakeholders
participate in this election, but only ones who have enough stake (for example, 2% of
the total stake). Let's call this group of stakeholders “electors”.

During an epoch electors elect slot leaders for the next epoch. Thus, at the end of epoch
`N` it is already known who are slot leaders for the epoch `N+1`, and it cannot be
changed.

You can think of this election as a “fair lottery”: anyone from stakeholders can become
a slot leader. But important idea of PoS is that the more stake stakeholder has, the more
chances one has to be elected as a slot leader. 

Please note that one stakeholder can be elected as a slot leader for more than one slot
during the same epoch.

### Multiparty Computation

The fundamental problem of election process is its unbiasedness. We need some randomness
as a base for election, in this case results of this election will be random and fair.
So the question is where this randomness can be obtained from?

We are using multiparty computation (MPC) approach: each elector independently performs an
action which can be called “coin tossing” and after that shares result with other electors.
The idea is that results are randomly generated by each elector, but eventually they agree on
the same final value.

#### Commitment Phase

First of all, elector generates a secret (special random value). Then elector forms a
“commitment” which is a message that contains encrypted shares (see an explanation below) and
proof of secret.

Then elector signs this commitment with its secret key, specifies epoch's number and attaches
its public key. In this case everybody can check who created this commitment and which epoch
this commitment is for.

After that elector sends its commitment to other electors, so eventually each elector collects
commitments from all other electors. Please note that commitments are put into block, i.e.
they become a part of the blockchain.

#### Reveal Phase

Now elector sends an “opening”, special value for opening a commitment. You can think of a
commitment as a locked box (with a secret in it), and opening is a key we need to open this
box and get the secret from it.

All openings become a part of the blockchain as well as commitments.

#### Recovery Phase

This is a final phase.

Eventually elector has commitments and openings. But theoretically some elector can be an
adversary. And he could publish its commitment but **not** publish its opening.

In this case the honest electors can post all shares (mentioned above) to reconstruct the
secret. The idea is simple: we have to be sure that election will finish successfully even
if some of electors are adversaries.

Then elector verifies that commitments and openings are match, and if so, he extracts the
secrets from commitment and forms a seed from these secrets. So all electors get the same
seed, and it will be used for Follow the Satoshi algorithm.

### Follow the Satoshi

After electors get the seed (randomness we need), they have to select particular slot leaders for
the next epoch. This is where Follow the Satoshi (FTS) algorithm came in. It can be shown like
this:

```
         +-----+
SEED --->| FTS |---> ELECTED_SLOT_LEADERS
         +-----+
```

Let's elaborate a little bit on how a slot leader gets selected. The smallest, atomic piece
of value is a coin, we call it “[Lovelace](/glossary/#lovelace)”. Fundamentally, we can say
that the ledger produces distribution of coins, and since slot leaders can be selected from
stakeholders only, we are talking about distribution of stake. FTS is an algorithm that
verifiably picks a coin, and when coin owned by stakeholder `S` gets selected, `S` become a
slot leader. It is obviously that the more coins `S` has, the higher probability that one of
his coins will be picked.

The reason why it is called “Follow the Satoshi” is that in Bitcoin, atomic piece of currency
is called “Satoshi”, honoring Satoshi Nakamoto, the creator of Bitcoin. 

## Honest Majority

The fundamental assumption of a protocol is a **honest majority**. It means that
participants owning at least 50% + 1 of the total stake are honest ones. In this
case we can **prove** that adversaries cannot break _persistence_ and _liveness_
of the blockchain. Please read the [paper](/glossary/#paper) (pages 2 and 3) for
more details.
