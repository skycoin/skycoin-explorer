import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { RichlistEntry } from '../../../app.datatypes';
import 'rxjs/add/operator/first';
import 'rxjs/Subscription';

@Component({
  templateUrl: './richlist.component.html',
  styleUrls: ['./richlist.component.scss']
})
export class RichlistComponent implements OnInit {

  entries: RichlistEntry[] = [];
  loadingMsg = 'Loading...';
  longErrorMsg: string;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {

    this.api.getRichlist().first().subscribe(entries => this.entries = entries,
        () => {
      this.loadingMsg = 'Loading error';
      this.longErrorMsg = 'Error loading data, try again later...';
    });

  }
}
