import { of as observableOf, Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BigNumber } from 'bignumber.js';

import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Transaction, GetBalanceResponse, GetUnconfirmedTransactionResponse, AddressTransactionsResponse } from 'app/app.datatypes';

/**
 * Page for showing info about a specific address.
 *
 * NOTE: This page may be reused between navigations, instead of being destroyed and recreated.
 * This helps to avoid realoading the same transactions again and again when an address has
 * so many transactions that it is needed to separate them in multiple pages. The main case in
 * which reloading data frequently can be very problematic is when checking the main address
 * of an exchange.
 */
@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit, OnDestroy {
  /**
   * Current address.
   */
  address: string;
  /**
   * Indicates if the data has been loaded.
   */
  dataLoaded = false;
  /**
   * How many transactions the address has.
   */
  totalTransactionsCount: number;
  /**
   * Total amount of coins received by the address.
   */
  totalReceived: BigNumber;
  /**
   * Total amount of coins sent from the address.
   */
  totalSent: BigNumber;
  /**
   * Current address coin balance.
   */
  balance: BigNumber;
  /**
   * Current address coin hour balance.
   */
  hoursBalance: BigNumber;
  /**
   * How many incoming coins are in unconfirmed transactions.
   */
  pendingIncomingCoins: BigNumber;
  /**
   * How many outgoing coins are in unconfirmed transactions.
   */
  pendingOutgoingCoins: BigNumber;
  /**
   * Total amount of pending coins (pendingIncomingCoins - pendingOutgoingCoins).
   */
  pendingCoins: BigNumber;
  /**
   * Total amount of pending coin hours.
   */
  pendingHours: BigNumber;
  /**
   * Complete transactions list.
   */
  alltransactions: Transaction[];
  /**
   * Transactions to be shown in the current page.
   */
  pageTransactions: any[];
  /**
   * Current page.
   */
  pageIndex = 0;
  /**
   * How many pages with transactions the current address has.
   */
  pageCount = 0;
  /**
   * Max number of transactions per page.
   */
  readonly pageSize = 25;
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
   * If true, the address has few transactions and all of them are stored in memory. If false,
   * only the transactions of the current page are in memory and no information about how
   * many coins the address has received and sent is calculated.
   */
  hasManyTransactions = false;

  // Subscriptions that will be cleaned when closing the page.
  private navParamsSubscription: Subscription;
  private operationSubscription: Subscription;

  /**
   * Lastest response obtained when requesting the address balance to the node.
   */
  private lastestBalanceResponse: GetBalanceResponse;
  /**
   * Lastest response obtained when requesting the unconfirmed transactions to the node.
   */
  private lastestUnconfirmedResponse: GetUnconfirmedTransactionResponse[];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public explorer: ExplorerService
  ) { }

  ngOnInit() {
    // Check the URL to detect changes in the requested address and page.
    this.navParamsSubscription = this.route.params.subscribe(params => {
      // Update the data.
      this.getData(params);
    });
  }

  ngOnDestroy() {
    // Clean all subscriptions.
    this.navParamsSubscription.unsubscribe();
    this.operationSubscription.unsubscribe();
  }

  /**
   * Gets the data of the requested address and page.
   */
  private getData(routeParams: Params) {
    // Reset the content, but only if the address changed.
    if (this.address !== routeParams['address']) {
      // Reset the data variables.
      this.dataLoaded = false;
      this.totalTransactionsCount = undefined;
      this.alltransactions = undefined;
      this.balance = undefined;
      this.hoursBalance = undefined;
      this.hasManyTransactions = false;

      // Reset the loading/error messages.
      this.loadingMsg = 'general.loadingMsg';
      this.longErrorMsg = undefined;

      // Reset the cached values.
      this.lastestBalanceResponse = undefined;
      this.lastestUnconfirmedResponse = undefined;
    }

    // Get the requested address and page.
    this.address = routeParams['address'];
    if (routeParams['page']) {
      this.pageIndex = parseInt(routeParams['page'], 10) - 1;
    } else {
      this.pageIndex = 0;
    }

    // Clear the list content.
    this.pageTransactions = undefined;

    // Cancel any previous pending operation.
    if (this.operationSubscription) {
      this.operationSubscription.unsubscribe();
    }

    let nextStep: Observable<AddressTransactionsResponse>;
    if (this.alltransactions && !this.hasManyTransactions) {
      // If this.alltransactions still has a value, the address does not have many transactions
      // (so all are in memory) and only the page was changed, there is no need for loading
      // the transactions again.
      nextStep = observableOf(<AddressTransactionsResponse> {
        totalTransactionsCount: this.totalTransactionsCount,
        currentPageIndex: this.pageIndex,
        totalPages: this.pageCount,
        recoveredTransactions: this.alltransactions,
        addressHasManyTransactions: false,
      });
    } else {
      // Make the loading indicator appear again and load the transactions.
      this.alltransactions = undefined;
      nextStep = this.explorer.getTransactions(this.address, this.pageIndex + 1, this.pageSize);
    }

    // Get the transactions.
    this.operationSubscription = nextStep.pipe(switchMap((response: AddressTransactionsResponse) => {
      // Save the pagination information.
      this.totalTransactionsCount = response.totalTransactionsCount;
      this.alltransactions = response.recoveredTransactions;
      this.hasManyTransactions = response.addressHasManyTransactions;
      this.pageCount = response.totalPages;
      this.pageIndex = response.currentPageIndex;

      if (!response.addressHasManyTransactions) {
        // Calculate the number of received and sent coins (counting the confirmed
        // transactions only).
        this.totalReceived = new BigNumber(0);
        response.recoveredTransactions.map(tx => this.totalReceived = this.totalReceived.plus(tx.balance.isGreaterThan(0) && tx.status ? tx.balance : 0));

        this.totalSent = new BigNumber(0);
        response.recoveredTransactions.map(tx => this.totalSent = this.totalSent.plus(tx.balance.isLessThan(0) && tx.status ? tx.balance : 0));
        this.totalSent = this.totalSent.negated();

        // Update the list of transactions that will be displayed in the UI.
        this.updateTransactions();
      } else {
        this.pageTransactions = this.alltransactions;
      }

      // Get the balance.
      if (this.lastestBalanceResponse) {
        // If this.lastestBalanceResponse still has a value, only the page, and not the
        // address, was changed, so there is no need for loading the data again.
        return observableOf(this.lastestBalanceResponse);
      } else {
        return this.api.getBalance(routeParams['address']);
      }
    }), switchMap((response: GetBalanceResponse) => {
      // Save the balance.
      this.lastestBalanceResponse = response;
      this.balance = new BigNumber(response.confirmed.coins).dividedBy(1000000);
      this.hoursBalance = new BigNumber(response.confirmed.hours);

      // Get the pending transactions.
      if (this.lastestUnconfirmedResponse) {
        // If this.lastestUnconfirmedResponse still has a value, only the page, and not the
        // address, was changed, so there is no need for loading the data again.
        return observableOf(this.lastestUnconfirmedResponse);
      } else {
        return this.api.getUnconfirmedTransactions();
      }
    })).subscribe((unconfirmed: GetUnconfirmedTransactionResponse[]) => {
      if (unconfirmed) {
        this.pendingIncomingCoins = new BigNumber(0);
        this.pendingOutgoingCoins = new BigNumber(0);
        this.pendingCoins = new BigNumber(0);
        this.pendingHours = new BigNumber(0);

        // Check al pending transactions.
        unconfirmed.forEach(tx => {
          // If there is an input with this address, all funds on it are considered going out.
          let coinsOut = new BigNumber(0);
          let hoursOut = new BigNumber(0);
          tx.transaction.inputs.forEach(input => {
            if (input.owner === routeParams['address']) {
              coinsOut = coinsOut.plus(input.coins);
              hoursOut = hoursOut.plus(input.calculated_hours);
            }
          });

          // If there is an output with this address, all funds on it are considered getting in.
          let coinsIn = new BigNumber(0);
          let hoursIn = new BigNumber(0);
          tx.transaction.outputs.forEach(output => {
            if (output.dst === routeParams['address']) {
              coinsIn = coinsIn.plus(output.coins);
              hoursIn = hoursIn.plus(output.hours);
            }
          });

          // Calculate the difference of funds entering and leaving.
          const coinsDifference = coinsIn.minus(coinsOut);
          const hoursDifference = hoursIn.minus(hoursOut);

          // Update the pending balance.
          this.pendingCoins = this.pendingCoins.plus(coinsDifference);
          this.pendingHours = this.pendingHours.plus(hoursDifference);

          if (coinsDifference.isGreaterThan(0)) {
            // If the total in this transaction is positive, update the amount of pending
            // incoming coins.
            this.pendingIncomingCoins = this.pendingIncomingCoins.plus(coinsDifference);
          } else if (coinsDifference.isLessThan(0)) {
            // If the total in this transaction is negative, update the amount of pending
            // outgoing coins.
            this.pendingOutgoingCoins = this.pendingOutgoingCoins.plus(coinsDifference.negated());
          }
        });
      }

      // If no transactions were found for the address.
      if (this.totalTransactionsCount < 1) {
        // Show that there are no transactions.
        this.longErrorMsg = 'addressDetail.withoutTransactions';
        // Needed for showing the previous msg.
        this.alltransactions = undefined;
      }

      this.dataLoaded = true;
    }, error => {
      if (error.status >= 400 && error.status < 500) {
        // The address was not found.
        this.loadingMsg = 'general.noData';
        this.longErrorMsg = 'addressDetail.invalidAddress';
      } else {
        // Error loading the data.
        this.loadingMsg = 'general.shortLoadingErrorMsg';
        this.longErrorMsg = 'general.longLoadingErrorMsg';
      }
    });
  }

  /**
   * Updates the list of transactions that will be displayed in the UI, to show only the
   * transactions of the current page.
   */
  private updateTransactions() {
    // If the user request an invalid page, show a valid one.
    if (this.pageIndex > this.alltransactions.length / this.pageSize) {
      this.pageIndex = Math.floor(this.alltransactions.length / this.pageSize);
    }
    if (this.pageIndex < 0) {
      this.pageIndex = 0;
    }

    // Get the transaction of the current page.
    this.pageTransactions = [];
    for (let i = this.pageIndex * this.pageSize; i < (this.pageIndex + 1) * this.pageSize && i < this.alltransactions.length; i++) {
      this.pageTransactions.push(this.alltransactions[i]);
    }
  }
}
