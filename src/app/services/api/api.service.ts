import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoinSupply } from '../../components/pages/blocks/block';
import { Blockchain, GetBlocksResponse, GetBlockchainMetadataResponse, GetUnconfirmedTransaction, GetUxoutResponse, GetAddressResponseTransaction,
    GetCurrentBalanceResponse, GetBlocksResponseBlock } from '../../app.datatypes';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  private url = '/api/';

  constructor(
    private http: Http
  ) { }

  getAddress(address: string): Observable<GetAddressResponseTransaction[]> {
    return this.get('address', { address: address });
  }

  getUnconfirmedTransactions(): Observable<GetUnconfirmedTransaction[]> {
    return this.get('pendingTxs');
    /*
    return Observable.create(obs => {
      obs.next(
        JSON.parse(`[
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
          },
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
                    "bb89d4ed40d0e6e3a82c12e70b01a4bc240d2cd4f252cfac88235abe61bd3ad0"
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
            "received": "2016-05-09T10:11:57.14303834+02:00",
            "checked": "2016-05-09T10:19:58.801315452+02:00",
            "announced": "0001-01-01T00:00:00Z",
            "is_valid": true
        }
      ]`)
      );
      obs.complete();
    }) as Observable<GetUnconfirmedTransaction[]>;
    */
  }

  getBlock(hash: string): Observable<GetBlocksResponseBlock> {
    return this.get('block', { hash: hash });
  }

  getBlocks(startNumber: number, endNumber: number): Observable<GetBlocksResponse> {
    return this.get('blocks', { start: startNumber, end: endNumber });
  }

  getBlockchainMetadata(): Observable<Blockchain> {
    return this.get('blockchain/metadata')
      .map((res: GetBlockchainMetadataResponse) => ({
        blocks: res.head.seq,
      }))
  }

  getCoinSupply(): Observable<CoinSupply> {
    return this.get('coinSupply');
  }

  getCurrentBalance(address: string): Observable<GetCurrentBalanceResponse> {
    return this.get('currentBalance', { addrs: address })
  }

  getTransaction(transactionId:string): Observable<any> {
    return this.get('transaction', { txid: transactionId });
  }

  getUxout(uxid: string): Observable<GetUxoutResponse> {
    return this.get('uxout', { uxid: uxid });
  }

  // Old methods

  getInputAddress(uxid:string): any{
    return this.get('uxout?uxid=' + uxid);
  }

  private get(url, options = null) {
    return this.http.get(this.getUrl(url, options))
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  private getQueryString(parameters = null) {
    if (!parameters) {
      return '';
    }

    return Object.keys(parameters).reduce((array,key) => {
      array.push(key + '=' + encodeURIComponent(parameters[key]));
      return array;
    }, []).join('&');
  }

  private getUrl(url, options = null) {
    return this.url + url + '?' + this.getQueryString(options);
  }
}
