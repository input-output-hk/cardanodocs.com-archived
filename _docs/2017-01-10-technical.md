---
layout: default
title: Technical details
group: base
permalink: /technical/
children: technical
---

[//]: # (Reviewed at 42f226733a3d0e92af736f076a9fb1a7388d8da1)

# Implementation

This section is a starting point for developers who wish to
contribute to the original client, as well as those who wish
to undertake making their own client for Cardano SL. Nonetheless,
this section covers the original client to great extent, assuming
that it will be the initial reference client for some time.

## High-level overview

A Cardano SL node is a blockchain node. When ran, it finds other
nodes (via [DHT](http://ast-deim.urv.cat/cpairot/dhts.html)) and then starts
performing blockchain-related procedures.

Time in Cardano SL is divided into _epochs_. Every epoch is divided
into _slots_. Epochs and slots are numbered. Therefore, the slot `(3,5)`
is read as "the fifth slot of the third epoch" (the 0th slot and the 0th
epoch are also possible).

Cardano SL uses a set of constants, special values defined in `.yaml` configuration
files. We have two main configuration files: for development and for production,
[`constants-dev.yaml`](https://github.com/input-output-hk/cardano-sl/blob/c30a68214f05367bb26388b58f76984034a564cd/constants-dev.yaml) and [`constants-prod.yaml`](https://github.com/input-output-hk/cardano-sl/blob/c30a68214f05367bb26388b58f76984034a564cd/constants-prod.yaml) correspondingly. Please note that particular values are not equal in these two configuration files.
In this guide we'll refer to productions constants.

Suppose the values for Cardano SL are:

- Slot duration: 120 seconds
- Security parameter *k*: 60

Please refer to the [last section](#constants) of this article to see all the
constants and their actual values.

In other words, **a slot lasts 120 seconds**, and an epoch has `10×k=600` slots
in it, so it lasts **1200 minutes** or **20 hours**.

There's one node called the slot-leader on each slot. Only this node has right to generate
a new block during this slot; this block will be added to the blockchain. However,
there's no guarantee that new block will be actually generated (e.g. slot-leader can be
offline during a corresponding slot).

Furthermore, slot-leader may delegate its right to another node `N`; in this case node
`N` will have a right to generate a new block instead of slot-leader. Please note that
node `N` with delegated right isn't called a slot-leader though.

It's theoretically possible to delegate the slot-leader's right to multiple nodes, but it's
**not** recommended by reasons explained later. Moreover, we can run multiple nodes with the same
key (i.e. on one computer), let's say nodes `A`, `B` and `C`, and if node `A` is elected as the
slot-leader, not only `A` itself, but nodes `B` and `C` will be able to generate a new block as well.
In this case, every one of these nodes will issue a most probably different block, and the network will fork
— each other node will accept **only one** of these concurrent blocks. Later, this fork will be eliminated.

During the epoch, nodes send each other MPC messages to come to the consensus as to who
would be allowed to generate blocks in the next epoch. Payloads from `Data` messages
(along with transactions) are included into blocks.

The more currency (or "stake") an address holds, the more likely it is to
be chosen to generate a block. Please refer to [the pertinent
section](/cardano/proof-of-stake/) for more details.

In short: Send messages, receive messages/transactions/etc, form a
block (if you're the selected stakeholder), repeat.

## Business logic

### Listeners

Listeners handle incoming messages and respond to them.
Various supplemental listeners will not be covered, focusing on the main ones instead.

Listeners mostly use the [Relay framework](/technical/protocols/csl-application-level/#invreqdata-and-messagepart), which includes three type of messages:
  - `Inventory` message: node publishes message to network when gets a new data.
  - `Request` message: node requests a new data which  was published in `Inventory` message.
  (from other node), if this data is not known yet by this node
  - `Data` message: node replies with this message on `Request` message. `Data` message contains concrete data.

For instance, when a user creates a new transaction, the wallet sends `Inventory` message with
transaction ID to the network. If the node that has received `Inventory` doesn't know any transaction with such ID,
then it replies with `Request` message, after that the wallet sends this transaction in `Data` message.
After the node has received the `Data` message, it can send the `Inventory` message
to its neighbors in DHT network and repeat previous iterations again.

Another example

- Block listeners:

    - `handleBlockHeader`: Handles an incoming block header. Decides whether
    the block is needed; if it is needed, requests the block.

    - `handleBlockRequest`: Handles an incoming block request. If the block is
    in possession, sends it to the other node.

    - `handleBlock`: Handles an incoming block. Takes transactions from it,
    sends the block header to other nodes, etc.

### Workers

A Worker is an action repeated with some interval. The workers of importance
are:

- `onNewSlotWorker`: Runs at the beginning of each slot. Does some cleanup
and then runs `sscOnNewSlot` and `blkOnNewSlot`. This worker also creates
a _genesis block_ at the beginning of the epoch. There are two kinds of blocks:
"genesis blocks" and "main blocks". Main blocks are stored in the blockchain;
genesis blocks are generated by each node internally between epochs. Genesis
blocks aren't announced to other nodes. However, a node may request a genesis
block from someone else for convenience, if this node was offline for some
time and needs to catch up with the blockchain.

- `blkOnNewSlot`: Creates a new block (when it is the node's turn to create
   a new block) and announces it to other nodes.
- `sscOnNewSlot`: Sends a message to other nodes. The actual consensus
   algorithm and the nature of sent messages will be discussed later.

- `blocksTransmitter`: Runs two times per slot. Announces the header of the
  latest block.
- `txsTransmitter`: Runs once per slot. Announces the local set of transactions.
- `sscTransmitter`: Retransmits SSC messages. To find out how often
  this worker runs, see the `mpcRelayInterval` constant in the original client.

## Proof of Stake

At the heart of Cardano SL sits the Ouroboros Proof of Stake protocol, as
described in [the whitepaper](https://eprint.iacr.org/2016/889) of the same
name.

## Forks

Generally, one chain (the _main chain_) is maintained by a node, but eventually
alternative chains may arise. Recall that only blocks k and more slots deep
are considered stable. This way, if a block which is neither a part nor
a continuation of our blockchain is received, we first check if its complexity
is bigger than ours (the complexity is the length of the chain), and then we start
subsequently requesting previous blocks from the node that provided an alternative
chain header. If we come deeper than `k` slots ago, the alternative chain gets
rejected. Otherwise, once we get to the block existing in our chain, the
alternative chain is added to storage. From the standpoint of state, we store
and maintain all the alternative chains that are viable.
If it appears that an alternative chain is longer than the main chain, they
are swapped, making the alternative chain the new main chain.

## Supplemental parts

### Slotting

The consensus scheme we use relies on correct slotting. More specifically, it
relies on the assumption that nodes in the system have access to the current
time (small deviations are acceptable), which is then used to figure
out when any particular slot begins and ends, and perform particular
actions in this slot.

System start time is a timestamp of the (0,0) slot (i.e. the 0th slot of
the 0th epoch).

## P2P Network

### Peer discovery

We use Kademlia DHT for peer discovery. It is a general solution for distributed
hash tables, based on [a whitepaper by Petar Maymounkov and David Mazières, 2002](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf).

However, we only take advantage of its peer discovery mechanism, and use none of
its hash table capabilities.

In short, each node in the Kademlia network is provided a `160`-bit ID
generated randomly. The distance between the nodes is defined by `XOR` metric. The
network is organized in such a way that node knows no more than `K` (`K=7` in the
original client implementation) nodes for each relative distance range:
`2^i < d <= 2^(i+1)`.

Initial peer discovery is done by [sending](https://github.com/serokell/kademlia/blob/d4a33089523d63bc53fbc2bec38d1dd24b9ad07a/src/Network/Kademlia/Implementation.hs#L182)
a Kademlia `FIND_NODE` message with our own node ID as a parameter to
[a pre-configured set of nodes](https://github.com/input-output-hk/cardano-sl/blob/f37c6cf6a43f42cd7c0a0477e33ae95155d50450/src/Pos/Constants.hs#L264) and
[the nodes passed by the user on the command line](https://github.com/input-output-hk/cardano-sl/blob/f37c6cf6a43f42cd7c0a0477e33ae95155d50450/src/node/Main.hs#L88).
Our implementation [sends](https://github.com/input-output-hk/cardano-sl/blob/2e935011548cd59a52004799e94e81ad827ce7f7/src/Pos/DHT/Real/Real.hs#L194)
this request to all known peers at once and then waits for the first reply.

While the client runs, it collects peers per Kademlia protocol. The list of known
peers is preserved and [restored](https://github.com/serokell/kademlia/blob/d4a33089523d63bc53fbc2bec38d1dd24b9ad07a/src/Network/Kademlia.hs#L191)
between subsequent launches. For each peer, we keep their [host & port number](https://github.com/serokell/kademlia/blob/d4a33089523d63bc53fbc2bec38d1dd24b9ad07a/src/Network/Kademlia/Types.hs#L37),
as well as their [node ID](https://github.com/serokell/kademlia/blob/d4a33089523d63bc53fbc2bec38d1dd24b9ad07a/src/Network/Kademlia/Types.hs#L52).

### Messaging

Kademlia already provides the notion of nodes that are known. Such nodes can be
called _neighbors_. To send message to all nodes in a network, you can send it
to neighbors, they will resend it to their neighbors, and so on. But sometimes
we may need to not propagate messages across all network, but send it to neighbors
only. Hence we have three types of sending messages:

- Send to a node;
- Send to neighbors;
- Send to network.

#### Message types

To handle this, three kind of message headers are used, and there are two
message types:

 - Simple: sending to a single peer
 - Broadcast: attempting to send to the entire network, iteratively
   sending messages to neighbors.

Broadcast messages are resent to neighbors right after retrieval (before
handling). Also, they are being checked against LRU cache, and messages
that have been already received once get ignored.

### Leaders and rich men computation (LRC)
"Slot leaders" and "rich men" are two important notions of Ouroboros Proof of Stake Algorithm.

- Slot leaders: Slot leaders for the current epoch (for each slot of the current epoch) are computed by [Follow the Satoshi](/cardano/proof-of-stake/#follow-the-satoshi) (FTS) algorithm in the beginning of current epoch.
FTS uses a `shared seed` which is result of [Multi Party Computation](/cardano/proof-of-stake/#multi-party-computation) (MPC) algorithm for previous epoch: in the result of MPC some nodes reveal their seeds, `xor` of these seeds is called `shared seed`.

- Rich men: Only nodes that have sent their VSS certificates and also have enough stake can participate in the MPC algorithm.
So in the beginning of epoch node must know all potential participants for validation of MPC messages during this epoch.
Rich men are also computed in the beginning of current epoch.

Rich men are important for other components as well; for instance, Update system uses rich men for checking that
node can publish update proposal and vote.

There are two ways of computing who the rich men will be:
 - considering common stake
 - considering delegated stake (Ouroboros provides opportunity to delegate own stake to other node, see more in
 [Delegation section](/cardano/differences/#stake-delegation))

MPC and Update System components need rich men with delegated stake, but Delegation component with common stake.

## Constants

Cardano SL uses a list of the fundamental constants. Their values have been discussed with
the original authors of the protocol as well as independent security auditors,
so reusing these constants is strongly recommended for alternative clients.

Values of these constants are defined in two configuration files:

1. [constants-dev.yaml](https://github.com/input-output-hk/cardano-sl/blob/f4fac95c104c62a4dad72e3b0b57c8e9e7da0866/constants-dev.yaml), for development environment.
2. [constants-prod.yaml](https://github.com/input-output-hk/cardano-sl/blob/f4fac95c104c62a4dad72e3b0b57c8e9e7da0866/constants-prod.yaml), for production environment.
