---
layout: default
title: Balance and Stake
permalink: /cardano/balance-and-stake/
group: cardano
---
<!-- Reviewed at a6a1cdf72c7e167a13f500c0679c01fe4cfa0ca8 -->

# Balance and Stake in Cardano SL

There are two important concepts in Cardano SL &mdash; **balance** and **stake**. This article
explains the difference between these concepts.

### Balance

Balance is a real amount of coins user has. After user installed a Daedalus wallet on his computer
and made [Ada redemption](/timeline/bootstrap/), he received some amount of Ada. This amount of
money is his balance. User can send some amount of Ada (within his balance) to other users as well as
receive some amount of Ada from them.

Thus, when we are talking about the balance &mdash; we are talking just about user's money.

### Stake

Stake is a concept from the [paper](/glossary/#paper). Unlike the balance (real amount of money),
you can think of a stake as a part of the whole financial power of Cardano SL. Stake gives user the
power to control different Cardano SL algorithm parts: being the [slot leader](/glossary/#slot-leader),
voting in [Update system](/cardano/update-mechanism/), taking part in [MPC/SSC](/technical/leader-selection/#follow-the-satoshi).
This is the reason why all thresholds in Cardano SL protocol are defined in terms of the stake,
not the balance.

Thus, when we are talking about the stake &mdash; we are talking about user's abilities to control
Cardano SL.

### Balance and Stake Relation

Every coin in Cardano SL is associated with a balance and with a stake. We use [transaction output](/cardano/transactions/#design)
to associate coin `C` with user's balance, and use [stake distribution](/timeline/bootstrap/#stake-locking)
to associate coin `C` with user's stake.

It is possible to change association between coin and stake using [stake delegation](/technical/delegation/).
