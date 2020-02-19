---
layout: default
title:  Running a Cardano node using Docker
permalink: /cardano-node/node-running-docker
group: cardano-node
language: en
---
Read if: You want to use Docker to run a Cardano node
Read first: [Running a Cardano node](../2020-01-04-cardano-node.md)
Read next: [Configuring a Cardano node using a config.yaml file](2020-01-04-node-troubleshooting.md)-->

You can use Docker to quickly set up and run a Cardano node. Multiple Docker images are available, each preconfigured to connect to a specific public Cardano network. There is also a base image available, which runs an unconfigured Cardano node that can be provided with a custom `config.yaml` file. All of the preconfigured Docker images contain this base image with an additional configuration layer.

For a full list of the available Docker images, see the official [Cardano node Docker Hub](link to Cardano node docker Hub) page. <!-- Do we need to define the PIN format here too?-->

## Prerequisites
You need to have Docker installed and configured on your machine. See the [Docker documentation](https://docs.docker.com/install/) for more information.

## Steps
1. Open Docker and use `docker pull` to pull a Cardano node Docker image from [Docker Hub](link to Cardano node Docker Hub). The exact command varies depending on which image you want to pull.

   If you want to pull the unconfigured base image, for example, you can use `docker pull cardano-node`. If you want to pull an image configured to connect to the Cardano mainnet, you can use `docker pull cardano-node:mainnet`.
2. Run the Cardano node image using `docker run`, followed by whichever image you just pulled. For example, `docker run cardano-node:mainnet`.

## Result
You now have a running Cardano node. If you used a preconfigured Docker image, then the node will be ready to connect to whichever network it is configured for. If you used the unconfigured base image, you will need to [configure your Cardano node](link to configuring your node page).
