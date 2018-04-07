import { UnspentOutputsPage } from "./unspent-outputs.po";

describe('skycoin-explorer Unspent Outputs Page', () => {
  const page = new UnspentOutputsPage();

  beforeEach(() => { });

  it('should display Unspent Outputs text', () => {
    page.navigateTo();
    expect(page.getUnspentOutputsText()).toEqual('Unspent Outputs');
  });

  it('should show the Address Text and its length should be l>26 and l<36', () => {
    page.navigateTo();
    let address = page.getAddressText();
    expect(address).toBeLessThan(36);
    expect(address).toBeGreaterThan(26);
  });

  it('should show the Outputs Info row and its length should be 3', () => {
    page.navigateTo();
    expect(page.getOutputsInfo()).toEqual(3);
  });

  it('should show the Outputs Rows and its length should be more than 0', () => {
    page.navigateTo();
    expect(page.getOutputs()).toBe(true);
  });

  it('should show One Transaction Id and its length should be 64', () => {
    page.navigateTo();
    expect(page.getOneTransactionId()).toEqual(64);
  });

  it('should show One Output Id and its length should be 64', () => {
    page.navigateTo();
    expect(page.getOneOutputId()).toEqual(64);
  });

});