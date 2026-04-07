const BasePage = require('./base.page');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = '[data-test="firstName"]';
    this.lastName = '[data-test="lastName"]';
    this.postalCode = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
    this.completeHeader = '.complete-header';
  }

  async fillCheckoutInfo(first, last, zip) {
    await this.page.fill(this.firstName, first);
    await this.page.fill(this.lastName, last);
    await this.page.fill(this.postalCode, zip);
    await this.page.click(this.continueButton);
    await this.page.click(this.finishButton);
  }

  async isOrderComplete() {
    try {
      await this.page.waitForSelector(this.completeHeader, { timeout: 5000 });
      const txt = await this.page.textContent(this.completeHeader);
      return txt && txt.trim().length > 0;
    } catch (e) {
      return false;
    }
  }
}

module.exports = CheckoutPage;
