---
layout: default
title: Differences Between the Paper and the Implementation
permalink: /cardano/differences/
group: cardano
visible: true
---
[//]: # (Reviewed at a6a1cdf72c7e167a13f500c0679c01fe4cfa0ca8)

# Differences Between Paper and Implementation

The goal of this document is to enumerate all ways in which
*cardano-sl* implementation differs from the specifications presented in
the paper and clarify everything that may be obscure after reading the
paper.

This document is divided into four parts:
 1. *Clarifications* part clarifies some details which are not
    specified in paper, but are important for practical implementation.
 2. *Modifications* part outlines things which are specified in
    paper, but are implemented differently in Cardano SL.
 3. *Added features* part briefly mentions new features which are not
    described in paper, but have been implemented in Cardano SL.
 4. *Ommisions* part lists topics described in paper but not implemented into Cardano SL.

# Clarifications

## Time, Slots, and Synchrony

In a basic model of *Ouroboros* time is divided into discrete units
called *slots*. However, there are no details on how to obtain current
time securely and with enough precision.

In *cardano-sl* current time is obtained by querying a predefined set
of NTP servers. Specifically, each node periodically queries NTP
servers and calculates mean of results. Node stores last margin
(difference between local time and global time) and last obtained
global time. Node also stores last slot to ensure that slots are
monotonic. Please read about [Time in Cardano SL](/technical/time)
for implementation details.

## Coin Tossing and Verifiable Secret Sharing

As *Ouroboros* paper suggests, a PVSS scheme by Schoenmakers is used in
*cardano-sl*. One of the challenges while using a VSS scheme is associating
the public key used for signing with the public key used for VSS scheme
(`VssPublicKey`). This is solved by introducing
`VssCertificate`s. This certificate is a signature given by signing
key for a pair consisting of `VssPublicKey` and the epoch until which this
certificate is valid. Initially, all stakeholders with stake enough
for participation in randomness generation have certificates. When a new
stakeholder with enough stake appears or when an existing certificate
expires, a new certificate should be generated and submitted to the
network. `VssCertificate`s are stored in blocks.

PVSS scheme by Schoenmakers uses share verification information which
also includes a commitment to the secret. It is also used as a
commitment in Ouroboros protocol. PVSS scheme has been implemented
over the elliptic curve secp256r1. Please read about [PVSS implementation in Cardano SL](/technical/pvss/)
for more details. 

## Block Generation Time

In *Ouroboros* paper, they do not state explicitly when a slot leader
should generate a new block and send it to the network: it can be done
at the beginning of a slot, at the end of a slot, in the middle of a slot,
etc. In `cardano-sl` there is a special constant (`networkDiameter`)
which approximates maximal time necessary to broadcast a block to all
nodes in the network. A block is generated and announced
`networkDiameter` seconds before the end of a slot.

## Stake Delegation

Delegation scheme, as described in paper, doesn't explicitly state
whether proxy signing certificates should be stored within the blockchain
(though there is a suggestion to store the revocation list in the blockchain).
Without storing proxy signing certificates in the blockchain
it's barely possible to consider delegated stake in checking
eligibility threshold. On the other hand, if all certificates are
stored in the blockchain, it may lead to a blockchain bloat when a big portion
of blocks will be occupied by proxy certificates. Submitting a
certificate is free, so adversaries can generate as many certificates as
they want.

There are two types of delegation in `cardano-sl`: heavyweight and
lightweight. There is a threshold on stake that one has to posses in
order to participate in heavyweight delegation. Proxy signing
certificates from heavyweight delegation are stored within the
blockchain. On the contrary, lightweight delegation is available for
everybody, but certificates are not stored within the blockchain and
aren't considered when checking eligibility threshold. As paper
suggests, *delegation-by-proxy* scheme is used.

Please read about [Stake Delegation in Cardano SL](/technical/delegation/)
for implementation details.

# Modifications

## Leader Selection Process

In *Ouroboros*, Leader Selection Process is described as flipping
a `(1 - p₁) … (1 - pⱼ₋₁) pⱼ`-biased coin to see whether `j`-th
stakeholder is selected as leader of given slot. Here `pⱼ` is
probability of selecting `j`-th stakeholder.

In `cardano-sl`, it is implemented in a slightly different way. `R`
random numbers in a range `[0 .. totalCoins]` are generated where `R`
is number of slots in epoch. Stakeholders occupy different subsegments
on this range proportional to their stakes. This way each random
number maps into stakeholder.  Also, as the paper suggests, short
(32-bits) seed is used for initializing PRG instead of using `n ⌈log
λ⌉` random bits.

Please read about [Leader Selection in Cardano SL](/technical/leader-selection/)
for implementation details.

## Commitments, openings, shares sending

Time of sending is randomized within small interval. It is done to
avoid network overload when all coin-tossing participants send their
data at the same time. This interval is chosen to be small enough for
protocol to remain secure. If this data is sent too late and there are
many adversaries leading last few slots of a certain phase, it can
happen that data won't be included into block.

## Multishares

In *Ouroboros* each stakeholder is presented as exactly one
participant of the underlying VSS scheme. However, it's natural that
a stakeholder with more stake is more important than a stakeholder with
less stake with regards to secret sharing. For instance, if three
honest stakeholders control 60% of stake in total (each of them
controls 20%) and there are 40 adversary stakeholders each having 1%
of stake, then adversary has full control over secret sharing.

To overcome this problem, a number of shares for each stakeholder proportional to their stake is generated in *cardano-sl*.

## Randomness Generation Failure

*Ouroboros* doesn't cover the situation when commitments can't be
recovered. However, practical implementation should account for such
scenarios. *cardano-sl* implementation uses a seed consisting of all
zeroes if there are no commitments that could be recovered.

# Added Features

## Update System

See the article on [update system](/cardano/update-mechanism/).

## Security of P2P

See the article on [P2P implementation and hardening](/technical/protocols/p2p/).

# Omissions

The sections on _Input Endorsers_ and _Incentive Structure_ aren't
implemented yet. Those sections are to be implemented together with
the pending research on Side-chains and released within the Side-chains release.
