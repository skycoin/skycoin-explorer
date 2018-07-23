## `skycoin/skycoin-explorer:latest

```console
$ docker pull skycoin/skycoin-explorer@sha256:26b408ba08b59aebde1e7ad800e080b2b3c825b75cf8cb316c283665125f7678
```

- Manifest MIME: `application/vnd.docker.distribution.manifest.list.v2+json`
- Platforms:
 - linux; amd64

- Layers:
 - sha256:911c6d0c7995e5d9763c1864d54fb6deccda04a55d7955123a8e22dd9d44c497
 - sha256:afc940a9572c3d038562e851cd3d08efcef14d63b1ca571aebb551150e977aa1
 - sha256:6553bb7cf96a1541b32ed1a4eda598abf2ee65af456d32e7783ea19aae82e1a0

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