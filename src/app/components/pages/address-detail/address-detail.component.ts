import { of as observableOf, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { BigNumber } from 'bignumber.js';
import { Transaction } from 'app/app.datatypes';

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
  pendingBalance: BigNumber;
  pendingHoursBalance: BigNumber;
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

    this.pageSubscriptions.push(this.route.params.pipe(switchMap((params: Params) => this.api.getBalance(params['address'])))
      .subscribe(response => {
        this.balance = new BigNumber(response.confirmed.coins).dividedBy(1000000);
        this.hoursBalance = new BigNumber(response.confirmed.hours);
        this.pendingBalance = new BigNumber(response.predicted.coins).dividedBy(1000000).minus(this.balance);
        this.pendingHoursBalance = new BigNumber(response.predicted.hours).minus(this.hoursBalance);
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
