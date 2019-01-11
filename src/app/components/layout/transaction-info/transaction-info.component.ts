import { Component, Input } from '@angular/core';

enum ShowMoreStatus {
  ShowMore = 0,
  Loading = 1,
  DontShowMore = 2,
}

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent {
  private readonly maxInitialElements = 10;
  private transactionInternal: any;

  disableClicks = false;
  showMoreStatus = ShowMoreStatus;

  @Input()
  set transaction(value: any) {
    this.transactionInternal = value;
  }
  get transaction(): any {
    return this.transactionInternal;
  }

  get inputs(): any {
    return this.transaction.inputs;
  }

  get outputs(): any {
    return this.transaction.outputs;
  }

  @Input() unconfirmed = false;

  constructor() { }
}
