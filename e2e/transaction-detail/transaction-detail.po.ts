import { browser, by, element } from 'protractor';

export class TransactionDetailPage {
  navigateTo() {
    return browser.get('/');
  }

  goToTransactionPage() {
    return element(by.css('.table a.-row'))
      .click()
      .then(() => {
        return element(by.css('.transaction .-row a')).click();
      });
  }

  getTransactionText() {
    return this.goToTransactionPage().then(() => {
      return element(by.css('.element-details-wrapper h2')).getText();
    });
  }

  getTransactionId() {
    return this.goToTransactionPage().then(() => {
      return element(by.css('.transaction .-row a'))
        .getText()
        .then(text => text.length);
    });
  }

  getDetailsRow() {
    return this.goToTransactionPage().then(() => {
      return element
        .all(by.css('.element-details .-row'))
        .count()
        .then(count => {
          return count;
        });
    });
  }

  getOneTransactionInput() {
    return this.goToTransactionPage().then(() => {
      return element
        .all(by.css('.transaction > .-data > .row > div:nth-of-type(1) a'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionOutput() {
    return this.goToTransactionPage().then(() => {
      return element
        .all(by.css('.transaction > .-data > .row > div:nth-of-type(2) a'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }
}