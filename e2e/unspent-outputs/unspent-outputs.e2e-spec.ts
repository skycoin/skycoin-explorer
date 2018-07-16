import { UnspentOutputsPage } from "./unspent-outputs.po";
import { GeneralPageFunctions } from "../general.po";

describe('skycoin-explorer Unspent Outputs Page', () => {
  const page = new UnspentOutputsPage();
  const generalFunctions = new GeneralPageFunctions();

  beforeEach(() => { });

  it('should display the title', () => {
    generalFunctions.navigateTo('/app/unspent/24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7');
    expect(generalFunctions.getPageTitle()).toBe("Unspent Outputs");
  });

  it('should display 3 details rows', () => {
    expect(generalFunctions.getDetailsRowCount()).toEqual(3);
  });

  it('should show the correct address', () => {
    expect(page.getAddressText()).toBe("24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x7");
  });

  it('should show the correct number of outputs', () => {
    expect(page.getNumberOfOutputs()).toBe(1);
  });

  it('should show the correct number of coins', () => {
    expect(page.getTotalCoins()).toBe(0.001);
  });

  it('should show the correct origin transaction ID', () => {
    expect(generalFunctions.getTransactionId(0)).toEqual('f375dfb0cea3f082daa03341f6283a483a9857206442feabc94f2b05b1df1fab');
  });

  it('should show a valid transaction date', () => {
    expect(generalFunctions.getTransactionDateValidity(0)).toBeTruthy();
  });

  it('should show the correct output hash', () => {
    expect(page.getOutputId(0)).toBe('74ef6da8c13ec55f28a99aab6bcf890b8decea8c7c56ed55f0b9b4b8cef069da');
  });

  it('should have the correct coins amount', () => {
    expect(generalFunctions.getTransactionInputsAndOutputsTotalCoins()).toBe(0.001);
  });

  it('should show the error message', () => {
    generalFunctions.navigateTo('/app/unspent/24ooGeabUGQLnJmoyviqA8h2y7Cgz2CY4x8');
    expect(generalFunctions.getErrorMessage()).toBeDefined();
  });
});