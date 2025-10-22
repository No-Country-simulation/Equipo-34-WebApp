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
├── src/
│   ├── app/
│   │   ├── layout.tsx (importa globals.css)
│   │   └── page.tsx
│   ├── styles/
│   │   └── globals.css (nueva ubicación con @theme)
│   └── shared/
│       └── ui/
│           ├── button.tsx
│           ├── input.tsx
│           ├── select.tsx
│           ├── label.tsx
│           ├── checkbox.tsx
│           ├── card.tsx
│           └── alert.tsx
├── postcss.config.mjs
├── tailwind.config.ts
└── next.config.ts
```

### 3. CSS Variables Implementadas

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

## 📦 Componentes Instalados (shadcn/ui)

- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Label
- ✅ Checkbox
- ✅ Select
- ✅ Alert

Todos están optimizados para Tailwind v4 y utilizan las CSS variables del sistema de diseño.

## 🎨 Cómo Usar

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

## 🚀 Próximos Pasos

1. **Agregar más componentes de shadcn/ui** según necesidades del proyecto
2. **Crear storybook** para documentar componentes visuales
3. **Implementar tema persistente** usando localStorage
4. **Agregar transiciones** entre temas
5. **Documentar patrones** de uso en el proyecto
6. **Configurar CI/CD** para validar Tailwind/PostCSS

## 📝 Notas Importantes

- **Tailwind v4 no es compatible con `@apply` dentro de `@layer`** en el mismo contexto
- **Usa CSS directo** en `src/styles/globals.css` para estilos globales
- **Los componentes shadcn/ui** generan las clases automáticamente
- **Las CSS variables** deben tener prefijo consistente: `--color-*`

## 🔗 Referencias
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Theme Customization](https://tailwindcss.com/docs/theme)
- [Dark Mode Support](https://tailwindcss.com/docs/dark-mode)
- [shadcn/ui Components](https://ui.shadcn.com/)
