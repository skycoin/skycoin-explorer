import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { Block, Output, Transaction, GetCurrentBalanceResponse } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-unspent-outputs',
  templateUrl: './unspent-outputs.component.html',
  styleUrls: ['./unspent-outputs.component.scss']
})
export class UnspentOutputsComponent implements OnInit {
  address: string;
  outputs: GetCurrentBalanceResponse;
  coins: number;
  loadingMsg = "Loading...";
  longErrorMsg: string;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.address = params['address'];
      return this.api.getCurrentBalance(params['address'])
    }).subscribe(response => {
      this.outputs = response;
      this.coins = response.head_outputs.reduce((a, b) => a + parseFloat(b.coins), 0);
    }, error => {
      this.loadingMsg = "Loading error";
      if (error.status >= 400 && error.status < 500)
        this.longErrorMsg = "The address does not exist";
    });
  }
}
