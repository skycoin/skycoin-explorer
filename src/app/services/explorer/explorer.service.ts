import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { Block, Output, parseGetAddressTransaction, parseGetBlocksBlock, parseGetTransaction, parseGetUnconfirmedTransaction, parseGetUxout, Transaction } from '../../app.datatypes';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class ExplorerService {

  constructor(
    private api: ApiService,
  ) { }

  getBlock(id: number): Observable<Block> {
    return this.api.getBlocks(id, id).flatMap(response => {
      if (response.blocks.length > 0) {
        const block = parseGetBlocksBlock(response.blocks[0]);
        return Observable.forkJoin(block.transactions.map(transaction => {
          return this.retrieveInputsForTransaction(transaction);
        })).map(transactions => {
          block.transactions = transactions;
          return block;
        });
      } else {
        let emptyArray: Block[] = [null];
        return emptyArray;
      }
    });
  }

  getBlocks(start: number, end: number): Observable<Block[]> {
    return this.api.getBlocks(start, end)
      .map(response => response.blocks.map(block => parseGetBlocksBlock(block)).sort((a, b) => b.id - a.id));
  }

  getBlockByHash(hash: string): Observable<Block> {
    return this.api.getBlock(hash).map(response => parseGetBlocksBlock(response));
  }

  getTransactions(address: string): Observable<Transaction[]> {
    return this.api.getAddress(address)
      .map(response => {
        response = response.sort((a, b) => b.timestamp - a.timestamp)

        let currentBalance = 0;
        return response.reverse().map(rawTx => {
          let parsedTx = parseGetAddressTransaction(rawTx, address);
          parsedTx.initialBalance = currentBalance;
          currentBalance += parsedTx.balance;
          parsedTx.finalBalance = currentBalance;
          return parsedTx;
        }).reverse()
      })
  }

  getUnconfirmedTransactions(): Observable<Transaction[]> {
    return this.api.getUnconfirmedTransactions()
      .flatMap(response => {

        let parsedResponse = response.map(rawTx => parseGetUnconfirmedTransaction(rawTx));

        if (parsedResponse.length > 0) {
          return Observable.forkJoin(parsedResponse.map(transaction => {
            return this.retrieveInputsForTransaction(transaction);
          }));
        } else {
          return Observable.of(parsedResponse);
        }
      })
  }
  
  getTransaction(transactionId: string): Observable<Transaction> {
    return this.api.getTransaction(transactionId)
      .map(response => parseGetTransaction(response))
      .flatMap(transaction => this.retrieveInputsForTransaction(transaction));
  }

  private retrieveInputsForTransaction(transaction: Transaction): Observable<Transaction> {
    if (transaction.inputs.length != 0) {
      return Observable.forkJoin(transaction.inputs.map(input => {
        return this.retrieveOutputById(input.hash);
      })).map(inputs => {
        transaction.inputs = inputs;
        return transaction;
      });
    } else {
      return Observable.of(transaction);
    }
  }

  private retrieveOutputById(id): Observable<Output> {
    return this.api.getUxout(id).map(response => parseGetUxout(response))
  }
}
