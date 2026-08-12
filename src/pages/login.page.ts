import BasePage from './base.page';

export default class LoginPage extends BasePage {
  url: string;
  username: string;
  password: string;
  loginButton: string;
  error: string;

  constructor(page: any) {
    super(page);
    this.url = 'https://www.saucedemo.com/';
    this.username = '#user-name';
    this.password = '#password';
    this.loginButton = '#login-button';
    this.error = '[data-test="error"]';
  }

  async open() {
    await this.goto(this.url);
  }

  async login(user: string, pass: string) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginButton);
  }

  async getError() {
    try {
      await this.page.waitForSelector(this.error, { timeout: 3000 });
      return await this.page.textContent(this.error);
    } catch (e) {
      return '';
    }
  }
}
