import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../app.datatypes';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'explorerDate',
})
export class ExplorerDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: any, unixDateInSeconds = true): string {
    value = unixDateInSeconds ? value * 1000 : value;
    return this.datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss', 'UTC');
  }
}