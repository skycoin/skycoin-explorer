import { BlocksDetailsPage } from "./block-details.po";

describe("skycoin-explorer Block Details Page", () => {
  let page: BlocksDetailsPage;

  beforeEach(() => {
    page = new BlocksDetailsPage();
  });

  it("should display block details text", () => {
    page.navigateTo();
    expect(page.getOneBlockDetailsText()).toEqual("Block Details");
  });

  it("should display 5 block details rows", () => {
    page.navigateTo();
    expect(page.getDetailsRow()).toEqual(5);
  });

  it("should show the details of the Hash and its length should be 64", () => {
    page.navigateTo();
    expect(page.getHash()).toEqual(64);
  });

  it("should show the details of the Parent Hash and its length should be 64", () => {
    page.navigateTo();
    expect(page.getParentHash()).toEqual(64);
  });

  it("should show the Transaction Id  and its length should be 64", () => {
    page.navigateTo();
    expect(page.getTransactionId()).toEqual(64);
  });

  it("should show the Transaction Input  and its length should be 64", () => {
    page.navigateTo();
    expect(page.getTransactionInput()).toEqual(64);
  });

  it("should show One Transaction Output  and its length should be 64", () => {
    page.navigateTo();
    expect(page.getOneTransactionOutput()).toEqual(64);
  });
});
