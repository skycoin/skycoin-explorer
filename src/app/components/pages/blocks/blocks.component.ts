import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { Block } from '../../../app.datatypes';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  blocks: Block[] = [];
  pageCount = 0;
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getBlockchainMetadata().first().subscribe(blockchain => {
      this.pageCount = blockchain.blocks;
      this.setPage({ offset: 0 });
    });
  }

  onActivate(response) {
    if (response.row && response.row.id >= 0) {
      this.router.navigate(['/app/block', response.row.id]);
    }
  }

  setPage(pageInfo) {
    this.pageIndex = pageInfo.offset;
    const end = this.pageCount - (this.pageIndex * this.pageSize);
    const begin = end - this.pageSize;
    this.api.getBlocks(begin > 0 ? begin : 0, end > 0 ? end : 0).first().subscribe(blocks => this.blocks = blocks);
  }
}
