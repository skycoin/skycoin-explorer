import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { Output, Transaction } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  transaction: Transaction;
  loadingMsg = "Loading...";
  longErrorMsg: string;

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.flatMap((params: Params) => this.explorer.getTransaction(params['txid']))
      .subscribe(
        transaction => this.transaction = transaction,
        error => {
          this.loadingMsg = "Loading error";
          if (error.status >= 400 && error.status < 400)
            this.longErrorMsg = "Unable to find the transaction";
          else
            this.longErrorMsg = "Error loading data, try again later...";
        }
      );
  }
}
