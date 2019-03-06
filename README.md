![skycoin explorer logo](https://user-images.githubusercontent.com/26845312/32426909-047fb2ae-c283-11e7-8031-6e88585a53c8.png)

# Skycoin Explorer

[![Build Status](https://travis-ci.org/skycoin/skycoin-explorer.svg?branch=develop)](https://travis-ci.org/skycoin/skycoin-explorer)

https://explorer.skycoin.net

Skycoin Explorer is a tool to interact with Skycoin ecosystem.

You can check blocks, transactions and their states.

[https://explorer.skycoin.net](https://explorer.skycoin.net)

# Table of Contents

<!-- MarkdownTOC levels="1,2,3,4,5" autolink="true" bracket="round" -->

- [Installation](#installation)
	- [Requirements](#requirements)
	- [Go](#go)
	- [Angular](#angular)
- [Docker images](#docker-images)
- [API documentation](#api-documentation)
- [Usage](#usage)
	- [Run a skycoin node](#run-a-skycoin-node)
	- [Build the explorer frontend](#build-the-explorer-frontend)
	- [Run the explorer](#run-the-explorer)
- [Development](#development)
	- [Compiling the angular frontend](#compiling-the-angular-frontend)
	- [Formatting](#formatting)
	- [Code Linting](#code-linting)
	- [e2e Tests](#e2e-tests)
	- [Customization](#customization)
- [Deployment](#deployment)

<!-- /MarkdownTOC -->


## Installation

### Requirements

```
go>=1.10
node>=v6.9.0
npm>=3.10.10
```

### Go

The server is written in golang.

The golang server returns the static content from `dist/` and proxies a subset of the skycoin node API.

### Angular

As an Angular CLI projects,  Node 6.9.0 or higher, together with NPM 3 are required.

After cloning the project, you will need to run `npm install` to pull in all javascript dependencies.

The angular code is compiled to the `dist/` folder.

## Docker images

If you want to run Explorer on Docker refer to [Docker instructions](docker/images/README.md)

## API documentation

HTML documentation:

http://explorer.skycoin.net/api.html

JSON formatted API docs:

http://explorer.skycoin.net/api/docs

## Usage

### Run a skycoin node

```sh
git clone github.com/skycoin/skycoin
cd skycoin
./run.sh
```

### Build the explorer frontend

```sh
make build-ng
```

Note: if you do not want to install NPM or build the frontend, you can use a docker image to run the explorer.

### Run the explorer

```sh
make run
```

This must be run from the same directory that contains `dist/`.

The explorer assumes that the skycoin node is running on `localhost:6420` by default.

To point it at a different address:

```sh
SKYCOIN_ADDR=http://127.0.0.1:3333 ./explorer
```

`explorer` can be run in api-only mode, which will expose the JSON API but not serve the static content from `dist/`:

```sh
make run-api
```

## Development

After changing the angular frontend, it should be compiled and committed to the repo.
This is to simplify deployment of the application, and allow users to run it themselves without
installing node and npm then running `npm install` and `npm run build`.

### Compiling the angular frontend

```sh
make build-ng
```

### Formatting

`explorer.go` should be formatted with `goimports`. You can do this with:

```sh
make format
```

You must have goimports installed (use `make install-linters`).

### Code Linting

Install prerequisites:

```sh
make install-linters
```

Run linters:

```sh
make lint
```

### e2e Tests

If you are running a Skycoin node normally, you can run the e2e tests with:

```sh
npm run e2e
```

If you are running a Skycoin node using the test database (`blockchain-180.db`), you can run the e2e tests with:

```sh
npm run e2e-blockchain-180
```

The second method is the one used in Travis.

### Customization

[CUSTOMIZATION.md](CUSTOMIZATION.md)

## Deployment

Compile `explorer.go` to a binary:

```sh
make build-go
```

Allow it to bind to port 80 using `setcap`:

```sh
sudo setcap 'cap_net_bind_service=+ep' ./explorer
```

Run it on port 80:

```sh
EXPLORER_HOST=:80 ./explorer
```
