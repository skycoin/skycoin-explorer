import { browser, by, element } from 'protractor';

export class AddressDetailPage {
  getPageTitleForSmallScreens() {
    return element(by.css('.element-details-wrapper > h2:nth-child(2)'))
      .getAttribute('textContent');
  }

  getAddressForSmallScreens() {
    return element(by.css('.element-details > div:nth-of-type(1) > span:nth-of-type(2)'))
      .getAttribute('textContent').then(address => address.trim());
  }

  getNumberOfTransactions() {
    return element(by.css('.element-details > div:nth-of-type(2) > div'))
      .getText()
      .then(text => Number(text));
  }

  getTotalReceived() {
    return element(by.css('.element-details > div:nth-of-type(3) > div'))
      .getText()
      .then(text => Number(text.split(' ')[0].replace(new RegExp(',', 'g'), '')));
  }

  getTotalSent() {
    return element(by.css('.element-details > div:nth-of-type(4) > div'))
      .getText()
      .then(text => Number(text.split(' ')[0].replace(new RegExp(',', 'g'), '')));
  }

  getCurrentBalance() {
    return element(by.css('.element-details > div:nth-of-type(5) > div'))
      .getText()
      .then(text => Number(text.split(' ')[0].replace(new RegExp(',', 'g'), '')));
  }

  getInitialBalance(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .element(by.css('.-balance-variation > div:nth-of-type(2) > div:nth-of-type(2)'))
      .getText()
      .then(text => Number(text.replace(new RegExp(',', 'g'), '')));
  }

  getFinalBalance(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .element(by.css('.-balance-variation > div:nth-of-type(3) > div:nth-of-type(2)'))
      .getText()
      .then(text => Number(text.replace(new RegExp(',', 'g'), '')));
  }

  getBalanceChange(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .element(by.css('.-label'))
      .getText()
      .then(text => Number(text.split(' ')[0].replace(new RegExp(',', 'g'), '')));
  }
}
