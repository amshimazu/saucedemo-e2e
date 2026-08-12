import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import LoginPage from '../pages/login.page';
import ProductsPage from '../pages/products.page';

Given('abro la página de login de Sauce Demo', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.open();
});

When('inicio sesión con {string} y {string}', async function (username: string, password: string) {
  await this.loginPage.login(username, password);
});

Then('debería ver {string}', async function (expectedResult: string) {
  const normalized = expectedResult.trim().toLowerCase();

  if (normalized === 'la página de productos') {
    this.productsPage = new ProductsPage(this.page);
    const title = await this.productsPage.getTitle();
    expect(title).to.equal('Products');
    return;
  }

  if (normalized === 'un mensaje de error') {
    const error = await this.loginPage.getError();
    expect(error).to.not.be.empty;
    return;
  }

  throw new Error(`Resultado no soportado en el escenario: ${expectedResult}`);
});
