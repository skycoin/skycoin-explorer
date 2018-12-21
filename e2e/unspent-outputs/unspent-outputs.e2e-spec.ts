import { UnspentOutputsPage } from './unspent-outputs.po';
import { GeneralPageFunctions } from '../general.po';
import { browser } from 'protractor';

describe('skycoin-explorer Unspent Outputs Page', () => {
  const page = new UnspentOutputsPage();
  const generalFunctions = new GeneralPageFunctions();

  const address = browser.params.chain === '180' ? '2A2YC8kxWnUDbscpzZ6UPfNAmx5ddKBeYNs' : '24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7';

  beforeEach(() => { });

  it('should display the title', () => {
    generalFunctions.navigateTo('/app/unspent/' + address);
    expect(generalFunctions.getPageTitle()).toBe('Unspent Outputs');
  });

  it('should display 4 details rows', () => {
    expect(generalFunctions.getDetailsRowCount()).toEqual(4);
  });

  it('should show the correct address', () => {
    expect(page.getAddressText()).toBe(address);
  });

  it('should show the correct number of outputs', () => {
    expect(page.getNumberOfOutputs()).toBe(1);
  });

  it('should show the correct number of coins', () => {
    if (browser.params.chain === '180') {
      expect(page.getTotalCoins()).toBe(100);
    } else {
      expect(page.getTotalCoins()).toBe(0.001);
    }
  });

  it('should show the correct origin transaction ID', () => {
    if (browser.params.chain === '180') {
      expect(generalFunctions.getTransactionId(0)).toEqual('b29222c08f10b8bc4ea18981519a3b0e02b9c9cec63ee28d9ffa2efcaf2a8e5a');
    } else {
      expect(generalFunctions.getTransactionId(0)).toEqual('f375dfb0cea3f082daa03341f6283a483a9857206442feabc94f2b05b1df1fab');
    }
  });

  it('should show a valid transaction date', () => {
    expect(generalFunctions.getTransactionDateValidity(0)).toBeTruthy();
  });

  it('should show the correct output hash', () => {
    if (browser.params.chain === '180') {
      expect(page.getOutputId(0)).toBe('0b5e5259c276ac949de97062492ea6dc93ae6215c8dd1615862907e3c3ae9cf0');
    } else {
      expect(page.getOutputId(0)).toBe('74ef6da8c13ec55f28a99aab6bcf890b8decea8c7c56ed55f0b9b4b8cef069da');
    }
  });

  it('should have the correct coins amount', () => {
    if (browser.params.chain === '180') {
      expect(page.getOutputsTotalCoins()).toBe(100);
    } else {
      expect(page.getOutputsTotalCoins()).toBe(0.001);
    }
  });

  it('should show the error message', () => {
    generalFunctions.navigateTo('/app/unspent/24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x8');
    expect(generalFunctions.getErrorMessage()).toBeDefined();
  });
});
