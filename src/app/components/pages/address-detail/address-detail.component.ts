import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  address: string;
  totalReceived: number;
  totalSent: number;
  balance: number;
  hoursBalance: number;
  transactions: any[];
  pageTransactions: any[];
  pageIndex = 0;
  pageSize = 25;
  loadingMsg = "";
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
    this.route.params.switchMap((params: Params) => {
      //Clear the content if the address, and not just the page, changes
      if (this.address != params['address']) {
        this.transactions = undefined;
        this.balance = undefined;
        this.hoursBalance = undefined;        
      }

      this.address = params['address'];
      if (params['page'])
        this.pageIndex = parseInt(params['page'], 10) - 1;

      //Clear the list content.
      this.pageTransactions = undefined;

      if (this.transactions)
        return Observable.of(this.transactions);
      else
        return this.explorer.getTransactions(this.address);

    }).subscribe(
      transactions => {
        this.transactions = transactions;
        this.totalReceived = transactions.reduce((a, b) => b.balance > 0 ? (a + b.balance) : a, 0);
        this.totalSent = transactions.reduce((a, b) => b.balance < 0 ? (a + b.balance) : a, 0) * -1;
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
    
    this.route.params.switchMap((params: Params) => this.api.getBalance(params['address']))
      .subscribe(response => {
        this.balance = response.confirmed.coins / 1000000;
        this.hoursBalance = response.confirmed.hours;
      });
  }

  updateTransactions() {
    if (this.pageIndex > this.transactions.length / this.pageSize)
      this.pageIndex = Math.floor(this.transactions.length / this.pageSize);

    this.pageTransactions = [];
    for (let i=this.pageIndex * this.pageSize; i<(this.pageIndex+1)*this.pageSize && i<this.transactions.length; i++) {
      this.pageTransactions.push(this.transactions[i]);
    }
  }
}
