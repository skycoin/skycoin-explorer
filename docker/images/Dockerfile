# skycoin build
# reference https://github.com/skycoin/skycoin
FROM golang:1.10.2-stretch AS build
# dirs
RUN mkdir -p $GOPATH/src/github.com/skycoin/

# copy code to build
ADD . $GOPATH/src/github.com/skycoin/skycoin-explorer

# install skycoin-explorer
RUN cd $GOPATH/src/github.com/skycoin/skycoin-explorer && \
  CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/skycoin-explorer .

# change to bash to be able to use `source` command
RUN ln -sf /bin/bash /bin/sh

# install node, explorer dependencies build Angular's project
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash && \
	source /root/.profile && \
	nvm install 10.16 && \
	nvm use 10.16 && \
	cd $GOPATH/src/github.com/skycoin/skycoin-explorer && \
	npm install && \
	npm run build

# skycoin image
FROM busybox:latest

# copy all the binaries
COPY --from=build /go/bin/* /usr/bin/

# copy assets
COPY --from=build /go/src/github.com/skycoin/skycoin-explorer/dist ./dist

ENV EXPLORER_HOST="0.0.0.0:8001" \
    SKYCOIN_ADDRESS="http://127.0.0.1:6420"

EXPOSE 8001

ENTRYPOINT ["/usr/bin/skycoin-explorer"]
