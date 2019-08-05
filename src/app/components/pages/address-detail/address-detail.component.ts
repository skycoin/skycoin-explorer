import { of as observableOf, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { BigNumber } from 'bignumber.js';
import { Transaction, GetBalanceResponse, GetUnconfirmedTransactionResponse } from 'app/app.datatypes';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit, OnDestroy {
  address: string;
  totalReceived: BigNumber;
  totalSent: BigNumber;
  balance: BigNumber;
  hoursBalance: BigNumber;
  pendingIncomingCoins: BigNumber;
  pendingOutgoingCoins: BigNumber;
  pendingCoins: BigNumber;
  pendingHours: BigNumber;
  transactions: Transaction[];
  pageTransactions: any[];
  pageIndex = 0;
  pageSize = 25;
  loadingMsg = 'general.loadingMsg';
  longErrorMsg: string;

  private pageSubscriptions: Subscription[] = [];

  get pageCount() {
    return Math.ceil(this.transactions.length / this.pageSize);
  }

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pageSubscriptions.push(this.route.params.pipe(switchMap((params: Params) => {
      // Clear the content if the address, and not just the page, changes
      if (this.address !== params['address']) {
        this.transactions = undefined;
        this.balance = undefined;
        this.hoursBalance = undefined;
      }

      this.address = params['address'];
      if (params['page']) {
        this.pageIndex = parseInt(params['page'], 10) - 1;
      }

      // Clear the list content.
      this.pageTransactions = undefined;

      if (this.transactions) {
        return observableOf(this.transactions);
      } else {
        return this.explorer.getTransactions(this.address);
      }

    })).subscribe(
      transactions => {
        this.transactions = transactions;

        this.totalReceived = new BigNumber(0);
        transactions.map(tx => this.totalReceived = this.totalReceived.plus(tx.balance.isGreaterThan(0) && tx.status ? tx.balance : 0));

        this.totalSent = new BigNumber(0);
        transactions.map(tx => this.totalSent = this.totalSent.plus(tx.balance.isLessThan(0) && tx.status ? tx.balance : 0));
        this.totalSent = this.totalSent.negated();

        this.updateTransactions();
      },
      error => {
        if (error.status >= 400 && error.status < 500) {
          this.loadingMsg = 'general.noData';
          this.longErrorMsg = 'addressDetail.withoutTransactions';
        } else {
          this.loadingMsg = 'general.shortLoadingErrorMsg';
          this.longErrorMsg = 'general.longLoadingErrorMsg';
        }
      }
    ));

    let routeParams: Params;
    let balanceResponse: GetBalanceResponse;
    this.pageSubscriptions.push(this.route.params.pipe(
      switchMap((params: Params) => {
        routeParams = params;

        this.balance = null;
        this.hoursBalance = null;
        this.pendingIncomingCoins = new BigNumber(0);
        this.pendingOutgoingCoins = new BigNumber(0);
        this.pendingCoins = new BigNumber(0);
        this.pendingHours = new BigNumber(0);

        return this.api.getBalance(routeParams['address']);
      }), switchMap((response: GetBalanceResponse) => {
        balanceResponse = response;

        return this.api.getUnconfirmedTransactions();
      })
    ).subscribe((unconfirmed: GetUnconfirmedTransactionResponse[]) => {
      this.balance = new BigNumber(balanceResponse.confirmed.coins).dividedBy(1000000);
      this.hoursBalance = new BigNumber(balanceResponse.confirmed.hours);

      if (unconfirmed) {
        unconfirmed.forEach(tx => {
          let coinsOut = new BigNumber(0);
          let hoursOut = new BigNumber(0);
          tx.transaction.inputs.forEach(input => {
            if (input.owner === routeParams['address']) {
              coinsOut = coinsOut.plus(input.coins);
              hoursOut = hoursOut.plus(input.calculated_hours);
            }
          });

          let coinsIn = new BigNumber(0);
          let hoursIn = new BigNumber(0);
          tx.transaction.outputs.forEach(output => {
            if (output.dst === routeParams['address']) {
              coinsIn = coinsIn.plus(output.coins);
              hoursIn = hoursIn.plus(output.hours);
            }
          });

          const coinsDifference = coinsIn.minus(coinsOut);
          const hoursDifference = hoursIn.minus(hoursOut);

          this.pendingCoins = this.pendingCoins.plus(coinsDifference);
          this.pendingHours = this.pendingHours.plus(hoursDifference);

          if (coinsDifference.isGreaterThan(0)) {
            this.pendingIncomingCoins = this.pendingIncomingCoins.plus(coinsDifference);
          } else if (coinsDifference.isLessThan(0)) {
            this.pendingOutgoingCoins = this.pendingOutgoingCoins.plus(coinsDifference.negated());
          }
        });
      }
    }));
  }

  ngOnDestroy() {
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }

  updateTransactions() {
    if (this.pageIndex > this.transactions.length / this.pageSize) {
      this.pageIndex = Math.floor(this.transactions.length / this.pageSize);
    }

    this.pageTransactions = [];
    for (let i = this.pageIndex * this.pageSize; i < (this.pageIndex + 1) * this.pageSize && i < this.transactions.length; i++) {
      this.pageTransactions.push(this.transactions[i]);
    }
  }
}
