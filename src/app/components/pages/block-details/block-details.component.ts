import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Block, Output, Transaction } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {
  block: Block;
  loadingMsg = "";
  longErrorMsg: string;

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.get('general.loadingMsg').subscribe((res: string) => {
      this.loadingMsg = res;
    });
  }

  ngOnInit() {
    this.route.params.filter(params => +params['id'] !== null)
      .switchMap((params: Params) => this.explorer.getBlock(+params['id']))
      .subscribe((block: Block) => {
        if (block != null)
          this.block = block
        else {
          this.translate.get(['general.shortLoadingErrorMsg', 'blockDetails.doesNotExist']).subscribe((res: string[]) => {
            this.loadingMsg = res['general.shortLoadingErrorMsg'];
            this.longErrorMsg = res['blockDetails.doesNotExist'];
          });
        }
      }, error => {
        if (error.status >= 400 && error.status < 500) {
          this.translate.get(['general.shortLoadingErrorMsg', 'blockDetails.doesNotExist']).subscribe((res: string[]) => {
            this.loadingMsg = res['general.shortLoadingErrorMsg'];
            this.longErrorMsg = res['blockDetails.doesNotExist'];
          });
        } else {
          this.translate.get(['general.shortLoadingErrorMsg', 'general.longLoadingErrorMsg']).subscribe((res: string[]) => {
            this.loadingMsg = res['general.shortLoadingErrorMsg'];
            this.longErrorMsg = res['general.longLoadingErrorMsg'];
          });
        }
          
      });
  }
}
