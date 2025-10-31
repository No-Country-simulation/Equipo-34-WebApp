# 🗂️ Estructura de Route Groups por Roles

## 📋 Descripción general

Este proyecto utiliza **Route Groups** de Next.js App Router para organizar las rutas según el tipo de usuario. Los route groups (carpetas entre paréntesis) **no afectan la URL**, solo organizan el código.

## 🏗️ Estructura actual

```
/src/app/
├── (public)/           → Área pública (sin autenticación)
│   ├── layout.tsx     → Layout sin sidebar, header público
│   └── page.tsx       → Redirige a /landing temporalmente
│
├── (paciente)/        → Área del paciente (requiere auth)
│   ├── layout.tsx     → Layout con sidebar del paciente
│   └── page.tsx       → Dashboard del paciente (placeholder)
│
├── (medico)/          → Área del médico (requiere auth)
│   ├── layout.tsx     → Layout con sidebar del médico
│   └── page.tsx       → Dashboard del médico (placeholder)
│
├── (admin)/           → Panel de administración (requiere auth)
│   ├── layout.tsx     → Layout con sidebar del admin
│   └── page.tsx       → Dashboard del admin (placeholder)
│
├── layout.tsx         → Layout raíz (Theme, Locale, MSW, Auth)
└── page.tsx           → Redirige a /landing
```

## 🎯 URLs resultantes

| Carpeta               | URL         | Descripción             |
| --------------------- | ----------- | ----------------------- |
| `(public)/page.tsx`   | `/`         | Redirige a `/landing`   |
| `(paciente)/page.tsx` | `/paciente` | Dashboard del paciente  |
| `(medico)/page.tsx`   | `/medico`   | Dashboard del médico    |
| `(admin)/page.tsx`    | `/admin`    | Panel de administración |

> **Nota**: Los paréntesis `()` en los nombres de carpetas NO aparecen en la URL.

## 🔐 Autenticación y protección (futuro)

Actualmente las rutas **NO están protegidas**. La protección se implementará en tareas posteriores mediante:

1. **Middleware de autenticación** en `middleware.ts`
2. **Guards en los layouts** de cada route group
3. **Redirección** a login si no está autenticado
4. **Verificación de rol** antes de permitir acceso

## 📦 Cómo agregar nuevas páginas

### Ejemplo: Agregar página de "Mis Citas" para pacientes

```bash
# Crear archivo
/src/app/(paciente)/citas/page.tsx
```

```tsx
// /src/app/(paciente)/citas/page.tsx
export default function CitasPacientePage() {
  return <div>Mis Citas</div>;
}
```

**URL resultante**: `/citas` (no `/paciente/citas`)

### Ejemplo: Agregar página de "Agenda" para médicos

```bash
# Crear archivo
/src/app/(medico)/agenda/page.tsx
```

**URL resultante**: `/agenda`

## 🎨 Layouts específicos por rol

Cada route group tiene su propio layout:

### (public) - Sin autenticación

- Sin sidebar
- Header público simple
- Fondo con gradiente
- Usado en: landing, login, registro

### (paciente) - Área del paciente

- Sidebar con navegación del paciente
- Header con notificaciones
- Acceso a: citas, historial, teleconsultas

### (medico) - Área del médico

- Sidebar con navegación del médico
- Header con agenda del día
- Acceso a: agenda, pacientes, prescripciones

### (admin) - Panel de administración

- Sidebar con gestión del sistema
- Header con estadísticas
- Acceso a: usuarios, configuración, reportes

## 🚀 Próximos pasos

1. ✅ **Estructura base creada** (esta tarea)
2. ⏳ Implementar middleware de autenticación
3. ⏳ Agregar protección de rutas por rol
4. ⏳ Crear componentes de Sidebar específicos
5. ⏳ Implementar módulos de features (citas, teleconsulta, etc.)

## 📝 Convenciones

- **Layouts**: Solo estructura visual, NO lógica de negocio
- **Pages**: Pueden ser placeholder hasta que se implementen features
- **Naming**: Carpetas en español, código en inglés cuando sea necesario
- **Icons**: Usar emojis para identificación rápida visual

## 🔗 Referencias

- [Next.js Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [Next.js Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
