import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExplorerService } from '../../../services/explorer/explorer.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  query: string;

  constructor(
    private explorer: ExplorerService,
    private router: Router,
  ) { }

  search() {
    const hashVal = this.query.trim();
    if (hashVal.length >= 27 && hashVal.length <= 35) {
      this.router.navigate(['/app/address', hashVal]);
    } else if (hashVal.length === 64) {
      this.explorer.getBlockByHash(hashVal).subscribe(
          block => this.router.navigate(['/app/block', block.id]),
        () => this.router.navigate(['/app/transaction', hashVal])
    )
    } else {
      this.router.navigate(['/app/block', hashVal]);
    }
    this.query = null;
  }
}
