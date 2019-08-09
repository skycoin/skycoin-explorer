import { switchMap, filter, first, retryWhen, delay } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Block } from '../../../app.datatypes';
import { ApiService } from 'app/services/api/api.service';

/**
 * Page for showing info about a specific block.
 */
@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit, OnDestroy {
  /**
   * Current block.
   */
  block: Block;
  /**
   * How many blocks the blockchain currently has.
   */
  blockCount: number;
  /**
   * ID of the current block.
   */
  blockID = '';
  /**
   * Small text to be shown in variaous parts (not in the loading control) while loading the data.
   * It may also contain small error messages.
   */
  loadingMsg = 'general.loadingMsg';
  /**
   * Error message to be shown in the loading control if there is a problem.
   */
  longErrorMsg: string;

  /**
   * Observable subscriptions that will be cleaned when closing the page.
   */
  private pageSubscriptions: Subscription[] = [];

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    // Get how many blocks the blockchain currenly has.
    this.pageSubscriptions.push(this.api.getBlockchainMetadata().pipe(
      retryWhen((err) => {
        // If there is a problem, retry after a small delay.
        return err.pipe(delay(3000));
      }),
      first()
    ).subscribe(blockchain => this.blockCount = blockchain.blocks));

    // Get the URL params.
    this.pageSubscriptions.push(this.route.params.pipe(filter(params => +params['id'] !== null),
      switchMap((params: Params) => {
        // Get the block ID and request the data.
        this.blockID = params['id'];
        return this.explorer.getBlock(+this.blockID);
      })).subscribe((block: Block) => {
        if (block != null) {
          this.block = block;
        } else {
          // The block was not found.
          this.loadingMsg = 'general.noData';
          this.longErrorMsg = 'blockDetails.doesNotExist';
        }
      }, error => {
        if (error.status >= 400 && error.status < 500) {
          // The block was not found.
          this.loadingMsg = 'general.noData';
          this.longErrorMsg = 'blockDetails.doesNotExist';
        } else {
          // Error loading the data.
          this.loadingMsg = 'general.shortLoadingErrorMsg';
          this.longErrorMsg = 'general.longLoadingErrorMsg';
        }

      }));
  }

  ngOnDestroy() {
    // Clean all subscriptions.
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
