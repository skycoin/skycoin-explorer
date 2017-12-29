import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Output } from '../../../app.datatypes';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  address: string;
  balance: number;
  transactions = [];

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.address = params['address'];
      return this.explorer.getTransactions(this.address);
    }).subscribe(transactions => { 
      //The transactions are ordered from the most recent to the oldest.
      transactions.sort((t1:Transaction, t2:Transaction) => {
        if (t1.timestamp > t2.timestamp) { return -1; }
        if (t1.timestamp < t2.timestamp) { return 1; }
        return 0;
      });
      this.transactions = transactions;
    });

    this.route.params.switchMap((params: Params) => this.api.getCurrentBalance(params['address']))
      .subscribe(response => this.balance = response.head_outputs.reduce((a, b) => a + parseFloat(b.coins), 0));
  }

  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }
}
