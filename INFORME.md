Informe breve — Estrategia de automatización
===========================================

Resumen
- Proyecto de pruebas E2E para Sauce Demo usando Playwright (interacción con navegador) y Cucumber (BDD/Gherkin).

Herramientas
- Playwright: automatización de navegador, instalación de navegadores mediante `npx playwright install`.
- @cucumber/cucumber: ejecución de escenarios escritos en Gherkin.
- Chai: aserciones.

Patrones y diseño
- Page Object Model (POM): cada página relevante tiene su clase en `pages/` (ej: `login.page.js`, `products.page.js`, `cart.page.js`, `checkout.page.js`) que encapsula selectores y acciones.
- Separación de responsabilidades: `features/` contiene escenarios y step definitions; `features/support` contiene hooks y configuración global.

Estructura de carpetas
- `features/` — `.feature` (Gherkin) y `steps/`.
- `pages/` — POM classes.
- `features/support/` — hooks (arranque de navegador, maximizar, timeouts).

Estrategia de testing
- Scenarios BDD que cubren: login (usuario válido / bloqueado), agregar al carrito, ver carrito, completar compra.
- Cada prueba puede ejecutarse varias veces y obtener el mismo resultado.
- Las pruebas no dependen unas de otras: cada una prepara su propio estado y no comparte datos con otras pruebas.
- Uso de `Before`/`After` para inicializar y cerrar navegador/contexts.

Ejecución y debugging
- Por defecto la suite abre la UI (control en `features/support/hooks.js` mediante `HEADLESS_MODE`).
- Para ver interacciones más claras, se puede ajustar `DEFAULT_SLOW_MO` en `hooks.js` o usar `PWDEBUG` para el inspector.

Contacto
- Revisor técnico: revisar `README.md` para instrucciones de ejecución local y `REPORT.md` para esta estrategia resumida.
