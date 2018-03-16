import { browser, by, element, protractor } from 'protractor';

export class BlocksPage {
  navigateTo() {
    return browser.get('/');
  }

  getBlocksText() {
    return element(by.css('app-root h2')).getText();
  }

  getUnconfirmedTransactionsText() {
    return element(by.css('.-link')).getText();
  }

  getDetailslabels() {
    return element.all(by.css('.-label'));
  }

  getDetailsLabelsCount() {
    return this.getDetailslabels()
      .count()
      .then(count => {
        return count;
      });
  }

  getDetailsValues() {
    return element.all(by.css('.-value'));
  }

  getDetailsValuesCount() {
    return this.getDetailsValues()
      .count()
      .then(count => {
        return count;
      });
  }

  getBlocksList() {
    return element.all(by.css('.table a.-row'));
  }

  getBlocksListCount() {
    return this.getBlocksList()
      .count()
      .then(count => {
        return count;
      });
  }

  getPagination() {
    return element(by.css('.pagination')).isPresent();
  }

  changePage() {
    return element(by.css('.-page'))
      .click()
      .then(() => {
        return this.getBlocksListCount();
      });
  }

  putBlockInSearchCmp() {
    return element(by.css('.-search-bar-container input')).sendKeys(
      'b54777a8afb5573dec8388a416fa9e6e9eda577a445ff25ef4a2954e1426b817',
      protractor.Key.ENTER
    ).then(()=>{
      return element(by.css('.element-details-wrapper h2')).getText();
    })
  }
}