import { BlocksPage } from '../blocks/blocks.po';

describe('skycoin-explorer Search Component', () => {
  const page = new BlocksPage();

  beforeEach(() => { });

  it('should write one block inside search component', () => {
    page.navigateTo();
    expect<any>(page.putBlockInSearchCmp()).toEqual('Block Details');
  });
  
});