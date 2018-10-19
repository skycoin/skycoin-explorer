import { UnconfirmedTransactionsPage } from './unconfirmed-transactions.po';
import { GeneralPageFunctions } from '../general.po';
import { browser } from 'protractor';

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

  if (browser.params.chain === '180') {
    it('should show the correct number of transactions', () => {
      expect(page.getNumberOfTransactions()).toBe(1);
    });

    it('should show the correct total size', () => {
      expect(page.getSize()).toBe(220);
    });

    it('should show a valid newest date', () => {
      expect(page.getTimestampValidity(3)).toBeTruthy();
    });

    it('should show a valid oldest date', () => {
      expect(page.getTimestampValidity(4)).toBeTruthy();
    });

    it('should show the correct transaction ID', () => {
      expect(generalFunctions.getTransactionId(0)).toEqual('701d23fd513bad325938ba56869f9faba19384a8ec3dd41833aff147eac53947');
    });

    it('should show a valid transaction date', () => {
      expect(generalFunctions.getTransactionDateValidity(0)).toBeTruthy();
    });

    it('should show the correct transaction inputs', () => {
      expect(generalFunctions.getTransactionInputs(0)).toBe('R6aHqKWSQfvpdo2fGSrq4F1RYXkBWR9HHJ');
    });

    it('should show the correct transaction outputs', () => {
      expect(generalFunctions.getTransactionOutputs(0)).toBe('R6aHqKWSQfvpdo2fGSrq4F1RYXkBWR9HHJ,212mwY3Dmey6vwnWpiph99zzCmopXTqeVEN');
    });

    it('should have the correct coins amount', () => {
      expect(generalFunctions.getTransactionInputsAndOutputsTotalCoins()).toBe(63915681);
    });
  }
});
