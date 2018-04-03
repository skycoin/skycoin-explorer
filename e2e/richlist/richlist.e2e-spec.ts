import { RichlistPage } from './richlist.po';

describe('skycoin-explorer Rich List Page', () => {
  const page = new RichlistPage();

  beforeEach(() => { });
  
  it('should display Rich List text', () => {
    page.navigateTo();
    expect(page.getRichlistText()).toEqual('Rich List');
  });
  
  it('should contain 20 Entries', () => {
    page.navigateTo();
    expect<any>(page.getEntriesCount()).toEqual(20);
  });
  
});