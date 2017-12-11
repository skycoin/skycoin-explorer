import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { Block } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import 'rxjs/add/operator/first';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  blocks: Block[] = [];
  currentSupply: number;
  totalSupply: number;
  blockCount = 0;
  pageIndex = 0;
  pageSize = 10;

  get pageCount() {
    return Math.ceil(this.blockCount / this.pageSize);
  }

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getBlockchainMetadata().first().subscribe(blockchain => {
      this.blockCount = blockchain.blocks;
      this.navigate(0);
    });

    this.api.getCoinSupply().first().subscribe(response => {
      this.currentSupply = response.current_supply;
      this.totalSupply = response.total_supply;
    })
  }

  open(block: Block) {
    this.router.navigate(['/app/block', block.id]);
  }

  navigate(direction) {
    console.log(this.pageIndex + direction);
    if (this.pageIndex + direction < 0 || this.pageIndex + direction > this.pageCount) {
      console.log('returning');
      return
    }

    this.pageIndex = this.pageIndex + direction;
    const end = this.blockCount - (this.pageIndex * this.pageSize);
    const begin = end - this.pageSize + 1;
    this.explorer.getBlocks(begin > 0 ? begin : 0, end > 0 ? end : 0).first().subscribe(blocks => this.blocks = blocks);
  }
}
