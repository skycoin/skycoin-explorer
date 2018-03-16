import { BlockDetailsPage } from './block-details.po';

describe('skycoin-explorer Block Details Page', () => {
  const page = new BlockDetailsPage();

  beforeEach(() => { });

  it('should display block details text', () => {
    page.navigateTo();
    expect(page.getOneBlockDetailsText()).toEqual('Block Details');
  });

  it('should display 5 block details rows', () => {
    page.navigateTo();
    expect(page.getDetailsRow()).toEqual(5);
  });

  it('should show the details of the Hash and its length should be 64', () => {
    page.navigateTo();
    expect(page.getHash()).toEqual(64);
  });

  it('should show the details of the Parent Hash and its length should be 64', () => {
    page.navigateTo();
    expect(page.getParentHash()).toEqual(64);
  });

  it('should show the Transaction Id  and its length should be 64', () => {
    page.navigateTo();
    expect(page.getTransactionId()).toEqual(64);
  });

  it('should show one Transaction Input address and its length should be l>26 and l<36', () => {
    page.navigateTo();
    let inputAddress = page.getOneTransactionInput();
    expect(inputAddress).toBeLessThan(36);
    expect(inputAddress).toBeGreaterThan(26);
  });

  it('should show One Transaction Output address and its length should be l>26 and l<36', () => {
    page.navigateTo();
    let outputAddress = page.getOneTransactionOutput();
    expect(outputAddress).toBeLessThan(36);
    expect(outputAddress).toBeGreaterThan(26);
  });
});