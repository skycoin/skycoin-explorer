import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchDataService } from '../../../services/search-data.service';
import { Block } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import 'rxjs/add/operator/first';
import 'rxjs/Subscription';

class ResultsUrls {
  static Address = "/app/address";
  static Block = "/app/block";
  static Transaction = "/app/transaction";
}
@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  error = false;

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router,
    private searchDataService: SearchDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      var regexSha256 = new RegExp("^[a-fA-F0-9]+$");
      if (params['term'].length === 64 )
        if (regexSha256.test(params['term'])) {
          this.searchTransaction(params['term']);
          return;
        } else {
          this.error = true;
          return;
        }
      
      let termIsNumber = false;
      if (this.isPositiveInteger(params['term']))
        termIsNumber = true;

      if (termIsNumber == true) {
        this.searchBlock(params['term'])
        return;
      } else if (params['term'].length > 10) {
        var regexBase58 = new RegExp("^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$");
        if (regexBase58.test(params['term'])) {
          this.searchAddress(params['term'])
          return;
        }
      }

      this.error = true;
    });
  }

  isPositiveInteger(term:string) : boolean {
    let parsedTerm = parseInt(term);
    if (isNaN(parsedTerm))
      return false;
    
    var Number = Math.floor(parsedTerm);
    return String(parsedTerm) === term && Number >= 0;
  }

  searchAddress(term:string) {
    this.explorer.getTransactions(term)
      .subscribe((transactions) => this.navigate(term, ResultsUrls.Address, transactions), (error: any) => this.error = true);
  }
  searchTransaction(term:string) {
    this.explorer.getTransaction(term)
      .subscribe((transaction) => this.navigate(term, ResultsUrls.Transaction, transaction), (error: any) => this.searchBlockByHash(term));
  }
  searchBlockByHash(term:string) {
    this.explorer.getBlockByHash(term)
      .subscribe((block: Block) => this.navigate(term, ResultsUrls.Block, block), (error: any) => this.error = true);
  }
  searchBlock(term:string) {
      this.explorer.getBlock(parseInt(term))
        .subscribe((block: Block) => this.navigate(block.hash, ResultsUrls.Block, block), (error: any) => this.error = true);
  }

  navigate(hash: string, page: string, recoveredData) {
    this.searchDataService.hash = hash;
    this.searchDataService.data = recoveredData;
    this.router.navigate([page, hash], {replaceUrl:true});
  }
}
