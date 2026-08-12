const fs = require('fs');
const path = require('path');
const reporter = require('cucumber-html-reporter');

const jsonFile = path.resolve(__dirname, '../reports/cucumber-report.json');
const outputFile = path.resolve(__dirname, '../reports/cucumber-report.html');
const browserMetaFile = path.resolve(__dirname, '../reports/browser.txt');

const resolveBrowserName = () => {
  if (process.env.BROWSER && process.env.BROWSER.trim()) {
    return process.env.BROWSER.trim();
  }

  try {
    if (fs.existsSync(browserMetaFile)) {
      const storedBrowser = fs.readFileSync(browserMetaFile, 'utf8').trim();
      if (storedBrowser) {
        return storedBrowser;
      }
    }
  } catch (error) {
    console.warn(`No se pudo leer el navegador guardado para el reporte: ${error.message}`);
  }

  return 'chromium';
};

if (!fs.existsSync(jsonFile)) {
  console.error(`No se encontró el archivo de reporte JSON: ${jsonFile}`);
  process.exit(1);
}

const jsonData = fs.readFileSync(jsonFile, 'utf8');
if (!jsonData || jsonData.trim().length === 0) {
  console.error('El archivo de reporte JSON está vacío. Asegúrate de que la ejecución de Cucumber haya producido datos.');
  process.exit(1);
}

const browserName = resolveBrowserName();
const browserType = browserName === 'edge' ? 'Microsoft Edge' : browserName === 'firefox' ? 'Firefox' : browserName === 'webkit' ? 'WebKit' : 'Chromium';

const options = {
  theme: 'bootstrap',
  jsonFile,
  output: outputFile,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'SauceDemo',
    Browser: browserName,
    'Browser Type': browserType,
    Platform: process.platform,
    Executed: new Date().toLocaleString(),
  },
};

reporter.generate(options);
console.log(`Reporte HTML generado en: ${outputFile}`);
