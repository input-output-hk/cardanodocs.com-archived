---
layout: default
title:  Cardano SL CLI Options
permalink: /technical/cli-options/
group: technical
---

[//]: # (Reviewed at ac0126b2753f1f5ca6fbfb555783fbeb1aa141bd)

# Cardano SL CLI Options

This guide describes all executables that are used in Cardano SL and all corresponding CLI-options/parameters.

## `cardano-nodes`

An executable `cardano-node` is our main executable, it's a node.

Usage:

~~~
cardano-node [OPTIONS]
~~~

Available options:

1.  `--version` and `--help`
    <br/>Node version and this help info.
    <br/>&nbsp;
2.  `--db-path FILEPATH`
    <br/>Path to the directory with node's database (called Global State).
    <br/>If the specified path doesn't exist, a directory will be created.
    <br/>Default value: none.
    <br/>&nbsp;
3.  `--rebuild-db`
    <br/>If the node's database already exists, discard its contents and create a new one from scratch.
    <br/>&nbsp;
4.  `--spending-genesis INT`
    <br/>Define index of using secret key in genesis.
    <br/>Default value: none.
    <br/>&nbsp;
5.  `--vss-genesis INT`
    <br/>Define index of using VSS key pair in genesis.
    <br/>Default value: none.
    <br/>&nbsp;
6.  `--keyfile FILEPATH`
    <br/>Path to the file with a secret key (we use it for Daedalus).
    <br/>Specified path must exist.
    <br/>Default value: `secret.key`.
    <br/>&nbsp;
7.  `--backup-phrase PHRASE`
    <br/>A 12-word phrase to recover the wallet. This phrase was generated during wallet's creation.
    <br/>Words should be separated by spaces.
    <br/>Default value: none.
    <br/>&nbsp;
8.  `--listen IP:PORT`
    <br>Specify IP-address and port node uses to listen requests from other nodes.
    <br/>Default value: `0.0.0.0:3000`.
    <br/>**Please make sure that IP-address and port are accessible, otherwise it is not guaranteed that the node works properly**.
    <br/>&nbsp;
9.  `--supporter`
    <br/>Launch DHT supporter instead of a full node.
    <br/>&nbsp;
10. `--dht-key HOST_ID`
    <br/>DHT key in Base64-URL format (it is used for Kademlia instance).
    <br/>Default value: none
    <br/>Example: `--dht-key dYGuDj0BrJxCsTC9ntJE7ePT7wUoVdQMH3sKLzQD8bo=`
    <br/>&nbsp;
11. `--time-lord`
    <br/> A node is a **time lord**, i.e. one responsible for system start time decision & propagation.
    <br/>This option is used in **development** mode only.
    <br/>&nbsp;
12. `--stats`
    <br/>Run full node in **benchmarking** node (with statistics logging).
    <br/>&nbsp;
13. `--json-log FILEPATH`
    <br/>Path to JSON log file.
    <br/>If the specified path doesn't exist, the file will be created.
    <br/>&nbsp;
14. `--attack TYPE`
    <br/>Attack type to emulate.
    <br/>Possible values: `NoBlocks` and `NoCommitments`.
    <br/>**This option can be used more than once.**
    <br/>Default value: none.
    <br/>&nbsp;
15. `--attack-target HOST:PORT|PUBKEYHASH`
    <br/>
    <br/>Possible values:
    <br/>* `HOST:PORT` - a target defined by its network address.
    <br/>* `PUBKEYHASH` - a target defined by its public key address (in Base58 format).
    <br/>**This option can be used more than once.**
    <br/>Default value: none.
    <br/>&nbsp;
16. `--kademlia-dump-path FILEPATH`
    <br/>Path to the file we use to write Kademlia snapshot in.
    <br/>If the specified path doesn't exist, the file will be created.
    <br/>Default value: `kademlia.dump`.
    <br/>&nbsp;
17. `--web`
    <br/>Run web server (node's web API, it's not linked with a wallet web API).
    <br/>&nbsp;
18. `--web-port PORT`
    <br/>Port for web server.
    <br/>Please make sure you use `--port` option as well, otherwise this value will be ignored.
    <br/>Default value: `8080`.
    <br/>&nbsp;
19. `--wallet`
    <br/>Runs Daedalus Wallet web API (a node will be able to accept requests from the wallet).
    <br/>&nbsp;
20. `--wallet-port PORT`
    <br/>Port for Daedalus Wallet web API.
    <br/>Please make sure you use `--wallet` option too, otherwise this value will be ignored.
    <br/>Default value: `8090`.
    <br/>&nbsp;
21. `--wallet-db-path FILEPATH`
    <br/>Path to the wallet's database.
    <br/>The specified path must exist.
    <br/>Default value: none.
    <br/>&nbsp;
22. `--wallet-rebuild-db`
    <br/>If the wallet's database already exists, discard its contents and create a new one from scratch.
    <br/>&nbsp;
23. `--wallet-debug`
    <br/>Run wallet with debug parameters (e.g. include all the genesis keys in the set of secret keys).
    <br/>&nbsp;
24. `--explicit-initial`
    <br/>Explicitly connect to initial peers as to neighbors (even if they appeared offline once).
    <br/>&nbsp;
25. `--peer HOST:PORT/HOST_ID`
    <br/>Peer to connect to for initial peer discovery.
    <br/>**This option can be used more than once.**
    <br/>Example: `--peer localhost:1234/dYGuDj0BrJxCsTC9ntJE7ePT7wUoVdQMH3sKLzQD8bo=`
    <br/>Default value: none.
    <br/>&nbsp;
26. `--peers-file FILEPATH`
    <br/>Path to file with peers list (peers must be separated by newlines).
    <br/>Default value: none.
    <br/>&nbsp;
27. `--log-config FILEPATH`
    <br/>Path to logger configuration file.
    <br/>Default value: [hardcoded default logger configuration](https://github.com/input-output-hk/cardano-sl/blob/eb74d35c50603b0ca8a967f6173b61affd1e2982/src/Pos/CLI.hs#L107).
    <br/>&nbsp;
28. `--logs-prefix FILEPATH`
    <br/>Prefix to logger output path.
    <br/>Specified path must be valid.
    <br/>Default value: none.
    <br/>&nbsp;
29. `--ssc-algo ALGO`
    <br>Shared Seed Calculation algorithm which will be used by nodes.
    <br>Possible values: `GodTossing` and `NistBeacon`.
    <br/>Default value: `GodTossing`.
    <br/>&nbsp;
30. `--disable-propagation`
    <br/>Disable network propagation (transactions, SSC data, blocks). I.e. all data is to be sent only by entity
    which creates data, and this entity is to send it to all peers on its own.
    <br/>&nbsp;
31. `--report-server URL`
    <br/>URL of reporting server to send crash/error logs on.
    <br/>**This option can be used more than once.**
    <br/>Example: `--report-server https://my.report.server.com:4000`
    <br/>&nbsp;
32. `--update-server URL`
    <br/>URL of the server to download updates from.
    <br/>**This option can be used more than once.**
    <br/>Example: `--update-server https://my.update.server.com:3000`
    <br/>&nbsp;
33. `--flat-distr (INT,INT)`
    <br/>Use flat stake distribution with given parameters. Flat distribution means that each node has the same amount of coins.
    <br/>Format: (nodes, coins), both numbers must be positive.
    <br/>This option is used in **development** mode only.
    <br/>Please make sure you don't use `--bitcoin-distr` option with this one.
    <br/>Default value: none.
    <br/>Example: `--flat-distr "(3, 100000)"`
    <br/>&nbsp;
34. `--bitcoin-distr (INT,INT)`
    <br/>Use bitcoin stake distribution with given parameters. Bitcoin distribution is a Bitcoin mining pool-style distribution.
    <br/>Format: (nodes, coins), both numbers must be positive.
    <br/>This option is used in **development** mode only.
    <br/>Please make sure you don't use `--flat-distr` option with this one.
    <br/>Default value: none.
    <br/>Example: `--bitcoin-distr "(3, 100000)"`
    <br/>&nbsp;
35. `--exp-distr`
    <br/>Enable exponential distribution. It means that the first three nodes get 0.875% of stake.
    <br/>This option is used in **development** mode only.
    <br/>&nbsp;
36. `--update-latest-path FILEPATH`
    <br/>Path to update the installer file, which should be downloaded by Update System.
    <br/>Default value: `update-installer.exe`.
    <br/>&nbsp;
37. `--update-with-package`
    <br/>Enable updating via installer.
    <br/>&nbsp;
38. `--monitor-port INT`
    <br/>Port we use to run web monitor on. Monitor mechanism is a part of [`time-warp-nt` package](https://cardano-docs.iohk.io/technical/protocols/time-warp-nt/).
    <br/>&nbsp;

Example of `cardano-node` command:

~~~
stack exec -- cardano-node \
    --listen 0.0.0.0:12100 \
    --report-server http://34.146.164.19:5555 \
    --wallet \
    --keyfile secret.kea\
    --logs-prefix "logs/abc" \
    --db-path db-abc \
    --peer 127.0.0.1:3000/S-GJ1HDZyHpIS_ZOFBlZsipkGNXy-tmCDtY_CvaiywE= \
    --kademlia-dump-path kademlia-abc.dump
~~~

## `cardano-web-docs`

An executable `cardano-web-docs` is used for building documentation of `cardano-node` web API (see `cardano-node` above).

`cardano-web-docs` has no options or parameters, it runs and produces a `web-api.md` file in the current directory.

## `cardano-launcher`

Please read [Cardano SL Launcher](/technical/launcher/) guide for info about `cardano-launcher` executable.

## `cardano-genupdate`

An executable `cardano-genupdate` is used for generation of update. There's no CLI-options — only 3 mandatory parameters:

~~~
cardano-genupdate [OLD_DIR] [NEW_DIR] [OUTPUT_TAR_FILE]
~~~

where:

1. `OLD_DIR` - the path to a directory with a program, old version. The path must exist.
2. `NEW_DIR` - the path to a directory with a program, new version. The path must exist.
3. `OUTPUT_TAR_FILE` - the path to output `.tar`-file with diff (based on a difference between old version and new one).

Both directories must have equal file structure (e.g. they must contain the same files in the same subdirectories correspondingly), otherwise `cardano-genupdate` will fail.

Example of `cardano-genupdate` command:

~~~
stack exec -- cardano-genupdate /tmp/v000 /tmp/v001 /tmp/update.tar
~~~

**Important**: `cardano-genupdate` uses [`bsdiff`](http://www.daemonology.net/bsdiff/) program, so command `bsdiff` must be available in the `PATH`.

## `cardano-wallet-hs2purs`

An executable `cardano-wallet-hs2purs` is used for generating PureScript types based on Haskell types. We use it to build Daedalus wallet.

`cardano-wallet-hs2purs` hasn't any options or parameters, it runs in Cardano SL root directory and produce `.purs` files in `daedalus/src/Generated` subdirectory.

## `cardano-analyzer`

An executable `cardano-analyzer` is an analyzer of JSON log files. It extracts TPS info and stores statistics in `.csv`-file.

Available options:

1.  `--version` and `--help`
    <br/>Show version and this help info.
    <br/>&nbsp;
2.  `--file FILEPATH`
    <br/>Path to JSON log to analyze.
    <br/>The specified path must exist.
    <br/>**Mandatory option**.
    <br/>**This option can be used more than once.**
    <br/>Default value: none.
    <br/>&nbsp;
3.  `--tx-file FILEPATH`
    <br/>Path to JSON file generated by `txSender` (`txSenderMap`).
    <br/>If this option is defined, `cardano-analyzer` shows a number of transactions which are sent and accepted.
    <br/>&nbsp;
4.  `-k, --confirmation ARG`
    <br/>The amount of blocks needed for confirmation.
    <br/>Default value: none.
    <br/>&nbsp;

An example of `cardano-analyzer` command:

~~~
stack exec -- cardano-analyzer --file node2.json
~~~

Name of the result file is formed from the value of `--file` option. Thus, in this example result will be written in `node2-tps.csv` file.

## `cardano-avvmmigrate`

An executable `cardano-avvmmigrate` is an AVVM converter. AVVM is a mechanism people buy ADA-certificates with. ADA-certificate is a special document with a seed for generation of key pair. We're storing public key only and bind money to it. So `cardano-avvmmigrate` takes JSON file with "address + money" pairs and generates special binary file with that info. Based on this binary file, the node knows genesis utxo.

Example of part of an input JSON file:

~~~ json
{
    "utxo": [{
        "coin": {
                "coinAmount": 413368,
                "coinColor": {
                        "getColor": 10
                }
        },
        "address": "0TXMbbVfRFCfkWCklo9Qc3V71HlsTAQNQXDPryOE5kk="
    }, {
        "coin": {
                "coinAmount": 421370,
                "coinColor": {
                        "getColor": 10
                }
        },
        "address": "47gm-3YJrxBW4tROcNu5Mi6mfc4Fe8RxDgQjGaFIgEA="
    ...
}
~~~

There's no options, just 3 mandatory parameters:

~~~
cardano-avvmmigrate PATH_TO_JSON BIN_OUTPUT_FILE CERT_INFO
~~~

where - random certificate will be generated.:

1. `PATH_TO_JSON` - path to JSON file with AVVM data. Path must exist.
2. `BIN_OUTPUT_FILE` - path to output binary file (recommend extension is `.bin`).
3. `CERT_INFO` - flag whether to generate random certificates. Possible values - `nocerts` and `randcerts`. If the value is `randcerts` - random certificate will be generated.

Example of `cardano-avvmmigrate` command:

~~~
stack exec -- cardano-avvmmigrate /tmp/utxo.json /tmp/avvm.bin nocerts
~~~

## `cardano-checks`

An executable `cardano-checks` is an extractor of special check-comments. We need it to review all checks and verifications we have, such as receiving block/tx/whatever.

These comments are based on `CHECK` word, for example in [`Pos.Txp.Toil.Utxo.Pure`](https://github.com/input-output-hk/cardano-sl/blob/master/src/Pos/Txp/Toil/Utxo/Pure.hs#L111) module:

~~~ haskell
-- CHECK: @TxUtxoPure
~~~

`cardano-checks` extracts all such comments from our modules and store them in result document.

Usage:

~~~
cardano-checks SOURCE_DIR OUTPUT_FILE
~~~

where:

1. `SOURCE_DIR` - path to a directory with Haskell source code.
2. `OUTPUT_FILE` - path to result document, in Markdown format.

Example of `cardano-checks` command:

~~~
stack exec -- cardano-checks /tmp/cardano-sl /tmp/checks.md
~~~

Example of result document:

~~~ markdown
## Module Pos.Crypto.SecretSharing
Verify an encrypted share using SecretSharingExtra.
_(line 182)_
Verify that Share has been decrypted correctly.
_(line 188)_
Verify that SecretProof corresponds to Secret.
_(line 194)_
## Module Pos.Crypto.Signing
Verify a signature.
~~~

## `cardano-keygen`

An executable `cardano-keygen` is a generator of keyfiles.

Available options:

1.  `-h` and `--help`
    <br/>Show this help info and exit.
    <br/>&nbsp;
2.  `-f, --file-pattern PATTERN`
    <br/>Filename pattern for generated keyfiles. Symbols `{}` is a placeholder for keyfile's number (not index). Pattern cannot be empty.
    <br/>**Mandatory option**.
    <br/>Default value: none.
    <br/>Example: `-f "key{}"`.
    <br/>For instance, if we generate two keyfiles, result will be `key1` and `key2`.
    <br/>&nbsp;
3.  `--genesis-file FILEPATH`
    <br/>Path to file to dump binary shared genesis data in.
    <br/>Default value: `genesis.bin`.
    <br/>&nbsp;
4.  `-n, --total-stakeholders INT`
    <br/>Total number of keyfiles to generate.
    <br/>**Mandatory option**.
    <br/>Default value: none.
    <br/>&nbsp;
5.  `-m, --richmen INT`
    <br/>Number of richmen among stakeholders.
    <br/>**Mandatory option**.
    <br/>Default value: none.
    <br/>&nbsp;
6.  `--total-stake INT`
    <br/>Total coins number in genesis.
    <br/>**Mandatory option**.
    <br/>Default value: none.
    <br/>&nbsp;

Example of `cardano-keygen` command:

~~~
stack exec -- cardano-keygen -f "key{}" -n 1 -m 1 --total-stake 1
~~~

## `cardano-dht-keygen`

An executable `cardano-dht-keygen` is a generator of random key for Kademlia DHT.

`cardano-dht-keygen` hasn't any options, only 1 mandatory parameter `NONCE`, 14-characters string.

Example of `cardano-dht-keygen` command:

~~~
cardano-dht-keygen 00000000000001
~~~

Example of result:

~~~
Y94xf23cG8as4ycA9R-cvo9zMDAwMDAwMDAwMDAwMDE=
~~~

Please make sure that nonce' lenght has exactly 14 characters.

## `cardano-wallet`

An executable `cardano-wallet` is a CLI-based wallet + node. You can think of `cardano-wallet` as a node wrapped by wallet's functionality (without Daedalus).

Usage:

~~~
cardano-wallet [OPTIONS] COMMAND
~~~

Available options:

1.  `-h` and `--help`
    <br/>Show this help info and exit.
    <br/>&nbsp;
2.  `--db-path FILEPATH`
    <br/>Path to the directory with wallet's database.
    <br/>Specified path must exist.
    <br/>Default value: none.
    <br/>&nbsp;
3.  `--rebuild-db`
    <br/>If the wallet's database already exists, discard its contents and create a new one from scratch.
    <br/>&nbsp;
4.  `--listen IP:PORT`
    <br>Specify IP-address and port node uses to listen requests.
    <br/>Default value: `0.0.0.0:24961`.
    <br/>**Please make sure these IP-address and port are accessible, otherwise work of the node isn't guaranteed**.
    <br/>&nbsp;
5.  `--peer HOST:PORT/HOST_ID`
    <br/>Peer to connect to for initial peer discovery.
    <br/>**This option can be used more than once.**
    <br/>Example: `--peer localhost:1234/dYGuDj0BrJxCsTC9ntJE7ePT7wUoVdQMH3sKLzQD8bo=`
    <br/>Default value: none.
    <br/>&nbsp;
6.  `--peers-file FILEPATH`
    <br/>Path to file with peers list (peers must be separated by newlines).
    <br/>Default value: none.
    <br/>&nbsp;
7.  `--log-config FILEPATH`
    <br/>Path to logger configuration file.
    <br/>Default value: [hardcoded default logger configuration](https://github.com/input-output-hk/cardano-sl/blob/eb74d35c50603b0ca8a967f6173b61affd1e2982/src/Pos/CLI.hs#L107).
    <br/>&nbsp;
8.  `--logs-prefix FILEPATH`
    <br/>Prefix to logger output path.
    <br/>Specified path must be valid.
    <br/>Default value: none.
    <br/>&nbsp;
9.  `--ssc-algo ALGO`
    <br>Shared Seed Calculation algorithm which nodes will use.
    <br>Possible values: `GodTossing` and `NistBeacon`.
    <br/>Default value: `GodTossing`.
    <br/>&nbsp;
10. `--report-server URL`
    <br/>URL of reporting server to send crash/error logs on.
    <br/>**This option can be used more than once.**
    <br/>Example: `--report-server https://my.report.server.com:4000`.
    <br/>&nbsp;
11. `--update-server URL`
    <br/>URL of the server to download updates from.
    <br/>**This option can be used more than once.**
    <br/>Example: `--update-server https://my.update.server.com:3000`.
    <br/>&nbsp;
12. `--flat-distr (INT,INT)`
    <br/>Use flat stake distribution with given parameters.
    <br/>Format: (nodes, coins), both numbers must be positive.
    <br/>This option is used in **development** mode only.
    <br/>Please make sure you don't use `--bitcoin-distr` option with this one.
    <br/>Default value: none.
    <br/>Example: `--flat-distr "(3, 100000)"`
    <br/>&nbsp;
13. `--bitcoin-distr (INT,INT)`
    <br/>Use bitcoin stake distribution with given parameters.
    <br/>Format: (nodes, coins), both numbers must be positive.
    <br/>This option is used in **development** mode only.
    <br/>Please make sure you don't use `--flat-distr` option with this one.
    <br/>Default value: none.
    <br/>Example: `--bitcoin-distr "(3, 100000)"`
    <br/>&nbsp;
14. `--json-log FILEPATH`
    <br/>Path to JSON log file.
    <br/>If specified path doesn't exist, file will be created.
    <br/>&nbsp;
15. `--explicit-initial`
    <br/>Explicitly connect to initial peers as to neighbors (even if they appeared offline once).
    <br/>&nbsp;
16. `--disable-propagation`
    <br/>Disable network propagation (transactions, SSC data, blocks). I.e. all data is to be sent only by entity
    who creates data and entity is yosend it to all peers on his own.
    <br/>&nbsp;
17. `--exp-distr`
    <br/>Enable exponential distribution.
    <br/>This option is used in **development** mode only.
    <br/>&nbsp;
18. `--keys-path FILEPATH`
    <br/>Path to the file with secret keys.
    <br/>&nbsp;
19. `--debug`
    <br/>Run in debug mode (with genesis keys included).
    <br/>&nbsp;

Avaliable commands:

1.  `repl`
    <br/>Run REPL mode in console to evaluate additional commands.
    <br/>&nbsp;
2.  `cmd`
    <br/>Execute a list of predefined additional commands (if more than one command, they must be comma-separated).
    <br/>Option `cmd` is used with an additional `--commands` option.
    <br/>Example: `cardano-wallet cmd --commands "propose-update 0 0.0.0 0 7 2000000 cardano-1"`.
    <br/>
    <br/>&nbsp;
3.  `serve`
    <br/>Serve Daedalus web API on a given port.
    <br/>&nbsp;

Avaliable additional commands with parameters:

1.  `balance ADDRESS`
    <br/>Check balance on a given `ADDRESS`.
    <br/>&nbsp;
2.  `send OWN_ADDRESS_INDEX [ADDRESS COINS]+`
    <br/>Create and send transaction with given outputs (formed from `ADDRESS` and `COINS` number) from own address `OWN_ADDRESS_INDEX`.
    <br/>We can send transactions to more than one address.
    <br/>&nbsp;
3.  `vote OWN_ADDRESS_INDEX DECISION UPDATE_PROPOSAL_ID`
    <br/>Send a vote with given hash of `UPDATE_PROPOSAL_ID` (in Base64 format) and `DECISION`, from own address `OWN_ADDRESS_INDEX`.
    <br/>Positive `DECISION` can be formed as `+`, `y` or `yes`.
    <br/>Negative `DECISION` can be formed as `-`, `n` or `no`.
    <br/>&nbsp;
4.  `propose-update OWN_ADDRESS_INDEX BLOCK_VERSION SCRIPT_VERSION SLOT_DURATION MAX_BLOCK_SIZE SOFTWARE_VERSION [PROPOSE_FILE]`
    <br/>Propose an update with given versions and other data with one positive vote for it, from own address `OWN_ADDRESS_INDEX`.
    <br/>Parameter `BLOCK_VERSION` must be formed as `INT.INT.INT`, for example `0.2.0`.
    <br/>Parameters `SCRIPT_VERSION`, `SLOT_DURATION` and `MAX_BLOCK_SIZE` are integers.
    <br/>Parameter `SOFTWARE_VERSION` must be formed as `APP_NAME-VERSION`, for example `cardano-2`.
    <br/>Parameter `PROPOSE_FILE` is an optional one.
    <br/>&nbsp;
5.  `listaddr`
    <br/>Show a list of own addresses.
    <br/>&nbsp;
6.  `delegate-light SECRET_KEY_INDEX PUBLIC_KEY_INDEX`
    <br/>Delegate issuer's secret key `SECRET_KEY_INDEX` (genesis) to delegate's `PUBLIC_KEY_INDEX` (genesis), light version.
    <br/>&nbsp;
7.  `delegate-heavy SECRET_KEY_INDEX PUBLIC_KEY_INDEX`
    <br/>Delegate issuer's secret key `SECRET_KEY_INDEX` (genesis) to delegate's `PUBLIC_KEY_INDEX` (genesis), heavyweight version.
    <br/>&nbsp;
8.  `help`
    <br/>Show this message and exit.
    <br/>&nbsp;
9.  `quit`
    <br/>Shutdown node wallet.
    <br/>&nbsp;

## `cardano-smart-generator`

An executable `cardano-smart-generator` is a generator for transaction. You can think of `cardano-smart-generator` as of "node in the real world", because we start a stress test for a node to see an actual number of generated transactions per seconds (TPS). Please read this [guide's part](/for-contributors/building-from-source/#cardano-smart-generator) for more info about `cardano-smart-generator`.

Usage:

~~~
cardano-smart-generator [OPTIONS]
~~~

Please be careful, some options are mandatory, see below. Most of the options are the same as for `cardano-node` executable.

Available options:

1.  `-h, --help`
    <br/>Print this help info and exit.
    <br/>&nbsp;
2.  `--listen IP:PORT`
    <br>Specify IP-address and port node uses to listen requests.
    <br/>Default value: `0.0.0.0:24962`.
    <br/>**Please make sure these IP-address and port are accessible, otherwise work of the node isn't guaranteed**.
    <br/>&nbsp;
3.  `--exp-distr`
    <br/>Enable exponential distribution.
    <br/>This option is used in **development** mode only.
    <br/>&nbsp;
4.  `--flat-distr (INT,INT)`
    <br/>Use flat stake distribution with given parameters.
    <br/>Format: (nodes, coins), both numbers must be positive.
    <br/>This option is used in **development** mode only.
    <br/>Please make sure you don't use `--bitcoin-distr` option with this one.
    <br/>Default value: none.
    <br/>Example: `--flat-distr "(3, 100000)"`
    <br/>&nbsp;
5.  `--bitcoin-distr (INT,INT)`
    <br/>Use bitcoin stake distribution with given parameters.
    <br/>Format: (nodes, coins), both numbers must be positive.
    <br/>This option is used in **development** mode only.
    <br/>Please make sure you don't use `--flat-distr` option with this one.
    <br/>Default value: none.
    <br/>Example: `--bitcoin-distr "(3, 100000)"`
    <br/>&nbsp;
6.  `--report-server URL`
    <br/>URL of reporting server to send crash/error logs on.
    <br/>**This option can be used more than once.**
    <br/>Example: `--report-server https://my.report.server.com:4000`
    <br/>&nbsp;
7.  `--update-server URL`
    <br/>URL of the server to download updates from.
    <br/>**This option can be used more than once.**
    <br/>Example: `--update-server https://my.update.server.com:3000`
    <br/>&nbsp;
8.  `--peer HOST:PORT/HOST_ID`
    <br/>Peer to connect to for initial peer discovery.
    <br/>**This option can be used more than once.**
    <br/>Example: `--peer localhost:1234/dYGuDj0BrJxCsTC9ntJE7ePT7wUoVdQMH3sKLzQD8bo=`
    <br/>Default value: none.
    <br/>&nbsp;
9.  `--peers-file FILEPATH`
    <br/>Path to file with peers list (peers must be separated by newlines).
    <br/>Default value: none.
    <br/>&nbsp;
10. `--log-config FILEPATH`
    <br/>Path to logger configuration file.
    <br/>Default value: [hardcoded default logger configuration](https://github.com/input-output-hk/cardano-sl/blob/eb74d35c50603b0ca8a967f6173b61affd1e2982/src/Pos/CLI.hs#L107).
    <br/>&nbsp;
11. `--logs-prefix FILEPATH`
    <br/>Prefix to logger output path.
    <br/>Specified path must be valid.
    <br/>Default value: none.
    <br/>&nbsp;
12. `--json-log FILEPATH`
    <br/>Path to JSON log file.
    <br/>If specified path doesn't exist, file will be created.
    <br/>&nbsp;
13. `--disable-propagation`
    <br/>Disable network propagation (transactions, SSC data, blocks). I.e. all data is to be sent only by entity
    who creates data and entity is yosend it to all peers on his own.
    <br/>&nbsp;
14. `--explicit-initial`
    <br/>Explicitly connect to initial peers as to neighbors (even if they appeared offline once).
    <br/>&nbsp;
15. `--ssc-algo ALGO`
    <br>Shared Seed Calculation algorithm which nodes will use.
    <br>Possible values: `GodTossing` and `NistBeacon`.
    <br/>Default value: `GodTossing`.
    <br/>&nbsp;
16. `-i, --index INT`
    <br/>Index in list of genesis key pairs.
    <br/>**This option can be used more than once.**
    <br/>Default value: none.
    <br/>&nbsp;
17. `-R, --round-period-rate ARG`
    <br/>R, where duration of one round is `((k + P) * (R + 1)) * slotDuration`. `k` is a security parameter from the protocol's paper.
    <br/>Default value: `2`.
    <br/>&nbsp;
18. `-N, --round-number ARG`
    <br/>Number of testing rounds.
    <br/>**Mandatory option**.
    <br/>&nbsp;
19. `-p, --round-pause ARG`
    <br/>Pause between rounds (in seconds).
    <br/>Default value: `0`.
    <br/>&nbsp;
20. `--init-money ARG`
    <br/>How many coins node has in the beginning.
    <br/>**Mandatory option**.
    <br/>&nbsp;
21. `-t, --tps DOUBLE`
    <br/>TPS value (transactions per second).
    <br/>**Mandatory option**.
    <br/>&nbsp;
22. `-S, --tps-step DOUBLE`
    <br/>TPS increase delta on stable system.
    <br/>Default value: `10`.
    <br/>&nbsp;
23. `-P, --propagate-threshold ARG`
    <br/>Approximate number of slots needed to propagate transactions across the network.
    <br/>Default value: `1`.
    <br/>&nbsp;
24. `--recipients-share ARG`
    <br/>Which portion of neighbours to send on each round.
    <br/>Default value: `1`.
    <br/>&nbsp;
25. `--m-of-n (M, N)`
    <br/>If enabled, send M-of-N transactions instead of regular ones.
    <br/>&nbsp;

Example `cardano-smart-generator` command:

~~~
stack exec -- cardano-smart-generator \
    -i 0 \
    --explicit-initial \
    --disable-propagation \
    --peer 35.157.97.210:3000/MHdrsP-oPf7UWl0007QuXnLK5RD= \
    -R 4 \
    -N 100 \
    -p 30 \
    --init-money 60000000 \
    -t 1 \
    -S 1 \
    -P 2 \
    --recipients-share 0.3 \
    --log-config static/txgen-logging.yaml \
    --json-log txgen.json \
    --mempool-validation \
    --ssc-algo NistBeacon \
    --flat-distr "(80,60000000)"
~~~

## `cardano-wallet-web-api-swagger`

We use program `cardano-wallet-web-api-swagger` to produce Wallet Web API docs using Swagger. This program runs during Cardano building on CI, via [this script](https://github.com/input-output-hk/cardano-sl/blob/89554f562340dc5f703ae906f6a1c78198f90115/update_wallet_web_api_docs.sh).

`cardano-wallet-web-api-swagger` hasn’t any options or parameters, it just produces `wallet-web-api-swagger.json` file in the current directory. This file contains Swagger-specification for API. After that we use [third-party tools](https://www.npmjs.com/package/bootprint-openapi) to convert this specification into a single HTML file. This file will be automatically published [online](https://cardano-docs.iohk.io/technical/wallet/api/).
