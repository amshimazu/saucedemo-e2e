import BasePage from './base.page';

export default class CartPage extends BasePage {
  cartItem: string;
  cartUrl: string;
  checkoutButton: string;

  constructor(page: any) {
    super(page);
    this.cartItem = '.cart_item';
    this.cartUrl = 'https://www.saucedemo.com/cart.html';
    this.checkoutButton = '[data-test="checkout"]';
  }

  async open() {
    await this.goto(this.cartUrl);
    await this.page.waitForSelector(this.cartItem);
  }

  async getCartItems() {
    await this.page.waitForSelector(this.cartItem);
    const items = await this.page.$$eval('.cart_item .inventory_item_name', (els: any[]) => els.map((e: any) => e.textContent.trim()));
    return items;
  }

  async checkout() {
    await this.page.click(this.checkoutButton);
  }
}
