import { AddressDetailPage } from './address-detail.po';
import { GeneralPageFunctions } from "../general.po";

describe('skycoin-explorer Address Page', () => {
  const page = new AddressDetailPage();
  const generalFunctions = new GeneralPageFunctions();

  beforeEach(() => { });

  it('should display the correct title', () => {
    generalFunctions.navigateTo('/app/address/24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7');
    expect(generalFunctions.getPageTitle()).toBe("24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7");
  });

  it('should have the title for small screens', () => {
    expect(page.getPageTitleForSmallScreens()).toBe("Address");
  });

  it('should have 5 address details rows', () => {
    expect(generalFunctions.getDetailsRowCount()).toEqual(5);
  });

  it('should have the correct address for small screens', () => {
    expect(page.getAddressForSmallScreens()).toEqual("24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7");
  });

  it('should show the correct # of transactions', () => {
    expect(page.getNumberOfTransactions()).toBe(1);
  });

  it('should show the correct received amount', () => {
    expect(page.getTotalReceived()).toBe(0.001);
  });

  it('should show the correct current balance', () => {
    expect(page.getCurrentBalance()).toBe(0.001);
  });

  it('should show the correct transaction ID', () => {
    expect(generalFunctions.getTransactionId(0)).toEqual('f375dfb0cea3f082daa03341f6283a483a9857206442feabc94f2b05b1df1fab');
  });

  it('should show a valid transaction date', () => {
    expect(generalFunctions.getTransactionDateValidity(0)).toBeTruthy();
  });

  it('should show the correct transaction inputs', () => {
    expect(generalFunctions.getTransactionInputs(0)).toBe('TXXyvkvs7Lt3EFtvTh51i4BagiJaGARsva');
  });

  it('should show the correct transaction outputs', () => {
    expect(generalFunctions.getTransactionOutputs(0)).toBe('24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7,TXXyvkvs7Lt3EFtvTh51i4BagiJaGARsva');
  });

  it('should have the correct coins amount', () => {
    expect(generalFunctions.getTransactionInputsAndOutputsTotalCoins()).toBe(6.002);
  });

  it('should show the correct initial address balance', () => {
    expect(page.getInitialBalance(0)).toBe(0);
  });

  it('should show the correct final address balance', () => {
    expect(page.getFinalBalance(0)).toBe(0.001);
  });

  it('should show the correct balance variation', () => {
    expect(page.getBalanceChange(0)).toBe(0.001);
  });

  it('should show the error message', () => {
    generalFunctions.navigateTo('/app/address/24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x8');
    expect(generalFunctions.getErrorMessage()).toBeDefined();
  });
});