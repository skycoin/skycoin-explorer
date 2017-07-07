EXPLORER := explorer

.DEFAULT_GOAL := help

.PHONY: run build-go build-ng all deploy help

run: ## run explorer.go
	go run explorer.go

build-go: ## build explorer.go
	go build -o $(EXPLORER) explorer.go

build-ng: ## build the angular frontend
	npm run build

all: build-go build-ng ## build explorer.go and the angular frontend

deploy: build-go ## build explorer.go and use setcap to allow the binary to bind to port 80, then restart the upstart service
	sudo setcap 'cap_net_bind_service=+ep' $(EXPLORER)
	sudo /etc/init.d/skycoin-explorer restart

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
