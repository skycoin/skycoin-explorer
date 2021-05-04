import { AddressDetailPage } from './address-detail.po';
import { GeneralPageFunctions } from '../general.po';
import { browser } from 'protractor';

describe('skycoin-explorer Address Page', () => {
  const page = new AddressDetailPage();
  const generalFunctions = new GeneralPageFunctions();

  const address = browser.params.chain === '180' ? '2A2YC8kxWnUDbscpzZ6UPfNAmx5ddKBeYNs' : '24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7';

  beforeEach(() => { });

  it('should display the correct title', () => {
    generalFunctions.navigateTo('/app/address/' + address);
    expect(generalFunctions.getPageTitle()).toBe(address);
  });

  it('should have the title for small screens', () => {
    expect(page.getPageTitleForSmallScreens()).toBe('Address');
  });

  it('should have 5 address details rows', () => {
    expect(generalFunctions.getDetailsRowCount()).toEqual(5);
  });

  it('should have the correct address for small screens', () => {
    expect(page.getAddressForSmallScreens()).toEqual(address);
  });

  it('should show the correct # of transactions', () => {
    expect(page.getNumberOfTransactions()).toBe(1);
  });

  it('should show the correct received amount', () => {
    if (browser.params.chain === '180') {
      expect(page.getTotalReceived()).toBe(100);
    } else {
      expect(page.getTotalReceived()).toBe(0.001);
    }
  });

  it('should show the correct sent amount', () => {
    if (browser.params.chain === '180') {
      expect(page.getTotalSent()).toBe(0);
    } else {
      expect(page.getTotalSent()).toBe(0);
    }
  });

  it('should show the correct current balance', () => {
    if (browser.params.chain === '180') {
      expect(page.getCurrentBalance()).toBe(100);
    } else {
      expect(page.getCurrentBalance()).toBe(0.001);
    }
  });

  it('should show the correct transaction ID', () => {
    if (browser.params.chain === '180') {
      expect(generalFunctions.getTransactionId(0)).toEqual('b29222c08f10b8bc4ea18981519a3b0e02b9c9cec63ee28d9ffa2efcaf2a8e5a');
    } else {
      expect(generalFunctions.getTransactionId(0)).toEqual('f375dfb0cea3f082daa03341f6283a483a9857206442feabc94f2b05b1df1fab');
    }
  });

  it('should show a valid transaction date', () => {
    expect(generalFunctions.getTransactionDateValidity(0)).toBeTruthy();
  });

  it('should show the correct transaction inputs', () => {
    if (browser.params.chain === '180') {
      expect(generalFunctions.getTransactionInputs(0)).toBe('R6aHqKWSQfvpdo2fGSrq4F1RYXkBWR9HHJ');
    } else {
      expect(generalFunctions.getTransactionInputs(0)).toBe('TXXyvkvs7Lt3EFtvTh51i4BagiJaGARsva');
    }
  });

  it('should show the correct transaction outputs', () => {
    if (browser.params.chain === '180') {
      expect(generalFunctions.getTransactionOutputs(0)).toBe('R6aHqKWSQfvpdo2fGSrq4F1RYXkBWR9HHJ,2A2YC8kxWnUDbscpzZ6UPfNAmx5ddKBeYNs');
    } else {
      expect(generalFunctions.getTransactionOutputs(0)).toBe('24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7,TXXyvkvs7Lt3EFtvTh51i4BagiJaGARsva');
    }
  });

  it('should have the correct coins amount', () => {
    if (browser.params.chain === '180') {
      expect(generalFunctions.getTransactionInputsAndOutputsTotalCoins()).toBe(1655151);
    } else {
      expect(generalFunctions.getTransactionInputsAndOutputsTotalCoins()).toBe(158.002);
    }
  });

  it('should show the correct initial address balance', () => {
    expect(page.getInitialBalance(0)).toBe(0);
  });

  it('should show the correct final address balance', () => {
    if (browser.params.chain === '180') {
      expect(page.getFinalBalance(0)).toBe(100);
    } else {
      expect(page.getFinalBalance(0)).toBe(0.001);
    }
  });

  it('should show the correct balance variation', () => {
    if (browser.params.chain === '180') {
      expect(page.getBalanceChange(0)).toBe(100);
    } else {
      expect(page.getBalanceChange(0)).toBe(0.001);
    }
  });

  it('should show the error message', () => {
    generalFunctions.navigateTo('/app/address/24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x8');
    expect(generalFunctions.getErrorMessage()).toBeDefined();
  });
});
