---
layout: default
title: Malleable addresses
permalink: /delegation/malleable-addresses/
group: delegation
visible: true
language: en
---

# Malleable addresses

The malleability of an address `a` refers to the degree to which an adversary
can create a new address `a'` from `a`, so that the two addresses share common
characteristics.

TODO: can we give an example? (either here or later on...).

Malleable addresses become relevant in the context of delegation. Users
delegate their stake to [stake pools](TODO:link) using [stake keys](TODO:link).

TODO: check:
every time funds are received to an address, we also need to specify to which
other address the stake associated to those funds will be delegated. That is
why addresses in Shelly are of the form

```haskell
h vkp ++ so
```

where `so` is a [staking object](/delegation/staking-objects). If an main in
the middle could modify `so` in such a way that it delegates the staking rights
to her, then she will be stealing these rights. The receiver of the funds will
still receive the funds, but her staking rights would have been stolen.


## How do we prevent malleability attacks in Cardano?

TODO: explain. To prevent malleability attacks, the Cardano wallet checks
whether the delegation information in the address' [staking
object](/delegation/staking-objects) coincides with the current delegation
preferences. In case of discrepancy the user (TODO:and the network?) will be
notified.
