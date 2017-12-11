import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import moment from 'moment-es6';
import 'rxjs/add/operator/mergeMap';
import { Output } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  transaction: any;

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.flatMap((params: Params) => this.explorer.getTransaction(params['txid']))


    //   .flatMap((trans: any) => {
    //     const tasks$ = [];
    //     this.transaction = trans;
    //     for (let i = 0; i < this.transaction.txn.inputs.length; i++){
    //       tasks$.push(this.getAddressOfInput(this.transaction.txn.inputs[i]));
    //     }
    //     return Observable.forkJoin(...tasks$);
    // });
    //
    // this.transactionObservable.subscribe(trans => {
    //   this.loading = false;
    //   for (let i = 0; i < trans.length; i++) {
    //     this.transaction.txn.inputs[i] = trans[i].owner_address;
    //   }
    // }, error => {
    //   // TODO -- error message
    //   this.loading = false;
    //   console.log(error);
    // });
  }

  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }
}
