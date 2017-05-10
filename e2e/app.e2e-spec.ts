import { JoletAngularPage } from './app.po';

describe('jolet-angular App', () => {
  let page: JoletAngularPage;

  beforeEach(() => {
    page = new JoletAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
