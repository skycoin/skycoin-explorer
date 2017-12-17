import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { Block } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import 'rxjs/add/operator/first';
import 'rxjs/Subscription';

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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getBlockchainMetadata().first().subscribe(blockchain => {
      this.blockCount = blockchain.blocks;
      this.route.paramMap
        .subscribe(params => {
          const pageIndex = parseInt(params.get('page'), 10) - 1
          this.navigate(pageIndex)
        });
    });

    this.api.getCoinSupply().first().subscribe(response => {
      this.currentSupply = response.current_supply;
      this.totalSupply = response.total_supply;
    })

  }

  open(block: Block) {
    this.router.navigate(['/app/block', block.id]);
  }

  navigate(pageIndex) {
    this.pageIndex = pageIndex;
    const end = this.blockCount - (this.pageIndex * this.pageSize);
    const begin = end - this.pageSize + 1;
    this.explorer.getBlocks(begin > 0 ? begin : 0, end > 0 ? end : 0).first().subscribe(blocks => this.blocks = blocks);
  }
}
