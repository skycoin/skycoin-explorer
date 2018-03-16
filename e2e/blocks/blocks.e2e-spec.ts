import { BlocksPage } from './blocks.po';

describe('skycoin-explorer Blocks Page', () => {
  const page = new BlocksPage();

  beforeEach(() => { });

  it('should display Blocks text', () => {
    page.navigateTo();
    expect(page.getBlocksText()).toEqual('Blocks');
  });

  it('should display Unconfirmed Transactions text', () => {
    page.navigateTo();
    expect(page.getUnconfirmedTransactionsText()).toEqual('Unconfirmed Transactions');
  });

  it('should contain 5 Details Blocks Labels', () => {
    page.navigateTo();
    expect<any>(page.getDetailsLabelsCount()).toEqual(5);
  });

  it('should contain 5 Details Blocks Values', () => {
    page.navigateTo();
    expect<any>(page.getDetailsValuesCount()).toEqual(5);
  });

  it('should contain 10 Blocks Items', () => {
    page.navigateTo();
    expect<any>(page.getBlocksListCount()).toEqual(10);
  });

  it('should contain a Blocks Pagination', () => {
    page.navigateTo();
    expect<any>(page.getPagination()).toBe(true);
  });

  it('should contain 10 Blocks Items when the page change', () => {
    page.navigateTo();
    expect<any>(page.getPagination()).toBe(true);
  });
  
});