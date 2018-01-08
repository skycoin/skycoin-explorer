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
    this.router.navigate(['/app/search', hashVal]);
  }
}
