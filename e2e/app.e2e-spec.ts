import { SkycoinExplorerPage } from './app.po';

describe('skycoin-explorer App', () => {
  let page: SkycoinExplorerPage;

  beforeEach(() => {
    page = new SkycoinExplorerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
