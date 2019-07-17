import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ExplorerService } from '../services/explorer/explorer.service';

@Pipe({
  name: 'amount',
  pure: false,
})
export class AmountPipe implements PipeTransform {

  constructor(
    private decimalPipe: DecimalPipe,
    private explorerService: ExplorerService,
  ) { }

  transform(value: any, showingCoins = true, partToReturn = '') {
    let firstPart: string;
    let response = '';

    if (partToReturn !== 'last') {
      firstPart = this.decimalPipe.transform(value, showingCoins ? ('1.0-' + this.explorerService.maxDecimals) : '1.0-0');
      response = firstPart;
      if (partToReturn !== 'first') {
        response += ' ';
      }
    }
    if (partToReturn !== 'first') {
      response += showingCoins ? this.explorerService.coinName : (Number(value) === 1 || Number(value) === -1 ? this.explorerService.hoursNameSingular : this.explorerService.hoursName);
    }

    return response;
  }
}
