## `skycoin/skycoin-explorer:develop`

```console
$ docker pull skycoin/skycoin-explorer@sha256:9963e298b0e727fcfb290aaa62ac17abbfe227cd2376cf0ae010b30ffda6858c
```

- Manifest MIME: `application/vnd.docker.distribution.manifest.list.v2+json`
- Platforms:
	- linux; amd64

- Layers:
	- sha256:75a0e65efd518b9bcac8a8287e5c7032bc81f8cbfbe03271fd049b81ab26119b
	- sha256:048e12ac04e24b37da50872b187c7d8c827fca25a84fa6f9cdfec2d8df8827d1
	- sha256:51c49aafd5a6f4bdf61a5a087ccb5e9cf616796d70dcc8ca62b7bf257473582e

- Expose Ports:
	- 8001

```dockerfile
# 2018-07-20T01:31:36.950305237Z
EXPOSE 8001
# 2018-07-20T01:31:36.812041842Z
ENV EXPLORER_HOST=0.0.0.0:8001 SKYCOIN_ADDRESS=http://127.0.0.1:6420
# 2018-07-20T01:31:36.608478714Z
COPY dir:e8d6e00eed53fa936a6bc0c7f69cb86649b6f0eeddb3c1638527b7c69efa3fd3 in ./dist
# 2018-07-20T01:31:35.779110731Z
COPY file:a575261a3dfd5be103d827977323e2073c6b042d8bb3832fb3b6a1b1514d860b in /usr/bin/
# 2018-07-16T22:19:41.841251284Z
ADD file:2a4c44bdcb743a52ffa1c4b07ce471d8735a5d59cb45da2e6bfe0c2b5311ca90 in /
```