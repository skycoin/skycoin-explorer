import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CoinSupply } from '../../components/pages/blocks/block';
import { AddressBalanceResponse, UnspentOutput } from '../../components/pages/address-detail/UnspentOutput';
import { Block, Blockchain, GetBlocksResponse, GetBlocksResponseBlock, GetBlockchainMetadataResponse, parseGetBlocksBlock, GetUxoutResponse, GetAddressResponseTransaction, GetCurrentBalanceResponse } from '../../app.datatypes';

@Injectable()
export class ApiService {

  private url = '/api/';

  constructor(
    private http: Http
  ) { }

  getAddress(address: string): Observable<GetAddressResponseTransaction[]> {
    return this.get('address', { address: address });
  }

  getBlocks(startNumber: number, endNumber: number): Observable<GetBlocksResponse> {
    return this.get('blocks', { start: startNumber, end: endNumber });
  }

  getBlock(hash: string): Observable<GetBlocksResponseBlock> {
    return this.get('block', { hash: hash });
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
      .catch((error: any) => Observable.throw(error || 'Server error') );
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
