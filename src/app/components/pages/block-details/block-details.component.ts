import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Block, Output } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {
  block: Block;

  constructor(
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.block = null;
  }

  ngOnInit() {
    this.route.params.filter(params => +params['id'] !== null)
      .switchMap((params: Params) => this.explorer.getBlock(+params['id']))
      .subscribe((block: Block) => this.block = block);
  }

  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }
}
