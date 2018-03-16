import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Output, Transaction } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-unconfirmed-transactions',
  templateUrl: './unconfirmed-transactions.component.html',
  styleUrls: ['./unconfirmed-transactions.component.scss']
})
export class UnconfirmedTransactionsComponent implements OnInit {

  transactions: Transaction[];
  leastRecent: number;
  mostRecent: number;
  loadingMsg = "Loading...";
  longErrorMsg: string;

  constructor(
    private explorer: ExplorerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.explorer.getUnconfirmedTransactions().subscribe(transactions => {
      this.transactions = transactions;
      if (transactions.length > 0) {
        let orderedList = transactions.sort((a, b) => b.timestamp - a.timestamp);
        this.mostRecent = orderedList[0].timestamp;
        this.leastRecent = orderedList[orderedList.length-1].timestamp;
      }
    }, error => {
      this.loadingMsg = "Loading error";
      this.longErrorMsg = "Error loading data, try again later...";
    });
  }
}
