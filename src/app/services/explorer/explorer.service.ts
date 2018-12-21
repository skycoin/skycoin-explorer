import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { Block, parseGenericTransaction, parseGenericBlock, parseGetUnconfirmedTransaction, Transaction, parseGetTransaction } from '../../app.datatypes';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { BigNumber } from 'bignumber.js';

@Injectable()
export class ExplorerService {

  constructor(
    private api: ApiService,
  ) { }

  getBlock(id: number): Observable<Block> {
   return this.api.getBlockById(id).map(response => parseGenericBlock(response));
  }

  getBlocks(start: number, end: number): Observable<Block[]> {
    return this.api.getBlocks(start, end)
      .map(response => response.blocks.map(block => parseGenericBlock(block)).sort((a, b) => b.id - a.id));
  }

  getBlockByHash(hash: string): Observable<Block> {
    return this.api.getBlockByHash(hash).map(response => parseGenericBlock(response));
  }

  getTransactions(address: string): Observable<Transaction[]> {
    return this.api.getAddress(address)
      .map(response => {
        response = response.sort((a, b) => a.timestamp - b.timestamp);

        let currentBalance = new BigNumber('0');
        return response.map(rawTx => {
          const parsedTx = parseGenericTransaction(rawTx, address);
          parsedTx.initialBalance = currentBalance;
          currentBalance = currentBalance.plus(parsedTx.balance);
          parsedTx.finalBalance = currentBalance;
          return parsedTx;
        }).reverse();
      });
  }

  getUnconfirmedTransactions(): Observable<Transaction[]> {
    return this.api.getUnconfirmedTransactions()
      .map(response => response.map(rawTx => parseGetUnconfirmedTransaction(rawTx)));
  }

  getTransaction(transactionId: string): Observable<Transaction> {
    return this.api.getTransaction(transactionId)
      .map(response => parseGetTransaction(response));
  }
}
