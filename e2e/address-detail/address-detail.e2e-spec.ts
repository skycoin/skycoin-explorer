import { AddressDetailPage } from './address-detail.po';

describe('skycoin-explorer Address Page', () => {
  const page = new AddressDetailPage();

  beforeEach(() => { });

  it('should show the Address Text and its length should be l>26 and l<36', () => {
    page.navigateTo();
    let address = page.getAddressText();
    expect(address).toBeLessThan(36);
    expect(address).toBeGreaterThan(26);
  });

  it('should show the Address Info row and its length should be 3', () => {
    page.navigateTo();
    expect(page.getAddressInfo()).toEqual(3);
  });

  it('should show the Transactions Rows and its length should be more than 0', () => {
    page.navigateTo();
    expect(page.getTransactions()).toBe(true);
  });

  it('should show One Transaction Input and its length should be l>26 and l<36', () => {
    page.navigateTo();
    let inputAddress = page.getOneTransactionInput();
    expect(inputAddress).toBeLessThan(36);
    expect(inputAddress).toBeGreaterThan(26);
  });

  it('should show tOne Transaction Output and its length should be l>26 and l<36', () => {
    page.navigateTo();
    let outputAddress = page.getOneTransactionOutput();
    expect(outputAddress).toBeLessThan(36);
    expect(outputAddress).toBeGreaterThan(26);
  });
});