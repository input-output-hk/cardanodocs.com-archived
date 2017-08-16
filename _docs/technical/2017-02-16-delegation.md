---
layout: default
title: Stake Delegation in Cardano SL
permalink: /technical/delegation/
group: technical
visible: true
---
<!-- Reviewed at c23493d7a33a82d559d5bd9d289486795cf6592f -->

# Stake Delegation in Cardano SL

This chapter describes implementation details of the stake delegation process.

As described earlier, stakeholders selected as slot leaders must be online in
order to generate new blocks. However, such a situation can be unattractive,
because a majority of elected stakeholders must participate in the Coin Tossing
protocol for refreshing randomness (crucial attribute of the slot leader
election process). If there are a lot of elected stakeholders, this can put a
strain on the stakeholders and the network, since it might require broadcasting
and storing a large number of commitments and shares.

Delegation feature allows stakeholders called _issuers_ `I1...In` to transfer their
"committee participation" to some _delegates_ `D1...Dm`. These delegates will represent
stakeholders `S1...Sn` in the [Coin Tossing protocol](https://github.com/input-output-hk/cardano-sl/blob/4bd49d6b852e778c52c60a384a47681acec02d22/src/Pos/Ssc/GodTossing.hs). In this case the actual
number of nodes participating in the Coin Tossing protocol can be much lower,
see [paper](/glossary/#paper), page 38.

Moreover, delegates are able not only to generate new blocks or taking part in [MPC/SSC](/technical/leader-selection/#follow-the-satoshi), but also to vote in the [Update system](/cardano/update-mechanism/).

## Schema

The slot leader can transfer its right to generate a new block to the delegate. To do
it, the slot-leader uses a *delegation-by-proxy* scheme: the slot leader generates [a proxy
signing key](https://github.com/input-output-hk/cardano-sl/blob/4378a616654ff47faf828ef51ab2f455fa53d3a3/core/Pos/Crypto/SignTag.hs#L33), or PSK, and the delegate will use it [to
sign](https://github.com/input-output-hk/cardano-sl/blob/ed6db6c8a44489e2919cd0e01582f638f4ad9b72/src/Pos/Delegation/Listeners.hs#L65)
messages to authenticate a block. There are two kinds of PSKs, heavyweight and
lightweight (see below).

Specifically, the stakeholder forms a special certificate specifying the delegates
identity via its public key. So later the delegate can sign messages within the
valid message space by providing signatures for these messages under its own
public key along with the signed certificate.

This is the format of a [proxy
signature](https://github.com/input-output-hk/cardano-sl/blob/d01d392d49db8a25e17749173ec9bce057911191/core/Pos/Crypto/Signing.hs#L256).
It includes:

1.  proxy secret key,
2.  signature.

The proxy secret key includes:

1.  omega value,
2.  issuer's public key,
3.  delegate's public key,
4.  proxy certificate.

Omega (or ω) is a special value from the [paper](/glossary/#paper). In our
implementation, it is a [pair of epochs'
identifiers](https://github.com/input-output-hk/cardano-sl/blob/f374a970dadef0fe62cf69e8b9a6b8cc606b5c7d/core/Pos/Core/Types.hs#L235). These identifiers define the delegation validity period: the produced block is
valid if its epoch index is inside of this range.

[Proxy certificate](https://github.com/input-output-hk/cardano-sl/blob/d01d392d49db8a25e17749173ec9bce057911191/core/Pos/Crypto/Signing.hs#L209)
is a [signature](https://github.com/input-output-hk/cardano-crypto/blob/84f8c358463bbf6bb09168aac5ad990faa9d310a/src/Cardano/Crypto/Wallet.hs#L74)
of omega and delegate's public key.

## Heavyweight Delegation

Heavyweight delegation is using stake threshold `T`. It means that stakeholder
has to posses not less than `T` in order to participate in heavyweight
delegation. The value of this threshold is defined in the [configuration file](https://github.com/input-output-hk/cardano-sl/blob/d01d392d49db8a25e17749173ec9bce057911191/core/constants.yaml#L22).

Moreover, the issuer stakeholder must have particular amount of stake too, otherwise [it
cannot
be](https://github.com/input-output-hk/cardano-sl/blob/763822c4fd906f36fa97b6b1f973d31d52342f3f/src/Pos/Delegation/Logic/VAR.hs#L394)
a valid issuer.

Proxy signing certificates from heavyweight delegation are stored within the
blockchain. Issuer can post [only one
certificate](https://github.com/input-output-hk/cardano-sl/blob/763822c4fd906f36fa97b6b1f973d31d52342f3f/src/Pos/Delegation/Logic/VAR.hs#L401)
per one epoch.

### Expiration

Heavyweight delegation certificates expire in the beginning of every epoch if
stakeholder does not pass threshold `T` anymore. This is made to prevent delegation
pool bloat attacks where user commits a certificate and moves all his money (above threshold)
to another account, and then repeats the operation.

## Lightweight Delegation

In contrast to heavyweight delegation, lightweight delegation doesn't require
that delegate posses `T`-or-more stake. So lightweight delegation is available
for any node. But proxy signing certificates for lightweight delegation are not
stored in the blockchain. Lightweight delegation certificate must be broadcasted
to reach delegate.

Later lightweight PSK can be
[verified](https://github.com/input-output-hk/cardano-sl/blob/9d7be20eeafac27e682551d05f4aba2faba537bc/src/Pos/Delegation/Logic/Mempool.hs#L285)
given issuer's public key, signature and message itself.

### Confirmation of proxy signature delivery

Delegate should take the proxy signing key he has and make a signature of PSK using
PSK and delegate's key. If the signature is correct, then it was done by delegate
(guaranteed by the PSK scheme).

## Revocation Certificate

Revoke certificate is a special certificate that issuer creates to revoke delegation.
Both heavyweight and lightweight delegation can be revoked, but not in the same way.

The revoke certificate is just a normal one where [issuer and delegate are the same](https://github.com/input-output-hk/cardano-sl/blob/db306d7db0d05610005c5bee98c7be3918fb7947/src/Pos/Delegation/Helpers.hs#L35)
(in other words, issuer delegates to himself).

To revoke lightweight delegation issuer sends revoke certificate to the network and
_asks_ to revoke delegation, but it cannot _enforce_ this revocation, since lightweight PSKs
are not the part of the blockchain.

Revocation of heavyweight delegation is handled other way. Since proxy signing certificates
from heavyweight delegation are stored within the blockchain, revoke certificate will be
committed in the blockchain as well. In this case the node removes heavyweight delegation
certificate which was issued before revocation certificate. But there are two important notes
about it.

1.  If the committed heavyweight delegation certificate is in the node's memory pool yet, and revoke
    certificate was committed as well, the delegation certificate will be removed from memory pool.
    Obviously, in this case delegation certificate will never be added to the blockchain.
2.  If a user commits heavyweight delegation certificate and _after that_ he loses money, he still
    can revoke that delegation, even if by that time he does not have enough money (i.e. less than
    threshold `T` mentioned above).

## Transaction Distribution Trick

Both heavyweight and lightweight delegation certificate contains issuer's and delegate's public keys.
But sometimes we do not want to disclose these public keys because of possible security problems.
In this case issuer sends transaction to itself and stores the address `I2` in `txDistr`, where
`I2` is an address of "other" issuer. After that issuer commits heavyweight PSK `I2 -> D`. We
can freely disclose `I2` address.

Please read more about transaction distribution [here](/cardano/transactions/#transaction-distribution).
