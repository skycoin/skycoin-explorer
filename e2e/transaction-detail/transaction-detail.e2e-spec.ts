import { TransactionDetailPage } from './transaction-detail.po';

describe('skycoin-explorer Transaction Page', () => {
  const page = new TransactionDetailPage();

  beforeEach(() => { });

  it('should display Transaction text', () => {
    page.navigateTo();
    expect(page.getTransactionText()).toEqual('Transaction');
  });

  it('should display 3 Transaction details Rows', () => {
    page.navigateTo();
    expect(page.getDetailsRow()).toEqual(3);
  });

  it('should show the Transaction Id  and its length should be 64', () => {
    page.navigateTo();
    expect(page.getTransactionId()).toEqual(64);
  });

  it('should show One of Transaction Input and its length should be l>26 and l<36', () => {
    page.navigateTo();
    let inputAddress = page.getOneTransactionInput();
    expect(inputAddress).toBeLessThan(36);
    expect(inputAddress).toBeGreaterThan(26);
  });

  it('should show One of Transaction Output and its length should be l>26 and l<36', () => {
    page.navigateTo();
    let outputAddress = page.getOneTransactionOutput();
    expect(outputAddress).toBeLessThan(36);
    expect(outputAddress).toBeGreaterThan(26);
  });
});