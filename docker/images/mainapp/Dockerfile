# Skycoin-explorer build
FROM golang:1.10.1-stretch AS build

FROM node:8-apline

COPY --from=build /go/bin/* /usr/bin
