import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { GetCurrentBalanceResponse } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';
import { BigNumber } from 'bignumber.js';

@Component({
  selector: 'app-unspent-outputs',
  templateUrl: './unspent-outputs.component.html',
  styleUrls: ['./unspent-outputs.component.scss']
})
export class UnspentOutputsComponent implements OnInit {
  address: string;
  outputs: GetCurrentBalanceResponse;
  coins: BigNumber = null;
  hours: BigNumber = null;
  loadingMsg = '';
  longErrorMsg: string;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    translate.get('general.loadingMsg').subscribe((res: string) => {
      this.loadingMsg = res;
    });
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.address = params['address'];
      return this.api.getCurrentBalance(params['address']);
    }).subscribe(response => {
      this.outputs = response;

      this.coins = new BigNumber(0);
      response.head_outputs.map(o => this.coins = this.coins.plus(o.coins));

      this.hours = new BigNumber(0);
      response.head_outputs.map(o => this.hours = this.hours.plus(o.calculated_hours));
    }, error => {
      if (error.status >= 400 && error.status < 500) {
        this.translate.get(['general.noData', 'unspentOutputs.withoutOutputs']).subscribe((res: string[]) => {
          this.loadingMsg = res['general.noData'];
          this.longErrorMsg = res['unspentOutputs.withoutOutputs'];
        });
      } else {
        this.translate.get(['general.shortLoadingErrorMsg', 'general.longLoadingErrorMsg']).subscribe((res: string[]) => {
          this.loadingMsg = res['general.shortLoadingErrorMsg'];
          this.longErrorMsg = res['general.longLoadingErrorMsg'];
        });
      }
    });
  }
}
