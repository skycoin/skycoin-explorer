import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import moment from 'moment-es6';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  transaction: any;

  private transactionObservable: Observable<any>;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transactionObservable = null;
    this.transaction = null;
  }

  ngOnInit() {
    this.transactionObservable = this.route.params
      .flatMap((params: Params) => {
        const txid = params['txid'];
        return this.api.getTransaction(txid);
      })
      .flatMap((trans: any) => {
        const tasks$ = [];
        this.transaction = trans;
        for (let i = 0; i < this.transaction.txn.inputs.length; i++){
          tasks$.push(this.getAddressOfInput(this.transaction.txn.inputs[i]));
        }
        return Observable.forkJoin(...tasks$);
      });

    this.transactionObservable.subscribe((trans) => {

      for (let i = 0; i < trans.length; i++){
        this.transaction.txn.inputs[i] = trans[i].owner_address;
      }
    })
  }

  getAddressOfInput(uxid: string): Observable<any>{
    return this.api.getInputAddress(uxid);
  }

  getTime(time: number){
    return moment.unix(time).utc().format('YYYY-MM-DD HH:mm:ss');
  }

}
