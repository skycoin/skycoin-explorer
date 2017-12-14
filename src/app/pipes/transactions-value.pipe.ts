import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../app.datatypes';

@Pipe({
  name: 'transactionsValue'
})
export class TransactionsValuePipe implements PipeTransform {

  transform(value: Transaction[]): any {
    return value.reduce((a, b) => a + b.outputs.reduce((c, d) => c + d.coins, 0), 0);
  }
}
