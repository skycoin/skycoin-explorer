import { browser, by, element } from "protractor";

export class AddressPage {
  navigateTo() {
    return browser.get("/");
  }

  goToAddressPage() {
    return element(by.css(".-table .-body a.row"))
      .click()
      .then(() => {
        return element(by.css(".-cell"))
          .click()
          .then(() => {
            return element
              .all(by.css(".-link a"))
              .get(0)
              .click();
          });
      });
  }

  getAddressText() {
    return this.goToAddressPage().then(() => {
      return element(by.css(".-details h2"))
        .getText()
        .then(text => text.length);
    });
  }

  getAddressInfo() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css(".-details p span"))
        .count()
        .then(count => count);
    });
  }

  getTransactions() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css(".transaction"))
        .count()
        .then(count => count > 0);
    });
  }

  getOneTransactionId() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css(".transaction .-title .col-sm-8.-left a"))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionInput() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css(".transaction .-body .row .col-sm-5.-left .-row"))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionOutput() {
    return this.goToAddressPage().then(() => {
      return element
        .all(by.css(".transaction .-link a"))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }
}
