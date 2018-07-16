![skycoin explorer logo](https://user-images.githubusercontent.com/26845312/32426909-047fb2ae-c283-11e7-8031-6e88585a53c8.png)

# Skycoin Explorer

[![Build Status](https://travis-ci.org/skycoin/skycoin-explorer.svg)](https://travis-ci.org/skycoin/skycoin-explorer)

## What is Skycoin Explorer?

Skycoin Explorer is a tool to interact with Skycoin ecosystem.

You can check blocks, transactions, buy our cryptocurrency , access our blog and meet the team.

[https://explorer.skycoin.net](https://explorer.skycoin.net)

### Quick reference

- **Where to file issues**:
    [https://github.com/skycoin/skycoin-explorer/issues](https://github.com/skycoin/skycoin-explorer/issues)

# Table of Contents

  - [Releases Notes](#releases-notes)
  - [Installation](#installation)
    - [Requirements](#requirements)
  - [Usage](#usage)
    - [Run a skycoin node](#run-a-skycoin-node)
    - [Run the explorer](#run-the-explorer)
    - [Docker images](#docker-images)
  - [API documentation](#api-documentation)
  - [Development](#development)
    - [Compiling the angular frontend](#compiling-the-angular-frontend)
    - [Formatting](#formatting)
    - [Code Linting](#code-linting)
  - [Deployment](#deployment)


#  Release Notes

## Jul 13, 2018

## New Features

## Updates

## Bug fixes


# Installation

## Requirements

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

## Usage

### Run a skycoin node

```sh
git clone github.com/skycoin/skycoin
cd skycoin
./run.sh
```

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

## Docker images

If you want to run Explorer on Docker refer to [Docker instructions](docker/images/)

## API documentation

HTML documentation:

http://explorer.skycoin.net/api.html

JSON formatted API docs:

http://explorer.skycoin.net/api/docs

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


