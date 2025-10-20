# AGENTS.md

## Contexto arquitectónico para agentes de IA – Proyecto: ClinicaNC

### 📌 Propósito

Portal web para clínicas privadas. Gestiona:

- Citas presenciales y virtuales
- Historial clínico (interoperable con EHR/FHIR)
- Teleconsultas seguras (WebRTC/Zoom)
- Roles: Paciente, Médico, Administrativo

### 🏗️ Arquitectura

- **Enfoque**: Clean Architecture en front end (orgánico, por funcionalidad)
- **Patrón principal**: Contenedor (`XContainer.tsx`)
- **Regla del alcance**: solo lo global en `/shared`; lo específico, dentro de su feature
- **Lazy loading**: natural mediante Next.js App Router + route groups

### 📂 Estructura de carpetas

```bash
/src
├── app/
│ ├── (public)/ → login, register
│ ├── (paciente)/ → dashboard, citas, historial
│ ├── (medico)/ → agenda, teleconsulta
│ ├── (admin)/ → gestión, facturación
│ └── layout.tsx → Proveedores globales
├── features/
│ └── [feature-name]/
│ ├── [Feature]Container.tsx
│ ├── domain/ → entities, value objects, business rules
│ ├── use-cases/ → lógica de negocio
│ ├── adapters/ → mapeo API ↔ dominio
│ ├── services/ → comunicación con backend
│ └── components/ → UI específica
├── shared/
│ ├── core/ → AuthProvider, ThemeProvider, I18nProvider
│ ├── ui/ → componentes atómicos (shadcn)
│ ├── config/ → app.config.ts
│ ├── utils/ → helpers genéricos
│ └── types/ → tipos globales
├── styles/
├── assets/
└── mocks/ → MSW handlers por feature
```

### ⚙️ Stack técnico

- Framework: Next.js 14 (App Router)
- Lenguaje: TypeScript (strict)
- UI: Tailwind CSS + shadcn/ui
- Estado (UI): Zustand
- i18n: next-intl
- Theming: next-themes
- Mockeo: MSW
- Videollamada: WebRTC (stub en `features/video-call/infrastructure/`)
- Despliegue: Vercel

### 📏 Convenciones

- **Nombres de archivos**:
  - Contenedores: `PascalCaseContainer.tsx`
  - Casos de uso: `kebab-case.use-case.ts`
  - Entidades: `PascalCaseEntity.ts`
- **Imports**: rutas absolutas desde `src/` → `@/features/auth/domain/UserEntity`
- **Lógica en UI**: prohibida. Toda regla de negocio vive en `domain/` o `use-cases/`
- **Page components**: solo renderizan un contenedor. Nada de lógica.

### 🔐 Seguridad

- Datos sensibles (historial clínico, roles) validados en `domain/`
- Acceso por rol gestionado por `AuthProvider` + `role.guard.ts`
- Autenticación multifactor (futuro): se implementará en `features/auth/`

### 🔄 Flujo de desarrollo

1. Crear feature en `/features/nombre/`
2. Definir entidades y reglas en `domain/`
3. Implementar casos de uso en `use-cases/`
4. Crear adaptadores y servicios
5. Construir contenedor que orqueste todo
6. Conectar en `app/(role)/ruta/page.tsx`

### 🚫 Prohibido

- Lógica de dominio en `page.tsx` o componentes UI
- Imports cruzados entre features
- Carpetas vacías (solo crear subcarpetas si se usan)

### ✅ Regla de oro

> "La UI no debe saber cómo funciona el backend. Solo debe saber qué hacer con los datos."
