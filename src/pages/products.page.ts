import BasePage from './base.page';

export default class ProductsPage extends BasePage {
  title: string;
  inventoryItem: string;
  cartLink: string;

  constructor(page: any) {
    super(page);
    this.title = '.title';
    this.inventoryItem = '.inventory_item';
    this.cartLink = '.shopping_cart_link';
  }

  async getTitle() {
    await this.page.waitForSelector(this.title);
    return (await this.page.textContent(this.title)).trim();
  }

  async addToCart(productName: string) {
    const items = await this.page.$$(this.inventoryItem);
    for (const item of items) {
      const name = await item.$eval('.inventory_item_name', (el: any) => el.textContent.trim());
      if (name === productName) {
        const btn = await item.$('button');
        await btn.click();
        return;
      }
    }
    throw new Error(`Product not found: ${productName}`);
  }

  async openCart() {
    await this.page.click(this.cartLink);
  }
}
