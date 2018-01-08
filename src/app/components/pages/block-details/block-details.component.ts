import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { SearchDataService } from '../../../services/search-data.service';
import { Block, Output, Transaction } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {
  block: Block;

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router,
    private searchDataService: SearchDataService
  ) {
    this.block = null;
  }

  ngOnInit() {
    this.route.params.filter(params => +params['id'] !== null)
      .switchMap((params: Params) => {
        if (params['id'] == this.searchDataService.hash)
          return Observable.create(obs => {
            obs.next(this.searchDataService.data as Block);
            obs.complete();
          });
        else
          return this.explorer.getBlockByHash(params['id'])
      })
      .subscribe((block: Block) => {this.searchDataService.hash = null; this.block = block});
  }

  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }

  openBlock(blockId: string) {
    this.router.navigate(['/app/block', blockId]);
  }

  openTransaction(transaction: Transaction) {
    this.router.navigate(['/app/transaction', transaction.id])
  }
}
