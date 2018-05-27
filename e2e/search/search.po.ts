import { browser, by, element, protractor } from 'protractor';

export class SearchPage {
  search(text: string) {
    return element(by.css('.-search-bar-container input')).sendKeys(
      text,
      protractor.Key.ENTER
    );
  }
}