import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CoinSupply } from '../../components/pages/blocks/block';
import { AddressBalanceResponse, UnspentOutput } from '../../components/pages/address-detail/UnspentOutput';
import { Block, Blockchain, GetBlocksResponse, GetBlockchainMetadataResponse, parseGetBlocksBlock } from '../../app.datatypes';

@Injectable()
export class ApiService {

  private url = '/api/';

  constructor(
    private http: Http
  ) { }

  getBlocks(startNumber: number, endNumber: number): Observable<Block[]> {
    return this.get('blocks', { start: startNumber, end: endNumber })
      .map((res: GetBlocksResponse) => res.blocks.map(block => parseGetBlocksBlock(block)).sort((a, b) => b.id - a.id));
  }

  getBlockchainMetadata(): Observable<Blockchain> {
    return this.get('blockchain/metadata')
      .map((res: GetBlockchainMetadataResponse) => ({
        blocks: res.head.seq,
      }))
  }

  // Old methods

  fetchNumberOfBlocks(): Observable<number> {
    return this.get('blockchain/metadata')
      .map(res => res.head.seq);
  }

  getCoinSupply(): Observable<CoinSupply> {
    return this.get('coinSupply');
  }

  getCurrentBalanceOfAddress(address: number): Observable<AddressBalanceResponse> {
    return this.get('currentBalance?addrs=' + address);
  }

  getInputAddress(uxid:string): any{
    return this.get('uxout?uxid=' + uxid);
  }

  getTransaction(txid:string): Observable<any> {
    return this.get('transaction?txid=' + txid);
  }

  getUxOutputsForAddress(address: string): Observable<UnspentOutput[]> {
    console.log(address);
    return this.get('address?address=' + address);
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
