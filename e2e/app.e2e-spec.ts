import { NgFirebaseContactsPage } from './app.po';

describe('ng-firebase-contacts App', () => {
  let page: NgFirebaseContactsPage;

  beforeEach(() => {
    page = new NgFirebaseContactsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
