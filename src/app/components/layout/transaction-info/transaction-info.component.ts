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
  totalInputs = 0;
  showMoreInputs: ShowMoreStatus = ShowMoreStatus.DontShowMore;
  inputsToShow: any[] = [];
  totalOutputs = 0;
  showMoreOutputs: ShowMoreStatus = ShowMoreStatus.DontShowMore;
  outputsToShow: any[] = [];

  @Input()
  set transaction(value: any) {
    this.transactionInternal = value;

    this.totalInputs = this.transaction.inputs.length;
    this.totalOutputs = this.transaction.outputs.length;

    this.showInitialInputs();
    this.showInitialOutputs();
  }
  get transaction(): any {
    return this.transactionInternal;
  }

  @Input() unconfirmed = false;

  constructor() { }

  showInitialInputs() {
    if (this.totalInputs > this.maxInitialElements) {
      for (let i = 0; i < this.maxInitialElements; i++) {
        this.inputsToShow.push(this.transaction.inputs[i]);
      }
      this.showMoreInputs = ShowMoreStatus.ShowMore;
    } else {
      this.showAllInputs();
    }
  }

  showInitialOutputs() {
    if (this.totalOutputs > this.maxInitialElements) {
      for (let i = 0; i < this.maxInitialElements; i++) {
        this.outputsToShow.push(this.transaction.outputs[i]);
      }
      this.showMoreOutputs = ShowMoreStatus.ShowMore;
    } else {
      this.showAllOutputs();
    }
  }

  startShowingAllInputs() {
    this.disableClicks = true;
    this.showMoreInputs = ShowMoreStatus.Loading;
    setTimeout(() => this.showAllInputs(), 32);
  }

  startShowingAllOutputs() {
    this.disableClicks = true;
    this.showMoreOutputs = ShowMoreStatus.Loading;
    setTimeout(() => this.showAllOutputs(), 32);
  }

  private showAllInputs() {
    this.inputsToShow = this.transaction.inputs;
    setTimeout(() => {
      this.showMoreInputs = ShowMoreStatus.DontShowMore;
      this.disableClicks = false;
    });
  }

  private showAllOutputs() {
    this.outputsToShow = this.transaction.outputs;
    setTimeout(() => {
      this.showMoreOutputs = ShowMoreStatus.DontShowMore;
      this.disableClicks = false;
    });
  }
}
