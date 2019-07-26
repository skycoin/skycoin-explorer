import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { GetCurrentBalanceResponse } from '../../../app.datatypes';
import { TranslateService } from '@ngx-translate/core';
import { BigNumber } from 'bignumber.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unspent-outputs',
  templateUrl: './unspent-outputs.component.html',
  styleUrls: ['./unspent-outputs.component.scss']
})
export class UnspentOutputsComponent implements OnInit, OnDestroy {
  address: string;
  outputs: GetCurrentBalanceResponse;
  coins: BigNumber = null;
  hours: BigNumber = null;
  loadingMsg = 'general.loadingMsg';
  longErrorMsg: string;

  private pageSubscriptions: Subscription[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.pageSubscriptions.push(this.route.params.pipe(switchMap((params: Params) => {
      this.address = params['address'];
      return this.api.getCurrentBalance(params['address']);
    })).subscribe(response => {
      this.outputs = response;

      this.coins = new BigNumber(0);
      response.head_outputs.map(o => this.coins = this.coins.plus(o.coins));

      this.hours = new BigNumber(0);
      response.head_outputs.map(o => this.hours = this.hours.plus(o.calculated_hours));
    }, error => {
      if (error.status >= 400 && error.status < 500) {
        this.loadingMsg = 'general.noData';
        this.longErrorMsg = 'unspentOutputs.withoutOutputs';
      } else {
        this.loadingMsg = 'general.shortLoadingErrorMsg';
        this.longErrorMsg = 'general.longLoadingErrorMsg';
      }
    }));
  }

  ngOnDestroy() {
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
