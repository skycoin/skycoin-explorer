import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';
import moment from 'moment-es6';
import { Block, Transaction } from './block';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-block-chain-table',
  templateUrl: './block-chain-table.component.html',
  styleUrls: ['./block-chain-table.component.css']
})
export class BlockChainTableComponent implements OnInit {

  private blocks: Block[];
  private totalBlocks: number;
  private loading: boolean;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    this.loading = false;
    this.blocks = [];
  }

  GetBlockAmount(txns: Transaction[]) {
    const ret = [];
    _.each(txns, function(o){
      if (o.outputs) {
        _.each(o.outputs, function(_o){
          ret.push(_o.coins);
        })
      }

    });

    const totalCoins = ret.reduce(function(memo, coin) {
      return memo + parseInt(coin);
    }, 0);
    return totalCoins;
  }

  getTime(time){
    return moment.unix(time).format("YYYY-MM-DD HH:mm");
  }

  ngOnInit() {
  }

  showDetails(block: Block) {
    this.router.navigate(['/block', block.header.seq]);
  }

  handlePageChange(pagesData: number[]) {
    this.totalBlocks = pagesData[1];
    const currentPage = pagesData[0];

    let blockStart = this.totalBlocks - currentPage * 10 + 1;
    let blockEnd = blockStart + 9;

    if (blockEnd >= this.totalBlocks) {
      blockEnd = this.totalBlocks;
    }

    if (blockStart <= 1 ) {
      blockStart = 1;
    }
    this.loading = true;

    this.api.getBlocks(blockStart,blockEnd)
      .subscribe(
        data => {
          let newData = _.sortBy(data, function (block) {return block.header.seq}).reverse();
          this.blocks = newData;
          this.loading = false;
        }, error => {
          this.loading = false;
        }
    );
  }
}
