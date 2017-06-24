---
layout: default
title: Stake Delegation in Cardano SL
permalink: /technical/delegation/
group: technical
visible: true
---
<!-- Reviewed at 997538cf04d16c7be58b70a94729ff7757e77261 -->

# Stake Delegation in Cardano SL

This chapter describes implementation details of the stake delegation process.

As described earlier, stakeholders selected as slot leaders must be online in
order to generate new blocks. However, such a situation can be unattractive,
because a majority of elected stakeholders must participate in the Coin Tossing
protocol for refreshing randomness (crucial attribute of the slot-leader
election process). If there are a lot of elected stakeholders, this can put a
strain on the stakeholders and the network, since it might require broadcasting
and storing a large number of commitments and shares.

Delegation feature allows stakeholders `S1...Sn` to transfer their "committee
participation" to some delegates `D1...Dm`. These delegates will represent
stakeholders `S1...Sn` in the [Coin Tossing protocol](https://github.com/input-output-hk/cardano-sl/blob/4bd49d6b852e778c52c60a384a47681acec02d22/src/Pos/Ssc/GodTossing.hs). In this case the actual
number of nodes participating in the Coin Tossing protocol can be much lower,
see [paper](/glossary/#paper), page 38.

## Schema

Slot leader can transfer its right to generate new block to the delegate. To do
it, slot-leader use *delegation-by-proxy* scheme: slot leader generates [proxy
signing key](https://github.com/input-output-hk/cardano-sl/blob/4378a616654ff47faf828ef51ab2f455fa53d3a3/core/Pos/Crypto/SignTag.hs#L33), or PSK, and delegate will use it [to
sign](https://github.com/input-output-hk/cardano-sl/blob/ed6db6c8a44489e2919cd0e01582f638f4ad9b72/src/Pos/Delegation/Listeners.hs#L65)
messages to authenticate a block. There are two kinds of PSKs, heavyweight and
lightweight (see below).

Specifically, stakeholder forms a special certificate specifying the delegates
identity via its public key. So later the delegate can sign messages within the
valid message space by providing signatures for these messages under its own
public key along with the signed certificate.

This is format of a [proxy
signature](https://github.com/input-output-hk/cardano-sl/blob/d01d392d49db8a25e17749173ec9bce057911191/core/Pos/Crypto/Signing.hs#L256).
It includes:

1.  proxy secret key,
2.  signature.

Proxy secret key includes:

1.  omega value,
2.  issuer's public key,
3.  delegate's public key,
4.  proxy certificate.

Omega (or ω) is a special value from the [paper](/glossary/#paper). In our
implementation is's a [pair of epochs'
identificators](https://github.com/input-output-hk/cardano-sl/blob/f374a970dadef0fe62cf69e8b9a6b8cc606b5c7d/core/Pos/Core/Types.hs#L235). These identificators define delegation validity period: produced block is
valid if its epoch index is inside of this range.

[Proxy certificate](https://github.com/input-output-hk/cardano-sl/blob/d01d392d49db8a25e17749173ec9bce057911191/core/Pos/Crypto/Signing.hs#L209)
is a [signature](https://github.com/input-output-hk/cardano-crypto/blob/84f8c358463bbf6bb09168aac5ad990faa9d310a/src/Cardano/Crypto/Wallet.hs#L74),
made of omega and delegate's public key.

## Heavyweight Delegation

Heavyweight delegation is using stake threshold `T`. It means that stakeholder
has to posses not less than `T` in order to participate in heavyweight
delegation. The value of this threshold is defined in the [configuration file](https://github.com/input-output-hk/cardano-sl/blob/d01d392d49db8a25e17749173ec9bce057911191/core/constants.yaml#L22).

Moreover, stakeholder-issuer must have particular stake too, otherwise [it
cannot
be](https://github.com/input-output-hk/cardano-sl/blob/763822c4fd906f36fa97b6b1f973d31d52342f3f/src/Pos/Delegation/Logic/VAR.hs#L394)
a valid issuer.

Proxy signing certificates from heavyweight delegation are stored within the
blockchain. Issuer can post [only one
certificate](https://github.com/input-output-hk/cardano-sl/blob/763822c4fd906f36fa97b6b1f973d31d52342f3f/src/Pos/Delegation/Logic/VAR.hs#L401)
per one epoch.

## Lightweight Delegation

In contrast to heavyweight delegation, lightweight delegation doesn't require
that delegate posses `T`-or-more stake. So lightweight delegation is available
for any node. But proxy signing certificates for lightweight delegation aren't
stored in the blockchain. Lightweight delegation certificate must be broadcasted
to reach delegate.

Later lightweight PSK can be
[verified](https://github.com/input-output-hk/cardano-sl/blob/9d7be20eeafac27e682551d05f4aba2faba537bc/src/Pos/Delegation/Logic/Mempool.hs#L285)
given issuer's public key, signature and message itself.

### Confirmation of proxy signature delivery

Delegate should take the proxy signing key he has and sign this key with itself.
If the signature is correct, then it was done by delegate (guaranteed by PSK
scheme).
