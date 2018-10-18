import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SearchService, SearchError } from '../../../services/search/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  query: string;
  searching = false;

  constructor(
    public searchService: SearchService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  search() {
    if (!this.query) { return; }
    const hashVal = this.query.trim();
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

    navCommands.resultNavCommands.subscribe(
      result => { this.searching = false; this.router.navigate(result); },
      () => this.searching = false
    );
    this.query = null;
  }
}
