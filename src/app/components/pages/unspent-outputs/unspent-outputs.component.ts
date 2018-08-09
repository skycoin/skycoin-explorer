import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { Block, Output, Transaction, GetCurrentBalanceResponse } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-unspent-outputs',
  templateUrl: './unspent-outputs.component.html',
  styleUrls: ['./unspent-outputs.component.scss']
})
export class UnspentOutputsComponent implements OnInit {
  address: string;
  outputs: GetCurrentBalanceResponse;
  coins: number = null;
  loadingMsg = "";
  longErrorMsg: string;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.get('general.loadingMsg').subscribe((res: string) => {
      this.loadingMsg = res;
    });
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.address = params['address'];
      return this.api.getCurrentBalance(params['address'])
    }).subscribe(response => {
      this.outputs = response;
      this.coins = response.head_outputs.reduce((a, b) => a + parseFloat(b.coins), 0);
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
