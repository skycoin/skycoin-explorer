import { TransactionDetailPage } from './transaction-detail.po';
import { GeneralPageFunctions } from "../general.po";

describe('skycoin-explorer Transaction Page', () => {
  const page = new TransactionDetailPage();
  const generalFunctions = new GeneralPageFunctions();

  beforeEach(() => { });

  it('should display the title', () => {
    generalFunctions.navigateTo('/app/transaction/0579e7727627cd9815a8a8b5e1df86124f45a4132cc0dbd00d2f110e4f409b69');
    expect(generalFunctions.getPageTitle()).toBe("Transaction");
  });

  it('should display 4 transaction details rows', () => {
    expect(generalFunctions.getDetailsRowCount()).toEqual(4);
  });

  it('should show a valid timestamp', () => {
    expect(page.getTimestampValidity()).toBeTruthy();
  });

  it('should show the correct size', () => {
    expect(page.getSize()).toBe(317);
  });

  it('should show the correct block number', () => {
    expect(page.getBlockNumber()).toBe(5);
  });

  it('should show the correct transaction ID', () => {
    expect(generalFunctions.getTransactionId(0)).toEqual('0579e7727627cd9815a8a8b5e1df86124f45a4132cc0dbd00d2f110e4f409b69');
  });

  it('should show a valid transaction date', () => {
    expect(generalFunctions.getTransactionDateValidity(0)).toBeTruthy();
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

  it('should show the error message', () => {
    generalFunctions.navigateTo('/app/transaction/0579e7727627cd9815a8a8b5e1df86124f45a4132cc0dbd00d2f110e4f409b68');
    expect(generalFunctions.getErrorMessage()).toBeDefined();
  });
});