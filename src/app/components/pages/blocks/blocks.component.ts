import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { Block } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  blocks: Block[] = [];
  currentSupply: number;
  totalSupply: number;
  currentCoinhourSupply: number;
  totalCoinhourSupply: number;
  blockCount = 0;
  pageIndex = 0;
  pageSize = 10;
  loadingCoinSupplyMsg = '';
  loadingMetadataMsg = '';
  longErrorMsg: string;

  mouseOver = -1;

  get pageCount() {
    return Math.ceil(this.blockCount / this.pageSize);
  }

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private route: ActivatedRoute,
  ) {
   this.loadingCoinSupplyMsg = this.loadingMetadataMsg = 'general.loadingMsg';
  }

  ngOnInit() {
    this.api.getBlockchainMetadata().pipe(first()).subscribe(blockchain => {
      this.blockCount = blockchain.blocks;
      this.route.paramMap
        .subscribe(params => {
          const pageIndex = parseInt(params.get('page'), 10) - 1;
          this.navigate(pageIndex);
        });
    }, () => {
      this.loadingMetadataMsg = 'general.shortLoadingErrorMsg';
      this.longErrorMsg = 'general.longLoadingErrorMsg';
    });

    this.api.getCoinSupply().pipe(first()).subscribe(response => {
      this.currentSupply = response.current_supply;
      this.totalSupply = response.total_supply;
      this.currentCoinhourSupply = response.current_coinhour_supply;
      this.totalCoinhourSupply = response.total_coinhour_supply;
    }, () => {
      this.loadingCoinSupplyMsg = 'general.shortLoadingErrorMsg';
    });

  }

  navigate(pageIndex) {
    this.pageIndex = pageIndex;
    const end = this.blockCount - (this.pageIndex * this.pageSize);
    const begin = end - this.pageSize + 1;
    this.explorer.getBlocks(begin > 0 ? begin : 0, end > 0 ? end : 0).pipe(first()).subscribe(blocks => this.blocks = blocks);
  }
}
