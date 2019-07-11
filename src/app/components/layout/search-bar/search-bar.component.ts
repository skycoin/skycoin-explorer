import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { SearchService, SearchError } from '../../../services/search/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {
  @ViewChild('input') input: ElementRef;

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

  search() {
    if (this.searching) { return; }
    const hashVal = this.input.nativeElement.value.trim();
    if (hashVal.length < 1) { return; }

    this.searching = true;

    const navCommands = this.searchService.getResultNavCommands(hashVal);
    if (navCommands.error) {
      if (navCommands.error === SearchError.InvalidSearchTerm) {
        alert(this.translate.instant('search.unableToFind', { term: hashVal }));
      }
      this.searching = false;
      return;
    }

    this.operationSubscription = navCommands.resultNavCommands.subscribe(
      result => { this.searching = false; this.router.navigate(result); this.input.nativeElement.value = ''; },
      () => this.searching = false
    );
  }
}
