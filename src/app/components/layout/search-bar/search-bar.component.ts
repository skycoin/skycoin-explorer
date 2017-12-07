import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  constructor(
    private router: Router,
  ) { }

  searchBlockHistory(hashVal: string) {
    hashVal = hashVal.trim();
    if (hashVal.length === 34 || hashVal.length === 35 ) {
      this.router.navigate(['/app/address', hashVal]);
    } else if (hashVal.length === 64) {
      this.router.navigate(['/app/transaction', hashVal]);
    } else {
      this.router.navigate(['/app/block', hashVal]);
    }
  }
}
