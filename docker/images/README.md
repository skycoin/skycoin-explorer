# Supported tags and respective `Dockerfile` links

-	[`latest` (*master/docker/images/Dockerfile*)](https://github.com/skycoin/skycoin-explorer/blob/master/docker/images/Dockerfile)
-	[`develop` (*develop/docker/images/Dockerfile*)](https://github.com/skycoin/skycoin-explorer/blob/develop/docker/images/Dockerfile)

# Quick reference

-	**Where to file issues**:
	[https://github.com/skycoin/skycoin-explorer/issues](https://github.com/skycoin/skycoin-explorer/issues)
-	**Maintained by**:
	[The Skycoin community](https://github.com/skycoin/skycoin-explorer)
-	**Image updates**:
	[official-images PRs with label `library/alpine`](https://github.com/docker-library/official-images/pulls?q=label%3Alibrary%2Falpine
	[official-images repo's `library/alpine` file](https://github.com/docker-library/official-images/blob/master/library/alpine) ([history](https://github.com/docker-library/official-images/commits/master/library/alpine))

# What is Skycoin explorer ?
[Skycoin explorer](https://explorer.skycoin.com) is a tool to interact with Skycoin's ecosystem.

You can check blocks, transactions and their states.

# How to use this image to run a skycoin-explorer node

It is posible to build an image from the github repository or just pull the official one from Docker Hub

In order to build it from sources, execute the following commands

```sh
$ git clone https://github.com/skycoin/skycoin-explorer ${GOPATH}/src/github.com/skycoin/skycoin-explorer
$ cd ${GOPATH}/src/github.com/skycoin/skycoin-explorer
$ docker build -t skycoin/skycoin-explorer:[tag] -f docker/images/Dockerfile .
```

Or use the official image

```sh
$ docker pull skycoin/skycoin-explorer:[tag]
```

Now launch the container

```sh
$ docker run -d --name explorer-node -p 8001:8001 skycoin/skycoin-explorer:[tag]
```

Stopping the container

```sh
$ docker stop explorer-node
```

The `SKYCOIN_ADDR` and the `EXPLORER_HOST` environment variables can be passed in
to the running container to modify the default behavior, the first one sets the IP of the skycoin node and the second one sets the IP of the interface where the node is listening

```sh
$ docker run -d --name explorer-node -p 8001:8001 -e SKYCOIN_ADDR="http://192.168.1.1:6420" skycoin/skycoin-explorer:[tag]
```

To access the explorer visit [http://localhost:8001](http://localhost:8001)
