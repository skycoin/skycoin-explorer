EXPLORER := explorer

.DEFAULT_GOAL := help

.PHONY: run build-go build-ng all setcap deploy help lint check install-linters format

run: ## Run explorer.go
	go run explorer.go

run-api: ## Run explorer.go -api-only
	go run explorer.go -api-only

build-go: ## Build explorer.go
	go build -o $(EXPLORER) explorer.go

build-ng: ## Build the angular frontend
	npm run build

all: build-go build-ng ## Build explorer.go and the angular frontend

setcap: ## Use setcap to allow the binary to bind to port 80
	sudo setcap 'cap_net_bind_service=+ep' $(EXPLORER)

lint: ## Run linters. Use make install-linters first.
	vendorcheck ./...
	gometalinter --disable-all -E goimports --tests --vendor ./...

check: lint ## Run tests and linters

install-linters: ## Install linters
	go get -u github.com/FiloSottile/vendorcheck
	go get -u github.com/alecthomas/gometalinter
	gometalinter --vendored-linters --install

format: ## Formats the code. Must have goimports installed (use make install-linters).
	goimports -w explorer.go

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
