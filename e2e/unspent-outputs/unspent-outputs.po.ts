import { browser, by, element } from 'protractor';

export class UnspentOutputsPage {
  navigateTo() {
    return browser.get('/');
  }

  goToUnspentOutputsPage() {
    return element(by.css('.table a.-row'))
      .click()
      .then(() => {
        return element(by.css('.transaction > .-data > .row > div:nth-of-type(2) a'))
          .click().then(() => {
            return element(by.css('.element-details-wrapper .element-details .-link'))
              .click();
          });
      });
  }

  getUnspentOutputsText() {
    return this.goToUnspentOutputsPage().then(() => {
      return element(by.css('.element-details-wrapper h2'))
        .getText();
    });
  }

  getAddressText() {
    return this.goToUnspentOutputsPage().then(() => {
      return element(by.css('.element-details-wrapper .element-details .-link'))
        .getText()
        .then(text => text.length);
    });
  }

  getOutputsInfo() {
    return this.goToUnspentOutputsPage().then(() => {
      return element
        .all(by.css('.element-details > div'))
        .count()
        .then(count => count);
    });
  }

  getOutputs() {
    return this.goToUnspentOutputsPage().then(() => {
      return element
        .all(by.css('.transaction'))
        .count()
        .then(count => count > 0);
    });
  }

  getOneTransactionId() {
    return this.goToUnspentOutputsPage().then(() => {
      return element
        .all(by.css('.transaction .-title a'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneOutputId() {
    return this.goToUnspentOutputsPage().then(() => {
      return element
        .all(by.css('.transaction > .-data > .row .-body div'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }
}