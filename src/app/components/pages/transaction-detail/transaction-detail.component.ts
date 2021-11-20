import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Transaction } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';

/**
 * Page for showing info about a specific transaction.
 */
@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
  /**
   * Current transaction.
   */
  transaction: Transaction;
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Get the URL params and request the data.
    this.pageSubscriptions.push(this.route.params.pipe(
      switchMap((params: Params) => this.explorer.getTransaction(params['txid']))
    ).subscribe(
      transaction => this.transaction = transaction,
      error => {
        if (error.status >= 400 && error.status < 500) {
          // The transaction was not found.
          this.loadingMsg = 'general.noData';
          this.longErrorMsg = 'transactionDetail.canNotFind';
        } else {
          // Error loading the data.
          this.loadingMsg = 'general.shortLoadingErrorMsg';
          this.longErrorMsg = 'general.longLoadingErrorMsg';
        }
      }
    ));
  }

  ngOnDestroy() {
    // Clean all subscriptions.
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
