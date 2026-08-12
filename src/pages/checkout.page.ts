import { Locator, Page } from 'playwright';
import BasePage from './base.page';

export default class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillCheckoutInfo(first: string, last: string, zip: string): Promise<void> {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async isOrderComplete(): Promise<boolean> {
    try {
      await this.completeHeader.waitFor({ timeout: 5000 });
      const txt = await this.completeHeader.textContent();
      return !!(txt && txt.trim().length > 0);
    } catch (e) {
      return false;
    }
  }
}
