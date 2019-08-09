import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { SearchService, SearchError } from '../../../services/search/search.service';

/**
 * Shows the search bar. Is the user search something, this component takes cares of finding it
 * and redirecting the user.
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {
  /**
   * Search field.
   */
  @ViewChild('input') input: ElementRef;

  /**
   * If true, it is not possible to start another search and the UI is shown busy.
   */
  searching = false;

  private operationSubscription: Subscription;

  constructor(
    public searchService: SearchService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnDestroy() {
    if (this.operationSubscription && !this.operationSubscription.closed) {
      this.operationSubscription.unsubscribe();
    }
  }

  /**
   * Starts a seach with the text entered in input.
   */
  search() {
    // Do not continue if a search is in progress.
    if (this.searching) { return; }

    const valueToSearch = this.input.nativeElement.value.trim();
    // Do not continue if the string is empty.
    if (valueToSearch.length < 1) { return; }

    this.searching = true;

    // Get where the user should be redirected to.
    const navCommands = this.searchService.processTerm(valueToSearch);
    if (navCommands.error) {
      if (navCommands.error === SearchError.InvalidSearchTerm) {
        alert(this.translate.instant('search.unableToFind', { term: valueToSearch }));
      }
      this.searching = false;

      return;
    }

    // If there is no error, wait for the navigation commands needed for redirecting the user
    // to the page with the requested data.
    this.operationSubscription = navCommands.resultNavCommands.subscribe(
      result => {
        // Navigate to the page with the requested data.
        this.router.navigate(result);

        // Reset the control.
        this.searching = false;
        this.input.nativeElement.value = '';
      },
      () => this.searching = false
    );
  }
}
