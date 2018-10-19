import { BlockDetailsPage } from './block-details.po';
import { GeneralPageFunctions } from '../general.po';

describe('skycoin-explorer Block Details Page', () => {
  const page = new BlockDetailsPage();
  const generalFunctions = new GeneralPageFunctions();

  beforeEach(() => { });

  it('should display the title', () => {
    generalFunctions.navigateTo('/app/block/5');
    expect(generalFunctions.getPageTitle()).toEqual('Block Details');
  });

  it('should display 6 block details rows', () => {
    expect(generalFunctions.getDetailsRowCount()).toEqual(6);
  });

  it('should show the correct block hight', () => {
    expect(page.getBlockHeight()).toBe(5);
  });

  it('should show a valid timestamp', () => {
    expect(page.getTimestampValidity()).toBeTruthy();
  });

  it('should show the correct size', () => {
    expect(page.getSize()).toBe(317);
  });

  it('should show the correct block hash', () => {
    expect(page.getBlockHash()).toEqual('114fe60587a158428a47e0f9571d764f495912c299aa4e67fc88004cf21b0c24');
  });

  it('should show the correct parent block hash', () => {
    expect(page.getParentHash()).toEqual('415e47348a1e642cb2e31d00ee500747d3aed0336aabfff7d783ed21465251c7');
  });

  it('should show the correct amount', () => {
    expect(page.getAmount()).toBe(999990);
  });

  it('should show the correct transaction ID', () => {
    expect(generalFunctions.getTransactionId(0)).toEqual('0579e7727627cd9815a8a8b5e1df86124f45a4132cc0dbd00d2f110e4f409b69');
  });

  it('should show the correct transaction inputs', () => {
    expect(generalFunctions.getTransactionInputs(0)).toBe('R6aHqKWSQfvpdo2fGSrq4F1RYXkBWR9HHJ,R6aHqKWSQfvpdo2fGSrq4F1RYXkBWR9HHJ');
  });

  it('should show the correct transaction outputs', () => {
    expect(generalFunctions.getTransactionOutputs(0)).toBe('R6aHqKWSQfvpdo2fGSrq4F1RYXkBWR9HHJ,2fGC7kwAM9yZyEF1QqBqp8uo9RUsF6ENGJF');
  });

  it('should have the correct coins amount', () => {
    expect(generalFunctions.getTransactionInputsAndOutputsTotalCoins()).toBe(2013866);
  });

  it('should display the "Previous block" button', () => {
    expect(page.getNavigationButtonText(0)).toBe('Previous block');
  });

  it('should display the "Next block" button', () => {
    expect(page.getNavigationButtonText(1)).toBe('Next block');
  });

  it('should navigate to the previous block using the nav button', () => {
    page.clickNavigationButton(0).then(() => {
      expect(page.getBlockHash()).toEqual('415e47348a1e642cb2e31d00ee500747d3aed0336aabfff7d783ed21465251c7');
    });
  });

  it('should navigate to the next block using the nav button', () => {
    page.clickNavigationButton(1).then(() => {
      expect(page.getBlockHash()).toEqual('114fe60587a158428a47e0f9571d764f495912c299aa4e67fc88004cf21b0c24');
    });
  });

  it('should show the error message', () => {
    generalFunctions.navigateTo('/app/block/-1');
    expect(generalFunctions.getErrorMessage()).toBeDefined();
  });
});
