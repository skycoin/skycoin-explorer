import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SearchService, SearchError } from '../../../services/search/search.service';

@Component({
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  errorMsg: string;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.first()
      .subscribe((params: Params) => {
        if (!params['term'] || (params['term'].trim() as string).length < 1) {
          this.errorMsg = 'search.unableToFind';
        }
        this.searchTerm = params['term'].trim();

        const navCommands = this.searchService.getResultNavCommands(this.searchTerm);
        if (navCommands.error) {
          if (navCommands.error === SearchError.InvalidSearchTerm) {
            this.errorMsg = 'search.unableToFind';
          }
          return;
        }

        navCommands.resultNavCommands.subscribe(
          result => this.router.navigate(result, { replaceUrl: true }),
          err => this.errorMsg = 'search.unableToFind'
        );
      });
  }
}
