const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor(page) {
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

  async login(user, pass) {
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

module.exports = LoginPage;
