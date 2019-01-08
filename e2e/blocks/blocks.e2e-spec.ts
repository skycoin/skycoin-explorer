import { BlocksPage } from './blocks.po';
import { GeneralPageFunctions } from '../general.po';

describe('skycoin-explorer Blocks Page', () => {
  const page = new BlocksPage();
  const generalFunctions = new GeneralPageFunctions();

  beforeEach(() => { });

  it('should display the title for big screens', () => {
    generalFunctions.navigateTo('/');
    expect(page.getPageTitle(0)).toBe('Blocks');
  });

  it('should display the first title for small screens', () => {
    expect(page.getPageTitle(1)).toBe('Stats');
  });

  it('should display the second title for small screens', () => {
    expect(page.getPageTitle(2)).toBe('Blocks');
  });

  it('should display the Explorer API link', () => {
    expect(page.getExplorerApiText()).toEqual('Explorer API');
  });

  it('should display the Unconfirmed Transactions link', () => {
    expect(page.getUnconfirmedTransactionsText()).toEqual('Unconfirmed Transactions');
  });

  it('should display the Rich List link', () => {
    expect(page.getRichListText()).toEqual('Rich List');
  });

  it('should contain 5 stats labels', () => {
    expect(page.getStatsLabelsCount()).toEqual(5);
  });

  it('should contain valid stat values', () => {
    expect(page.getStat(0)).toBeGreaterThan(0);
    expect(page.getStat(1)).toBeGreaterThan(0);
    expect(page.getStat(2)).toBeGreaterThan(0);
    expect(page.getStat(3)).toBeGreaterThan(0);
    expect(page.getStat(4)).toBeGreaterThan(0);
  });

  it('should contain 10 blocks items', () => {
    expect(page.getBlocksListRowCount()).toEqual(10);
  });

  it('should have valid block times', () => {
    for (let i = 0; i < 10; i++) { expect(page.getTimeValidity(i)).toBeTruthy(); }
  });

  it('should have valid block numbers', () => {
    for (let i = 0; i < 10; i++) { expect(page.getBlockNumber(i)).toBeGreaterThan(0); }
  });

  it('should have valid transaction counts', () => {
    for (let i = 0; i < 10; i++) { expect(page.getTransactionCount(i)).toBeGreaterThan(0); }
  });

  it('should have valid block hashes', () => {
    for (let i = 0; i < 10; i++) { expect(page.getBlockHashLength(i)).toEqual(64); }
  });

  it('should contain a pagination control', () => {
    expect(page.getIfPaginationControlExists()).toBe(true);
  });

  it('should navigate to the next page and show 10 block items', () => {
    const blockCount = page.navigateToTheNextPage().then(() => {
      return page.getBlocksListRowCount();
    });

    expect(blockCount).toEqual(10);
  });

  it('should navigate to the previous page and show 10 block items', () => {
    const blockCount = page.navigateToThePreviousPage().then(() => {
      return page.getBlocksListRowCount();
    });

    expect(blockCount).toEqual(10);
  });

  it('should navigate to the last page and show at least 1 block item', () => {
    const blockCount = page.navigateToTheLastPage().then(() => {
      return page.getBlocksListRowCount();
    });

    expect(blockCount).toBeGreaterThan(0);
  });

  it('should navigate to the first page and show 10 block items', () => {
    const blockCount = page.navigateToTheFirstPage().then(() => {
      return page.getBlocksListRowCount();
    });

    expect(blockCount).toEqual(10);
  });

  it('should navigate to the second page and show 10 block items', () => {
    const blockCount = page.pressPageButton(2).then(() => {
      return page.getBlocksListRowCount();
    });

    expect(blockCount).toEqual(10);
  });

});
