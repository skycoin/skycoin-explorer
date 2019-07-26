import { mergeMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Transaction } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit, OnDestroy {

  transaction: Transaction;
  loadingMsg = 'general.loadingMsg';
  longErrorMsg: string;

  private pageSubscriptions: Subscription[] = [];

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.pageSubscriptions.push(this.route.params.pipe(mergeMap((params: Params) => this.explorer.getTransaction(params['txid'])))
      .subscribe(
        transaction => this.transaction = transaction,
        error => {
          if (error.status >= 400 && error.status < 500) {
            this.loadingMsg = 'general.noData';
            this.longErrorMsg = 'transactionDetail.canNotFind';
          } else {
            this.loadingMsg = 'general.shortLoadingErrorMsg';
            this.longErrorMsg = 'general.longLoadingErrorMsg';
          }
        }
      ));
  }

  ngOnDestroy() {
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
