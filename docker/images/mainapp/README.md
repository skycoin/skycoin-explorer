# Supported tags and respective `Dockerfile` links

-	[`3.6` (*versions/library-3.6/x86_64/Dockerfile*)](https://github.com/gliderlabs/docker-alpine/blob/2127169e2d9dcbb7ae8c7eca599affd2d61b49a7/versions/library-3.6/x86_64/Dockerfile)

# Quick reference

-	**Where to get help**:  
	[the Docker Community Forums](https://forums.docker.com/), [the Docker Community Slack](https://blog.docker.com/2016/11/introducing-docker-community-directory-docker-community-slack/), or [Stack Overflow](https://stackoverflow.com/search?tab=newest&q=docker)

-	**Where to file issues**:  
	[https://github.com/gliderlabs/docker-alpine/issues](https://github.com/gliderlabs/docker-alpine/issues)

-	**Maintained by**:  
	[Glider Labs](https://github.com/gliderlabs/docker-alpine) (an Alpine community contributor)

-	**Supported architectures**: ([more info](https://github.com/docker-library/official-images#architectures-other-than-amd64))  
	[`amd64`](https://hub.docker.com/r/amd64/alpine/), [`arm32v6`](https://hub.docker.com/r/arm32v6/alpine/), [`arm64v8`](https://hub.docker.com/r/arm64v8/alpine/), [`i386`](https://hub.docker.com/r/i386/alpine/), [`ppc64le`](https://hub.docker.com/r/ppc64le/alpine/), [`s390x`](https://hub.docker.com/r/s390x/alpine/)

-	**Published image artifact details**:  
	[repo-info repo's `repos/alpine/` directory](https://github.com/docker-library/repo-info/blob/master/repos/alpine) ([history](https://github.com/docker-library/repo-info/commits/master/repos/alpine))  
	(image metadata, transfer size, etc)

-	**Image updates**:  
	[official-images PRs with label `library/alpine`](https://github.com/docker-library/official-images/pulls?q=label%3Alibrary%2Falpine)  
	[official-images repo's `library/alpine` file](https://github.com/docker-library/official-images/blob/master/library/alpine) ([history](https://github.com/docker-library/official-images/commits/master/library/alpine))

# What is Skycoin explorer ?
[Skycoin explorer](https://alpinelinux.org/) is a tool to interact with Skycoin ecosystem.

You can check blocks, transactions, buy our cryptocurrency , access our blog and meet the team.

![logo](https://raw.githubusercontent.com/docker-library/docs/781049d54b1bd9b26d7e8ad384a92f7e0dcb0894/alpine/logo.png)

# How to use this image to run an skycoin-explorer node

```sh
$ git clone https://github.com/simelo/skycoin-explorer ${HOME}/workdir/skycoin-explorer
$ cd ${HOME}/workdir/skycoin-explorer
$ docker build -t skycoin/skycoint-explorer -f docker/images/mainapp/Dockerfile .
$ docker run --rm -p 8001:8001 skycoin/skycoin-explorer
```

Access the explorer: [http://localhost:8001](http://localhost:8001).

The `SKYCOIN_ADDRESS` and the `EXPLORER_HOST` environment variables can be passed
to the running container to modify the default behavior.

```sh
$ docker run --rm -p 8001:8001 -e SKYCOIN_ADDRESS="http://192.168.1.1:6420" skycoin/skycoin-explorer
```

### How to use this image for development

```sh
$ mkdir -p ${HOME}/src/skycoin-explorer
$ docker build -t skycoin/skycoint-explorer:develop -f Dockerfile-dev
$ docker run --rm -v ${HOME}/src/skycoin-explorer:/usr/local/src/skycoin-explorer -p 8001:8001 skycoin/skycoin-explorer:develop
```

