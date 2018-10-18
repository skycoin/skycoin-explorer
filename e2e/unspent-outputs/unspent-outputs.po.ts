import { browser, by, element } from 'protractor';

export class UnspentOutputsPage {

  getAddressText() {
    return element(by.css('.element-details-wrapper .element-details .-link'))
      .getText();
  }

  getNumberOfOutputs() {
    return element(by.css('.element-details > div:nth-of-type(2) > div'))
      .getText()
      .then(text => Number(text));
  }

  getTotalCoins() {
    return element(by.css('.element-details > div:nth-of-type(3) > div'))
      .getText()
      .then(text => Number(text.split(' ')[0].replace(new RegExp(',', 'g'), '')));
  }

  getOutputId(outputIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(outputIndex)
      .element(by.css('.-data > .row .-body div'))
      .getText();
  }
}
