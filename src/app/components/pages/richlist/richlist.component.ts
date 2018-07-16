import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { RichlistEntry } from '../../../app.datatypes';
import 'rxjs/add/operator/first';
import 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './richlist.component.html',
  styleUrls: ['./richlist.component.scss']
})
export class RichlistComponent implements OnInit {

  entries: RichlistEntry[] = [];
  longErrorMsg: string;

  constructor(
    private api: ApiService,
    private translate: TranslateService
  ) {}

  ngOnInit() {

    this.api.getRichlist().first().subscribe(entries => this.entries = entries,
      () => {
        this.translate.get('general.longLoadingErrorMsg').subscribe((res: string) => {
          this.longErrorMsg = res;
        });
    });

  }
}
