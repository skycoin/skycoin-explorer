import { browser, by, element, protractor } from 'protractor';

export class RichlistPage {
  navigateTo() {
    return browser.get('/');
  }

  goToRichlist() {
    return element.all(by.css('.-link')).get(1).click();
  }

  getRichlistText() {
    return this.goToRichlist().then(() => {
      return element(by.css('app-root h2')).getText();
    });
  }

  getEntriesList() {
    return element.all(by.css('.table a.-row'));
  }

  getEntriesCount() {
    return this.goToRichlist().then(() => {
      return this.getEntriesList()
      .count()
      .then(count => {
        return count;
      });
    });
  }
}