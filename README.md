# Skycoin Explorer

## Installation

As an Angular CLI projects,  Node 6.9.0 or higher, together with NPM 3 are required.

After cloning the project, you will need to run `npm install` to pull in all javascript dependencies. 

## Usage

### Dev against local Skycoin

If you are already running Skycoin, you can start the Skycoin explorer by running  `npm start`. This will serve the explorer, start a proxy for skycoin from http://127.0.0.1:8001.

### Dev against explorer.skycoin.net

If you for some reason cannot/do not want to run Skycoin, you can start the Skycoin explorer by running `npm start:against-prod`. This will server the explorer, and start a proxy for Skycoin from http://explorer.skycoin.net. (Does not work until this code has been actually deployed, due to differences in this API and the current API)

### Prod

To deploy Skycoin you would need to point the host at the dist folder (so it defaults to the index.html), and make sure that all the files within the dist directory are available on the root address.

Furthermore, you will need to create a proxy for the internal Skycoin server to the host, so API calls are proxied to there.

## Status

This project is a work-in-progress and not ready to be used as a replacement for the current Skycoin Explorer.

## Credits

This project is largely based on the Skycoin explorer within the skycoin/skycoin repository.

## Notes

We keep dist in source control to remove node/npm as a dependency within our server environment

## Running explorer.go server

```sh
go run explorer.go
```

## explorer.go API documentation

See [explorer.go](explorer.go)
