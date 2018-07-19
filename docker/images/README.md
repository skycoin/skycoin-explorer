# Supported tags and respective `Dockerfile` links

-	[`latest` (*master/Dockerfile*)](https://github.com/skycoin/skycoin-explorer/blob/master/docker/images/Dockerfile)
-	[`develop` (*develop/Dockerfile*)](https://github.com/skycoin/skycoin-explorer/blob/develop/docker/images/Dockerfile)

# Quick reference

-	**Where to file issues**:
	[https://github.com/skycoin/skycoin-explorer/issues](https://github.com/skycoin/skycoin-explorer/issues)

<!--
-	**Maintained by**:
	[Glider Labs](https://github.com/gliderlabs/docker-alpine) (an Alpine community contributor)

-	**Supported architectures**: ([more info](https://github.com/docker-library/official-images#architectures-other-than-amd64))
	[`amd64`](https://hub.docker.com/r/amd64/alpine/), [`arm32v6`](https://hub.docker.com/r/arm32v6/alpine/), [`arm64v8`](https://hub.docker.com/r/arm64v8/alpine/), [`i386`](https://hub.docker.com/r/i386/alpine/), [`ppc64le`](https://hub.docker.com/r/ppc64le/alpine/), [`s390x`](https://hub.docker.com/r/s390x/alpine/)

-	**Published image artifact details**:
	[repo-info repo's `repos/alpine/` directory](https://github.com/docker-library/repo-info/blob/master/repos/alpine) ([history](https://github.com/docker-library/repo-info/commits/master/repos/alpine))
	(image metadata, transfer size, etc)

-	**Image updates**:
	[official-images PRs with label `library/alpine`](https://github.com/docker-library/official-images/pulls?q=label%3Alibrary%2Falpine
	[official-images repo's `library/alpine` file](https://github.com/docker-library/official-images/blob/master/library/alpine) ([history](https://github.com/docker-library/official-images/commits/master/library/alpine))
-->

# What is Skycoin explorer ?
[Skycoin explorer](https://explorer.skycoin.net) is a tool to interact with Skycoin's ecosystem.

You can check blocks, transactions and their states.

# How to use this image to run a skycoin-explorer node

It is posible to build an image from the github repository or just pull the official one from Docker Hub

For build from sources, execute the following commands

```sh
$ git clone https://github.com/simelo/skycoin-explorer ${HOME}/workdir/skycoin-explorer
$ cd ${HOME}/workdir/skycoin-explorer
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

The `SKYCOIN_ADDR` and the `EXPLORER_HOST` environment variables can be passed
to the running container to modify the default behavior, the first one sets the IP of the skycoin node and the second one sets the IP of the interface  where the node is listening

```sh
$ docker run -d --name explorer-node -p 8001:8001 -e SKYCOIN_ADDR="http://192.168.1.1:6420" skycoin/skycoin-explorer:[tag]
```

To access the explorer visit [http://localhost:8001](http://localhost:8001)

# Testing the image

This image has built-in tests (Protractor), this ones will be executed on an instance of it in Docker Cloud. The containers that will run for the test are defined in docker-compose.test.yml, this file will be executed every time a pull request or a commit is made

# Hooks

The image has two hooks, one that is executed at the moment the image is built and adds to its name the ARM version and the other that is executed when the push is made to Docker Hub and changes the standard name by the modified in the build phase.
