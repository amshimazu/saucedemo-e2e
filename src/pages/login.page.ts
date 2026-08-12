import { Locator, Page } from 'playwright';
import BasePage from './base.page';

export default class LoginPage extends BasePage {
  readonly url = 'https://www.saucedemo.com/';
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await this.goto(this.url);
  }

  async login(user: string, pass: string): Promise<void> {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async getError(): Promise<string> {
    try {
      await this.errorMessage.waitFor({ timeout: 3000 });
      return (await this.errorMessage.textContent())?.trim() ?? '';
    } catch (e) {
      return '';
    }
  }
}
