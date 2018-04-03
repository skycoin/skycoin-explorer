import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Output, Transaction } from '../../../app.datatypes';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  address: string;
  totalReceived: number;
  balance: number;
  transactions: any[];
  pageTransactions: any[];
  pageIndex = 0;
  pageSize = 25;
  loadingMsg = "Loading...";
  longErrorMsg: string;

  get pageCount() {
    return Math.ceil(this.transactions.length / this.pageSize);
  }

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.address = params['address'];
      if (params['page'])
        this.pageIndex = parseInt(params['page'], 10) - 1;

      if (this.transactions)
        return Observable.of(this.transactions);
      else
        return this.explorer.getTransactions(this.address);

    }).subscribe(
      transactions => {
        this.transactions = transactions;
        this.totalReceived = transactions.reduce((a, b) => b.balance > 0 ? (a + b.balance) : a, 0);
        this.updateTransactions();
      },
      error => {
        if (error.status >= 400 && error.status < 500) {
          this.loadingMsg = "Loading error";
          this.longErrorMsg = "Without transactions";
        } else {
          this.loadingMsg = "Loading error";
          this.longErrorMsg = "Error loading data, try again later...";
        }
      }
    );

    this.route.params.switchMap((params: Params) => this.api.getCurrentBalance(params['address']))
      .subscribe(response => this.balance = response.head_outputs.reduce((a, b) => a + parseFloat(b.coins), 0));
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
