 # SauceDemo E2E - Playwright + Cucumber

Proyecto de tests E2E para Sauce Demo usando Playwright + Cucumber (Gherkin) y patrón Page Object Model (POM).

Requisitos
- Node.js 16+ (con `npm`) instalado en el sistema.

Preparación (una sola vez)
- En PowerShell puede ser necesario permitir la ejecución de scripts:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

Instalación de dependencias (una sola vez por proyecto)
```powershell
cd C:\ruta\al\proyecto\saucedemo-e2e
npm install
npm run install-browsers
```

Ejecutar los tests
- Ejecutar un feature específico:
```powershell
npm test -- features/login.feature
```
- Ejecutar todos los features:
```powershell
npm test
```
- Ejecutar en Chromium:
```powershell
npm run test:chromium
```
- Ejecutar en Firefox:
```powershell
npm run test:firefox
```
- Ejecutar en Edge:
```powershell
npm run test:edge
```
- Generar el reporte HTML y JSON automáticamente después de cada ejecución:
```powershell
npm test
```
- Abrir el reporte HTML generado:
```powershell
start reports\cucumber-report.html
```

Control del modo de ejecución
- El comportamiento por defecto se controla en `src/support/hooks.ts` mediante las constantes:
	- `const HEADLESS_MODE = false;` → dejar `false` para abrir la UI (headful).
	- `const DEFAULT_SLOW_MO = 300;` → milisegundos entre acciones.
- Si prefieres no editar el archivo, también puedes sobreescribir solo `SLOW_MO` temporalmente mediante variable de entorno:
```powershell
$env:SLOW_MO='500'
npm test -- features/login.feature
Remove-Item Env:\SLOW_MO
```
Notas
- `Set-ExecutionPolicy` se ejecuta una sola vez por usuario; no es necesario repetirlo en cada sesión.
- El proyecto ya está migrado a TypeScript y usa la estructura bajo `src/`.
- Los reportes se generan en la carpeta `reports/` ubicada en la raíz del proyecto.

Credenciales de prueba
- `standard_user` / `secret_sauce`
- `locked_out_user` / `secret_sauce`

Estructura principal
- `features/` - archivos `.feature`
- `src/pages/` - Page Objects (POM)
- `src/steps/` - steps de Cucumber
- `src/support/` - hooks y configuración

Informe
- Archivo `INFORME.md` en la raíz con un breve informe sobre la estrategia de automatización y los patrones usados.