import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld extends World {
  page: any;
  context: any;
  browser: any;
  loginPage?: any;
  productsPage?: any;
  cartPage?: any;
  checkoutPage?: any;

  constructor(options: IWorldOptions) {
    super(options);
    this.page = undefined;
    this.context = undefined;
    this.browser = undefined;
  }
}

setWorldConstructor(CustomWorld);
