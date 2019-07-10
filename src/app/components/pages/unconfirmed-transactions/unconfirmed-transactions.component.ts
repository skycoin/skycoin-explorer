import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Transaction } from '../../../app.datatypes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unconfirmed-transactions',
  templateUrl: './unconfirmed-transactions.component.html',
  styleUrls: ['./unconfirmed-transactions.component.scss']
})
export class UnconfirmedTransactionsComponent implements OnInit, OnDestroy {

  transactions: Transaction[];
  leastRecent: number;
  mostRecent: number;
  totalSize: number;
  loadingMsg = 'general.loadingMsg';
  longErrorMsg: string;

  private pageSubscriptions: Subscription[] = [];

  constructor(
    private explorer: ExplorerService,
  ) { }

  ngOnInit() {
    this.pageSubscriptions.push(this.explorer.getUnconfirmedTransactions().subscribe(transactions => {
      this.transactions = transactions;
      if (transactions.length > 0) {
        const orderedList = transactions.sort((a, b) => b.timestamp - a.timestamp);
        this.mostRecent = orderedList[0].timestamp;
        this.leastRecent = orderedList[orderedList.length - 1].timestamp;
        this.totalSize = orderedList.map(tx => tx.length).reduce((sum, current) => sum + current);
      }
    }, () => {
      this.loadingMsg = 'general.shortLoadingErrorMsg';
      this.longErrorMsg = 'general.longLoadingErrorMsg';
    }));
  }

  ngOnDestroy() {
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
