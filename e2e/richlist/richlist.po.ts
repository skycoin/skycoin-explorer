import { browser, by, element, protractor } from 'protractor';

export class RichlistPage {
  getPageTitle() {
    return element
    .all(by.css('app-root h2'))
    .get(0)
    .getAttribute('textContent');
  }

  getEntriesCount() {
    return element.all(by.css('.table a.-row'))
      .count();
  }

  private getTableCellValue(row: number, column: number) {
    return element
      .all(by.css('.table a.-row'))
      .get(row)
      .all(by.css('div'))
      .get(column)
      .getText();
  }

  getEntryNumber(row: number) {
    return this.getTableCellValue(row, 1)
      .then(text => Number(text));
  }

  getAddressLength(row: number) {
    return this.getTableCellValue(row, 2)
    .then(text => text.length);
  }

  getAmount(row: number) {
    return this.getTableCellValue(row, 3)
      .then(text => Number(text.split(' ')[0].replace(new RegExp(',', 'g'), '')));
  }
}