/*

Explorer backend service

Serves precompiled angular website from the ./dist folder.

This must be run from the same folder as ./dist, unless run in -api-only mode.

Environment options:
* EXPLORER_HOST - The addr:port to bind the explorer to. Do not include a scheme. Defaults to 127.0.0.1:8001
* SKYCOIN_ADDR - The skycoin node's address. You must include a scheme. Defaults to http://127.0.0.1:6420

CLI Options:
* -api-only - Don't serve static content from ./dist, only proxy the skycoin node


HTTP API:

* /api/block
    - proxy: /block
    - args: hash

* /api/blocks
    - proxy: /blocks
    - args: start, end

* /api/coinSupply
    - proxy: /explorer/getEffectiveOutputs

* /api/blockchain/metadata
    - proxy: /blockchain/metadata

* /api/address
    - proxy: /explorer/address
    - args: address

* /api/currentBalance
    - proxy: /outputs
    - args: addrs

* /api/uxout
    - proxy: /uxout
    - args: uxid

* /api/transaction
    - proxy: /transaction
    - args: txid

*/

package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
)

const (
	defaultExplorerHost = "127.0.0.1:8001"
	defaultSkycoinAddr  = "http://127.0.0.1:6420"
)

var (
	explorerHost = ""     // override with envvar EXPLORER_HOST.  Must not have scheme
	skycoinAddr  *url.URL // override with envvar SKYCOIN_ADDR.  Must have scheme, e.g. http://
	apiOnly      bool     // set to true with -api-only cli flag
)

func init() {
	explorerHost = os.Getenv("EXPLORER_HOST")
	if explorerHost == "" {
		explorerHost = defaultExplorerHost
	}

	skycoinAddrString := os.Getenv("SKYCOIN_ADDR")
	if skycoinAddrString == "" {
		skycoinAddrString = defaultSkycoinAddr
	}

	origURL, err := url.Parse(skycoinAddrString)
	if err != nil {
		log.Println("SKYCOIN_ADDR must have a scheme, e.g. http://")
		log.Fatalln("Invalid SKYCOIN_ADDR", skycoinAddrString, err)
	}

	if origURL.Scheme == "" {
		log.Fatalln("SKYCOIN_ADDR must have a scheme, e.g. http://")
	}

	skycoinAddr = &url.URL{
		Scheme: origURL.Scheme,
		Host:   origURL.Host,
	}

	flag.BoolVar(&apiOnly, "api-only", false, "Only run the API, don't serve static content")
	flag.Parse()

	if apiOnly {
		log.Println("Running in api-only mode")
	}
}

func buildSkycoinURL(path string, query url.Values) string {
	rawQuery := ""
	if query != nil {
		rawQuery = query.Encode()
	}

	u := &url.URL{
		Scheme:   skycoinAddr.Scheme,
		Host:     skycoinAddr.Host,
		Path:     path,
		RawQuery: rawQuery,
	}

	return u.String()
}

type SkycoinProxyEndpoint struct {
	ExplorerPath string
	SkycoinPath  string
	QueryArgs    []string
}

func (s SkycoinProxyEndpoint) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var query url.Values
	if s.QueryArgs != nil {
		query = url.Values{}
		for _, s := range s.QueryArgs {
			query.Add(s, r.URL.Query().Get(s))
		}
	}

	skycoinURL := buildSkycoinURL(s.SkycoinPath, query)

	log.Printf("Proxying request %s to skycoin node %s", r.URL.String(), skycoinURL)

	resp, err := http.Get(skycoinURL)
	if err != nil {
		msg := "Request to skycoin node failed"
		log.Println("ERROR:", msg, skycoinURL)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	defer resp.Body.Close()

	if n, err := io.Copy(w, resp.Body); err != nil {
		msg := "Copying response from skycoin node to client failed"
		if n != 0 {
			msg += fmt.Sprintf(", after %d bytes were written", n)
		}
		log.Println("ERROR:", msg, skycoinURL)

		// An error response can only be written if the ResponseWriter has not been written to
		if n == 0 {
			http.Error(w, msg, http.StatusInternalServerError)
		}

		return
	}
}

var proxyEndpoints = []SkycoinProxyEndpoint{
	{
		ExplorerPath: "/api/block",
		SkycoinPath:  "/block",
		QueryArgs:    []string{"hash"},
	},
	{
		ExplorerPath: "/api/blocks",
		SkycoinPath:  "/blocks",
		QueryArgs:    []string{"start", "end"},
	},
	{
		ExplorerPath: "/api/coinSupply",
		SkycoinPath:  "/explorer/getEffectiveOutputs",
	},
	{
		ExplorerPath: "/api/blockchain/metadata",
		SkycoinPath:  "/blockchain/metadata",
	},
	{
		ExplorerPath: "/api/address",
		SkycoinPath:  "/explorer/address",
		QueryArgs:    []string{"address"},
	},
	{
		ExplorerPath: "/api/currentBalance",
		SkycoinPath:  "/outputs",
		QueryArgs:    []string{"addrs"},
	},
	{
		ExplorerPath: "/api/uxout",
		SkycoinPath:  "/uxout",
		QueryArgs:    []string{"uxid"},
	},
	{
		ExplorerPath: "/api/transaction",
		SkycoinPath:  "/transaction",
		QueryArgs:    []string{"txid"},
	},
}

func main() {
	// Register proxy endpoints from config
	for _, e := range proxyEndpoints {
		http.Handle(e.ExplorerPath, e)
		log.Printf("%s proxied to %s with args %v", e.ExplorerPath, e.SkycoinPath, e.QueryArgs)
	}

	if !apiOnly {
		http.Handle("/", http.FileServer(http.Dir("./dist/")))

		// The angular app's internal routes must all start with /app/.
		// This serves the index.html for all of those routes.
		// The angular app will render the correct page based upon the request path.
		http.Handle("/app/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			http.ServeFile(w, r, "./dist/index.html")
		}))
	}

	log.Printf("Running skycoin explorer on http://%s", explorerHost)

	if err := http.ListenAndServe(explorerHost, nil); err != nil {
		log.Println("Fatal:", err)
	}
}
