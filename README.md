# Skycoin Explorer

## Installation

As an Angular CLI projects,  Node 6.9.0 or higher, together with NPM 3 are required.

After cloning the project, you will need to run `npm install` to pull in all javascript dependencies. Next you can start the Skycoin explorer by running  `npm start`. This will serve the explorer, start a proxy for skycoin from https://127.0.0.1:6420.



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
