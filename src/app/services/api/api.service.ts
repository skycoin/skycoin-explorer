import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blockchain, GetBlocksResponse, GetBlockchainMetadataResponse, GetUnconfirmedTransactionResponse, GenericTransactionResponse,
    GetCurrentBalanceResponse, GenericBlockResponse, RichlistEntry, GetBalanceResponse, GetTransactionResponse, GetCoinSupplyResponse } from '../../app.datatypes';

@Injectable()
export class ApiService {

  private url = '/api/';

  constructor(
    private http: HttpClient
  ) { }

  getHealth(): Observable<any> {
    return this.get('health');
  }

  getAddress(address: string): Observable<GetTransactionResponse[]> {
    return this.get('transactions', { addrs: address, verbose: 1 });
  }

  getUnconfirmedTransactions(): Observable<GetUnconfirmedTransactionResponse[]> {
    return this.get('pendingTxs', { verbose: 1 });
  }

  getBlockById(id: number): Observable<GenericBlockResponse> {
    return this.get('block', { seq: id, verbose: 1 });
  }

  getBlockByHash(hash: string): Observable<GenericBlockResponse> {
    return this.get('block', { hash: hash, verbose: 1 });
  }

  getBlocks(startNumber: number, endNumber: number): Observable<GetBlocksResponse> {
    return this.get('blocks', { start: startNumber, end: endNumber });
  }

  getBlockchainMetadata(): Observable<Blockchain> {
    return this.get('blockchain/metadata').pipe(
      map((res: GetBlockchainMetadataResponse) => ({
        blocks: res.head.seq,
      })));
  }

  getCoinSupply(): Observable<GetCoinSupplyResponse> {
    return this.get('coinSupply');
  }

  getCurrentBalance(address: string): Observable<GetCurrentBalanceResponse> {
    return this.get('currentBalance', { addrs: address });
  }

  getBalance(address: string): Observable<GetBalanceResponse> {
    return this.get('balance', { addrs: address });
  }

  getTransaction(transactionId: string): Observable<GetTransactionResponse> {
    return this.get('transaction', { txid: transactionId, verbose: 1 });
  }

  getRichlist(): Observable<RichlistEntry[]> {
    return this.get('richlist').pipe(map((response: any) => response.richlist));
  }

  // Old methods

  get(url: string, options: object = null): any {
    return this.http.get(this.getUrl(url, options)).pipe(
      catchError((error: any) => observableThrowError(error || 'Server error'))
    );
  }

  private getQueryString(parameters: object = null): string {
    if (!parameters) {
      return '';
    }

    return Object.keys(parameters).reduce((array, key) => {
      array.push(key + '=' + encodeURIComponent(parameters[key]));
      return array;
    }, []).join('&');
  }

  private getUrl(url: string, options: object = null): string {
    return this.url + url + '?' + this.getQueryString(options);
  }
}
