import { browser, by, element } from 'protractor';

export class NavigarionPage {
  navigateTo() {
    return browser.get('/');
  }

  goToRichlistPage() {
    return element.all(by.css('.-link')).get(1).click();
  }

  goToUnconfirmedTransactions() {
    return element.all(by.css('.-link')).get(0).click();
  }

  goToBlockDetails() {
    return element.all(by.css('.table a.-row')).get(0).click();
  }

  goToTransactionDetail() {
    return element(by.css('.transaction .-row a')).click();
  }

  goToAddressDetail() {
    return element(by.css('.transaction > .-data > .row > div:nth-of-type(2) a')).click();
  }

  goToUnspentOutputs() {
    return element(by.css('.element-details-wrapper .element-details .-link')).click();
  }
}