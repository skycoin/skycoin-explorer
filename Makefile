EXPLORER := explorer

.PHONY: run build-go build-ng all deploy

run:
	go run explorer.go

build-go:
	go build -o $(EXPLORER) explorer.go

build-ng:
	npm run build

all: build-go build-ng

deploy: build-go
	sudo setcap 'cap_net_bind_service=+ep' $(EXPLORER)
	sudo /etc/init.d/skycoin-explorer restart
