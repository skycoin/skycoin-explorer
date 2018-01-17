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
      const hashVal = this.query.trim();
      console.log(hashVal.length)
    if (hashVal.length >= 27 && hashVal.length <= 34 ) {
      this.router.navigate(['/app/address', hashVal]);
    } else if (hashVal.length === 64) {
      this.router.navigate(['/app/transaction', hashVal]);
    } else {
      this.router.navigate(['/app/block', hashVal]);
    }
    this.query = null;
  }
}
