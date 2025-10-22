# Design System Setup - Tailwind CSS v4 + shadcn/ui

## ✅ Completado

### 1. Configuración de Tailwind CSS v4
- ✅ Instalación de `@tailwindcss/postcss` (v4) y `tailwindcss` (v4)
- ✅ Configuración de `postcss.config.mjs` con `@tailwindcss/postcss`
- ✅ Implementación de `@theme` en `src/styles/globals.css` para CSS variables
- ✅ Soporte para dark mode con variables CSS dinámicas
- ✅ Paleta de colores clínica profesional:
  - **Primario**: Azul cielo (#0ea5e9) para acciones principales
  - **Secundario**: Gris pizarra (#64748b) para elementos secundarios
  - **Acento**: Verde esmeralda (#22c55e) para énfasis

### 2. Estructura de Archivos
```
Frontend/
├── .storybook/
│   ├── main.ts (configuración de Storybook + addons)
│   ├── preview.ts (configuración global de stories + theme switcher)
│   └── vitest.setup.ts (configuración de Vitest para testing)
├── src/
│   ├── app/
│   │   ├── layout.tsx (importa globals.css)
│   │   └── page.tsx
│   ├── styles/
│   │   └── globals.css (nueva ubicación con @theme)
│   └── shared/
│       └── ui/
│           ├── button.tsx
│           ├── button.stories.tsx ⭐ NEW
│           ├── input.tsx
│           ├── input.stories.tsx ⭐ NEW
│           ├── select.tsx
│           ├── select.stories.tsx ⭐ NEW
│           ├── label.tsx
│           ├── label.stories.tsx ⭐ NEW
│           ├── checkbox.tsx
│           ├── checkbox.stories.tsx ⭐ NEW
│           ├── card.tsx
│           ├── card.stories.tsx ⭐ NEW
│           ├── alert.tsx
│           └── alert.stories.tsx ⭐ NEW
├── postcss.config.mjs
├── tailwind.config.ts
├── vitest.config.ts ⭐ NEW
└── next.config.ts
```

### 3. Storybook 9.1.13 Configurado
- ✅ Framework: `@storybook/nextjs-vite` (compatible con Next.js 15 + Turbopack)
- ✅ Addons instalados:
  - `@chromatic-com/storybook` - Pruebas visuales
  - `@storybook/addon-docs` - Documentación automática (Autodocs)
  - `@storybook/addon-onboarding` - Tutorial interactivo
  - `@storybook/addon-a11y` - Tests de accesibilidad
  - `@storybook/addon-vitest` - Integración con Vitest para testing
  - `@storybook/addon-themes` - **Switcher de tema claro/oscuro** 🌙
- ✅ **7 Stories creadas** para todos los componentes UI
- ✅ **Dark mode switcher** integrado en toolbar
- ✅ **Tailwind CSS v4 funcionando** automáticamente (sin addon adicional)
- ✅ Running en **http://localhost:6006/**

### 4. CSS Variables Implementadas

#### Variables de Tema (Light Mode por defecto)
```css
--color-primary: #0ea5e9      /* Azul cielo */
--color-secondary: #64748b    /* Gris pizarra */
--color-accent: #22c55e       /* Verde esmeralda */
--color-background: #ffffff   /* Fondo blanco */
--color-foreground: #09090b   /* Texto oscuro */
--color-border: #e5e7eb       /* Borde gris claro */
--color-input: #f3f4f6        /* Input gris muy claro */
--color-muted: #f5f5f5        /* Muted gris claro */
--color-destructive: #ef4444  /* Rojo para acciones destructivas */
```

#### Dark Mode
Simplemente agrega clase `dark` al elemento `html`:
```typescript
document.documentElement.classList.add('dark')
```

Las variables se actualizarán automáticamente.

## 🔧 Configuración Técnica

### Tailwind v4 Diferencias Clave
1. **Uso de `@theme` en lugar de `:root`**
   - Los colores en `@theme` se convierten automáticamente en utilidades Tailwind
   - Formato: `--color-nombre: valor`
   - Se generan automáticamente: `bg-primary`, `text-primary`, `border-primary`, etc.

2. **PostCSS Plugin**: `@tailwindcss/postcss`
   - Diferente al plugin tradicional de Tailwind v3
   - Lee configuración de `tailwind.config.ts`
   - Compatible con Turbopack

3. **Directivas CSS**:
   - `@import "tailwindcss";` (sintaxis moderna v4)
   - O `@tailwind base; @tailwind components; @tailwind utilities;` (compatible)

### archivos de Configuración

**`postcss.config.mjs`**:
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**`tailwind.config.ts`**:
- Define extensiones del tema (paletas de colores, animaciones)
- Lee variables de `src/styles/globals.css` automáticamente
- Se aplican a través de `@theme` en globals.css

**`src/styles/globals.css`**:
```css
@import "tailwindcss";

@theme {
  --color-primary: #0ea5e9;
  --color-secondary: #64748b;
  /* ... más variables ... */
}

@theme dark {
  --color-background: #09090b;
  --color-foreground: #f5f5f5;
  /* ... más variables para dark mode ... */
}
```

**`.storybook/main.ts`**:
```typescript
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  staticDirs: ["..\\public"]
};
export default config;
```

**`.storybook/preview.ts`**:
```typescript
import type { Preview } from '@storybook/nextjs-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-mode',
    }),
  ],
};
export default preview;
```

## 📦 Componentes Instalados (shadcn/ui)

| Componente | Stories | Variantes |
|------------|---------|-----------|
| ✅ Button | ✅ 11 stories | default, destructive, outline, secondary, ghost, link, sizes (sm, lg, icon), disabled |
| ✅ Card | ✅ 3 stories | default, simple, with long content |
| ✅ Input | ✅ 7 stories | text, email, password, search, number, disabled, with value |
| ✅ Label | ✅ 4 stories | default, with input, required, multiple |
| ✅ Checkbox | ✅ 5 stories | default, checked, disabled, disabled+checked, multiple |
| ✅ Select | ✅ 5 stories | default, with label, default value, disabled, many options |
| ✅ Alert | ✅ 6 stories | default, destructive, success, long content, simple, warning |

**Total**: 7 componentes con 41 stories documentadas en Storybook 🎨

Todos están optimizados para Tailwind v4 y utilizan las CSS variables del sistema de diseño.

## 🎨 Cómo Usar

### Ver Componentes en Storybook
```bash
npm run storybook
```
Abre http://localhost:6006/ para ver todos los componentes documentados con:
- 📖 Documentación automática (Autodocs)
- 🎛️ Controles interactivos para props
- 🌙 Switcher de dark mode en toolbar
- ♿ Tests de accesibilidad automáticos
- 📱 Viewport responsive testing

### Aplicar Colores Primarios
```tsx
<button className="bg-primary text-white">Acción Principal</button>
<input className="border-input focus:border-primary" />
<div className="text-foreground bg-background">Contenido</div>
```

### Cambiar a Dark Mode
```tsx
export default function ThemeToggle() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return <button onClick={toggleDarkMode}>🌙 Dark Mode</button>;
}
```

### Extender el Sistema de Diseño
En `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      'custom-color': 'hsl(var(--color-custom) / <alpha-value>)',
    },
  },
}
```

En `src/styles/globals.css`:
```css
@theme {
  --color-custom: #your-color;
}
```

### Crear Stories para Nuevos Componentes
```tsx
// src/shared/ui/my-component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './my-component';

const meta = {
  title: 'UI/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props del componente
  },
};
```

## 🚀 Próximos Pasos

1. ✅ ~~**Agregar más componentes de shadcn/ui**~~ según necesidades del proyecto
2. ✅ ~~**Crear storybook**~~ para documentar componentes visuales
3. **Implementar tema persistente** usando localStorage/cookies
4. **Agregar transiciones** entre temas (smooth color transitions)
5. **Documentar patrones** de uso en el proyecto (forms, layouts, etc.)
6. **Configurar CI/CD** para validar Tailwind/PostCSS
7. **Agregar más stories** con ejemplos de uso real
8. **Configurar Chromatic** para visual regression testing
9. **Crear iconografía** consistente con el sistema de diseño
10. **Documentar espaciado** y tipografía en Storybook

## 📝 Notas Importantes

### Tailwind CSS v4
- **Tailwind v4 no es compatible con `@apply` dentro de `@layer`** en el mismo contexto
- **Usa CSS directo** en `src/styles/globals.css` para estilos globales
- **Los componentes shadcn/ui** generan las clases automáticamente
- **Las CSS variables** deben tener prefijo consistente: `--color-*`

### Storybook
- **No necesita addon de Tailwind** porque `@storybook/nextjs-vite` maneja PostCSS automáticamente
- **Usa `withThemeByDataAttribute`** para el switcher de dark mode
- **Stories se auto-descubren** en `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- **Autodocs generado automáticamente** con JSDoc comments en componentes
- **Tests de accesibilidad** se ejecutan automáticamente en cada story

### Comandos Útiles
```bash
# Desarrollo
npm run dev              # Next.js en http://localhost:3001
npm run storybook        # Storybook en http://localhost:6006

# Build
npm run build            # Build de producción de Next.js
npm run build-storybook  # Build estático de Storybook

# Testing
npx vitest               # Ejecutar tests con Vitest
```

## 🔗 Referencias
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Theme Customization](https://tailwindcss.com/docs/theme)
- [Dark Mode Support](https://tailwindcss.com/docs/dark-mode)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook + Tailwind Integration](https://storybook.js.org/recipes/tailwindcss)
- [Storybook + Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Component Story Format (CSF)](https://storybook.js.org/docs/api/csf)
