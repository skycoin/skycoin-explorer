import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import moment from 'moment-es6';
import 'rxjs/add/operator/mergeMap';
import { Output, Transaction } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { SearchDataService } from '../../../services/search-data.service';

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
    private router: Router,
    private searchDataService: SearchDataService
  ) {}

  ngOnInit() {
    this.route.params. flatMap((params: Params) => {
        if (params['txid'] == this.searchDataService.hash)
          return Observable.create(obs => {
            obs.next(this.searchDataService.data as Transaction);
            obs.complete();
          }) as Observable<Transaction>;
        else
          return this.explorer.getTransaction(params['txid'])
      })
      .subscribe(transaction => {this.searchDataService.hash = null, this.transaction = transaction});
  }

  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }

  openTransaction(transaction: Transaction) {
    this.router.navigate(['/app/transaction', transaction.id])
  }
}
