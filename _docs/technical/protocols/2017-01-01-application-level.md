---
layout: default
title: CSL Application-Level Messaging
permalink: /technical/protocols/csl-application-level/
group: technical-protocols
---
[//]: # (Reviewed at ef835a2334888eda7384da707c4077a8b576b192)

# CSL Application-Level Messaging

In this document we explore messaging in Cardano SL. The goal of this
document is to explain how all the pieces, such as Time-Warp, Network-Transport,
and Kademlia DHT, click together and make implementing a full CSL node possible.

## Message Typeclass and Message Types

When reading the source code, you often encounter things like
[this](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Types.hs#L20-L29)

~~~ haskell
-- | 'GetHeaders' message (see protocol specification).
data MsgGetHeaders = MsgGetHeaders
    { -- not guaranteed to be in any particular order
      mghFrom :: ![HeaderHash]
    , mghTo   :: !(Maybe HeaderHash)
    } deriving (Generic, Show, Eq)

instance Message MsgGetHeaders where
    messageName _ = varIntMName 4
    formatMessage _ = "GetHeaders"
~~~

How do you read this? First, let's examine the `instance` part. This particular
snippet says that the data structure defined by type `MsgGetHeaders` is used as
a message payload. The name of such message is `"GetHeaders"`.

In this particular case, the data structure has two fields: `mghFrom` and `mghTo`.
Prefixes like `mgh` are used because Haskell puts symbols for record fields in
the global namespace, so it's programmer's duty to avoid clashes.

It should be noted that sometimes you see messages that are parametrized with a type `ssc` variable. That is done for the code to be polymorphic with respect
to the way we carry out shared seed computation.
[Here](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Types.hs#L42-L44)
is an example of a message that sends newest headers first, minding ssc.

The way messages are serialized can be seen in
[Pos.Binary.Communication](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Binary/Communication.hs)
module.

Every message type should have an instance of the `Message` typeclass.
Please see [Time-Warp-NT guide](/technical/protocols/time-warp-nt/#messaging).

## Inv/Req/Data and MessagePart

Most of messages in Cardano SL are generalized with `Inv/Req/Data` standard (see [Pos.Communication.Relay](https://github.com/input-output-hk/cardano-sl/blob/3d695fd804814647f50abe452a81a678aad080cc/src/Pos/Communication/Types/Relay.hs) module).
Within this framework we define three data types:

~~~ haskell

-- | Inventory message. Can be used to announce the fact that you have
-- some data.
data InvMsg key tag = InvMsg
    { imTag  :: !tag
    , imKeys :: !(NonEmpty key)
    }

-- | Request message. Can be used to request data (ideally data which
-- was previously announced by inventory message).
data ReqMsg key tag = ReqMsg
    { rmTag  :: !tag
    , rmKeys :: !(NonEmpty key)
    }

-- | Data message. Can be used to send actual data.
data DataMsg contents = DataMsg
    { dmContents :: !contents
    } deriving (Show, Eq)
~~~

Here:

 + `key` is a type representing the node identifier.

 + `tag` is a type used to describe announced/requested data. It should contain
   enough information for other nodes to check if they need these data and request
   them.

 + `contents` is a type representing actual message payload.

To introduce a new message using `Inv/Req/Data` one should create two types: tag
type and contents type for this message, and then implement `MessagePart`
typeclass for both of them.

~~~ haskell
class MessagePart a where
    pMessageName :: Proxy a -> MessageName
~~~

Here, `pMessageName` is an identifier for a particular message type
(e.g. the type should be the same for tag and contents, but it should differ
between messages).

`Message` typeclass for `InvMsg key tag`, `ReqMsg key tag` and `DataMsg contents`
is automatically derived from the `MessagePart` typeclass for particular tag and
contents.

Please see [Pos.Communication.Message](https://github.com/input-output-hk/cardano-sl/blob/3d695fd804814647f50abe452a81a678aad080cc/src/Pos/Communication/Message.hs)
module for the examples of messages that are using `Inv/Req/Data`.

## Block Exchange Messages

[//]: # (Updated at 3b657302dede832b908f7ba792a164c83b362712)

This table explains [Pos.Block.Network.Types](https://github.com/input-output-hk/cardano-sl/blob/3b657302dede832b908f7ba792a164c83b362712/src/Pos/Block/Network/Types.hs) module.

| Message type | Payload                                                           | Commentaries                   |
|--------------+-------------------------------------------------------------------+--------------------------------|
| GetHeaders   | Header hash checkpoints; Optional newest hash we're interested in | Expect newest header first     |
| GetBlocks    | Oldest header hash; Newest hash                                   | Both hashes have to be present |
| BlockHeaders | Non-empty collection of block headers, newest first               | Polymorphic in ssc             |
| Block        | A single block                                                    | Polymorphic in ssc             |

For more details see [binary protocols](/technical/protocols/binary-protocols/#block-exchange-messages).

## Message names

All messages are given custom names, since using full type names would be excessive. Each name is concatenation of one or two encoded `UnsignedVarInt`s.

This table contains names for all used messages / message parts; they could also be found in
[Pos.Communication.Message](https://github.com/input-output-hk/cardano-sl/blob/73d1b0a4281dd5453465304ed117b7127f82f79f/src/Pos/Communication/Message.hs) module.
To distinguish from integers addition, concatenation is denoted here as `(++)`.

| Message type | Name |
|----------------------------|---------|--------------|
| NOP | `0` |
| SendProxySK | `2` |
| ConfirmProxySK | `3` |
| MsgGetHeaders | `4` |
| MsgHeaders | `5` |
| MsgGetBlocks | `6` |
| MsgBlock | `7` |
| InvMsg | `8` ++ `pMessageName tag` |
| ReqMsg | `9` ++ `pMessageName tag` |
| MempoolMsg | `10` ++ `pMessageName tag` |
| DataMsg | `11` ++ `pMessageName contents` |
| SysStartRequest | `1001` |
| SysStartResponse | `1002` |

| Message part type | Name |
|----------------------------|---------|--------------|
| TxMsgTag | `0` |
| TxMsgContents | `0` |
| ProposalMsgTag | `1` |
| (UpdateProposal, [UpdateVote]) | `1` |
| VoteMsgTag | `2` |
| UpdateVote | `2` |
| GtTag | `3` |
| GtMsgContents | `3` |

## Communication Messages

This table describes data structures that are included in communication
maintenance messages.
It covers the following modules:

 + [Pos.Communication.Types.State](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Communication/Types/State.hs)
 + [Pos.Communication.Types.Protocol](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Communication/Types/Protocol.hs)
 + [Pos.Communication.Types.SysStart](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Communication/Types/SysStart.hs)

| Data Type* or Message type | Payload          | Commentaries                                                  |
|----------------------------+------------------+---------------------------------------------------------------|
| SysStartRequest            | Ø                | Polls peer's timestamps. To be answered with SysStartResponse |
| SysStartResponse           | Peer's timestamp | Answer to SysStartRequest                                     |

## Delegation Messages

*Delegation* is a feature that allows one stakeholder, called *issuer*, to let
another stakeholder, called *delegate*, generate blocks on her behalf.

To do this, issuer should create *proxy signing key* that allows delegate to
sign blocks instead of issuer. Any stakeholder can verify that a proxy signing
key was actually issued by a specific stakeholder to a specific delegate and
that this key is valid at time.

Delegation can be of two types: per-epoch delegation and delegation
with revocable long-lived certificates. Per-epoch delegation is called
“lightweight”, and the long-lived delegation is called “heavyweight”.

### Lightweight Delegation

Lightweight delegation allows delegate to sign blocks instead of issuer for
some epochs (range [low, high] of epochs is specified for a signing key created).

To do this, issuer should send message containing time range, issuer public key,
delegate public key and certificate over network.
Every node from network receives this message and can check later if the one who
generated the block had right for it.
Lightweight delegation data is stored in memory and gets deleted after some time
(500 seconds).

This delegation type can be used to delegate blocks generating right to some
trusted node when an issuer knows it will be absent in some time range.

### Heavyweight Delegation

Heavyweight delegation serves two purposes:

1. Delegate block generation right, like lightweight delegation.
2. Share stake with some delegate, thus allowing delegate to take part in
Follow-The-Satoshi. No real money is transferred; stake of issuer is added to
stake of delegate when calculating stakeholders for Follow-The-Satoshi.

Every particular stakeholder can share stake with one and only one delegate.
To revoke certificate, a node should create a new certificate and put itself as
both issuer and delegate.

### Messages table

[//]: # (Updated at 15b8b777fde5a8ab4a85af71affeffdf31ad219c)

This table describes delegation-related messages, found in
[Pos.Delegation.Types](https://github.com/input-output-hk/cardano-sl/blob/15b8b777fde5a8ab4a85af71affeffdf31ad219c/src/Pos/Delegation/Types.hs)
module. The format of delegation messages is described in _Binary protocols_
section.

| Message type             | Commentaries                                                                           |
|--------------------------+----------------------------------------------------------------------------------------|
| SendProxySK              | Message with proxy delegation certificate                                              |
| ConfirmProxySK           | Used to confirm proxy signature delivery                                               |

[//]: # (Unused messages)
[//]: # | CheckProxySKConfirmed    | Checks if node is aware of PSK delivery. To be responded with CheckProxySKConfirmedRes |
[//]: # | CheckProxySKConfirmedRes | Returns _True_ if node aware of asked proxy certificate                                |

## Update System Messages

You can see how system messages are implemented under `WorkMode`
[here](https://github.com/input-output-hk/cardano-sl/blob/22360aa45e5dd82d0c87872d8530217fc3d08f4a/src/Pos/Communication/Methods.hs).

| Message type             | Commentaries                                                                           |
|--------------------------+----------------------------------------------------------------------------------------|
| UpdateProposal | Serialized update proposal, sent to a DHT peers in Pos.Communication.Methods |
| VoteMsgTag | A tag for vote message. Works with UpdateVote to tag the payload |
| UpdateVote | Message, payload of which contains the actual vote |

# Workers, Listeners and Handlers in CSL

You can think about them as «operating personnel» for messages.

**Workers** initiate messages exchange, so a worker is an _active_
communication part of Cardano SL. **Listeners** accept messages from the
workers and may send some messages as answers, so a listener is a
_passive_ communication part of Cardano SL. After a message was received,
a listener uses the function called **handler** to actually perform
the corresponding job. A particular handler is used based on the type of
received message (as it has been said above, messages have different types).

To be able to perform necessary actions, all workers and handlers work in
the `WorkMode`'s constraints (see below).

## Block Processing

Block exchange messages are described above.

### Block Processing Workers

Block acquisition is handled in
[Pos.Block.Network.Retrieval](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs)
module.

The `retrievalWorker` function  is very important: it's a server that
operates on [block retrieval
queue](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Context/Context.hs#L74)
validating headers, and these blocks form a proper chain. Thus, at [this
point](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs#L105)
it sends a message of type `MsgGetBlocks` to the listener, and at [this
point](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs#L134)
it receives an answer from this listener, a message of `MsgBlock` type.

Here's another example — the `requestHeaders` function. This function handles
expected block headers, tracking them locally. So at [this
point](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs#L190)
it sends a message of type `MsgGetHeaders` to the listener, and at [this
point](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs#L191)
it receives an answer from that listener, a message of
`MsgHeaders` type.

Additional worker for the block processing is defined in
[Pos.Block.Worker](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Worker.hs)
module. We reuse `retrievalWorker` described above and define a
[well-documented](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Worker.hs#L50)
`blkOnNewSlot` worker. It represents an action which should be done when
a new slot starts. This action includes the following steps:

 1. Generating a genesis block, if necessary;
 2. Getting leaders for the current epoch;
 3. Initiation block generation, if we're the slot leader or we're delegated to
 do so (optional).

### Logic

The way in which blocks are processed is specified in the
[Pos.Block.Logic](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Logic.hs)
module. Please read about [blocks in Cardano SL](/technical/blocks/)
for more info.

### Block Processing Listeners

Listeners for the block processing are defined in
[Pos.Block.Network.Listeners](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs)
module.

Handler
[`handleGetHeaders`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs#L58)
sends out the block headers: at [this
point](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Announce.hs#L61)
it receives a message of type `MsgGetHeaders` from the worker, [get the
headers](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Logic.hs#L235)
and then, at [this
point](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Announce.hs#L65),
it sends a response message of type `MsgHeaders` to that worker.

A handler
[`handleGetBlocks`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs#L65)
sends out blocks. This handler corresponds to
[`retrieveBlocks`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs#L117)
from main
[`retrievalWorker`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs#L53).
Thus, it receives a message of type `MsgGetBlocks` from the worker [here](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs#L70),
[gets corresponding headers](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Logic.hs#L308),
and then it sends response message of type `MsgBlock` to that worker [here](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs#L86).

A handler
[`handleBlockHeaders`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs#L90)
sends out block headers for unsolicited use case in a similar way: it receives a
message of
[`MsgHeaders`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs#L97) type
from the worker and [handles
it](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs#L116).

All these handlers work in the `ListenerActionConversation` mode because they
send replies to corresponding workers (so we have a _conversation_ between
workers and listeners).

## Delegation

Another example is working with delegation messages described above.

### Workers

Workers for delegation messages are defined in
[Pos.Delegation.Methods](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Methods.hs)
module. There are 3 workers:
[`sendProxySKEpoch`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Methods.hs#L24),
[`sendProxySKSimple`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Methods.hs#L31)
and
[`sendProxyConfirmSK`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Methods.hs#L39).

All these workers do not send messages to one particular node. They send messages
to all neighbors. Thus, `sendProxyConfirmSK` worker
[sends](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Methods.hs#L46)
a message of type `ConfirmProxySK` to all neighbors.

### Listeners

Listeners for delegation messages are defined in
[Pos.Delegation.Listeners](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Listeners.hs)
module.

Handler
[`handleSendProxySK`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Listeners.hs#L67)
handles `SendProxySK*`-messages. This handler works in another mode,
called `ListenerActionOneMsg`, which means there's no _conversation_ with
the worker — we receive a single incoming message. In this case
handler receives a message of type `SendProxySK` from the worker, but
doesn't reply to it. Instead, it sends a message of
`SendProxySKSimple` type [to its
neighbors](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Methods.hs#L35).

Handler
[`handleConfirmProxySK`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Listeners.hs#L124)
works in the same way. It receives a message of type `ConfirmProxySK` from the
worker and sends a message of `ConfirmProxySK` type [to its
neighbors](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Listeners.hs#L146).

Handler
[`handleCheckProxySKConfirmed`](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Listeners.hs#L149)
works in `ListenerActionOneMsg` mode too, but after it receives a
message of `CheckProxySKConfirmed` type, it
[sends](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Delegation/Listeners.hs#L157)
a message of `CheckProxySKConfirmedRes` type as a reply to the worker.

## Security

Workers for security operations are defined in
[Pos.Security.Workers](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Security/Workers.hs)
module. Let's have a look at
[`checkForReceivedBlocksWorker`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Security/Workers.hs#L48):
in this case, again, we send a message to all neighbors using
[`converseToNode`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/DHT/Model/Neighbors.hs#L68)
function. This function tries to [establish connection with the
listeners](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/DHT/Model/Neighbors.hs#L79)
to start a _conversation_ with them.

## Update System

Below is the list of workers and listeners related to update system.

### Workers

Workers for update system are defined
[here](https://github.com/input-output-hk/cardano-sl/blob/22360aa45e5dd82d0c87872d8530217fc3d08f4a/src/Pos/Update/Worker.hs).
The only thing that the update system does is checking for a new
*approved* update on each slot.

### Listeners

Listeners for update system are defined
[here](https://github.com/input-output-hk/cardano-sl/blob/22360aa45e5dd82d0c87872d8530217fc3d08f4a/src/Pos/Update/Network/Listeners.hs).

`UpdateProposal` handlers:

 + `Req` — local node answers to a request about update proposal with
   the set of votes for/against this proposal.
 + `Inv` — checks if we need the offered proposal, and records the data if
   this inventory message is relevant.
 + `Data` — carries the proposal information along with votes, which is
   verified and recorded.

`UpdateVote` listeners:

 + `Req` — sends _our_ vote to whoever requests it.
 + `Inv` — checks if we need the offered vote, and records it if
    relevant.
 + `Data` — carries a single vote, which is verified and recorded.

## WorkMode and WorkModeMin

A special type called `WorkMode` represents a bunch of constraints to perform
work for the real world distributed system. You can think about a constraint as
a _compile-time guarantee_ that particular actions can be performed in the
particular context. For example, if we define type of some function `f` in the terms of **logging** constraint, we definitely know that we can log different info inside of this function `f`.

All workers and handlers described above work in the `WorkMode`'s constraints.
These constraints guarantee the following abilities:

* [`WithLogger`](https://hackage.haskell.org/package/log-warper-0.2.1/docs/System-Wlog-CanLog.html#t:WithLogger).
An ability to log different info, see [example](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs#L58).
* [`MonadIO`](http://hackage.haskell.org/package/transformers-0.5.1.0/docs/Control-Monad-IO-Class.html#t:MonadIO).
An ability to interact with the real world. For example, standard input/output, filesystem, etc. — see [example](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Retrieval.hs#L61).
* [`MonadMockable`](https://github.com/serokell/time-warp-nt/blob/9b4927f8115499db2fa3ba07df50d60d02190790/src/Mockable/Monad.hs).
An ability to work with our network layer, see [example](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Block/Network/Listeners.hs#L86).
Please read [Time-Warp-NT Guide](/technical/protocols/time-warp-nt/) for more info.
* [`MonadDHT`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/DHT/Model/Class.hs#L16).
An ability to perform Distributed Hash Table operations — for example, [join the network](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/DHT/Real/Real.hs#L211)
or peer discovery to find neighbors. Please read [P2P Layer Guide](/technical/protocols/p2p/) for more info.
* [`MonadMask`](http://hackage.haskell.org/package/exceptions-0.8.3/docs/Control-Monad-Catch.html#t:MonadMask).
An ability to mask asynchronous exceptions.
* [`MonadSlots`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Slotting.hs#L44).
An ability to get information about the time when system started functioning and different slot-related info, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/wallet/Main.hs#L152).
* [`MonadDB`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/DB/Class.hs#L27).
An ability to work with node's DB data (we use RocksDB), see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Web/Server.hs#L117).
* [`MonadTxpLD`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Txp/Class.hs#L51).
An ability to work with local data of transactions processing, see [example](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Wallet/Web/Server/Full.hs#L74).
* [`MonadDelegation`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Delegation/Class.hs#L67).
An ability to ask delegation state, [see example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Wallet/Web/Server/Full.hs#L76). Please see definition of [DelegationWrap](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Delegation/Class.hs#L38) for more info.
* [`MonadUtxo`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Types/Utxo/Class.hs#L21).
An ability to work with unspent transaction outputs (UTXO).
* [`MonadSscGS`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Ssc/Extra/MonadGS.hs#L38).
An ability to work with global state (GS), get it and modify it, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Ssc/Extra/MonadGS.hs#L61).
* [`SscStorageClass`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Ssc/Class/Storage.hs#L40).
An ability to apply blocks and rollback this application, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Launcher/Runner.hs#L172).
* [`SscLocalDataClass`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Ssc/Class/LocalData.hs#L30).
An ability to work with SSC local data, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Ssc/Extra/MonadLD.hs#L75).
Local means that it's not stored in blocks.
* [`SscHelpersClass`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Ssc/Class/Helpers.hs#L16).
An ability to verify payload, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Types/Block.hs#L448).
* [`MonadSscLD`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Ssc/Extra/MonadLD.hs#L28).
An ability to work with SSC local data, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Ssc/Extra/MonadLD.hs#L72).
* [`WithNodeContext`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Context/Class.hs#L16).
An ability to get [runtime context](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Context/Context.hs#L38) of the node.
* [`MonadStats`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Statistics/MonadStats.hs#L56).
An ability to collect statistics information, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Statistics/Helpers.hs#L18).
* [`MonadJL`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Util/JsonLog.hs#L96).
An ability to log JSON log events, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Statistics/MonadStats.hs#L190).
* [`WithKademliaDHTInstance`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/DHT/Real/Types.hs#L80).
An ability to get Kademlia DHT instance, see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Wallet/Web/Server/Lite.hs#L56). Please read [P2P Layer Guide](/technical/protocols/p2p/) for more info about Kademlia.
* [`MonadFail`](https://hackage.haskell.org/package/base-4.9.1.0/docs/Control-Monad-Fail.html#t:MonadFail).
Ability to abort some operation as failed.
* [`WithPeerState`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Communication/PeerState.hs#L41).
An ability to work with peer's state (get it and clear it), see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Wallet/Web/Server/Full.hs#L77).
* [`MonadUSMem`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Update/MemState/Class.hs#L19).
A reduced equivalent of [`MonadReader`](http://hackage.haskell.org/package/mtl-2.2.1/docs/Control-Monad-Reader-Class.html#t:MonadReader) [`MemVar`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Update/MemState/MemState.hs#L44), see [example](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/Launcher/Scenario.hs#L105).

There's a minimum version of `WorkMode` called `MinWorkMode`, for more specific functions [like this one](https://github.com/input-output-hk/cardano-sl/blob/d564b3f5a7e03e086b62c88212870b5ea89f5e8b/src/Pos/Launcher/Runner.hs#L309). `MinWorkMode` includes these absolutely necessary constraints only:

* [`WithLogger`](https://hackage.haskell.org/package/log-warper-0.2.1/docs/System-Wlog-CanLog.html#t:WithLogger). See above.
* [`MonadIO`](http://hackage.haskell.org/package/transformers-0.5.1.0/docs/Control-Monad-IO-Class.html#t:MonadIO). See above.
* [`MonadDHT`](https://github.com/input-output-hk/cardano-sl/blob/517a72801c0bbb11a34c8d6a6d528fff5f094471/src/Pos/DHT/Model/Class.hs#L16). See above.
* [`MonadMockable`](https://github.com/serokell/time-warp-nt/blob/9b4927f8115499db2fa3ba07df50d60d02190790/src/Mockable/Monad.hs). See above.
* [`MonadFail`](https://hackage.haskell.org/package/base-4.9.1.0/docs/Control-Monad-Fail.html#t:MonadFail). See above.
