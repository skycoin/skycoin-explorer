import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  query: string;

  constructor(
    private router: Router,
  ) { }

  search() {
    if (this.query != undefined) {
      const hashVal = this.query.trim();
      if (hashVal.length > 0) {
        this.router.navigate(['/app/search', hashVal]);
      }
    }
  }
}
