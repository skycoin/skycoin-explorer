import { browser, by, element } from "protractor";

export class TransactionPage {
  navigateTo() {
    return browser.get("/");
  }

  goToTransactionPage() {
    return element(by.css(".-table .-body a.row"))
      .click()
      .then(() => {
        return element(by.css(".-cell")).click();
      });
  }

  getTransactionText() {
    return this.goToTransactionPage().then(() => {
      return element(by.css("app-root h2")).getText();
    });
  }

  getTransactionId() {
    return this.goToTransactionPage().then(() => {
      return element(by.css(".-title .col-sm-8.-left a"))
        .getText()
        .then(text => text.length);
    });
  }

  getDetailsRow() {
    return this.goToTransactionPage().then(() => {
      return element
        .all(by.css(".block-details .-row"))
        .count()
        .then(count => {
          return count;
        });
    });
  }

  getOneTransactionInput() {
    return this.goToTransactionPage().then(() => {
      return element
        .all(by.css(".-body .row .col-sm-5.-left .-row"))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionOutput() {
    return this.goToTransactionPage().then(() => {
      return element
        .all(by.css(".-link a"))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }
}
