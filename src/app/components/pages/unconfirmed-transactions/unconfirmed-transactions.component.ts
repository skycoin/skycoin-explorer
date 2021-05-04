import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Transaction } from '../../../app.datatypes';

/**
 * Page for showing the list of unconfirmed (pending) transactions.
 */
@Component({
  selector: 'app-unconfirmed-transactions',
  templateUrl: './unconfirmed-transactions.component.html',
  styleUrls: ['./unconfirmed-transactions.component.scss']
})
export class UnconfirmedTransactionsComponent implements OnInit, OnDestroy {
  /**
   * Transactions list.
   */
  transactions: Transaction[];
  /**
   * Date of the oldest unconfirmed transaction.
   */
  leastRecent: number;
  /**
   * Date of the most recent unconfirmed transaction.
   */
  mostRecent: number;
  /**
   * Combined size (in bytes) of all unconfirmed transactions.
   */
  totalSize: number;
  /**
   * Small text to be shown in variaous parts (not in the loading control) while loading the data.
   * It may also contain small error messages.
   */
  loadingMsg = 'general.loadingMsg';
  /**
   * Error message to be shown in the loading control if there is a problem.
   */
  longErrorMsg: string;

  /**
   * Observable subscriptions that will be cleaned when closing the page.
   */
  private pageSubscriptions: Subscription[] = [];

  constructor(
    private explorer: ExplorerService,
  ) { }

  ngOnInit() {
    // Request the data.
    this.pageSubscriptions.push(this.explorer.getUnconfirmedTransactions().subscribe(transactions => {
      this.transactions = transactions;
      // If there are unconfirmed transactions, calculate the values to be shown in the UI.
      if (transactions.length > 0) {
        const orderedList = transactions.sort((a, b) => b.timestamp - a.timestamp);
        this.mostRecent = orderedList[0].timestamp;
        this.leastRecent = orderedList[orderedList.length - 1].timestamp;
        this.totalSize = orderedList.map(tx => tx.length).reduce((sum, current) => sum + current);
      }
    }, () => {
      // Error loading the data.
      this.loadingMsg = 'general.shortLoadingErrorMsg';
      this.longErrorMsg = 'general.longLoadingErrorMsg';
    }));
  }

  ngOnDestroy() {
    // Clean all subscriptions.
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
