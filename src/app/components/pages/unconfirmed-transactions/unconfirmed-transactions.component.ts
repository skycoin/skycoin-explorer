import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Transaction } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-unconfirmed-transactions',
  templateUrl: './unconfirmed-transactions.component.html',
  styleUrls: ['./unconfirmed-transactions.component.scss']
})
export class UnconfirmedTransactionsComponent implements OnInit {

  transactions: Transaction[];
  leastRecent: number;
  mostRecent: number;
  totalSize: number;
  loadingMsg = "";
  longErrorMsg: string;

  constructor(
    private explorer: ExplorerService,
    private translate: TranslateService
  ) {
    translate.get('general.loadingMsg').subscribe((res: string) => {
      this.loadingMsg = res;
    });
  }

  ngOnInit() {
    this.explorer.getUnconfirmedTransactions().subscribe(transactions => {
      this.transactions = transactions;
      if (transactions.length > 0) {
        let orderedList = transactions.sort((a, b) => b.timestamp - a.timestamp);
        this.mostRecent = orderedList[0].timestamp;
        this.leastRecent = orderedList[orderedList.length-1].timestamp;
        this.totalSize = orderedList.map(tx => tx.length).reduce((sum, current) => sum + current);
      }
    }, error => {
      this.translate.get(['general.shortLoadingErrorMsg', 'general.longLoadingErrorMsg']).subscribe((res: string[]) => {
        this.loadingMsg = res['general.shortLoadingErrorMsg'];
        this.longErrorMsg = res['general.longLoadingErrorMsg'];
      });
    });
  }
}
