import { browser, by, element, protractor } from 'protractor';

export class BlocksPage {
  getPageTitle(titleNumber: number) {
    return element
    .all(by.css('app-root h2'))
    .get(titleNumber)
    .getAttribute('textContent');
  }

  getUnconfirmedTransactionsText() {
    return element.all(by.css('.-link')).get(0).getText();
  }

  getRichListText() {
    return element.all(by.css('.-link')).get(1).getText();
  }

  getStatsLabelsCount() {
    return element
      .all(by.css('.-label'))
      .count();
  }

  getStat(statIndex: number) {
    return element
      .all(by.css('.-value'))
      .get(statIndex)
      .getText()
      .then(text => Number(text.replace(new RegExp(',', 'g'), '')));
  }

  getBlocksList() {
    return element.all(by.css('.table a.-row'));
  }

  getBlocksListRowCount() {
    return element
      .all(by.css('.table a.-row'))
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

  getTimeValidity(row: number) {
    return this.getTableCellValue(row, 1)
      .then(text => !isNaN((new Date(text)).getTime()));
  }

  getBlockNumber(row: number) {
    return this.getTableCellValue(row, 2)
      .then(text => Number(text));
  }

  getTransactionCount(row: number) {
    return this.getTableCellValue(row, 3)
      .then(text => Number(text));
  }

  getBlockHashLength(row: number) {
    return this.getTableCellValue(row, 4)
      .then(text => text.length);
  }

  getIfPaginationControlExists() {
    return element(by.css('.pagination')).isPresent();
  }

  navigateToTheNextPage() {
    return element(by.css('.-next'))
      .click();
  }

  navigateToThePreviousPage() {
    return element(by.css('.-previous'))
      .click();
  }

  navigateToTheLastPage() {
    return element(by.css('.-last'))
      .click();
  }

  navigateToTheFirstPage() {
    return element(by.css('.-first'))
      .click();
  }

  pressPageButton(index: number) {
    return element
      .all(by.css('.-page'))
      .get(index)
      .click();
  }
}