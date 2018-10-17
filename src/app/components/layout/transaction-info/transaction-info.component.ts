import { Component, Input } from '@angular/core';
import { HeaderConfig } from 'app/app.config';

@Component({
  selector: 'transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent {
  private maxElements = 10;
  private transactionInternal: any;

  totalInputs = 0;
  nextInputsGroup = 0;
  inputsToShow: any[] = [];
  totalOutputs = 0;
  nextOutputsGroup = 0;
  outputsToShow: any[] = [];

  @Input()
  set transaction(value: any) {
    this.transactionInternal = value;

    this.totalInputs = this.transaction.inputs.length;
    this.totalOutputs = this.transaction.outputs.length;

    this.showMoreInputs();
    this.showMoreOutputs();
  }
  get transaction(): any {
    return this.transactionInternal;
  }

  @Input() unconfirmed = false;
  
  constructor() { }

  showMoreInputs() {
    const currentNumber = this.inputsToShow.length;
    for (let i=currentNumber; i<Math.min(currentNumber + this.maxElements, this.totalInputs); i++) {
      this.inputsToShow.push(this.transaction.inputs[i]);
    }
    this.nextInputsGroup = Math.min(this.totalInputs - this.inputsToShow.length, this.maxElements);
  }

  showMoreOutputs() {
    const currentNumber = this.outputsToShow.length;
    for (let i=currentNumber; i<Math.min(currentNumber + this.maxElements, this.totalOutputs); i++) {
      this.outputsToShow.push(this.transaction.outputs[i]);
    }
    this.nextOutputsGroup = Math.min(this.totalOutputs - this.outputsToShow.length, this.maxElements);
  }
}
