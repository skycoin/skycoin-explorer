import { UnconfirmedTransactionsPage } from "./unconfirmed-transactions.po";

describe("skycoin-explorer Unconfirmed Transactions Page", () => {
  let page: UnconfirmedTransactionsPage;

  beforeEach(() => {
    page = new UnconfirmedTransactionsPage();
  });

  it("should display Unconfirmed Transactions text", () => {
    page.navigateTo();
    expect(page.getUnconfirmedTransactionsText()).toEqual(
      "Unconfirmed Transactions"
    );
  });

  it("should display 3 Unconfirmed Transactions details", () => {
    page.navigateTo();
    expect(page.getDetailsRow()).toEqual(3);
  });
});
