import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoinSupply } from '../../components/pages/blocks/block';
import { Blockchain, GetBlocksResponse, GetBlockchainMetadataResponse, GetUnconfirmedTransaction, GetUxoutResponse, GetAddressResponseTransaction,
    GetCurrentBalanceResponse, GetBlocksResponseBlock, RichlistEntry } from '../../app.datatypes';
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

  getRichlist(): Observable<RichlistEntry[]> {
    return this.get('richlist').map(response => response.richlist);
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
