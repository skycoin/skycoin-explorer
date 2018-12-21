import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../app.datatypes';
import { BigNumber } from 'bignumber.js';

@Pipe({
  name: 'transactionsValue'
})
export class TransactionsValuePipe implements PipeTransform {

  transform(value: Transaction[]): any {
    let sum = new BigNumber('0');
    value.map(tx => {
      tx.outputs.map(o => sum = sum.plus(o.coins));
    });
    return sum.toNumber();
  }
}
