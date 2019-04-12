import { of as observableOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { BigNumber } from 'bignumber.js';
import { Transaction } from 'app/app.datatypes';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
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
  loadingMsg = '';
  longErrorMsg: string;

  get pageCount() {
    return Math.ceil(this.transactions.length / this.pageSize);
  }

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    translate.get('general.loadingMsg').subscribe((res: string) => {
      this.loadingMsg = res;
    });
  }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => {
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
          this.translate.get(['general.noData', 'addressDetail.withoutTransactions']).subscribe((res: string[]) => {
            this.loadingMsg = res['general.noData'];
            this.longErrorMsg = res['addressDetail.withoutTransactions'];
          });
        } else {
          this.translate.get(['general.shortLoadingErrorMsg', 'general.longLoadingErrorMsg']).subscribe((res: string[]) => {
            this.loadingMsg = res['general.shortLoadingErrorMsg'];
            this.longErrorMsg = res['general.longLoadingErrorMsg'];
          });
        }
      }
    );

    this.route.params.pipe(switchMap((params: Params) => this.api.getBalance(params['address'])))
      .subscribe(response => {
        this.balance = new BigNumber(response.confirmed.coins).dividedBy(1000000);
        this.hoursBalance = new BigNumber(response.confirmed.hours);
        this.pendingBalance = new BigNumber(response.predicted.coins).dividedBy(1000000).minus(this.balance);
        this.pendingHoursBalance = new BigNumber(response.predicted.hours).minus(this.hoursBalance);
      });
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
