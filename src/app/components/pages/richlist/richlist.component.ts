import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { RichlistEntry } from '../../../app.datatypes';

@Component({
  templateUrl: './richlist.component.html',
  styleUrls: ['./richlist.component.scss']
})
export class RichlistComponent implements OnInit {

  entries: RichlistEntry[] = [];
  longErrorMsg: string;

  constructor(
    private api: ApiService,
  ) {}

  ngOnInit() {

    this.api.getRichlist().pipe(first()).subscribe(entries => this.entries = entries,
      () => {
        this.longErrorMsg = 'general.longLoadingErrorMsg';
    });

  }
}
