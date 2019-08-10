import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BigNumber } from 'bignumber.js';

import { ApiService } from '../api/api.service';
import { Block, parseGenericBlock, parseGetUnconfirmedTransaction, Transaction, parseGetTransaction } from '../../app.datatypes';

/**
 * Allows to request information from the server. This service returns processed objects,
 * unlike ApiService, which returns almost the same data returned by the node.
 */
@Injectable()
export class ExplorerService {

  // Variables with information about the node.
  internalFullCoinName = ' ';
  internalCoinName = ' ';
  internalHoursName = ' ';
  internalHoursNameSingular = ' ';
  internalMaxDecimals = 6;

  /**
   * Full coin name returned by the node.
   */
  get fullCoinName(): string {
    return this.internalFullCoinName;
  }
  /**
   * Small coin name returned by the node.
   */
  get coinName(): string {
    return this.internalCoinName;
  }
  /**
   * Plural coin hours name returned by the node.
   */
  get hoursName(): string {
    return this.internalHoursName;
  }
  /**
   * Singular coin hours name returned by the node.
   */
  get hoursNameSingular(): string {
    return this.internalHoursNameSingular;
  }
  /**
   * Max number of decimal places the coin amounts can have.
   */
  get maxDecimals(): number {
    return this.internalMaxDecimals;
  }

  /**
   * Lets know if the initialize() function has already been called.
   */
  private initialized = false;

  constructor(
    private api: ApiService,
  ) { }

  initialize() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    // Get basic information about the node.
    this.api.getHealth().subscribe(response => {
      this.internalFullCoinName = response.fiber.display_name;
      this.internalCoinName = response.fiber.ticker;
      this.internalHoursName = response.fiber.coin_hours_display_name;
      this.internalHoursNameSingular = response.fiber.coin_hours_display_name_singular;
      this.internalMaxDecimals = response.user_verify_transaction.max_decimals;
    });
  }

  /**
   * Gets a block by its ID (sequence number).
   * @param id Block ID (sequence number).
   */
  getBlock(id: number): Observable<Block> {
   return this.api.getBlockById(id).pipe(map(response => parseGenericBlock(response)));
  }

  /**
   * Gets an array with the blocks in a specific range.
   * @param start Number (height) of the first block (inclusive).
   * @param end Number (height) of the last block (inclusive).
   */
  getBlocks(start: number, end: number): Observable<Block[]> {
    return this.api.getBlocks(start, end).pipe(
      map(response => response.blocks.map(block => parseGenericBlock(block)).sort((a, b) => b.id - a.id)));
  }

  /**
   * Gets a block by its hash.
   * @param hash Block hash.
   */
  getBlockByHash(hash: string): Observable<Block> {
    return this.api.getBlockByHash(hash).pipe(map(response => parseGenericBlock(response)));
  }

  /**
   * Gets the list of transactions of a specific address.
   * @param address Address to consult.
   */
  getTransactions(address: string): Observable<Transaction[]> {
    return this.api.getAddress(address).pipe(
      map(response => {
        // Sort to get the lastest transactions last (it will be reversed below).
        response = response.sort((a, b) => a.txn.timestamp - b.txn.timestamp);

        // Calculate the balance variation after every transaction.
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

  /**
   * Gets the list of unconfirmed transactions.
   */
  getUnconfirmedTransactions(): Observable<Transaction[]> {
    return this.api.getUnconfirmedTransactions().pipe(
      map(response => response.map(rawTx => parseGetUnconfirmedTransaction(rawTx))));
  }

  /**
   * Gets a transaction by its hash.
   * @param transactionId Transaction hash.
   */
  getTransaction(transactionId: string): Observable<Transaction> {
    return this.api.getTransaction(transactionId).pipe(
      map(response => parseGetTransaction(response)));
  }
}
