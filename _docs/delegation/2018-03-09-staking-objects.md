---
layout: default
title: Staking objects
permalink: /delegation/staking-objects/
group: delegation
visible: true
language: en
---

# Staking objects

A _staking object_ is used to identify a [staking key](TODO:link).

There are three kind of staking objects:

- Base: they are of the form `h vks`, where `h` is a [hash
  function](TODO:link), and `vks` is the public staking key.
- Pointer: they are of the form `(nBlock, nTx, nCert)`, where
  `nBlock` is the index of a block in the chain, `nTx` is the index of a
  transaction within that block, and `nReg` is the index of the [registration
  certificate](TODO:link) within that transaction.
- Enterprise: they are a empty string.

## On the need for different kind of addresses

TODO: explain why do we need each type of addresses.
