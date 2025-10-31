# task(clinic-nc-project-base): Configuración de herramientas base (ESLint, Prettier, MSW, Zustand)

## 📌 Issue Relacionado

- Closes #6 (Dev Tools Setup)

## 📌 Descripción

Esta PR **establece la base técnica del proyecto ClinicaNC** mediante la configuración integral de herramientas esenciales que garantizan:

- ✅ **Código limpio, uniforme y tipado** (ESLint + Prettier + TypeScript)
- ✅ **Mockeo realista de APIs desde el primer día** (MSW)
- ✅ **Gestión de estado ligera y escalable** (Zustand)
- ✅ **Experiencia de desarrollo inmediata** sin configuración manual

> 🎯 Cualquier desarrollador que clone el repo podrá trabajar con feedback en tiempo real, mocks funcionales y estado listo para usar.

---

## 📸 Capturas de Pantalla

### 1. Configuración ESLint en VS Code

![ESLint Configuration](./screenshots/pr-base-01-eslint-config.png)

### 2. Prettier Formateando Código

![Prettier Formatting](./screenshots/pr-base-02-prettier-formatting.png)

### 3. MSW Iniciado Correctamente

![MSW Working](./screenshots/pr-base-03-msw-working.png)

### 4. Estructura de Carpetas Base

![Folder Structure](./screenshots/pr-base-04-folder-structure.png)

### 5. Resultado del Lint

![Lint Results](./screenshots/pr-base-05-lint-results.png)

---

## ✅ Entregables Implementados

### 1. **ESLint + Prettier**

- Archivo `eslint.config.mjs` con soporte para Next.js 15 y TypeScript
- Configuración de Prettier en `.prettierrc.json`
- Integración automática en VS Code (`.vscode/settings.json`)
- Scripts útiles: `lint`, `lint:fix`, `format`

```javascript
// eslint.config.mjs
import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from 'typescript-eslint';

export default [
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  ...typescriptPlugin.configs.recommended,
];
```

### 2. **MSW (Mock Service Worker)**

- Estructura completa en `/src/mocks/`:
  - `browser.ts` → worker para desarrollo
  - `handlers/` → auth, admin, example
  - `data/` → datos mockeados (ej. usuarios)
  - `providers/MSWProvider.tsx` → integración React
- Service Worker generado en `public/mockServiceWorker.js`
- Integración segura en `layout.tsx` (solo en desarrollo)

```typescript
// src/app/layout.tsx
'use client';
import { MSWProvider } from '@/mocks/providers/MSWProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
```

### 3. **Zustand**

- Instalado (`zustand@5.0.8`)
- Carpeta base creada: `/src/shared/stores/`
- Documentación clara en `AGENTS.md` con ejemplos de uso

```typescript
// Ejemplo en AGENTS.md
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

---

## 📁 Estructura Final Relevante

```
Frontend/
├── eslint.config.mjs
├── .prettierrc.json
├── .eslintignore
├── .prettierignore
├── .vscode/settings.json
├── public/mockServiceWorker.js
└── src/
    ├── mocks/
    │   ├── browser.ts
    │   ├── README.md
    │   ├── handlers/
    │   │   ├── handlers.ts
    │   │   ├── auth.ts
    │   │   └── admin.ts
    │   ├── data/
    │   │   └── users.mock.ts
    │   ├── utils/
    │   │   └── jwt.mock.ts
    │   └── providers/
    │       └── MSWProvider.tsx
    └── shared/stores/   # lista para features
```

---

## 🚀 ¿Cómo Probar?

```bash
# 1. Clonar rama
git checkout task/clinic-nc-project-base/dev-tools

# 2. Instalar dependencias
cd Frontend
npm install

# 3. Verificar linting
npm run lint

# 4. Formatear código
npm run format

# 5. Iniciar dev server
npm run dev
```

**Validaciones esperadas:**

- ✅ Al abrir la app: mensaje "✅ MSW iniciado correctamente" en consola
- ✅ VS Code muestra advertencias de ESLint en tiempo real
- ✅ No hay errores en DevTools
- ✅ Requests a `/api/*` son interceptados

---

## ✅ Checklist de Validación

- [x] ESLint funcional con reglas de Next.js + TypeScript
- [x] Prettier formatea automáticamente
- [x] MSW intercepta requests en `/api/*`
- [x] Zustand instalado y documentado
- [x] Todo solo activo en `development`
- [x] `npm run dev` sin errores
- [x] Estructura limpia y escalable
- [x] `.eslintignore` configurado
- [x] `.prettierignore` configurado
- [x] `.vscode/settings.json` con formateo automático
- [x] Service Worker registrado correctamente

---

## 🔀 Estrategia de Merge

- **Rama**: `task/clinic-nc-project-base/dev-tools`
- **Destino**: `feat/clinic-nc-project-base`
- **No se mergea directamente a `dev`**

Esta PR es el **foundation** del proyecto. Todas las features futuras dependerán de estas herramientas correctamente configuradas.

---

## 📝 Notas Clave

- **MSW está aislado**: solo en cliente, solo en desarrollo.
- **Zustand no impone**: cada feature decide si lo usa.
- **ESLint + Prettier sin conflictos**: gracias a `eslint-config-prettier`.
- **Documentación incluida**: `AGENTS.md` guía a nuevos devs.
- **TypeScript strict**: todas las validaciones en tiempo de compilación.

---

## 🎓 Para Nuevos Desarrolladores

### Crear un nuevo handler MSW

```typescript
// src/mocks/handlers/example.ts
import { http, HttpResponse } from 'msw';

export const exampleHandlers = [
  http.get('*/api/example', () => {
    return HttpResponse.json({ message: 'Hello' });
  }),
];
```

### Registrar nuevo handler

```typescript
// src/mocks/handlers/handlers.ts
import { authHandlers } from './auth';
import { adminHandlers } from './admin';

export const handlers = [
  ...authHandlers,
  ...adminHandlers,
];
```

---

**Asignado**: @davidcoachdev  
**Estado**: ✅ **Listo para review y merge**  
**Fecha**: 21 de octubre de 2025
