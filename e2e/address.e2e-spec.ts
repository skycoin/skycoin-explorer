import { AddressPage } from "./address.po";

describe("skycoin-explorer Address Page", () => {
  let page: AddressPage;

  beforeEach(() => {
    page = new AddressPage();
  });

  it("should show the Address Text  and its length should be 64", () => {
    page.navigateTo();
    expect(page.getAddressText()).toEqual(35);
  });

  it("should show the Address Info row  and its length should be 2", () => {
    page.navigateTo();
    expect(page.getAddressInfo()).toEqual(2);
  });

  it("should show the Transactions Rows and its length should be more than 0", () => {
    page.navigateTo();
    expect(page.getTransactions()).toBe(true);
  });

  it("should show One Transaction Input  and its length should be 64", () => {
    page.navigateTo();
    expect(page.getOneTransactionInput()).toEqual(64);
  });

  it("should show tOne Transaction Output  and its length should be 35", () => {
    page.navigateTo();
    expect(page.getOneTransactionOutput()).toEqual(35);
  });
});
