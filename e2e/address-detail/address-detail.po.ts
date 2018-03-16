import { browser, by, element } from 'protractor';

export class AddressDetailPage {
  navigateTo() {
    return browser.get('/');
  }

  goToAddressPage() {
    return element(by.css('.table a.-row'))
      .click()
      .then(() => {
        return element(by.css('.transaction > .-data > .row > div:nth-of-type(2) a'))
          .click();
      });
  }

  getAddressText() {
    return this.goToAddressPage().then(() => {
      return element(by.css('.element-details-wrapper h2:nth-of-type(1)'))
        .getText()
        .then(text => text.length);
    });
  }

  getAddressInfo() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css('.element-details > div'))
        .count()
        .then(count => count);
    });
  }

  getTransactions() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css('.transaction'))
        .count()
        .then(count => count > 0);
    });
  }

  getOneTransactionId() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css('.transaction .-title .col-sm-8.-left a'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionInput() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css('.transaction > .-data > .row > div:nth-of-type(1) a'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionOutput() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css('.transaction > .-data > .row > div:nth-of-type(2) a'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }
}