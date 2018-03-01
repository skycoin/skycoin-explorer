/*

Explorer backend service

Serves precompiled angular website from the ./dist folder.

This must be run from the same folder as ./dist, unless run in -api-only mode.

Environment options:
* EXPLORER_HOST - The addr:port to bind the explorer to. Do not include a scheme. Defaults to 127.0.0.1:8001
* SKYCOIN_ADDR - The skycoin node's address. You must include a scheme. Defaults to http://127.0.0.1:6420

CLI Options:
* -api-only - Don't serve static content from ./dist, only proxy the skycoin node

Run the explorer and navigate to http://127.0.0.1:8001/api.html for API documentation.

*/

package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/NYTimes/gziphandler"
)

const (
	defaultExplorerHost = "127.0.0.1:8001"
	defaultSkycoinAddr  = "http://127.0.0.1:6420"

	// timeout for requests to the backend skycoin node
	skycoinRequestTimeout = time.Second * 30

	// https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/
	// timeout for requests to the explorer
	serverReadTimeout  = time.Second * 10
	serverWriteTimeout = time.Second * 60
	serverIdleTimeout  = time.Second * 120
)

var (
	explorerHost = ""     // override with envvar EXPLORER_HOST.  Must not have scheme
	skycoinAddr  *url.URL // override with envvar SKYCOIN_ADDR.  Must have scheme, e.g. http://
	apiOnly      bool     // set to true with -api-only cli flag
	verify       bool     // set to true with -verify cli flag. Check init() conditions and quits.
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
	flag.BoolVar(&verify, "verify", false, "Run init() checks and quit")
	flag.Parse()

	if verify {
		log.Println("Running in verify mode")
	}

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

type APIEndpoint struct {
	ExplorerPath   string   `json:"explorer_path"`
	SkycoinPath    string   `json:"skycoin_path"`
	QueryArgs      []string `json:"query_args,omitempty"`
	Description    string   `json:"description"`
	ExampleRequest string   `json:"example_request"`
	// This string will be parsed into a map[string]interface{} in order to render newlines
	ExampleResponse string `json:"-"`
}

func (s APIEndpoint) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var query url.Values
	if s.QueryArgs != nil {
		query = url.Values{}
		for _, s := range s.QueryArgs {
			query.Add(s, r.URL.Query().Get(s))
		}
	}

	skycoinURL := buildSkycoinURL(s.SkycoinPath, query)

	log.Printf("Proxying request %s to skycoin node %s with timeout %v", r.URL.String(), skycoinURL, skycoinRequestTimeout)

	c := &http.Client{
		Timeout: skycoinRequestTimeout,
	}

	resp, err := c.Get(skycoinURL)
	if err != nil {
		msg := "Request to skycoin node failed"
		log.Println("ERROR:", msg, skycoinURL)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	w.Header().Set("Content-Type", "application/json")

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

var apiEndpoints = []APIEndpoint{
	{
		ExplorerPath:   "/api/coinSupply",
		SkycoinPath:    "/coinSupply",
		Description:    "Returns metadata about the coin distribution.",
		ExampleRequest: "/api/coinSupply",
		ExampleResponse: `{
    "current_supply": "7187500.000000",
    "total_supply": "25000000.000000",
    "max_supply": "100000000.000000",
    "current_coinhour_supply": "23499025077",
    "total_coinhour_supply": "93679828577",
    "unlocked_distribution_addresses": [
        "R6aHqKWSQfvpdo2fGSrq4F1RYXkBWR9HHJ",
        "2EYM4WFHe4Dgz6kjAdUkM6Etep7ruz2ia6h",
        "25aGyzypSA3T9K6rgPUv1ouR13efNPtWP5m"
    ],
    "locked_distribution_addresses": [
        "gpqsFSuMCZmsjPc6Rtgy1FmLx424tH86My",
        "2EUF3GPEUmfocnUc1w6YPtqXVCy3UZA4rAq",
        "TtAaxB3qGz5zEAhhiGkBY9VPV7cekhvRYS"
    ]
}`,
	},
	{
		ExplorerPath:   "/api/address",
		SkycoinPath:    "/explorer/address",
		QueryArgs:      []string{"address"},
		Description:    "Returns address info.",
		ExampleRequest: "/api/address?address=SeDoYN6SNaTiAZFHwArnFwQmcyz7ZvJm17",
		ExampleResponse: `[
    {
        "status": {
            "confirmed": true,
            "unconfirmed": false,
            "height": 10161,
            "block_seq": 1893,
            "unknown": false
        },
        "length": 414,
        "type": 0,
        "txid": "c297eb14a9e68ec5501aa886e5bb720a58fe6466be633a8264f61eee9580a2c3",
        "inner_hash": "5fcc1649794894f2c79411a832f799ba12e0528ff530d7068abaa03c10e451cf",
        "timestamp": 1499405825,
        "sigs": [
            "b951fd0c1528df88c87eb90cb1ecbc3ba2b6332ace16c2f1cc731976c0cebfb10ecb1c20335374f8cf0b832364a523c3e16f32c3240ed4eccfac1803caf8815100",
            "6a06e57d130f6e780eecbe0c2626eed7724a2443438258598af287bf8fc1b87f041d04a7082550bd2055a08f0849419200fdac27c018d5cebf84e8bba1c4f61201",
            "8cc9ae6ae5be81456fc8e2d54b6868c45b415556c689c8c4329cd30b671a18254885a1aef8a3ac9ab76a8dc83e08607516fdef291a003935ae4507775ae53c7800"
        ],
        "inputs": [
            {
                "uxid": "0922a7b41d1b76b6b56bfad0d5d0f6845517bbd895c660eab0ebe3899b5f63c4",
                "owner": "2Q2VViWhgBzz6c8GkXQyDVFdQUWcBcDon4L",
                "coins": "7.000000",
                "hours": "851106"
            },
            {
                "uxid": "d73cf1f1d04a1d493fe3480a00e48187f9201bb64828fe0c638f17c0c88bb3d9",
                "owner": "YPhukwVyLsPGX1FAPQa2ktr5XnSLqyGbr5",
                "coins": "5.000000",
                "hours": "6402335"
            },
            {
                "uxid": "16dd81af869743599fe60108c22d7ee1fcbf1a7f460fffd3a015fbb3f721c36d",
                "owner": "YPhukwVyLsPGX1FAPQa2ktr5XnSLqyGbr5",
                "coins": "2400.000000",
                "hours": "800291"
            }
        ],
        "outputs": [
            {
                "uxid": "8a941208d3f2d2c4a32438e05645fb64dba3b4b7d83c48d52f51bc1eb9a4117a",
                "dst": "2GgFvqoyk9RjwVzj8tqfcXVXB4orBwoc9qv",
                "coins": "2361.000000",
                "hours": 1006716
            },
            {
                "uxid": "a70d1f0f488066a327acd0d5ea77b87d62b3b061d3db8361c90194a6520ab29f",
                "dst": "SeDoYN6SNaTiAZFHwArnFwQmcyz7ZvJm17",
                "coins": "51.000000",
                "hours": 2013433
            }
        ]
    }
]`,
	},

	{
		ExplorerPath:   "/api/blockchain/metadata",
		SkycoinPath:    "/blockchain/metadata",
		Description:    "Returns blockchain metadata.",
		ExampleRequest: "/api/blockchain/metadata",
		ExampleResponse: `{
    "head": {
        "seq": 1893,
        "block_hash": "e20d5832b3f9bea4da58e149e4805b4e4a962ea7c5ce3cd9f31c6d7fc72e3300",
        "previous_block_hash": "e99fe31adf3a15aab77eb81d7aaa5477a96d2ce7f74ccb3d4cdce4da2eb01cb2",
        "timestamp": 1499405825,
        "fee": 5033788,
        "version": 0,
        "tx_body_hash": "c297eb14a9e68ec5501aa886e5bb720a58fe6466be633a8264f61eee9580a2c3"
    },
    "unspents": 783,
    "unconfirmed": 0
}`,
	},

	{
		ExplorerPath:   "/api/block",
		SkycoinPath:    "/block",
		QueryArgs:      []string{"hash", "seq"},
		Description:    "Returns information about a block, given a hash or sequence number.",
		ExampleRequest: "/api/block?hash=e20d5832b3f9bea4da58e149e4805b4e4a962ea7c5ce3cd9f31c6d7fc72e3300",
		ExampleResponse: `{
    "header": {
        "seq": 1893,
        "block_hash": "e20d5832b3f9bea4da58e149e4805b4e4a962ea7c5ce3cd9f31c6d7fc72e3300",
        "previous_block_hash": "e99fe31adf3a15aab77eb81d7aaa5477a96d2ce7f74ccb3d4cdce4da2eb01cb2",
        "timestamp": 1499405825,
        "fee": 5033788,
        "version": 0,
        "tx_body_hash": "c297eb14a9e68ec5501aa886e5bb720a58fe6466be633a8264f61eee9580a2c3"
    },
    "body": {
        "txns": [
            {
                "length": 414,
                "type": 0,
                "txid": "c297eb14a9e68ec5501aa886e5bb720a58fe6466be633a8264f61eee9580a2c3",
                "inner_hash": "5fcc1649794894f2c79411a832f799ba12e0528ff530d7068abaa03c10e451cf",
                "sigs": [
                    "b951fd0c1528df88c87eb90cb1ecbc3ba2b6332ace16c2f1cc731976c0cebfb10ecb1c20335374f8cf0b832364a523c3e16f32c3240ed4eccfac1803caf8815100",
                    "6a06e57d130f6e780eecbe0c2626eed7724a2443438258598af287bf8fc1b87f041d04a7082550bd2055a08f0849419200fdac27c018d5cebf84e8bba1c4f61201",
                    "8cc9ae6ae5be81456fc8e2d54b6868c45b415556c689c8c4329cd30b671a18254885a1aef8a3ac9ab76a8dc83e08607516fdef291a003935ae4507775ae53c7800"
                ],
                "inputs": [
                    "0922a7b41d1b76b6b56bfad0d5d0f6845517bbd895c660eab0ebe3899b5f63c4",
                    "d73cf1f1d04a1d493fe3480a00e48187f9201bb64828fe0c638f17c0c88bb3d9",
                    "16dd81af869743599fe60108c22d7ee1fcbf1a7f460fffd3a015fbb3f721c36d"
                ],
                "outputs": [
                    {
                        "uxid": "8a941208d3f2d2c4a32438e05645fb64dba3b4b7d83c48d52f51bc1eb9a4117a",
                        "dst": "2GgFvqoyk9RjwVzj8tqfcXVXB4orBwoc9qv",
                        "coins": "2361",
                        "hours": 1006716
                    },
                    {
                        "uxid": "a70d1f0f488066a327acd0d5ea77b87d62b3b061d3db8361c90194a6520ab29f",
                        "dst": "SeDoYN6SNaTiAZFHwArnFwQmcyz7ZvJm17",
                        "coins": "51",
                        "hours": 2013433
                    }
                ]
            }
        ]
    }
}`,
	},

	{
		ExplorerPath:   "/api/blocks",
		SkycoinPath:    "/blocks",
		QueryArgs:      []string{"start", "end"},
		Description:    "Returns information about a range of blocks, given a start and end block sequence number. The range of blocks will include both the start and end sequence numbers.",
		ExampleRequest: "https://explorer.skycoin.net/api/blocks?start=1891&end=1892",
		ExampleResponse: `{
    "blocks": [
        {
            "header": {
                "seq": 1891,
                "block_hash": "015265e82b4a28eee364327bf0d3b51fed54c2067318029974c262478a09bf17",
                "previous_block_hash": "71bf5abc05a4344597cf7df25249203df12e73b0a2e37dab386eb292a6cc5faa",
                "timestamp": 1499402935,
                "fee": 38414015,
                "version": 0,
                "tx_body_hash": "ac9759e9ffc3450d9af92e205f909375131df64e8f158a26e5e1e15334f45c8d"
            },
            "body": {
                "txns": [
                    {
                        "length": 802,
                        "type": 0,
                        "txid": "ac9759e9ffc3450d9af92e205f909375131df64e8f158a26e5e1e15334f45c8d",
                        "inner_hash": "cd36c8a00ff1fa81d94747b2d64107657fa40fa43bb0e5afc70d16661eca4286",
                        "sigs": [
                            "d34f0a9f0b82028e44702c7fc694e35aeb2777630efaaae32b9854b6c59c9ad747bdb91111864a050f024efd325a744cbbb7c1dde55a776c8f0d4856ac07fa5801",
                            "aa2f3ec98866bafda37f6e0b52be6fd1201131ce6b7edf1988b762edf14c35880b26a3a3fe9369a0f9eedecbe958abae83e54d572440903f5ff5b11cb9eb5e9200",
                            "746e171c22c99939d2d7e4b615f98de74f1c6ae152cb3d1e17e4d5e25d6f52b444242080a5a3d8f36de3befb8ec915321a7cb282eafc661c0857de753a6b40e100",
                            "e4f3db5afa209cbceac814d0f5c6fff8b57a3cc5c15063cd0b390067705de0a87313488d5eabd369855a87879a8d163fce08faeacd9d6538528d29c7cdbdaedf00",
                            "038263cdaf43a544b4ef66b2c910b9dd807ecd55e2fbf513c776b7accb1ff1fb5f591fbba22af58cf399d743955ab6cc7e3e641ecc675253306b2d0b6570672f00",
                            "215d1527af817f9c0613cacc3c2d07873ff563ab113023fc83ea836e3ac827f240df8a3d390d8e867cdda149d0db8f86bf435fa354dc4f3ac8c3a9b39297d7ba00",
                            "a2d7a50176ac1ca9417ca35f9848621bc3e0aeacb0cce713e9f93d82db4988ac5bca5bf02610c64f1580b198aadf49b04a14542466f7dca49d73b6c70f2577a201"
                        ],
                        "inputs": [
                            "e72d8ba4ce2d3b37aeb71df2e3bed80ee07204b3fa633f56cbce7bca836bd39c",
                            "6a349ba12c5d2827de6c24773d3dd8f6572e86adba4c8954a6d6e68df9e165e2",
                            "bb9a579003de101bee76d83d4f8796b97b34ba55555c9729a14919648c3dd7bc",
                            "6232b9b399cd86c7c0b42f9780728dea59f47565cd451010eda90e002079cdfe",
                            "d30ded9d1e3b0067d667a2a04fdacff895099ca7371d20d36d6e6565a4180e10",
                            "f248f84f019e573ba913827b9e55ef57cdd21d622b7000ff4d89d303ca2e7c20",
                            "0e64b71334792a5e6170fd526bab7f0abb3b5a1ef0912d8b273f59c6e3ff0d75"
                        ],
                        "outputs": [
                            {
                                "uxid": "ce1075dd609622b0c28d4106f58943d7f0cae6baffbe9f048bb5bc5f23706b93",
                                "dst": "PRXLNyB64cqaiG4pCoFZZ8Tuv7LWYPpa7m",
                                "coins": "4900",
                                "hours": 6402335
                            },
                            {
                                "uxid": "d73cf1f1d04a1d493fe3480a00e48187f9201bb64828fe0c638f17c0c88bb3d9",
                                "dst": "YPhukwVyLsPGX1FAPQa2ktr5XnSLqyGbr5",
                                "coins": "5",
                                "hours": 6402335
                            }
                        ]
                    }
                ]
            }
        },
        {
            "header": {
                "seq": 1892,
                "block_hash": "e99fe31adf3a15aab77eb81d7aaa5477a96d2ce7f74ccb3d4cdce4da2eb01cb2",
                "previous_block_hash": "015265e82b4a28eee364327bf0d3b51fed54c2067318029974c262478a09bf17",
                "timestamp": 1499403255,
                "fee": 4801753,
                "version": 0,
                "tx_body_hash": "b3c6f0f87c5282ff7ff5e6d637c2581e6a56826a76ec3dd221d02786881e3d14"
            },
            "body": {
                "txns": [
                    {
                        "length": 220,
                        "type": 0,
                        "txid": "b3c6f0f87c5282ff7ff5e6d637c2581e6a56826a76ec3dd221d02786881e3d14",
                        "inner_hash": "3dde2cd3b6562e229e99e1a0c3d87be89ab42bb773343d1471a9627cd004fc67",
                        "sigs": [
                            "22557281582f7daaf07fc79cd1c33438c06788c8561cf2fee96d81d46ffe827f44d57e0cadeb80662ea5b720c4062d5b72827dc72ea9db7afefbfe644aefea2d00"
                        ],
                        "inputs": [
                            "ce1075dd609622b0c28d4106f58943d7f0cae6baffbe9f048bb5bc5f23706b93"
                        ],
                        "outputs": [
                            {
                                "uxid": "c8b8eac053a5640bae40144cbc3dda02746071e3c7d00a4b5dfd06d28f928ec4",
                                "dst": "PRXLNyB64cqaiG4pCoFZZ8Tuv7LWYPpa7m",
                                "coins": "2500",
                                "hours": 800291
                            },
                            {
                                "uxid": "16dd81af869743599fe60108c22d7ee1fcbf1a7f460fffd3a015fbb3f721c36d",
                                "dst": "YPhukwVyLsPGX1FAPQa2ktr5XnSLqyGbr5",
                                "coins": "2400",
                                "hours": 800291
                            }
                        ]
                    }
                ]
            }
        }
    ]
}`,
	},

	{
		ExplorerPath:   "/api/currentBalance",
		SkycoinPath:    "/outputs",
		QueryArgs:      []string{"addrs"},
		Description:    "Returns head outputs for a list of comma-separated addresses.  If no addresses are specified, returns all head outputs.",
		ExampleRequest: "/api/currentBalance?addrs=SeDoYN6SNaTiAZFHwArnFwQmcyz7ZvJm17,iqi5BpPhEqt35SaeMLKA94XnzBG57hToNi",
		ExampleResponse: `{
    "head_outputs": [
        {
            "hash": "fa8161308dee3accc99a35be1fb7921dff4d24a6fc804e98d7aae7aae99d0d0d",
            "src_tx": "b125abb61f5d6ec0f44422e234007b07ab276923e9533023bdd58d51e0a0f9b7",
            "address": "iqi5BpPhEqt35SaeMLKA94XnzBG57hToNi",
            "coins": "50",
            "hours": 248
        },
        {
            "hash": "38926afbb00c2f50d293de866bc44713eaa14c18286b24796819fbc190efcbce",
            "src_tx": "8591837d905894142119923de1447ba855dcf8f34ba451970e83a2bbfea8eeca",
            "address": "iqi5BpPhEqt35SaeMLKA94XnzBG57hToNi",
            "coins": "375",
            "hours": 9
        },
        {
            "hash": "a70d1f0f488066a327acd0d5ea77b87d62b3b061d3db8361c90194a6520ab29f",
            "src_tx": "c297eb14a9e68ec5501aa886e5bb720a58fe6466be633a8264f61eee9580a2c3",
            "address": "SeDoYN6SNaTiAZFHwArnFwQmcyz7ZvJm17",
            "coins": "51",
            "hours": 2013433
        }
    ],
    "outgoing_outputs": [],
    "incoming_outputs": []
}`,
	},

	{
		ExplorerPath:   "/api/transaction",
		SkycoinPath:    "/transaction",
		QueryArgs:      []string{"txid"},
		Description:    "Returns transaction metadata.",
		ExampleRequest: "/api/transaction?txid=edd2de176948cbd27cdd8cba7ca4b5afb8dbf8174dd6de95f73ce359affe4f05",
		ExampleResponse: `{
    "status": {
        "confirmed": true,
        "unconfirmed": false,
        "height": 147,
        "block_seq": 1747,
        "unknown": false
    },
    "time": 0,
    "txn": {
        "length": 220,
        "type": 0,
        "txid": "edd2de176948cbd27cdd8cba7ca4b5afb8dbf8174dd6de95f73ce359affe4f05",
        "inner_hash": "1a0b3794925960bc4a61fc1deebbdb48879f2272cdf7247e62d97b3f9df6ba72",
        "timestamp": 1498734315,
        "sigs": [
            "642a1443755bc949114b2c1a02cdf70d996a96c4971428fca39515b4143bb04b5a1922faeb45f7201fe10e40f162eeed61802fc55345ae7b9fcd12cc1a36f7b101"
        ],
        "inputs": [
            "8aab2420737e710430e95823e4853b5b9f36ab8afb679a6963564be34bfa87a4"
        ],
        "outputs": [
            {
                "uxid": "a72bebed7cf5fab28a4f57e525de5c22a34b3bd2a3bca0074e6658d618969ab0",
                "dst": "2GgFvqoyk9RjwVzj8tqfcXVXB4orBwoc9qv",
                "coins": "1513",
                "hours": 1518
            },
            {
                "uxid": "51a9abaf13e3b404902698e6841738e7e054b59127733c60a5edd3a67c596f6d",
                "dst": "2dbpXFWsbTRRACGMcvinhKcWyXybMbv5yx8",
                "coins": "24",
                "hours": 3037
            }
        ]
    }
}`,
	},

	{
		ExplorerPath:   "/api/uxout",
		SkycoinPath:    "/uxout",
		QueryArgs:      []string{"uxid"},
		Description:    "Returns unspent output metadata.  Note: coins are measured in drops, which are coins * 1000000.",
		ExampleRequest: "/api/uxout?uxid=374fac152e3a920975151438ad87125c0222c4e78cae2c49183cde674cb07bd7",
		ExampleResponse: `{
    "uxid": "374fac152e3a920975151438ad87125c0222c4e78cae2c49183cde674cb07bd7",
    "time": 1492186087,
    "src_block_seq": 865,
    "src_tx": "23b942eb86270f3d8bd42d2059ffbe0b1607f277870b4272b2b864fb7dfa7457",
    "owner_address": "3fEbhoHzsUwdUr8nSoofXhU9nZRDGgycCu",
    "coins": 100000000,
    "hours": 37364678,
    "spent_block_seq": 866,
    "spent_tx": "1ffa69520c15a8eb89cf68bb1a7ef9bdfcecbc490f8b70ed01206f480fa6b8ea"
}`,
	},

	{
		ExplorerPath:   "/api/pendingTxs",
		SkycoinPath:    "/pendingTxs",
		Description:    "Returns the unconfirmed transactions in the pool.",
		ExampleRequest: "/api/pendingTxs",
		ExampleResponse: `[
            {
                "transaction": {
                    "length": 317,
                    "type": 0,
                    "txid": "89578005d8730fe1789288ee7dea036160a9bd43234fb673baa6abd91289a48b",
                    "inner_hash": "cac977eee019832245724aa643ceff451b9d8b24612b2f6a58177c79e8a4c26f",
                    "sigs": [
                        "3f084a0c750731dd985d3137200f9b5fc3de06069e62edea0cdd3a91d88e56b95aff5104a3e797ab4d6d417861af0c343efb0fff2e5ba9e7cf88ab714e10f38101",
                        "e9a8aa8860d189daf0b1dbfd2a4cc309fc0c7250fa81113aa7258f9603d19727793c1b7533131605db64752aeb9c1f4465198bb1d8dd597213d6406a0a81ed3701"
                    ],
                    "inputs": [
                        "bb89d4ed40d0e6e3a82c12e70b01a4bc240d2cd4f252cfac88235abe61bd3ad0",
                        "170d6fd7be1d722a1969cb3f7d45cdf4d978129c3433915dbaf098d4f075bbfc"
                    ],
                    "outputs": [
                        {
                            "uxid": "ec9cf2f6052bab24ec57847c72cfb377c06958a9e04a077d07b6dd5bf23ec106",
                            "dst": "nu7eSpT6hr5P21uzw7bnbxm83B6ywSjHdq",
                            "coins": "60.000000",
                            "hours": 2458
                        },
                        {
                            "uxid": "be40210601829ba8653bac1d6ecc4049955d97fb490a48c310fd912280422bd9",
                            "dst": "2iVtHS5ye99Km5PonsB42No3pQRGEURmxyc",
                            "coins": "1.000000",
                            "hours": 2458
                        }
                    ]
                },
                "received": "2017-05-09T10:11:57.14303834+02:00",
                "checked": "2017-05-09T10:19:58.801315452+02:00",
                "announced": "0001-01-01T00:00:00Z",
                "is_valid": true
            }
        ]`,
	},
	{
		ExplorerPath:   "/api/richlist",
		SkycoinPath:    "/richlist",
		QueryArgs:      []string{"n", "include-distribution"},
		Description:    "Returns top N richer with unspect outputs, If no n are specified, returns 20.",
		ExampleRequest: "/api/richlist?n=2&include-distribution=false",
		ExampleResponse: `[
    {
        "address": "tWZ11Nvor9parjg4FkwxNVcby59WVTw2iL",
        "coins": "1000000.000000",
        "locked": false
    },
    {
        "address": "2UYPbDBnHUEc67e7qD4eXtQQ6zfU2cyvAvk",
        "coins": "1000000.000000",
        "locked": false
    }
]`,
	},
	{
		ExplorerPath:   "/api/addresscount",
		SkycoinPath:    "/addresscount",
		Description:    "Returns count number of unique addresses with unspent outputs",
		ExampleRequest: "/api/addresscount",
		ExampleResponse: `{
    "count": 10103
}`,
	},
}

var docEndpoint APIEndpoint = APIEndpoint{
	ExplorerPath:   "/api/docs",
	Description:    "Returns this documentation as JSON",
	ExampleRequest: "/api/docs",
}

// Parse the ExampleResponse string into generic interface, for human-readable
// formatting when rendered in the browser as JSON
type ParsedJSONAPIEndpoint struct {
	APIEndpoint
	ParsedExampleResponse interface{} `json:"example_response,omitempty"`
}

var parsedJSONAPIEndpoints []ParsedJSONAPIEndpoint

func init() {
	parsedJSONAPIEndpoints = make([]ParsedJSONAPIEndpoint, len(apiEndpoints)+1)

	parsedJSONAPIEndpoints[len(apiEndpoints)] = ParsedJSONAPIEndpoint{
		APIEndpoint: docEndpoint,
	}

	for i := range apiEndpoints {
		parsedJSONAPIEndpoints[i].APIEndpoint = apiEndpoints[i]
		resp := []byte(apiEndpoints[i].ExampleResponse)
		if err := json.Unmarshal(resp, &parsedJSONAPIEndpoints[i].ParsedExampleResponse); err != nil {
			log.Println("Error parsing example response JSON:", err)
			log.Println("path:", apiEndpoints[i].ExplorerPath)
			log.Println("Example response:")
			log.Println(apiEndpoints[i].ExampleResponse)
			log.Panic(err)
		}
	}
}

func jsonDocs(w http.ResponseWriter, r *http.Request) {
	wrapper := struct {
		Endpoints []ParsedJSONAPIEndpoint `json:"endpoints"`
	}{
		Endpoints: parsedJSONAPIEndpoints,
	}

	w.Header().Set("Content-Type", "application/json")

	enc := json.NewEncoder(w)
	enc.SetIndent("", "\t")

	if err := enc.Encode(wrapper); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

const docTemplate string = `<html><head>
<title>Skycoin Explorer API Documentation</title>
<style type="text/css">
code { white-space: pre; }
pre { background: #F7FAFB; }
code.inline { border-radius: 3px; padding: 0.2em; background-color: #F7FAFB; font-size: 1.3em; }
.example { margin-left: 2em; }
</style>
</head><body><div id="main">

<h1>Skycoin Explorer API Documentation</h1>

<div>
<p>
<p>The Skycoin Explorer API proxies a subset of a Skycoin node's API.</p>
<p>All endpoints start with /api</p>
<p>Further information about an endpoint can be found at the Skycoin repo.</p>
<p>Skycoin Github:<a href="https://github.com/skycoin/skycoin">https://github.com/skycoin/skycoin</a>.</p>
<p>Skycoin Explorer Github: <a href="https://github.com/skycoin/skycoin-explorer">https://github.com/skycoin/skycoin-explorer</a></p>
</p>
</div>

<hr />

{{- range . -}}
<div class="endpoint">

<h2><p><code class="inline">{{ .ExplorerPath }}</code></p></h2>

{{- if .QueryArgs -}}
<p><ul>
{{- range .QueryArgs -}}
    <li><code class="inline">{{ . }}</code></li>
{{- end -}}
</ul></p>
{{- end -}}


{{ if .Description }}
<p>{{ .Description }}</p>
{{ end }}

{{ if .ExampleRequest }}
<p>Example request:</p>
<p class="example"><code class="inline">{{ .ExampleRequest }}</code></p>
{{ end }}

{{ if .ExampleResponse }}
<p>Example response:</p>
<p class="example"><pre class="example"><code>{{ .ExampleResponse }}</code></pre></p>
{{ end }}

{{ if .SkycoinPath }}
<p>Internal skycoin node path:</p>
<p class="example"><code class="inline">{{ .SkycoinPath }}</code></p>
{{ end }}

<div>
<hr />
{{- end -}}

</div></body></html>`

var docTemplateBody string

func init() {
	t := template.Must(template.New("docs").Parse(docTemplate))

	endpoints := []APIEndpoint{}
	endpoints = append(endpoints, apiEndpoints...)
	endpoints = append(endpoints, docEndpoint)

	b := &bytes.Buffer{}
	if err := t.Execute(b, endpoints); err != nil {
		log.Panic(err)
	}

	docTemplateBody = b.String()
}

func htmlDocs(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, docTemplateBody)
}

func main() {
	if verify {
		// After the init() checks complete, quit
		log.Println("Verified")
		return
	}

	log.Println("api.html output:")
	log.Println(docTemplateBody)

	mux := http.NewServeMux()

	gzipHandle := func(path string, handler http.Handler) {
		mux.Handle(path, gziphandler.GzipHandler(handler))
	}

	// Register proxy endpoints from config
	for _, e := range apiEndpoints {
		gzipHandle(e.ExplorerPath, e)
		log.Printf("%s proxied to %s with args %v", e.ExplorerPath, e.SkycoinPath, e.QueryArgs)
	}

	gzipHandle("/api/docs", http.HandlerFunc(jsonDocs))

	if !apiOnly {
		gzipHandle("/", http.FileServer(http.Dir("./dist/")))

		// The angular app's internal routes must all start with /app/.
		// This serves the index.html for all of those routes.
		// The angular app will render the correct page based upon the request path.
		gzipHandle("/app/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			http.ServeFile(w, r, "./dist/index.html")
		}))

		// Backwards compatiblity for the old link;
		// / redirected to /blocks on load, so people may have linked to /blocks
		// Redirect /blocks to / instead of 404
		gzipHandle("/blocks", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			http.Redirect(w, r, "/", http.StatusMovedPermanently)
		}))

		// /block/*, /transaction/* and /address/* are now prefixed with /app
		redirectToApp := func(basePath string) {
			gzipHandle(basePath, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				block := r.URL.Path[len(basePath):]
				path := fmt.Sprintf("/app%s%s", basePath, block)
				http.Redirect(w, r, path, http.StatusMovedPermanently)
			}))
		}

		redirectToApp("/block/")
		redirectToApp("/transaction/")
		redirectToApp("/address/")

		gzipHandle("/api.html", http.HandlerFunc(htmlDocs))
	}

	log.Printf("Running skycoin explorer on http://%s", explorerHost)

	s := &http.Server{
		Addr:         explorerHost,
		Handler:      mux,
		ReadTimeout:  serverReadTimeout,
		WriteTimeout: serverWriteTimeout,
		IdleTimeout:  serverIdleTimeout,
	}

	if err := s.ListenAndServe(); err != nil {
		log.Println("Fatal:", err)
	}
}
