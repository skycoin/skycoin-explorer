import { first } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from '../../../services/api/api.service';
import { RichlistEntry } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';

/**
 * Page for showing the list of unlocked addresses with most coins.
 */
@Component({
  templateUrl: './richlist.component.html',
  styleUrls: ['./richlist.component.scss']
})
export class RichlistComponent implements OnInit, OnDestroy {
  /**
   * List to be shown in the UI.
   */
  entries: RichlistEntry[] = [];
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
    public explorer: ExplorerService
  ) {}

  ngOnInit() {
    // Get the data.
    this.pageSubscriptions.push(this.api.getRichlist().pipe(first()).subscribe(entries => this.entries = entries,
      () => {
        // Error loading the data.
        this.longErrorMsg = 'general.longLoadingErrorMsg';
    }));
  }

  ngOnDestroy() {
    // Clean all subscriptions.
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
