import { ExplorerDatePipe } from "app/pipes/explorer-date.pipe";

describe('ExplorerDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ExplorerDatePipe(null);
    expect(pipe).toBeTruthy();
  });
});
