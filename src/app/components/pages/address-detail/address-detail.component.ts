import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Output, Transaction } from '../../../app.datatypes';
import { SearchDataService } from '../../../services/search-data.service';

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
    private searchDataService: SearchDataService
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.address = params['address'];

      if (this.address == this.searchDataService.hash)
        return Observable.create(obs => {
          obs.next(this.searchDataService.data as Transaction[]);
          obs.complete();
        }) as Observable<Transaction[]>;
      else
        return this.explorer.getTransactions(this.address);

    }).subscribe(transactions => this.transactions = transactions);

    this.route.params.switchMap((params: Params) => this.api.getCurrentBalance(params['address']))
      .subscribe(response => this.balance = response.head_outputs.reduce((a, b) => a + parseFloat(b.coins), 0));
  }

  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }
}
