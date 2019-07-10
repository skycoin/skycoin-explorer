import { first } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { RichlistEntry } from '../../../app.datatypes';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './richlist.component.html',
  styleUrls: ['./richlist.component.scss']
})
export class RichlistComponent implements OnInit, OnDestroy {

  entries: RichlistEntry[] = [];
  longErrorMsg: string;

  private pageSubscriptions: Subscription[] = [];

  constructor(
    private api: ApiService,
  ) {}

  ngOnInit() {

    this.pageSubscriptions.push(this.api.getRichlist().pipe(first()).subscribe(entries => this.entries = entries,
      () => {
        this.longErrorMsg = 'general.longLoadingErrorMsg';
    }));
  }

  ngOnDestroy() {
    this.pageSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
