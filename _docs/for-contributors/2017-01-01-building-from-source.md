---
layout: default
title: Building Cardano SL and Daedalus from Source
permalink: /for-contributors/building-from-source/
group: for-contributors
---

<!-- Reviewed at c507f6675c16810ba9ca72b71dac57288fd1735c -->

# Building Cardano SL and Daedalus from Source

This chapter describes how to build Cardano SL from the source code.

<!-- CARDANO_SL_README_BEGIN_4 -->
## Cardano SL and Daedalus Bridge

Cardano SL consists of a collection of binaries that constitute
the backend, a PureScript API for the Electron-based wallet, and the
Electron-based wallet called “Daedalus”.

The source code for both Cardano SL and Daedalus Bridge can be obtained
from the [official repository](https://github.com/input-output-hk/cardano-sl).

The [Haskell Tool Stack](https://haskellstack.org) is required to build Cardano SL. Furthermore, we strongly suggest using [Nix package manager](https://nixos.org/nix/download.html) to get the correct dependencies for building Cardano SL. It will fetch the correct `openssl` version, but won't override the system-installed version. The following commands assume that you already has `stack` and `nix-*` programs.

### Binaries

As a result of building Cardano SL, you will get a set of components (binary files). This set includes the main node for Cardano SL network and various helper tools. Please read [this page of the documentation](https://cardanodocs.com/technical/cli-options/) for technical details.
<!-- CARDANO_SL_README_END_4 -->

## Build Commands

Clone Cardano SL repository and go to the root directory:

    $ git clone git@github.com:input-output-hk/cardano-sl.git
    $ cd cardano-sl

Then enter `nix-shell`:

    $ nix-shell

And if it's the first project in Haskell on this machine, run `stack setup`:

    [nix-shell:~/cardano-sl]$ stack setup

After that, in order to build Cardano SL with wallet capabilities, run the following script:

    [nix-shell:~/cardano-sl]$ ./util-scripts/build.sh

It is suggested having at least 8GB of RAM and some swap space for the build process. As the project is fairly large and GHC parallelizes builds very effectively, memory and CPU consumption during the build process is high. Please make sure you have enough free disk space as well.

After the project is built - it can take quite a long time -  the built binaries can be launched using the `stack exec` command. Let's discuss important binaries briefly before proceeding to the next step.

## Daedalus Wallet

Let's proceed with building the wallet. First of all, let's build Daedalus Bridge.

### Building Daedalus Bridge

Currently Nix expressions don't install Node.js and NPM, so those have to be installed manually.
To do that, consult the repositories of the package manager of the according OS, or [download binaries](https://nodejs.org/en/download/). Please make sure you have Node.js version 6. You can use [nvm](https://github.com/creationix/nvm#installation)
to install proper version.

Now run the following script:

    [nix-shell:~/cardano-sl]$ ./util-scripts/build-daedalus-bridge.sh

After that `daedalus-client-api` will be registered in the local NPM package repository. This way, at any time, `daedalus-client-api` dependency can be satisfied in any project that depends on it by manually running following command:

    [nix-shell:~/cardano-sl]$ npm link daedalus-client-api

### Building Daedalus

Clone Daedalus repository and go to the root directory:

    [nix-shell:~/cardano-sl]$ cd
    [nix-shell:~/cardano-sl]$ git clone https://github.com/input-output-hk/daedalus.git
    [nix-shell:~/cardano-sl]$ cd daedalus

Then run the following script: 

    [nix-shell:~/cardano-sl]$ ./util-scripts/build-daedalus.sh
