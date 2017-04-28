---
layout: default
title: Stake Delegation in Cardano SL
permalink: /technical/delegation/
group: technical
visible: true
---
[//]: # (Reviewed at e1d0f9fb37a3f1378341716916f0321fb55698df)

# Stake Delegation in Cardano SL

This guide describes implementation details of the stake delegation process.

As described earlier, stakeholders must be online in order to generate new blocks when they are selected as slot-leaders.
However, such a situation can be unattractive, because of requiring that a majority of elected stakeholders participate in the
Coin Tossing protocol for refreshing randomness (crucial attribute of the slot-leader election process). But if we have a
lot of elected stakeholders, such a requiring can introduce a strain on the stakeholders and the network, since it might
require broadcasting and storing a large number of commitments and shares.

Delegation feature allows stakeholders `S1...Sn` to transfer their "committee participation" to some delegates `D1...Dm`.
These delegates will represent stakeholders `S1...Sn` in the Coin Tossing protocol. In this case the actual number of 
nodes participating in the Coin Tossing protocol can be much lower, see [paper](/glossary/#paper), page 38.

## Schema

Slot-leader can transfer its right to generate new block to the delegate. To do it, slot-leader use _delegation-by-proxy_
scheme: slot-leader generates [_proxy signing key_](https://github.com/input-output-hk/cardano-sl/blob/66efe143138e3b7cfb11373c05022e3b7da67d87/core/Pos/Crypto/SignTag.hs#L34), or PSK, and delegate will use it [to sign](https://github.com/input-output-hk/cardano-sl/blob/66efe143138e3b7cfb11373c05022e3b7da67d87/src/Pos/Delegation/Methods.hs#L54) messages to authenticate a block. There're two kinds of PSKs, heavyweight and lightweight (see below).

Specifically, stakeholder forms a special certificate specifying the delegates identity via its public key.
So later the delegate can sign messages within the valid message space by providing signatures for these messages
under its own public key along with the signed certificate.

This is format of a [proxy signature](https://github.com/input-output-hk/cardano-sl/blob/66efe143138e3b7cfb11373c05022e3b7da67d87/core/Pos/Crypto/Signing.hs#L309). It includes:

1. Omega value,
2. Delegate's public key,
3. Proxy certificate (mentioned above),
4. Signature.

Omega (or ω) is a special value from the [paper](/glossary/#paper).

Signature is a [special bytestring](https://github.com/input-output-hk/cardano-sl/blob/66efe143138e3b7cfb11373c05022e3b7da67d87/core/Pos/Crypto/Signing.hs#L358) [made owith](https://github.com/input-output-hk/cardano-sl/blob/66efe143138e3b7cfb11373c05022e3b7da67d87/core/Pos/Crypto/Signing.hs#L363) an issuer's public key.

[Proxy certificate](https://github.com/input-output-hk/cardano-sl/blob/4bd49d6b852e778c52c60a384a47681acec02d22/core/Pos/Crypto/Signing.hs#L211) is actually a [signature](https://github.com/input-output-hk/cardano-crypto/blob/838b064d8a59286142aa2fe14434fe7601896ddb/src/Cardano/Crypto/Wallet.hs#L73) that [made of](https://github.com/input-output-hk/cardano-sl/blob/66efe143138e3b7cfb11373c05022e3b7da67d87/core/Pos/Crypto/Signing.hs#L256) secret key of issuer, delegate's public key and ω.
Issuer can post [only one certificate](https://github.com/input-output-hk/cardano-sl/blob/9bbb9055d6937604565a9a270f068f3da17a4059/src/Pos/Delegation/Logic.hs#L303) per one epoch.

## Heavyweight Delegation

Heavyweight delegation is using stake threshold `T`. It means that stakeholder has to posses not less than `T`
in order to participate in heavyweight delegation. The value of this threshold is defined in the configuration file (for example,
here is [production-related value](https://github.com/input-output-hk/cardano-sl/blob/3afe8b5eb5445fd0333365b5d896d08fba2552f8/constants-prod.yaml#L13)).

Moreover, stakeholder-issuer must have particular stake too, otherwise [it cannot be](https://github.com/input-output-hk/cardano-sl/blob/9bbb9055d6937604565a9a270f068f3da17a4059/src/Pos/Delegation/Logic.hs#L298) a valid issuer.

Proxy signing certificates from heavyweight delegation are stored within the blockchain.

## Lightweight Delegation

In contrast to heavyweight delegation, lightweight delegation doesn't require that delegate posses `T`-or-more stake. So lightweight
delegation is available for any node. But proxy signing certificates for lightweight delegation aren't stored in the blockchain.

Later lightweight PSK can be [verified](https://github.com/input-output-hk/cardano-sl/blob/66efe143138e3b7cfb11373c05022e3b7da67d87/src/Pos/Delegation/Logic.hs#L477)
given issuer's public key, signature, message space predicate and message itself.

### Confirmation of proxy signature delivery

Delegate should take the proxy signing key he has and sign this key with itself. If the signature is correct,
then it was done by delegate (guaranteed by PSK scheme).
