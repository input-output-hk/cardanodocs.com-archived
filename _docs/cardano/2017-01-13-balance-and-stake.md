---
layout: default
title: Balance and Stake
permalink: /cardano/balance-and-stake/
group: cardano
---
<!-- Reviewed at e070e675764738b5190b2f93424de403f1937216 -->

# Balance and Stake in Cardano SL

There are two important concepts in Cardano SL: **balance** and **stake**. This chapter
explains the difference between these concepts.

### Balance

Balance is a real amount of coins a user has. Upon installing a Daedalus wallet on one's computer
and performing [Ada redemption](/timeline/bootstrap/), one receives some amount of Ada. This amount of
Ada is called one's balance. A user can send some amount of Ada (within his balance) to other users, as well as
receive any amount of Ada from them.

Thus, when we are talking about the balance, we are talking just about user's money.

### Stake

Stake is a concept from the [paper](/glossary/#paper). Unlike balance (the real amount of money one has),
you can think of "stake" as a part of the whole financial power of Cardano SL. Stake gives a user the
power to control various Cardano SL algorithm parts, for example: being the [slot leader](/glossary/#slot-leader),
voting in the [Update system](/cardano/update-mechanism/), taking part in [MPC/SSC](/technical/leader-selection/#follow-the-satoshi). This is why all thresholds in Cardano SL protocol are expressed in terms of stake,
not balance.

Thus, when we are talking about the stake, we are talking about a user's ability to control Cardano SL.

### Balance and Stake Relation

Every coin in Cardano SL is associated with a balance and with a stake. We use [transaction output](/cardano/transactions/#design)
to associate coin `C` with user's balance, and use [stake distribution](/cardano/transactions/#stake-distribution)
to associate coin `C` with user's stake.

It is possible to change association between coin and stake using [stake delegation](/technical/delegation/).
