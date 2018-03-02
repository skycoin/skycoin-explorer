import { browser, by, element } from "protractor";

export class BlocksDetailsPage {
  navigateTo() {
    return browser.get("/");
  }

  goToOneBlockDetails() {
    return element(by.css(".-table .-body a.row")).click();
  }

  getOneBlockDetailsText() {
    return this.goToOneBlockDetails().then(() => {
      return element(by.css("app-root h2")).getText();
    });
  }

  getDetailsRow() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css(".block-details .-row"))
        .count()
        .then(count => {
          return count;
        });
    });
  }

  getHash() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css(".block-details .-row a.-link"))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getParentHash() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css(".block-details .-row a.-link"))
        .get(1)
        .getText()
        .then(text => text.length);
    });
  }

  getTransactionId() {
    return this.goToOneBlockDetails().then(() => {
      return element(by.css(".-cell"))
        .getText()
        .then(text => text.length);
    });
  }

  getTransactionInput() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css(".-row > .width-4-5.gutter-right"))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }

  getOneTransactionOutput() {
    return this.goToOneBlockDetails().then(() => {
      return element
        .all(by.css(".-row > .width-4-5.gutter-right a"))
        .get(0)
        .getText()
        .then(text => text.length);
    });
  }
}
