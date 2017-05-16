
---
layout: default
title: Cardano SL Wallet Frontend
permalink: /technical/wallet-frontend/
group: technical
---
[//]: # (Reviewed at ac0126b2753f1f5ca6fbfb555783fbeb1aa141bd)

# Cardano SL Wallet Frontend

In developing Cardano SL, the need arose for a UI from which users could access
their funds, send and receive transactions, and perform other tasks related to
managing a personal cryptocurrency wallet. The Daedalus wallet is the Cardano's
solution to these necessities.

Currently, it allows a user to use their ADA in the aforementioned actions, and
support for other currencies is planned for the near future, as is the exchange
between different currencies, both digital and not.

## Building `daedalus-client-api`

To run `daedalus-client-api` locally you have to start the `wallet-api` of [`cardano-sl`](https://github.com/input-output-hk/cardano-sl/) as follows. Make sure that you are in the root folder of `cardano-sl`.

~~~bash
# build app
stack build
# remove old PureScript types if they exist
rm -rf daedalus/src/Generated
# generate PureScript types
stack exec -- cardano-wallet-hs2purs
~~~

This should create PureScript modules with datatypes bridged from Haskell. You should have similar structure like:

~~~bash
$ tree daedalus/src/Generated/
daedalus/src/Generated/
└── Pos
	├── Types
	│   └── Core.purs
	├── Util
	│   └── BackupPhrase.purs
	└── Wallet
		└── Web
			├── ClientTypes.purs
			└── Error.purs
~~~

## Running and testing `daedalus-client-api`

In order to see `daedalus-client-api` in action, first run a local Cardano network:

~~~bash
# run tmux in another window
tmux
# launch nodes
export WALLET_TEST=1; ./scripts/launch.sh
~~~

By default, this should launch Cardano network consisting of 3 nodes talking to each other. `WALLET_TEST=1` tells the launcher script to run `wallet-api` with one node. This one node running `wallet-api` will behave the same as Daedalus wallet that is run in production. If you experience any issues, remove the following content first and build `wallet-api` again as described above.

~~~
rm -rf ./run/*
rm -rf wallet-db
rm node-*.*.key
~~~

With a running `wallet-api` you can run `daedalus-client-api` locally as follows.
Please note that [npm](https://www.npmjs.com/) is required to build `daedalus-client-api`.

~~~bash
cd daedalus
rm -rf .psci_modules/ .pulp-cache/ node_modules/ bower_components/ output/
npm install
npm run build:prod
~~~

Now we can try using the client API with [nodejs](https://nodejs.org/):

~~~bash
$ node
> var api = require('../output/Daedalus.ClientApi')
undefined
> api
{ applyUpdate: [Function],
  blockchainSlotDuration: [Function],
  deleteWallet: [Function],
  generateMnemonic: [Function: generateMnemonic],
  getHistory: [Function],
  getProfile: [Function],
  getWallet: [Function],
  getWallets: [Function],
  importKey: [Function],
  isValidAddress: [Function],
  isValidMnemonic: [Function],
  newWallet: [Function],
  nextUpdate: [Function],
  notify: [Function],
  redeemADA: [Function],
  restoreWallet: [Function],
  restoreWalletIgnoreChecksum: [Function],
  searchHistory: [Function],
  send: [Function],
  sendExtended: [Function],
  syncProgress: [Function],
  systemVersion: [Function],
  testReset: [Function],
  updateProfile: [Function],
  updateTransaction: [Function],
  updateWallet: [Function] }
~~~

This will load and show all functions that can be run from from this library to interact with the wallet. For example, to fetch all available wallets we can do:

~~~bash
> api.getWallets().then(console.log).catch(console.log)
Promise { <pending> }
> [ { cwMeta:
	 { cwType: 'CWTPersonal',
	   cwName: 'Personal Wallet',
	   cwCurrency: 'ADA' },
	cwAmount: { getCoin: 33333 },
	cwAddress: '1gLFDJAKutVJCYioMANx4gthHru5K12Tk9YpEmXKQfggKZu' } ]
~~~

Note: `daedalus-client-api` is not optimized/compressed. This is will be a job for Daedalus.

## Wallet Frontend API usage scenario

This is an example session that shows how the user/client can work with the Daedalus-bridge library.
First we need to run node and load the api as already described.

~~~bash
var api = require('../output/Daedalus.ClientApi')
~~~

### Clear all data (DEVELOPMENT)

~~~bash
> api.testReset().then(console.log).catch(console.log)
Promise { <pending> }
> {}
~~~

### Get all wallet sets

~~~bash
> api.getWalletSets().then(console.log).catch(console.log)
Promise { <pending> }
> []
~~~

### New wallet set

~~~bash
> api.newWalletSet('test', 'transfer uniform grunt excess six veteran vintage warm confirm vote nephew allow', 'pass').then(console.log).catch(console.log)
Promise { <pending> }
> { cwsWalletsNumber: 0,
  cwsWSetMeta: { cwsName: 'test' },
  cwsPassphraseLU: 1494583348.3572557,
  cwsHasPassphrase: true,
  cwsAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW' }
~~~

### Get (existing) wallet set

~~~bash
> api.getWalletSet('1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW').then(console.log).catch(console.log)
Promise { <pending> }
> { cwsWalletsNumber: 0,
  cwsWSetMeta: { cwsName: 'test' },
  cwsPassphraseLU: 1494583348.3572557,
  cwsHasPassphrase: true,
  cwsAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW' }
~~~

### Get all wallet sets

~~~bash
> api.getWalletSets().then(console.log).catch(console.log)
Promise { <pending> }
> [ { cwsWalletsNumber: 0,
    cwsWSetMeta: { cwsName: 'test' },
    cwsPassphraseLU: 1494583348.3572557,
    cwsHasPassphrase: true,
    cwsAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW' } ]
~~~

### Change passphrase

~~~bash
> api.changeWalletSetPass('1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW', 'pass', 'pass2').then(console.log).catch(console.log)
Promise { <pending> }
> {}

> api.changeWalletSetPass('1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW', 'pass', 'pass2').then(console.log).catch(console.log)
Promise { <pending> }
> Error: ServerError: Pos.Wallet.Web.Error.Internal "Invalid old passphrase given"
    at Object.exports.error (/home/ksaric/projects/haskell/cardano-sl/daedalus/output/Control.Monad.Eff.Exception/foreign.js:8:10)
    at mkServerError (/home/ksaric/projects/haskell/cardano-sl/daedalus/output/Daedalus.BackendApi/index.js:94:44)
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Data.Either/index.js:256:33
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Data.Either/index.js:230:24
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Daedalus.BackendApi/index.js:102:127
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Daedalus.BackendApi/index.js:128:207
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Control.Monad.Aff/foreign.js:182:21
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Control.Monad.Aff/foreign.js:147:5
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Control.Monad.Aff/foreign.js:176:17
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Control.Monad.Aff/foreign.js:182:25

> api.changeWalletSetPass('1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW', 'pass2', 'pass').then(console.log).catch(console.log)
Promise { <pending> }
> {}
~~~

### Change wallet set name

~~~bash
> api.renameWalletSet('1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW', 'testing').then(console.log).catch(console.log)
Promise { <pending> }
> { cwsWalletsNumber: 0,
  cwsWSetMeta: { cwsName: 'testing' },
  cwsPassphraseLU: 1494586629.887586,
  cwsHasPassphrase: true,
  cwsAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW' }

> api.renameWalletSet('1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW', 'test').then(console.log).catch(console.log)
Promise { <pending> }
> { cwsWalletsNumber: 0,
  cwsWSetMeta: { cwsName: 'test' },
  cwsPassphraseLU: 1494586629.887586,
  cwsHasPassphrase: true,
  cwsAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW' }
~~~

### Restore wallet set

~~~bash
> api.restoreWalletSet('test', 'transfer uniform grunt excess six veteran vintage warm confirm vote nephew allow', 'pass').then(console.log).catch(console.log)
Promise { <pending> }
> { cwsWalletsNumber: 0,
  cwsWSetMeta: { cwsName: 'test' },
  cwsPassphraseLU: 1494846878.0783634,
  cwsHasPassphrase: true,
  cwsAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW' }
~~~

### Import wallet set

~~~bash
> api.importWalletSet('/home/ksaric/projects/haskell/cardano-sl/keys/1.key.hd', '').then(console.log).catch(console.log)
Promise { <pending> }
> { cwsWalletsNumber: 0,
  cwsWSetMeta: { cwsName: 'Genesis wallet set' },
  cwsPassphraseLU: 1494847007.8911605,
  cwsHasPassphrase: false,
  cwsAddress: '1gCC3J43QAZo3fZiUTuyfYyT8sydFJHdhPnFFmckXL7mV3f' }
~~~

### Get wallets

~~~bash
> api.getWallets().then(console.log).catch(console.log)
Promise { <pending> }
> [ { cwMeta:
     { cwUnit: 0,
       cwType: 'CWTPersonal',
       cwName: 'drugs',
       cwCurrency: 'ADA',
       cwAssurance: 'CWANormal' },
    cwAddress:
     { cwaWSAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW',
       cwaIndex: 2087263806 },
    cwAccounts: [ [Object] ] } ]
~~~

### Get wallet

~~~bash
> api.getWallet({"cwaWSAddress": "1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW","cwaIndex": 1759060325}).then(console.log).catch(console.log)
Promise { <pending> }
> { cwMeta:
   { cwUnit: 0,
     cwType: 'CWTPersonal',
     cwName: 'drugs',
     cwCurrency: 'ADA',
     cwAssurance: 'CWANormal' },
  cwAddress:
   { cwaWSAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW',
     cwaIndex: 1759060325 },
  cwAccounts:
   [ { caAmount: [Object],
       caAddress: '19LniCeNbAxec4FkyxPHCHDzUSnnf4ZymZChq2s9JmYjyr9senVjp4PnbNJ5DPXB8WrWhHCV6Dv2Qv9jdUR5bfNfhdt2vs' } ] }
~~~

### Create a new wallet

~~~bash
> api.newWallet('1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW', 'CWTPersonal', 'ADA', 'drugs', 'pass').then(console.log).catch(console.log)
Promise { <pending> }
> { cwMeta:
   { cwUnit: 0,
     cwType: 'CWTPersonal',
     cwName: 'drugs',
     cwCurrency: 'ADA',
     cwAssurance: 'CWANormal' },
  cwAddress:
   { cwaWSAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW',
     cwaIndex: 293230236 },
  cwAccounts:
   [ { caAmount: [Object],
       caAddress: '19J7gniLEvSDAsHmjTeRUb5wAp8ssFLhUdchabk8FjVBqgDET6LdNa8ZbeZo6tsht4o52hwQ259CLSSoc3iXyEWsZXaEG1' } ] }
~~~

### Delete a wallet

~~~bash
> api.deleteWallet({"cwaWSAddress": "1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW","cwaIndex": 293230236}).then(console.log).catch(console.log)
Promise { <pending> }
> {}
~~~

### Update a wallet

~~~bash
> api.updateWallet({"cwaWSAddress": "1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW","cwaIndex": 1759060325},'CWTPersonal','ADA','Initial wallet','CWANormal',0).then(console.log).catch(console.log)
Promise { <pending> }
> { cwMeta:
   { cwUnit: 0,
     cwType: 'CWTPersonal',
     cwName: 'Initial wallet',
     cwCurrency: 'ADA',
     cwAssurance: 'CWANormal' },
  cwAddress:
   { cwaWSAddress: '1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW',
     cwaIndex: 1759060325 },
  cwAccounts:
   [ { caAmount: [Object],
       caAddress: '19LniCeNbAxec4FkyxPHCHDzUSnnf4ZymZChq2s9JmYjyr9senVjp4PnbNJ5DPXB8WrWhHCV6Dv2Qv9jdUR5bfNfhdt2vs' } ] }
~~~

### Create a new account

~~~bash
> api.newAccount({"cwaWSAddress": "1fjgSiJKbzJGMsHouX9HDtKai9cmvPzoTfrmYGiFjHpeDhW","cwaIndex": 1759060325}, 'pass').then(console.log).catch(console.log)
Promise { <pending> }
> Error: Expected an object
    at Object.exports.error (/home/ksaric/projects/haskell/cardano-sl/daedalus/output/Control.Monad.Eff.Exception/foreign.js:8:10)
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Daedalus.ClientApi/index.js:191:118
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Data.Either/index.js:227:24
    at /home/ksaric/projects/haskell/cardano-sl/daedalus/output/Daedalus.ClientApi/index.js:192:91
    at Object.newAccount (/home/ksaric/projects/haskell/cardano-sl/daedalus/output/Data.Function.Eff/foreign.js:9:17)
    at repl:1:5
    at ContextifyScript.Script.runInThisContext (vm.js:23:33)
    at REPLServer.defaultEval (repl.js:336:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
~~~

Accound should be renamed into address. Please see an issue [CSM-249](see https://issues.serokell.io/issue/CSM-249) for details.

### Wallet events

Aside from these HTTP endpoints there is one unidirectional websocket channel
opened from server to client. This channel serves as notification system so
that Daedalus UI can be informed about events. Currently supported events are:

* `LocalDifficultyChanged` - local blockchain height
* `NetworkDifficultyChanged` - global blockchain height
* `UpdateAvailable` - new system update available
* `ConnectedPeersChanged` - number of peers connected to the node changed
* `ConnectionOpened` - websocket connection opened
* `ConnectionClosed` - websocket connection closed

As this channel is unidirectional, any message sent to the channel from the
client will be ignored.
