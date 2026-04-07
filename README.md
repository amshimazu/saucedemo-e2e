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
npm.cmd test -- features/login.feature
```
- Ejecutar todos los features:
```powershell
npm.cmd test
```

Control del modo de ejecución
- El comportamiento por defecto se controla directamente en el archivo `features/support/hooks.js` mediante las constantes:
	- `const HEADLESS_MODE = false;` → dejar `false` para abrir la UI (headful).
	- `const DEFAULT_SLOW_MO = 0;` → milisegundos entre acciones (poner 300/500 para ver más lento).
- Si prefieres no editar el archivo, también puedes sobreescribir solo `SLOW_MO` temporalmente mediante variable de entorno:
```powershell
$env:SLOW_MO='500'
npm.cmd test -- features/login.feature
Remove-Item Env:\SLOW_MO
```
Notas
- `Set-ExecutionPolicy` se ejecuta una sola vez por usuario; no es necesario repetirlo en cada sesión.
-  Se dejara en modo `HEADLESS_MODE = false` en `hooks.js` para que la UI aparezca por defecto.

Credenciales de prueba
- `standard_user` / `secret_sauce`
- `locked_out_user` / `secret_sauce`

Estructura principal
- `features/` - archivos `.feature` y `steps`
- `pages/` - Page Objects (POM)
- `features/support` - hooks y configuración

Informe
- Archivo `INFORME.md` en la raíz con un breve informe sobre la estrategia de automatización y los patrones usados.