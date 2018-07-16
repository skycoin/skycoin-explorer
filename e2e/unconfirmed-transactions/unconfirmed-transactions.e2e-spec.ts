import { UnconfirmedTransactionsPage } from './unconfirmed-transactions.po';
import { GeneralPageFunctions } from "../general.po";

describe('skycoin-explorer Unconfirmed Transactions Page', () => {
  const page = new UnconfirmedTransactionsPage();
  const generalFunctions = new GeneralPageFunctions();

  beforeEach(() => { });

  it('should display Unconfirmed Transactions text', () => {
    generalFunctions.navigateTo('/app/unconfirmedtransactions');
    expect(generalFunctions.getPageTitle()).toEqual('Unconfirmed Transactions');
  });

  it('should display 4 Unconfirmed Transactions details', () => {
    expect(generalFunctions.getDetailsRowCount()).toEqual(4);
  });
});