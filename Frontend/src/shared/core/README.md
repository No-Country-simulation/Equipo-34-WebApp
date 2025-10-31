# Arquitectura de Proveedores

## 📁 Estructura

```
src/shared/core/
├── CoreProviders.tsx     ← Solo Tema e Idioma (Storybook + App)
├── AppProviders.tsx      ← MSW + Auth + Core (Solo App)
├── ThemeProvider.tsx
├── LocaleProvider.tsx
└── index.ts
```

## 🎯 ¿Cuándo usar cada uno?

### CoreProviders (Básicos - Siempre)

**Incluye:**

- ✅ ThemeProvider (dark/light mode)
- ✅ LocaleProvider (es/en)

**Usar en:**

- ✅ Storybook (`.storybook/preview.ts`)
- ✅ Tests unitarios
- ✅ Cuando solo necesitas tema e idioma

**NO incluye:**

- ❌ MSW (Mock Service Worker)
- ❌ AuthProvider
- ❌ Otros providers específicos de la app

### AppProviders (Completos - Solo App)

**Incluye:**

- ✅ CoreProviders (Tema + Idioma)
- ✅ MSWProvider (Mocks para desarrollo)
- ✅ AuthProvider (Estado de autenticación)

**Usar en:**

- ✅ `app/layout.tsx` (aplicación principal)
- ✅ Entornos de desarrollo/producción completos

## 💡 Ventajas de esta separación

1. **Storybook más ligero** - No carga MSW innecesariamente
2. **Mejor rendimiento** - Solo cargas lo que necesitas
3. **Más flexible** - Puedes componer providers según el contexto
4. **Tests más simples** - Usa CoreProviders en tests unitarios

## 📝 Ejemplos de uso

### En Storybook

```typescript
// .storybook/preview.ts
import { CoreProviders } from '../src/shared/core/CoreProviders';

decorators: [
  (Story) => createElement(CoreProviders, null, createElement(Story)),
]
```

### En la App

```tsx
// app/layout.tsx
import { AppProviders } from '@/shared/core/AppProviders';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
```

### En Tests (futuro)

```tsx
import { CoreProviders } from '@/shared/core';

const wrapper = ({ children }) => (
  <CoreProviders>{children}</CoreProviders>
);

render(<MyComponent />, { wrapper });
```

## 🔄 Orden de carga

### CoreProviders

```
ThemeProvider
  └─ LocaleProvider
      └─ children
```

### AppProviders

```
CoreProviders (Theme + Locale)
  └─ MSWProvider
      └─ AuthProvider
          └─ children
```

## ⚠️ Importante

- **NO** agregues providers específicos de features a CoreProviders
- **SÍ** agrega nuevos providers globales a AppProviders
- **SIEMPRE** documenta por qué un provider es necesario globalmente
