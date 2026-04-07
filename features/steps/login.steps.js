const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LoginPage = require('../../pages/login.page');
const ProductsPage = require('../../pages/products.page');

Given('abro la página de login de Sauce Demo', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.open();
});

When('inicio sesión con {string} y {string}', async function (username, password) {
  await this.loginPage.login(username, password);
});

Then('debería ver la página de productos', async function () {
  this.productsPage = new ProductsPage(this.page);
  const title = await this.productsPage.getTitle();
  expect(title).to.equal('Products');
});

Then('debería ver un mensaje de error', async function () {
  const error = await this.loginPage.getError();
  expect(error).to.not.be.empty;
});
