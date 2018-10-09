import { browser, by, element } from 'protractor';
import { GeneralPageFunctions } from "../general.po";

export class BlockDetailsPage {

  getBlockHeight() {
    return element(by.css('.element-details > div:nth-of-type(1) > div'))
      .getText()
      .then(text => Number(text));
  }

  getTimestampValidity() {
    return element(by.css('.element-details > div:nth-of-type(2) > div'))
      .getText()
      .then(text => GeneralPageFunctions.processAndCheckDate(text));
  }

  getSize() {
    return element(by.css('.element-details > div:nth-of-type(3) > div'))
      .getText()
      .then(text => Number(text.split(' ')[0]));
  }

  getBlockHash() {
    return element
      .all(by.css('.element-details .-row a.-link'))
      .get(0)
      .getText();
  }

  getParentHash() {
    return element
      .all(by.css('.element-details .-row a.-link'))
      .get(1)
      .getText();
  }

  getAmount() {
    return element(by.css('.element-details > div:nth-of-type(6) > div'))
      .getText()
      .then(text => Number(text.split(' ')[0].replace(new RegExp(',', 'g'), '')));
  }

  getNavigationButtonText(index: number) {
    return element
      .all(by.css('.header-container > div > a'))
      .get(index)
      .element(by.css('.-not-xs'))
      .getAttribute('textContent');
  }

  clickNavigationButton(index: number) {
    return element
      .all(by.css('.header-container > div > a'))
      .get(index)
      .element(by.css('.-not-xs'))
      .click();
  }
}