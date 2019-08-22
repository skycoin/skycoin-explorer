import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BigNumber } from 'bignumber.js';
import { Subscription } from 'rxjs';

import { ApiService } from '../../../services/api/api.service';
import { GetCurrentBalanceResponse } from '../../../app.datatypes';

/**
 * Page for showing the list of unspent outputs of a specific address.
 */
@Component({
  selector: 'app-unspent-outputs',
  templateUrl: './unspent-outputs.component.html',
  styleUrls: ['./unspent-outputs.component.scss']
})
export class UnspentOutputsComponent implements OnInit, OnDestroy {
  /**
   * Current address.
   */
  address: string;
  /**
   * Unspent outputs of the current address.
   */
  outputs: GetCurrentBalanceResponse;
  /**
   * Total number of coins in the unspent outputs.
   */
  coins: BigNumber = null;
  /**
   * Total number of hours in the unspent outputs.
   */
  hours: BigNumber = null;
  /**
   * Small text to be shown in variaous parts (not in the loading control) while loading the data.
   * It may also contain small error messages.
   */
  loadingMsg = 'general.loadingMsg';
  /**
   * Error message to be shown in the loading control if there is a problem.
   */
  longErrorMsg: string;

  /**
   * Observable subscriptions that will be cleaned when closing the page.
   */
  private pageSubscriptions: Subscription[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Get the URL params.
    this.pageSubscriptions.push(this.route.params.pipe(switchMap((params: Params) => {
      // Get the address and request the data.
      this.address = params['address'];
      return this.api.getCurrentBalance(params['address']);
    })).subscribe(response => {
      this.outputs = response;

      // Calculate the total number of coins and hours.
      this.coins = new BigNumber(0);
      this.hours = new BigNumber(0);
      response.head_outputs.map(o => {
        this.coins = this.coins.plus(o.coins);
        this.hours = this.hours.plus(o.calculated_hours);
      });
    }, error => {
      if (error.status >= 400 && error.status < 500) {
        // The address was not found.
        this.loadingMsg = 'general.noData';
        this.longErrorMsg = 'unspentOutputs.withoutOutputs';
      } else {
        // Error loading the data.
        this.loadingMsg = 'general.shortLoadingErrorMsg';
        this.longErrorMsg = 'general.longLoadingErrorMsg';
      }
    }));
  }

  ngOnDestroy() {
    // Clean all subscriptions.
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
