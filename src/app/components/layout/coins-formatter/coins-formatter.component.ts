import { Component, Input } from '@angular/core';

@Component({
  selector: 'coins-formatter',
  templateUrl: './coins-formatter.component.html',
  styleUrls: ['./coins-formatter.component.scss']
})
export class CoinsFormatterComponent {
  
  integerPart: number = undefined;
  decimalPart: string;

  @Input()
  set amount(value: number | string) {

    if (value == undefined || value == null) return;

    const number = typeof value == "number" ? value : Number((value as string).replace(',', ''));

    this.integerPart = Math.trunc(number);

    const decimal = Math.abs(number - this.integerPart);
    if (decimal > 0) this.decimalPart = (Number(decimal.toFixed(6)) + '').split('.')[1];
  }

  @Input()
  whiteText = false;
  
  constructor() { }
}
