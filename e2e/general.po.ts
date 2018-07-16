import { browser, by, element } from 'protractor';

export class GeneralPageFunctions {
  navigateTo(route: string) {
    return browser.get(route);
  }
  
  goBack() {
    browser.navigate().back();
  }

  getPageTitle() {
    return element(by.css('.element-details-wrapper h2')).getText();
  }

  getDetailsRowCount() {
    return element
      .all(by.css('.element-details .-row'))
      .count()
      .then(count => {
        return count;
      });
  }

  getTransactionId(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .element(by.css('.-row a'))
      .getText();
  }

  getTransactionDateValidity(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .element(by.css('.-date'))
      .getText()
      .then(text => !isNaN((new Date(text)).getTime()));
  }

  getTransactionInputs(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .all(by.css('.-data > .row > div:nth-of-type(1) a'))
      .map((element, i) => element.getText())
      .then(texts => texts.join(","));
  }

  getTransactionOutputs(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .all(by.css('.-data > .row > div:nth-of-type(2) a'))
      .map((element, i) => element.getText())
      .then(texts => texts.join(","));
  }

  getTransactionInputsAndOutputsTotalCoins() {
    return element
      .all(by.css('.-balance > div:nth-of-type(2)'))
      .map((element, i) => element.getText())
      .then(texts => texts.map(text => Number((text as string).replace(',', ''))).reduce((total, val) => total+val, 0))
      .then(result => Math.round(result * 1000000) / 1000000);
  }

  getErrorMessage() {
    return element(by.css('div.row.-msg-container > div'))
      .getText();
  }
}