const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const BasePage = require('../../pages/base.page');

setDefaultTimeout(60 * 1000);

// headless: true -> sin UI, headless: false -> con UI (ver navegador)
const HEADLESS_MODE = false; // cambiar a true para headless
const DEFAULT_SLOW_MO = 300;   // milisegundos entre acciones, poner >0 para ver mejor

Before(async function () {
  const headless = HEADLESS_MODE;
  const slowMo = process.env.SLOW_MO ? Number(process.env.SLOW_MO) : DEFAULT_SLOW_MO;
  const launchOptions = { headless, slowMo };
  if (!headless) {
    launchOptions.args = ['--start-maximized'];
  }
  this.browser = await chromium.launch(launchOptions);

  const contextOptions = {};
  if (!headless) {
    contextOptions.viewport = null;
  } else {
    contextOptions.viewport = { width: 1920, height: 1080 };
  }
  this.context = await this.browser.newContext(contextOptions);
  this.page = await this.context.newPage();

  try {
    const base = new BasePage(this.page);
    await base.maximize();
  } catch (e) {
  }
});


After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});