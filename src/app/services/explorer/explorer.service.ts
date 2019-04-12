import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Block, parseGenericBlock, parseGetUnconfirmedTransaction, Transaction, parseGetTransaction } from '../../app.datatypes';
import { BigNumber } from 'bignumber.js';

@Injectable()
export class ExplorerService {

  constructor(
    private api: ApiService,
  ) { }

  getBlock(id: number): Observable<Block> {
   return this.api.getBlockById(id).pipe(map(response => parseGenericBlock(response)));
  }

  getBlocks(start: number, end: number): Observable<Block[]> {
    return this.api.getBlocks(start, end).pipe(
      map(response => response.blocks.map(block => parseGenericBlock(block)).sort((a, b) => b.id - a.id)));
  }

  getBlockByHash(hash: string): Observable<Block> {
    return this.api.getBlockByHash(hash).pipe(map(response => parseGenericBlock(response)));
  }

  getTransactions(address: string): Observable<Transaction[]> {
    return this.api.getAddress(address).pipe(
      map(response => {
        response = response.sort((a, b) => a.txn.timestamp - b.txn.timestamp);

        let currentBalance = new BigNumber('0');
        return response.map(rawTx => {
          const parsedTx = parseGetTransaction(rawTx, address);
          parsedTx.initialBalance = currentBalance;
          currentBalance = currentBalance.plus(parsedTx.balance);
          parsedTx.finalBalance = currentBalance;
          return parsedTx;
        }).reverse();
      }));
  }

  getUnconfirmedTransactions(): Observable<Transaction[]> {
    return this.api.getUnconfirmedTransactions().pipe(
      map(response => response.map(rawTx => parseGetUnconfirmedTransaction(rawTx))));
  }

  getTransaction(transactionId: string): Observable<Transaction> {
    return this.api.getTransaction(transactionId).pipe(
      map(response => parseGetTransaction(response)));
  }
}
