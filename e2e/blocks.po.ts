import { browser, by, element } from "protractor";

export class SkycoinExplorerPage {
  navigateTo() {
    return browser.get("/");
  }

  getBlocksText() {
    return element(by.css("app-root h2")).getText();
  }

  getUnconfirmedTransactionsText() {
    return element(by.css(".-link")).getText();
  }

  getDetailslabels() {
    return element.all(by.css(".-label"));
  }

  getDetailsLabelsCount() {
    return this.getDetailslabels()
      .count()
      .then(count => {
        return count;
      });
  }

  getDetailsValues() {
    return element.all(by.css(".-value"));
  }

  getDetailsValuesCount() {
    return this.getDetailsValues()
      .count()
      .then(count => {
        return count;
      });
  }

  getBlocksList() {
    return element.all(by.css(".-table .-body a.row"));
  }

  getBlocksListCount() {
    return this.getBlocksList()
      .count()
      .then(count => {
        return count;
      });
  }

  getPagination() {
    return element(by.css(".pagination")).isPresent();
  }

  changePage() {
    return element(by.css(".-page"))
      .click()
      .then(() => {
        return this.getBlocksListCount();
      });
  }
}
