import { browser, by, element } from 'protractor';

export class BlockDetailsPage {
  navigateTo() {
    return browser.get('/');
  }

  goToOneBlockDetails() {
    return element(by.css('.table a.-row')).click();
  }

  getOneBlockDetailsText() {
    return this.goToOneBlockDetails().then(() => {
      return element(by.css('.element-details-wrapper h2')).getText();
    });
  }

  getDetailsRow() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css('.element-details .-row'))
        .count()
        .then(count => {
          return count;
        });
    });
  }

  getHash() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css('.element-details .-row a.-link'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getParentHash() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css('.element-details .-row a.-link'))
        .get(1)
        .getText()
        .then(text => text.length);
    });
  }

  getTransactionId() {
    return this.goToOneBlockDetails().then(() => {
      return element(by.css('.transaction .-row a'))
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionInput() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css('.transaction > .-data > .row > div:nth-of-type(1) a'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionOutput() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css('.transaction > .-data > .row > div:nth-of-type(2) a'))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }
}