---
layout: default
title: Time-warp-NT Layer
permalink: /technical/protocols/time-warp-nt/
group: technical-protocols
---
[//]: # (Reviewed at ef835a2334888eda7384da707c4077a8b576b192)

# Time-Warp-NT Layer

Time-warp is developed to provide a reliable networking layer with different
levels of abstractions. Another important objective of time-warp is to provide
an easy way to write and run tests for distributed systems using emulation mode,
which should be flexible enough to support various scenarios (tunable network
delays, disconnects, other real-time conditions).

Time-warp is split up into two parts:

1. `Mockable` interfaces.
2. Network functionality.

## Mockable

`Mockable` interfaces allow to abstract from language-specific details of
implementation of the basic functions.

They are split into several categories. For instance, `Mockable Delay` contains
`delay` operation, while `Mockable Fork` keeps elementary functions to
manipulate threads.

This innovation allows to launch the same code both in production and testing
environment, where the latter allows to emulate time, threads, networking, etc.

`Production` implements all those interfaces with references to respective
prototypes of the functions.


## Networking

This layer is written on top of _network-transport_ and provides network
capabilities for the application layer. It is split up into two sub-layers:
**lower** and **upper**.


### Lower Layer

This sub-layer is a direct wrapper over _network-transport_, and it provides
a convenient interface which allows to initiate lightweight connection and
send/receive data on it. Please read
[Network Transport Layer guide](/technical/protocols/network-transport)
for more info.

It supports two types of connections, **unidirectional** and **bidirectional**.

#### Unidirectional Connections

Unidirectional connections allow to send a stream of bytes without waiting for
peer's response.

The function `withOutChannel` executes given action, providing it with
one-shot lightweight connection.

Upon connection initialization, node sends `UNI`:

~~~
+------------------+
|       UNI        |
+------------------+

|   'U' :: Word8   |
~~~

`Word8` represents 8-bit unsigned integer value.

#### Bidirectional Сonnections

Bidirectional connections allow both nodes to send and receive bytes to each other.

The function `withInOutChannel` establishes connection, executes given action with
given handle to send and receive bytes on connection, and automatically
closes connection on action's end. Its usage requires a handshake, which contains
the following steps.

First, the initiator sends a **connection request**, which has the following structure:

~~~
+------------------+-----------------+
|     `BI_SYN`     |      Nonce      |
+------------------+-----------------+

|   'S' :: Word8   |   Word64 (BE)   |
~~~

where `Nonce` is randomly generated.

Then the peer sends **acknowledgement**, with the following structure:

~~~
+------------------+-----------------+
|     `BI_ACK`     |      Nonce      |
+------------------+-----------------+

|   'A' :: Word8   |   Word64 (BE)   |
~~~

where `Nonce` is the same nonce which came from request.

If the initiator receives the acknowledgement with correct nonce, a conversation
is started.

The opposite case could take place if the node have never sent any request on that nonce
(peer made a protocol error), but it could also be that the node did send the
`BI_SYN`, but its handler for that conversation had already finished. That's
normal, and the node should ignore this acknowledgement.


### Messaging

Before talking about upper layer, let's describe messaging.

In order to specify different handlers for various message types,
sent messages should implement `Message` interface, defining `messageName`
function. It returns unique message identifier, which is sent along with the
message itself and allows receiver to select correct handler to process this message.


### Upper Layer

This sub-layer enables message exchange. It provides two styles of communication:

1. *One-message style* allows to send single message and uses unidirectional
connection from layer below. The node sends the message name, and then the
message itself.
2. *Conversation style* uses capabilities of bidirectional connection and allows
to send/receive messages. For a single conversation, types of incoming and
outgoing messages are fixed. In this case, the initiator node sends the message
name once, and then both the initiator and the peer send required messages.

Network events processing is initiated by `node` function, where ***worker***
and ***listeners*** arguments should be specified.

***Worker*** is some action which performs as the initiator of all communication,
being supplied with `SendAction`. `SendAction` provides two functions:

1. `sendTo` sends a message in *one-message style*.
2. `withConnectionTo` initiates *conversation*, executing given action with
`ConversationActions` provided and closing conversation once action
completes. In turn, `ConversationActions` provides `send` and `recv` functions
to communicate with peer.

***Listener*** is a handler for a message. Each listener remembers type of
related message, and several listeners with non-overlapping message types
could be defined. Listeners could be of two types:

1. `ListenerActionOneMsg`, for *one-message style*. It is provided with `SendActions`.
2. `ListenerActionConversation`, for *conversation style*. It is provided with
`ConversationActions` in order to communicate with its peer.


### Serialization

Time-warp doesn't rely on any predefined serialization strategy, but rather
allows users to use their own.

To define custom serialization, a user should create special data type,
the so-called *packing type*, and implement `Packable` and `Unpackable`
interfaces for it.
