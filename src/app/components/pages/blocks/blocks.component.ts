import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  pageCount = 0;
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getBlockchainMetadata().first().subscribe(blockchain => {
      this.pageCount = blockchain.blocks;
      this.setPage({ offset: 0 });
    });

    this.api.getCoinSupply().first().subscribe(response => {
      this.currentSupply = response.current_supply;
      this.totalSupply = response.total_supply;
    })
  }

  open(block: Block) {
    this.router.navigate(['/app/block', block.id]);
  }

  setPage(pageInfo) {
    this.pageIndex = pageInfo.offset;
    const end = this.pageCount - (this.pageIndex * this.pageSize);
    const begin = end - this.pageSize;
    this.explorer.getBlocks(begin > 0 ? begin : 0, end > 0 ? end : 0).first().subscribe(blocks => this.blocks = blocks);
  }
}
