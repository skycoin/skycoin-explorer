import { TransactionPage } from "./transaction.po";

describe("skycoin-explorer Transaction Page", () => {
  let page: TransactionPage;

  beforeEach(() => {
    page = new TransactionPage();
  });

  it("should display Transaction text", () => {
    page.navigateTo();
    expect(page.getTransactionText()).toEqual("Transaction");
  });

  it("should display 3 Transaction details Rows", () => {
    page.navigateTo();
    expect(page.getDetailsRow()).toEqual(3);
  });

  it("should show the Transaction Id  and its length should be 64", () => {
    page.navigateTo();
    expect(page.getTransactionId()).toEqual(64);
  });

  it("should show One of Transaction Input  and its length should be 64", () => {
    page.navigateTo();
    expect(page.getOneTransactionInput()).toEqual(64);
  });

  it("should show One of Transaction Output  and its length should be 64", () => {
    page.navigateTo();
    expect(page.getOneTransactionOutput()).toEqual(35);
  });
});
