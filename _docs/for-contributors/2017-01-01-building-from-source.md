---
layout: default
title: Building Cardano SL and Daedalus from Source
permalink: /for-contributors/building-from-source/
group: for-contributors
---

[//]: # (Reviewed at c507f6675c16810ba9ca72b71dac57288fd1735c)

# Building Cardano SL and Daedalus from Source

Cardano SL consists of a collection of binaries that constitute
the backend, a PureScript API for the Electron-based wallet, and the
Electron-based wallet called “Daedalus”.

## Cardano SL and Daedalus Bridge

The source code for both Cardano SL and Daedalus Bridge can be obtained
from the [official repository](https://github.com/input-output-hk/cardano-sl).

We strongly suggest using [Nix package
manager](https://nixos.org/nix/download.html) to get the right dependencies for building Cardano SL. It will fetch the correct `openssl` version, but won't override the system-installed version. The same goes for dependencies such as `rocksdb`, with which many developers
report having problems. The rest of documentation assumes that the reader has Nix package manager installed on their machine.

To build the project, first clone the source base and navigate to the root directory of it:

```
git clone https://github.com/input-output-hk/cardano-sl.git
cd cardano-sl
```

Then enter `nix-shell` and if it's the first project in Haskell on this machine, run `stack setup`.

```
Tue Jan 10 sweater@chill ~/github/cardano-sl (master)
λ nix-shell
[nix-shell:~/github/cardano-sl]$ stack setup
* snip *
```

After the relevant Haskell compiler version is obtained, Nix for all `stack` builds is to be enabled. To do so, make sure that `~/.stack/config.yaml` has the following option:

```
nix:
  enable: true
```

Now, in order to build Cardano SL with wallet capabilities, run the
following command:

```
[nix-shell:~/github/cardano-sl]
$ stack build --flag cardano-sl:with-wallet --flag cardano-sl:with-web
```

Here is the [asciinema
cast](http://asciinema.org/a/47vbdch8srbhf3j5kta7j9bov) of the project building.

It is suggested having at least 8GB of RAM and some swap space for the build process. As the project is fairly large and GHC parallelizes builds very effectively, memory and CPU consumption during the build process is high.

If the compilation breaks with `No space left on device` error, it means that your temporary space (for example, `tmpfs`) is too small. It can be solved by new `TMPDIR` value:

```
$ mkdir ~/stacktmp
$ TMPDIR=~/stacktmp stack build --flag cardano-sl:with-wallet --flag cardano-sl:with-web
$ rm -rf ~/stacktmp
```

After the project is built, the built binaries can be launched using the `stack exec` command. Let's discuss important binaries briefly before proceeding to the next step.

### Cardano-node

The `cardano-node` binary is the most important binary of the system. It launches nodes. In order to attach to a network, Hardened Kademlia DHT peer information has to be supplied. Peer discovery will follow if an initial DHT peer is available. The syntax for communicating initial
DHT peer is as follows: `--peer HOST:PORT/HOST_ID`, for example
`discover.memorici.de:21989/dYGuDj0BrJxCsTC9ntJE7ePT7wUoVdQMH3sKLzQD8bo=`.

[//]: # (TODO: Actually put a small dev-only net with a discoverable)
[//]: # (peers which will send a recruitment propsal message to people)
[//]: # (who bothered to build the system from scratch in the early days)
[//]: # (of testnet release)

Before providing an example of running the node, the trickiest command line arguments are noted.

When a testnet is bootstrapped, stake is distributed across several addresses in the genesis block. The supported distributions are flat distribution and Bitcoin distribution. The spending and VSS keys are generated for genesis block. If a node has access to a genesis key mapping, the index of the secret key in this mapping can be provided using `--vss-genesis N` and `--spending-genesis N`, where `N` is the index in this mapping.

Example:

```
stack exec -- cardano-node \
  --db-path run/node-db2 \
  --rebuild-db \
  --vss-genesis 0 \
  --spending-genesis 0 \
  --json-log logs/2017-01-10_035413/node2.json \
  --logs-prefix logs/2017-01-10_035413 \
  --log-config logs/2017-01-10_035413/conf/node2.log.yaml \
  --flat-distr "(3, 100000)" \
  --listen 127.0.0.1:3000 \
  --time-lord \
  --wallet \
  --kademlia-dump-path kademlia.dump
```

Please make sure that file `logs/2017-01-10_035413/conf/node2.log.yaml` passed to `--log-config` actually exists. It's possible to use [default configuration file](https://github.com/input-output-hk/cardano-sl/blob/44d3482a7ff72d02eef3cc2b47fa0def232b999c/log-config-prod.yaml).

### Cardano-smart-generator

A tool which tests whether a node in a network sends the transactions properly; a stress test can be invoked by `cardano-smart-generator`.
This tool is designed to provide reasonable and reliable measurements of transactions per second (or TPS).

It works in few rounds, each round split in few phases.

At start, the initial transaction is submitted. This transaction uses the unspent output from the genesis address, the index of which is supplied as `--index`
argument and creates `(k + P) * slotDuration * maxTPS` outputs, which would be used for further transactions. `k` (block depth to treat transaction as stable) and `P` (approximate amount of slots needed for a transaction to be successfully published in a block) are the parameters. During our benchmarks, we were using `k=6` and `P=2` with one hundred nodes.

Each round of `cardano-smart-generator` tests that the system is capable of handling a concrete TPS value. It goes from value provided by `--tps`
CLI argument and adjusts it for every step by `--tps-step` value. Both can be fractional (double precision floats). The process will continue for at most `--round-number` (`N`) rounds.

This way, `maxTps = initTps + tpsStep * N`.

All further transactions are `(in, 1, A)`, where

 + `A` is the owner of `in`;
 + 1 is the amount of coins transferred;
 + `in` is the output of previous transaction;  

Each subsequent transaction is being sent only if the parent is included into a block of depth `k` (i.e stable). This way there's no possibility of producing more transactions than a node can include into blocks.

Each round is split to `(R + 2)` phases. Within each phase, transactions are sent with current TPS rate. Within the first phase no measurements are taken.
Within the last phase no new transactions are emitted, only confirmations for sent transactions being collected.

Each phase takes `(k + P) * slotDuration` seconds, where `P` is an approximate amount of slots needed for a successful transaction to be published in a block.

Transactions are sent in a few threads. Each thread uses its own transaction pool derived from its own index in the genesis block.

Here is an example of invocation of `cardano-smart-generator` sending
transactions from the node number zero:

```
stack exec -- cardano-smart-generator \
  --json-log=txgen.json \
  --index 0 \
  --round-period-rate 60 \
  --round-number 10 \
  --tps 50 \
  --propagate-threshold 4 \
  --tps-sleep 20 \
  --init-money 100000 \
  --peer 127.0.0.1:3000/dYGuDj0BrJxCsTC9ntJE7ePT7wUoVdQMH3sKLzQD8bo=
```

Now the purpose of the most important binaries and basic
operations with said binaries is clarified. Let's proceed with building the wallet. On the Haskell side of things, just two matters have to be addressed:

 1. Generate types for `daedalus-bridge`
 2. Build Daedalus Bridge

### Generating Types for Daedalus Bridge

To generate types, run

```
cd cardano-sl
stack exec -- cardano-wallet-hs2purs
```

A warning message will be printed; this message is safe to ignore. Once the types are generated, proceed to the next step.

### Building Daedalus Bridge

The building process for Daedalus Bridge is a bit complex.
Currently Nix expressions don't install Node.js and NPM, so
those have to be installed manually. To do that, consult the repositories of the package manager of the according OS, or download binaries from [the
net](https://nodejs.org/en/download/). Please make sure you have Node.js version 6. You can use [nvm](https://github.com/creationix/nvm#installation) to install proper version.

To build Daedalus Bridge with npm installed, run the following commands:

```
cd daedalus
npm install
npm run build:prod
npm link
```

Running `npm install` will register `daedalus-client-api` in local npm package repository. This way, at any time, `daedalus-client-api` dependency can be satisfied in any project that depends on it by manually running `npm link daedalus-client-api`.

## Building Daedalus

If the instructions of building Cardano SL and the Bridge are followed, building Daedalus wallet is as simple as cloning Daedalus' repository:

```
git clone https://github.com/input-output-hk/daedalus.git
cd daedalus
```

Then execute the following command:

```
npm link daedalus-client-api
npm install
```

Now, to run the wallet connected to the Cardano SL in dev-mode, call:

```
npm run dev
```

## Building Cardano SL node for Testing Purpose

If you want to test functionality of Cardano SL node in our [testnet](/timeline/testnet/), you should go to the root directory of the repository and switch to release branch, for example, `cardano-sl-0.2`. After that, build a node with this command:

~~~ bash
CSL_SYSTEM_TAG=linux64 stack build --flag cardano-sl-core:-dev-mode
~~~

It means that you build a node in **production** mode.

Now run your node with this command:

~~~ bash
stack exec -- cardano-node \
    --db-path node-db0 \
    --rebuild-db \
    --dht-key a_P8zb6fNP7I2H54FtGuhqxaMDAwMDAwMDAwMDAwMDA= \
    --listen 127.0.0.1:3000 \
    --json-log logs/2017-03-10_133948/node0.json \
    --logs-prefix logs/2017-03-10_133948 \
    --log-config logs.yaml \
    --kademlia-dump-path logs/2017-03-10_133948/dump/kademlia0.dump \
    --wallet \
    --keyfile secret.key \
    --peer 35.156.222.51:3000/zzQk9aJKJ9CGD3ATxO_RGUX_s7TTVS-_hw8mRkX6u9g= \
    --peer 35.156.234.240:3000/S-GJ1HDZyHpIS_ZOFBlZsipkGNXy-tmCDtY_CvaiywE= \
    --peer 35.157.148.244:3000/nzcEO6Cv7tKD3REWoWc9vcHMOZEQWFGLX4150bt_cYw= \
    --peer 35.157.136.232:3000/gz48M5Huafsdmh52sB7NHQrzznpxQ97kHermRGNwOzU= \
    --peer 35.157.114.57:3000/xQQJIViR9hBi7szyFpoVSTEZDWVShg8ysUtGzuCoThg= \
    --peer 35.156.228.180:3000/QBO0SV4gxvrGcBDyJaBf_tfs_zrW0uoYSkhiRgbVs4M= \
    --peer 35.157.175.151:3000/lrhwsPYgEvWRmBZm36ApfSV3K4kHIuRncKQRUhFpeLg= \
    --peer 52.52.249.66:3000/dYGuDj0BrJxCsTC9ntJE7ePT7wUoVdQMH3sKLzQD8bo= \
    --peer 52.8.23.163:3000/8hVd3J5Jc0GCkIV-QeiOkwDqH38QooYGo3iHJnZuIk4= \
    --peer 52.52.249.222:3000/U6C4RC-M2UiCknavdy9_rqHqLkg7HhHpvQlaxbfuZYg= \
    --peer 52.52.248.212:3000/KeIrVo_HyErHIk5k2FldVbkDwyssSdhCdsdnKh9jMg8= \
    --peer 52.52.250.46:3000/A09BWN1SFPI24nhDU9LkFZ7gRvmDvGoLNr9rYwA0XCQ= \
    --peer 52.52.234.5:3000/FPg8wnE9PxY4VwIrUtw_5PXa3LJlkhxFEs9wA_N11nE= \
    --peer 52.52.136.190:3000/mWOgwLu5j9xKf6c8B_7cv8eMOtoAMgDOX2aBLnC4MOY=
~~~

You can download `secret.key` from [Cardano Test-Net Faucet](https://tada.iohk.io). You can place `secret.key` file anywhere, and value of `--keyfile` option should contain a path to this file.

Please make sure you're using correct list of peers! You must take this list from `installers/data/ip-dht-mappings` file in the same release branch of `daedalus` repository. For example, if you're using `cardano-sl-0.3` release branch, then the corresponding `ip-dht-mappings` file is [here](https://github.com/input-output-hk/daedalus/blob/cardano-sl-0.3/installers/data/ip-dht-mappings).

After running this command, your node will be listening to two ports:

1. `3000` for communication with other nodes in our testnet,
2. `8090` for use wallet functionality, via wallet web API.

Please make sure you have run your node with `--wallet` option, otherwise `8090` port won't be available. You can use another port for wallet web API, via `--wallet-port` option.

Now you can test your node.

## Use Case - Sending Transaction

Although it is possible to work with a node via Daedalus GUI, the simplest way to test a node is a CLI-based one. The main purpose of a node is a sending/receiving money, so let's create your first wallet and initiate your first transaction.

You can create new wallet with the following command. 12-word phrase is your backup phrase for this wallet. Please note that each backup phrase corresponds to a single secret key (the value of `--keyfile` mentioned above).

~~~ bash
curl -X POST -H "Content-Type: application/json" -d '{"cwBackupPhrase": {"bpToList": ["squirrel", "material", "silly", "twice", "direct", "slush", "pistol","razor", "become", "junk", "kingdom", "flee"]},"cwInitMeta": {"cwType": "CWTPersonal","cwCurrency": "ADA","cwName": "Personal Wallet 1"}}' http://localhost:8090/api/new_wallet
~~~

After running it, you should see an answer, for example:

~~~ json
{
	"Right": {
		"cwAddress": "1gBqyUYWrzPe4ZbiS4L89kUPRcgp7o3J7xGZoiQ9DxXpTUq",
		"cwAmount": {
			"getCoin": 2000
		},
		"cwMeta": {
			"cwType": "CWTPersonal",
			"cwCurrency": "ADA",
			"cwName": "Personal Wallet 1"
		}
	}
}
~~~

It means that your first wallet has been created successfully. Value of `cwAddress` is an address of your node, and value of `getCoin` is your initial amount.

Now you can send money to some user with this command:

~~~ bash
curl -X POST http://localhost:8090/api/send/1gBqyUYWrzPe4ZbiS4L89kUPRcgp7o3J7xGZoiQ9DxXpTUq/1g4oyDDJfMUc2xPzZjxdrxeygepjAor4JbvCebubfVmpwk2/100
~~~

where:

* `1gBqyUYWrzPe4ZbiS4L89kUPRcgp7o3J7xGZoiQ9DxXpTUq` is your address.
* `1g4oyDDJfMUc2xPzZjxdrxeygepjAor4JbvCebubfVmpwk2` is an address of some user in the testnet.
* `100` is amount of money you want to send.

Now you should see an answer, for example:

~~~ json
{
	"Right": {
		"ctId": "8c0e26b3e591c0a550ac0977f79c0cc9594483fb7dcc743edd899f9e1b4c5c72",
		"ctAmount": {
			"getCoin": 1900
		},
		"ctConfirmations": 0,
		"ctType": {
			"tag": "CTOut",
			"contents": {
				"ctmCurrency": "ADA",
				"ctmTitle": "",
				"ctmDescription": "",
				"ctmDate": 1.489228842124409e9
			}
		}
	}
}
~~~

As you can see, the value of `getCoin` now is `1900`, because you've sent `100` ADA.

You can test other functionalities of the node. Please see description of [Wallet Backend API](/technical/wallet/#wallet-backend-api) for detailed info.
