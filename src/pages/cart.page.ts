import { Locator, Page } from 'playwright';
import BasePage from './base.page';

export default class CartPage extends BasePage {
  readonly cartItem: Locator;
  readonly cartUrl = 'https://www.saucedemo.com/cart.html';
  readonly checkoutButton: Locator;
  readonly cartItemNames: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItemNames = page.locator('.cart_item .inventory_item_name');
  }

  async open(): Promise<void> {
    await this.goto(this.cartUrl);
    await this.cartItem.waitFor();
  }

  async getCartItems(): Promise<string[]> {
    await this.cartItem.waitFor();
    return await this.cartItemNames.allTextContents();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
