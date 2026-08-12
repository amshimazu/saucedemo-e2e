import { Locator, Page } from 'playwright';
import BasePage from './base.page';

export default class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async getTitle(): Promise<string> {
    await this.title.waitFor();
    return (await this.title.textContent())?.trim() ?? '';
  }

  async addToCart(productName: string): Promise<void> {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    if ((await productCard.count()) === 0) {
      throw new Error(`Product not found: ${productName}`);
    }
    await productCard.locator('button').click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
