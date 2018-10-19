import { browser, by, element } from 'protractor';

export class GeneralPageFunctions {

  static processAndCheckDate(text: string): boolean {
    let numberText = text;
    if (isNaN(Number(numberText.substr(0, 1)))) {
      numberText = numberText.substr(1, numberText.length - 1);
    }
    return !isNaN((new Date(numberText)).getTime());
  }

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
      .then(text => GeneralPageFunctions.processAndCheckDate(text));
  }

  getTransactionInputs(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .all(by.css('.-data > .row > div:nth-of-type(1) a'))
      .map((elem, i) => elem.getText())
      .then(texts => texts.join(','));
  }

  getTransactionOutputs(transsactionIndex: number) {
    return element
      .all(by.css('.transaction'))
      .get(transsactionIndex)
      .all(by.css('.-data > .row > div:nth-of-type(2) a'))
      .map((elem, i) => elem.getText())
      .then(texts => texts.join(','));
  }

  getTransactionInputsAndOutputsTotalCoins() {
    return element
      .all(by.css('.-balance > div:nth-of-type(2)'))
      .map((elem, i) => elem.getText())
      .then(texts => texts.map(text => Number((text as string).replace(new RegExp(',', 'g'), ''))).reduce((total, val) => total + val, 0))
      .then(result => Math.round(result * 1000000) / 1000000);
  }

  getErrorMessage() {
    return element(by.css('div.row.-msg-container > div'))
      .getText();
  }
}
