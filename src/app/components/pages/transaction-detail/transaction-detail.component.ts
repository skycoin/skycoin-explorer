import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { Output, Transaction } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  transaction: Transaction;
  loadingMsg = "";
  longErrorMsg: string;

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.get('general.loadingMsg').subscribe((res: string) => {
      this.loadingMsg = res;
    });
  }

  ngOnInit() {
    this.route.params.flatMap((params: Params) => this.explorer.getTransaction(params['txid']))
      .subscribe(
        transaction => this.transaction = transaction,
        error => {
          if (error.status >= 400 && error.status < 500) {
            this.translate.get(['general.noData', 'transactionDetail.canNotFind']).subscribe((res: string[]) => {
              this.loadingMsg = res['general.noData'];
              this.longErrorMsg = res['transactionDetail.canNotFind'];
            });
          } else {
            this.translate.get(['general.shortLoadingErrorMsg', 'general.longLoadingErrorMsg']).subscribe((res: string[]) => {
              this.loadingMsg = res['general.shortLoadingErrorMsg'];
              this.longErrorMsg = res['general.longLoadingErrorMsg'];
            });
          }
        }
      );
  }
}
