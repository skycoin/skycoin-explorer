import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { Block } from '../../../app.datatypes';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import 'rxjs/add/operator/first';
import 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

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
  loadingCoinSupplyMsg = "";
  loadingMetadataMsg = "";
  longErrorMsg: string;

  mouseOver = -1;

  get pageCount() {
    return Math.ceil(this.blockCount / this.pageSize);
  }

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    translate.get('general.loadingMsg').subscribe((res: string) => {
      this.loadingCoinSupplyMsg = this.loadingMetadataMsg = res;
    });
  }

  ngOnInit() {
    this.api.getBlockchainMetadata().first().subscribe(blockchain => {
      this.blockCount = blockchain.blocks;
      this.route.paramMap
        .subscribe(params => {
          const pageIndex = parseInt(params.get('page'), 10) - 1;
          this.navigate(pageIndex)
        });
    }, error => {
      this.translate.get(['general.shortLoadingErrorMsg', 'general.longLoadingErrorMsg']).subscribe((res: string[]) => {
        this.loadingMetadataMsg = res['general.shortLoadingErrorMsg'];
        this.longErrorMsg = res['general.longLoadingErrorMsg'];
      });
    });

    this.api.getCoinSupply().first().subscribe(response => {
      this.currentSupply = response.current_supply;
      this.totalSupply = response.total_supply;
      this.currentCoinhourSupply = response.current_coinhour_supply;
      this.totalCoinhourSupply = response.total_coinhour_supply;
    }, error => {
      this.translate.get('general.shortLoadingErrorMsg').subscribe((res: string) => {
        this.loadingCoinSupplyMsg = res;
      });
    });

  }

  navigate(pageIndex) {
    this.pageIndex = pageIndex;
    const end = this.blockCount - (this.pageIndex * this.pageSize);
    const begin = end - this.pageSize + 1;
    this.explorer.getBlocks(begin > 0 ? begin : 0, end > 0 ? end : 0).first().subscribe(blocks => this.blocks = blocks);
  }
}
