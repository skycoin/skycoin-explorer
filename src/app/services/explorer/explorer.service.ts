import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { Block, Output, parseGetAddressTransaction, parseGetBlocksBlock, parseGetTransaction, parseGetUxout, Transaction } from '../../app.datatypes';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ExplorerService {

  constructor(
    private api: ApiService,
  ) { }

  getBlock(id: number): Observable<Block> {
    return this.api.getBlocks(id, id).flatMap(response => {
      const block = parseGetBlocksBlock(response.blocks[0]);
      return Observable.forkJoin(block.transactions.map(transaction => {
        return this.retrieveInputsForTransaction(transaction);
      })).map(transactions => {
        block.transactions = transactions;
        return block;
      });
    });
  }

  getBlocks(start: number, end: number): Observable<Block[]> {
    return this.api.getBlocks(start, end)
      .map(response => response.blocks.map(block => parseGetBlocksBlock(block)).sort((a, b) => b.id - a.id));
  }

  getTransactions(address: string): Observable<Transaction[]> {
    return this.api.getAddress(address)
      .map(response => response.map(rawTx => parseGetAddressTransaction(rawTx, address)))
  }

  getTransaction(transactionId: string): Observable<Transaction> {
    return this.api.getTransaction(transactionId)
      .map(response => parseGetTransaction(response))
      .flatMap(transaction => this.retrieveInputsForTransaction(transaction));
  }

  private retrieveInputsForTransaction(transaction: Transaction): Observable<Transaction> {
    return Observable.forkJoin(transaction.inputs.map(input => {
      return this.retrieveOutputById(input.hash);
    })).map(inputs => {
      transaction.inputs = inputs;
      return transaction;
    });
  }

  private retrieveOutputById(id): Observable<Output> {
    return this.api.getUxout(id).map(response => parseGetUxout(response))
  }
}
