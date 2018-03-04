import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Block, Output, Transaction } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {
  block: Block;
  loadingMsg = "Loading...";
  longErrorMsg: string;

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.filter(params => +params['id'] !== null)
      .switchMap((params: Params) => this.explorer.getBlock(+params['id']))
      .subscribe((block: Block) => {
        if (block != null)
          this.block = block
        else {
          this.loadingMsg = "Loading error";
          this.longErrorMsg = "The block does not exist";
        }
      }, error => {
        this.loadingMsg = "Loading error";
        if (error.status >= 400 && error.status < 500)
          this.longErrorMsg = "The block does not exist";
        else
        this.longErrorMsg = "Error loading data, try again later...";
          
      });
  }
}
