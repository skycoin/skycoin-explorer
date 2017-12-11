import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import moment from 'moment-es6';
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

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.flatMap((params: Params) => this.explorer.getTransaction(params['txid']))
      .subscribe(transaction => this.transaction = transaction);
  }

  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }

  openTransaction(transaction: Transaction) {
    this.router.navigate(['/app/transaction', transaction.id])
  }
}
