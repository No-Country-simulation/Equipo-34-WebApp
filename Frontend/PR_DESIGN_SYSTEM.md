# Design System: Tailwind CSS + shadcn/ui

## 📋 Issue

**Design System: shadcn/ui + Tailwind**

Implementar un sistema de diseño profesional y escalable utilizando Tailwind CSS v4 y shadcn/ui, estableciendo una paleta de colores médica, componentes reutilizables, y soporte para temas claro/oscuro.

---

## 🎯 Descripción

Se ha completado la implementación de un sistema de diseño profesional basado en:

- **Tailwind CSS v4**: Framework de utilidades CSS para estilos consistentes
- **shadcn/ui**: Librería de componentes accesibles basada en Radix UI
- **Paleta de colores clínica**: Colores profesionales para aplicaciones médicas
- **Tema claro/oscuro**: Soporte completo para cambio de tema mediante CSS variables
- **Componentes base**: 7 componentes fundamentales listos para usar

---

## 📦 Cambios Principales

### 1. Configuración de Tailwind CSS

- **Archivo**: `tailwind.config.ts`
- **Características**:
  - Paleta de colores personalizada (primary, secondary, accent)
  - Soporte para tema claro/oscuro con CSS variables
  - Tipografía extendida (Inter como fuente principal)
  - Animaciones personalizadas (fadeIn, slideIn)
  - Sombras y espaciado profesionales

### 2. Estilos Globales

- **Archivo**: `src/app/globals.css`
- **Características**:
  - Directivas Tailwind v4 (@import)
  - Variables CSS para tema (luz/oscuridad)
  - Estilos base para tipografía y elementos de formulario
  - Clases de utilidad personalizadas

### 3. Configuración shadcn/ui

- **Archivo**: `components.json`
- **Propiedades**:
  - Style: "new-york"
  - Soporte para RSC (React Server Components)
  - Aliases: `@/shared/ui` para componentes, `@/shared/lib/utils`
  - Base Color: slate con CSS variables

### 4. Utilidades Compartidas

- **Archivo**: `src/shared/lib/utils.ts`
- **Función**: `cn()` - Combina clases Tailwind con resolución de conflictos
- **Dependencias**: clsx, tailwind-merge

### 5. Componentes Creados (7 componentes base)

#### Button

Componente `src/shared/ui/button.tsx`

- Variantes: default, destructive, outline, secondary, ghost, link
- Tamaños: sm, default, lg, icon
- Características: Focus ring, disabled states, Slot composition

#### Card

Componente `src/shared/ui/card.tsx`

- Subcomponentes: Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription
- Uso: Contenedores para secciones de contenido

#### Input

Componente `src/shared/ui/input.tsx`

- Input HTML wrapper con estilos Tailwind
- Focus ring, placeholder, disabled states
- Soporte para file input

#### Label

Componente `src/shared/ui/label.tsx`

- Basado en Radix UI Label primitive
- Variantes CVA para estilos
- Accesibilidad: Asociación correcta con inputs

#### Checkbox

Componente `src/shared/ui/checkbox.tsx`

- Basado en Radix UI Checkbox
- Icon: Check de lucide-react
- Estados: checked, disabled, focus

#### Select

Componente `src/shared/ui/select.tsx`

- Basado en Radix UI Select
- Componentes: Select, SelectTrigger, SelectContent, SelectItem, SelectSeparator
- Características: ScrollUp/ScrollDown, Portal para dropdown
- Animaciones suaves

#### Alert

Componente `src/shared/ui/alert.tsx`

- Variantes: default, destructive
- Subcomponentes: Alert, AlertTitle, AlertDescription
- Casos de uso: Notificaciones, mensajes de estado

---

## 🎨 Paleta de Colores

### Colores Principales

**Primary (Azul Clínico)**
- Principal: 0ea5e9
- Variantes: 50 a 950 para contraste

**Secondary (Gris Suave)**
- Principal: 64748b
- Variantes: 50 a 950 neutras

**Accent (Verde Salud)**
- Principal: 22c55e
- Variantes: 50 a 950 de énfasis

### Colores Semánticos

- `success`: Verde
- `warning`: Ámbar
- `error`: Rojo
- `info`: Azul
- `muted`: Gris neutral
- `muted-foreground`: Gris oscuro

---

## 🔧 Instalaciones Realizadas

```bash
npm install clsx tailwind-merge
npm install @radix-ui/react-label @radix-ui/react-checkbox @radix-ui/react-select @radix-ui/react-slot
npm install class-variance-authority
npm install lucide-react
```

**Total de dependencias**: 458 packages  
**Vulnerabilities**: 0

---

## 📂 Estructura de Directorios

```
Frontend/
├── src/
│   ├── app/
│   │   └── globals.css          # Estilos globales Tailwind v4
│   └── shared/
│       ├── lib/
│       │   └── utils.ts         # cn() utility function
│       └── ui/                  # Componentes base
│           ├── alert.tsx
│           ├── button.tsx
│           ├── card.tsx
│           ├── checkbox.tsx
│           ├── input.tsx
│           ├── label.tsx
│           ├── select.tsx
│           └── index.ts         # Exportaciones centralizadas
├── tailwind.config.ts           # Configuración Tailwind
└── components.json              # shadcn/ui config
```

---

## ✅ Validación

### Compilación

- ✅ `npm run build` - Compila sin errores
- ✅ Tipos TypeScript - Validados correctamente
- ✅ Importaciones - Sin conflictos

### Accesibilidad

- ✅ ARIA labels en componentes
- ✅ Navegación por teclado (tab, enter, escape)
- ✅ Focus rings visibles
- ✅ Estados disabled correctos

### Responsive

- ✅ Breakpoints Tailwind funcionales
- ✅ Mobile-first approach
- ✅ Componentes adaptables

### Tema Claro/Oscuro

- ✅ Variables CSS configuradas
- ✅ Soporte para modo oscuro
- ✅ Transiciones suaves

---

## 🚀 Próximos Pasos

1. **Integración en aplicación**:
   - Reemplazar componentes existentes con versiones de design system
   - Actualizar páginas auth, admin, dashboard

2. **Componentes adicionales** (fase 2):
   - Dialog, Drawer, Dropdown Menu
   - Table, Tabs, Toast, Tooltip
   - Combobox, Calendar, Date Picker

3. **Temas personalizados**:
   - Exportar temas predefinidos
   - Selector de tema en UI

4. **Documentación visual**:
   - Storybook para showcase de componentes
   - Design tokens en figma

---

## 📝 Checklist

- [x] Tailwind CSS v4 configurado
- [x] shadcn/ui initializado
- [x] 7 componentes base creados
- [x] Paleta de colores implementada
- [x] Tema claro/oscuro funcional
- [x] Compilación sin errores
- [x] Accesibilidad validada
- [x] Responsive design confirmado
- [x] Índice de exportaciones centralizado
- [x] Dependencias instaladas y auditadas

---

## 🔗 Referencias

- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://radix-ui.com)
- [Class Variance Authority](https://cva.style)
- [lucide-react Icons](https://lucide.dev)

---

**Autor**: GitHub Copilot  
**Rama**: `task/clinic-nc-project-base/design-system`  
**Fecha**: 21 de octubre de 2025
