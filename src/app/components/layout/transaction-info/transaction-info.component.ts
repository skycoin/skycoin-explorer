import { Component, Input } from '@angular/core';
import { HeaderConfig } from 'app/app.config';

@Component({
  selector: 'transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent {
  @Input() transaction: any;
  @Input() unconfirmed = false;
  
  constructor() { }
}
