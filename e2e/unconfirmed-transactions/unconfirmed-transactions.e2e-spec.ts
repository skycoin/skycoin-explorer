import { UnconfirmedTransactionsPage } from './unconfirmed-transactions.po';

describe('skycoin-explorer Unconfirmed Transactions Page', () => {
  const page = new UnconfirmedTransactionsPage();

  beforeEach(() => { });

  it('should display Unconfirmed Transactions text', () => {
    page.navigateTo();
    expect(page.getUnconfirmedTransactionsText()).toEqual(
      'Unconfirmed Transactions'
    );
  });

  it('should display 3 Unconfirmed Transactions details', () => {
    page.navigateTo();
    expect(page.getDetailsRow()).toEqual(3);
  });
});