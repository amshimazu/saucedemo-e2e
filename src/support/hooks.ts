import fs from 'fs';
import path from 'path';
import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import BasePage from '../pages/base.page';

setDefaultTimeout(60 * 1000);

const browserMetaFile = path.resolve(__dirname, '../../reports/browser.txt');

function persistBrowserName(browserName: string) {
  try {
    fs.mkdirSync(path.dirname(browserMetaFile), { recursive: true });
    fs.writeFileSync(browserMetaFile, browserName, 'utf8');
  } catch (error: any) {
    console.warn(`No se pudo guardar el navegador usado para el reporte: ${error.message}`);
  }
}

const HEADLESS_MODE = false;
const DEFAULT_SLOW_MO = 300;
const DEFAULT_BROWSER = 'chromium';

Before(async function () {
  const browserName = (process.env.BROWSER || DEFAULT_BROWSER).toLowerCase();
  process.env.BROWSER = browserName;
  persistBrowserName(browserName);

  const headless = process.env.HEADLESS ? process.env.HEADLESS.toLowerCase() === 'true' : HEADLESS_MODE;
  const slowMo = process.env.SLOW_MO ? Number(process.env.SLOW_MO) : DEFAULT_SLOW_MO;
  const launchOptions: any = { headless, slowMo };
  if (!headless) {
    launchOptions.args = ['--start-maximized'];
  }

  switch (browserName) {
    case 'chromium':
      this.browser = await chromium.launch(launchOptions);
      break;
    case 'firefox':
      this.browser = await firefox.launch(launchOptions);
      break;
    case 'edge':
      this.browser = await chromium.launch({ ...launchOptions, channel: 'msedge' });
      break;
    case 'webkit':
      this.browser = await webkit.launch(launchOptions);
      break;
    default:
      throw new Error(`Navegador no soportado: ${browserName}. Use chromium, firefox, edge o webkit.`);
  }

  const contextOptions: any = {};
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
    // no-op
  }
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
