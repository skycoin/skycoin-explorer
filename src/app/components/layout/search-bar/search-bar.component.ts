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

  search(hashVal: string) {
    hashVal = this.query.trim();
    if (hashVal.length === 34 || hashVal.length === 35 ) {
      this.router.navigate(['/app/address', hashVal]);
    } else if (hashVal.length === 64) {
      this.router.navigate(['/app/transaction', hashVal]);
    } else {
      this.router.navigate(['/app/block', hashVal]);
    }
  }
}
