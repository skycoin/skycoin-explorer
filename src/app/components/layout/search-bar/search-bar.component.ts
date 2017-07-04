import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  searchBlockHistory(hashVal:string){
    if(hashVal.length ==34 || hashVal.length ==35 ){
      this.router.navigate(['/app/address', hashVal]);
      return;
    }
    if(hashVal.length ==64){
      this.router.navigate(['/app/transaction', hashVal]);
      return;
    }
    this.router.navigate(['/app/block', hashVal]);
    return;
  }
}
