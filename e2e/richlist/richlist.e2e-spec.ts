import { RichlistPage } from './richlist.po';
import { GeneralPageFunctions } from '../general.po';

describe('skycoin-explorer Rich List Page', () => {
  const page = new RichlistPage();
  const generalFunctions = new GeneralPageFunctions();

  beforeEach(() => { });

  it('should display the title', () => {
    generalFunctions.navigateTo('/app/richlist');
    expect(page.getPageTitle()).toEqual('Rich List');
  });

  it('should contain 20 Entries', () => {
    expect(page.getEntriesCount()).toEqual(20);
  });

  it('should have valid entry numbers', () => {
    for (let i = 0; i < 20; i++) { expect(page.getEntryNumber(i)).toBeGreaterThan(0); }
  });

  it('should have valid addresses', () => {
    for (let i = 0; i < 20; i++) {
      const AddressLength = page.getAddressLength(i);
      expect(AddressLength).toBeGreaterThan(26);
    }
  });

  it('should have valid amounts', () => {
    for (let i = 0; i < 20; i++) { expect(page.getAmount(i)).toBeGreaterThan(0); }
  });

});
