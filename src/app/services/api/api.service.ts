import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Blockchain, GetBlocksResponse, GetBlockchainMetadataResponse, GetUnconfirmedTransactionResponse,
    GetCurrentBalanceResponse, GenericBlockResponse, RichlistEntry, GetBalanceResponse, GetTransactionResponse, GetCoinSupplyResponse } from '../../app.datatypes';

/**
 * Allows to request information from the server. This service returns almost the same data
 * returned by the node, unlike ApiService, which returns processed objects.
 *
 * This service uses the api of the intermediate server (explorer.go). The API is similar to the
 * Skycoin node API, but there are differences. There is more info clicking the "Explorer API"
 * link in the main page of the explorer. For even more info, seach the value of the "Internal
 * skycoin node path:" section in the Skycoin REST API docs:
 * https://github.com/skycoin/skycoin/blob/develop/src/api/README.md
 */
@Injectable()
export class ApiService {

  /**
   * URL used to connect to the API.
   */
  private url = '/api/';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get information about the state of the node.
   */
  getHealth(): Observable<any> {
    return this.get('health');
  }

  /**
   * Gets the list of transactions of a specific address.
   * @param address Address to consult.
   */
  getAddress(address: string): Observable<GetTransactionResponse[]> {
    return this.get('transactions', { addrs: address, verbose: 1 });
  }

  /**
   * Gets the list of transactions of a specific address, using pagination.
   * @param address Address to consult.
   */
  getAddressWithPagination(address: string, page: number, pageSize: number): Observable<any> {
    return this.get('paginatedTransactions', { addrs: address, page: page, limit: pageSize, sort: 'desc', verbose: 1 })
      .pipe(map((response: any) => response.data));
  }

  /**
   * Gets the list of unconfirmed transactions.
   */
  getUnconfirmedTransactions(): Observable<GetUnconfirmedTransactionResponse[]> {
    return this.get('pendingTxs', { verbose: 1 });
  }

  /**
   * Gets a block by its ID (sequence number).
   * @param id Block ID (sequence number).
   */
  getBlockById(id: number): Observable<GenericBlockResponse> {
    return this.get('block', { seq: id, verbose: 1 });
  }

  /**
   * Gets a block by its hash.
   * @param hash Block hash.
   */
  getBlockByHash(hash: string): Observable<GenericBlockResponse> {
    return this.get('block', { hash: hash, verbose: 1 });
  }

  /**
   * Gets an array with the blocks in a specific range.
   * @param startNumber Number (height) of the first block (inclusive).
   * @param endNumber Number (height) of the last block (inclusive).
   */
  getBlocks(startNumber: number, endNumber: number): Observable<GetBlocksResponse> {
    return this.get('blocks', { start: startNumber, end: endNumber });
  }

  /**
   * Gets information about the state of the blockchain.
   */
  getBlockchainMetadata(): Observable<Blockchain> {
    return this.get('blockchain/metadata').pipe(
      map((res: GetBlockchainMetadataResponse) => ({
        blocks: res.head.seq,
      })));
  }

  /**
   * Gets information about the current coin supply.
   */
  getCoinSupply(): Observable<GetCoinSupplyResponse> {
    return this.get('coinSupply');
  }

  /**
   * Gets the list of unspent outputs of an address.
   * @param address Address to consult.
   */
  getCurrentBalance(address: string): Observable<GetCurrentBalanceResponse> {
    return this.get('currentBalance', { addrs: address });
  }

  /**
   * Gets the balance of an address.
   * @param address Address to consult.
   */
  getBalance(address: string): Observable<GetBalanceResponse> {
    return this.get('balance', { addrs: address });
  }

  /**
   * Gets a transaction by its hash.
   * @param transactionId Transaction hash.
   */
  getTransaction(transactionId: string): Observable<GetTransactionResponse> {
    return this.get('transaction', { txid: transactionId, verbose: 1 });
  }

  /**
   * Gets the list of unlocked addresses with most coins.
   */
  getRichlist(): Observable<RichlistEntry[]> {
    return this.get('richlist').pipe(map((response: any) => response.richlist));
  }

  // Old methods

  /**
   * Sends a GET request to the API.
   * @param url URL segment (the URL of the API endpont after the "/api/" part).
   * @param options Arguments to send as URL params.
   */
  private get(url: string, options: object = null): any {
    return this.http.get(this.getUrl(url, options)).pipe(
      catchError((error: any) => observableThrowError(error || 'Server error'))
    );
  }

  /**
   * Process an object to use its properties for building a querystring, so it can be
   * sent in an API call.
   * @param parameters Object with params and values to build the querystring.
   */
  private getQueryString(parameters: object = null): string {
    if (!parameters) {
      return '';
    }

    return Object.keys(parameters).reduce((array, key) => {
      array.push(key + '=' + encodeURIComponent(parameters[key]));
      return array;
    }, []).join('&');
  }

  /**
   * Gets the complete URL for making an API request.
   * @param url URL segment (the URL of the API endpont after the "/api/" part).
   * @param options Arguments to send as URL params.
   */
  private getUrl(url: string, options: object = null): string {
    // Ensure that there is no a '/' at the beginning.
    if (url.startsWith('/')) {
      url = url.substr(1, url.length - 1);
    }

    return this.url + url + '?' + this.getQueryString(options);
  }
}
