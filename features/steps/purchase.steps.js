const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const ProductsPage = require('../../pages/products.page');
const CartPage = require('../../pages/cart.page');
const CheckoutPage = require('../../pages/checkout.page');

When('agrego el producto {string} al carrito', async function (productName) {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.addToCart(productName);
});

When('voy al carrito', async function () {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.open();
});

Then('debería ver {string} en el carrito', async function (productName) {
  const items = await this.cartPage.getCartItems();
  expect(items).to.include(productName);
});

When('inicio el pago con {string} {string} {string}', async function (first, last, zip) {
  await this.cartPage.checkout();
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.fillCheckoutInfo(first, last, zip);
});

Then('debería ver la confirmación del pedido', async function () {
  const confirmed = await this.checkoutPage.isOrderComplete();
  expect(confirmed).to.be.true;
});
