import { browser, by, element } from 'protractor';

export class UnconfirmedTransactionsPage {
  navigateTo() {
    return browser.get('/');
  }

  goToUnconfirmedTransactions() {
    return element(by.css('.-link')).click();
  }

  getUnconfirmedTransactionsText() {
    return this.goToUnconfirmedTransactions().then(() => {
      return element(by.css('app-root h2')).getText();
    });
  }

  getDetailsRow() {
    return this.goToUnconfirmedTransactions().then(() => {
      return element
        .all(by.css('.-row'))
        .count()
        .then(count => {
          return count;
        });
    });
  }
}