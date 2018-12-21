import { NavigarionPage } from './navigation.po';
import { GeneralPageFunctions } from '../general.po';

describe('skycoin-explorer Navigation', () => {
  const page = new NavigarionPage();
  const generalFunctions = new GeneralPageFunctions();

  beforeEach(() => { });

  it('should open the blocks page', () => {
    generalFunctions.navigateTo('/');
  });

  it('should navigate to the richlist page', () => {
    page.goToRichlistPage();
  });

  it('should navigate to the unconfirmed transaction page', () => {
    generalFunctions.goBack();
    page.goToUnconfirmedTransactions();
  });

  it('should navigate to the block details page', () => {
    generalFunctions.goBack();
    page.goToBlockDetails();
  });

  it('should navigate to the transaction detail page', () => {
    page.goToTransactionDetail();
  });

  it('should navigate to the address detail page', () => {
    generalFunctions.goBack();
    page.goToAddressDetail();
  });

  it('should navigate to the unspent outputs page', () => {
    page.goToUnspentOutputs();
  });

});
