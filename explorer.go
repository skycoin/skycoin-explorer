package main

import (
	"flag"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"

	wh "github.com/skycoin/skycoin/src/util/http"
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
	explorerHost = os.Getenv("SKYCOIN_EXPLORER_HOST")
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
		log.Fatalln("Invalid SKYCOIN_HOST", skycoinAddrString, err)
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

func skycoinURL(path string, query url.Values) string {
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

func relaySkycoinResponse(w http.ResponseWriter, r *http.Request, path string, query url.Values) {
	u := skycoinURL(path, query)
	log.Println("Skycoin node request:", u)

	resp, err := http.Get(u)
	if err != nil {
		msg := "Request to skycoin node failed"
		log.Println(msg)
		wh.Error500(w, msg)
		return
	}

	defer resp.Body.Close()

	if _, err := io.Copy(w, resp.Body); err != nil {
		msg := "Error copying response from skycoin node to client"
		log.Println(msg)
		wh.Error500(w, msg)
		return
	}
}

func helloWorld(w http.ResponseWriter, r *http.Request) {
	path := "/outputs"

	relaySkycoinResponse(w, r, path, nil)
}

func getBlocks(w http.ResponseWriter, r *http.Request) {
	path := "/blocks"

	query := url.Values{}
	query.Add("start", r.URL.Query().Get("start"))
	query.Add("end", r.URL.Query().Get("end"))

	relaySkycoinResponse(w, r, path, query)
}

func getSupply(w http.ResponseWriter, r *http.Request) {
	path := "/explorer/getEffectiveOutputs"

	relaySkycoinResponse(w, r, path, nil)
}

func getBlockChainMetaData(w http.ResponseWriter, r *http.Request) {
	path := "/blockchain/metadata"

	relaySkycoinResponse(w, r, path, nil)
}

func getAddress(w http.ResponseWriter, r *http.Request) {
	path := "/explorer/address"

	query := url.Values{}
	query.Add("address", r.URL.Query().Get("address"))

	relaySkycoinResponse(w, r, path, query)
}

func getCurrentBalance(w http.ResponseWriter, r *http.Request) {
	path := "/outputs"

	query := url.Values{}
	query.Add("addrs", r.URL.Query().Get("address"))

	relaySkycoinResponse(w, r, path, query)
}

func getUxID(w http.ResponseWriter, r *http.Request) {
	path := "/uxout"

	query := url.Values{}
	query.Add("uxid", r.URL.Query().Get("uxid"))

	relaySkycoinResponse(w, r, path, query)
}

func getTransaction(w http.ResponseWriter, r *http.Request) {
	path := "/transaction"

	query := url.Values{}
	query.Add("txid", r.URL.Query().Get("txid"))

	relaySkycoinResponse(w, r, path, query)
}

func getBlock(w http.ResponseWriter, r *http.Request) {
	path := "/block"

	query := url.Values{}
	query.Add("hash", r.URL.Query().Get("hash"))

	relaySkycoinResponse(w, r, path, query)
}

func logRequest(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Handling API request path=%s", r.URL.Path)
		f(w, r)
	}
}

func handleAPIEndpoints() {
	http.HandleFunc("/api/hello", logRequest(helloWorld))
	http.HandleFunc("/api/blocks", logRequest(getBlocks))
	http.HandleFunc("/api/blockchain/metadata", logRequest(getBlockChainMetaData))
	http.HandleFunc("/api/address", logRequest(getAddress))
	http.HandleFunc("/api/currentBalance", logRequest(getCurrentBalance))
	http.HandleFunc("/api/uxout", logRequest(getUxID))
	http.HandleFunc("/api/transaction", logRequest(getTransaction))
	http.HandleFunc("/api/block", logRequest(getBlock))
	http.HandleFunc("/api/coinSupply", logRequest(getSupply))

}

func handleStaticContent() {
	http.Handle("/", http.FileServer(http.Dir("./dist/")))
}

func main() {
	handleAPIEndpoints()

	if !apiOnly {
		handleStaticContent()
	}

	log.Printf("Running skycoin explorer on http://%s", explorerHost)

	if err := http.ListenAndServe(explorerHost, nil); err != nil {
		log.Println("Fatal:", err)
	}
}
