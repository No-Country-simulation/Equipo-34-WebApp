# 🤖 AGENTS.md – Contexto Arquitectónico para Agentes de IA

**Proyecto**: ClinicaNC | **Versión**: 1.1 | **Última actualización**: 2025-10-20

---

## 📌 Resumen Ejecutivo

| Aspecto | Detalle |
|--------|--------|
| **Propósito** | Portal web para clínicas privadas (citas, historial clínico, teleconsultas) |
| **Tipo** | SPA con Next.js 14 (App Router + TypeScript strict) |
| **Arquitectura** | Clean Architecture (front-end, orgánica por funcionalidad) |
| **Principio central** | "La UI no debe saber cómo funciona el backend. Solo qué hacer con los datos." |

---

## 🎯 Características Principales

- ✅ **Gestión de citas**: presenciales y virtuales
- ✅ **Historial clínico**: interoperable (EHR/FHIR compatible)
- ✅ **Teleconsultas**: seguras con WebRTC/Zoom
- ✅ **Control de acceso**: roles (Paciente, Médico, Administrativo)
- ⚠️ **Multifactor (futuro)**: se implementará en `features/auth/`

---

## 🏗️ Arquitectura: Clean Architecture (Frontend)

### Principios Clave

```
┌─────────────────────────────────┐
│      Presentation Layer         │
│    (Next.js pages, UI)          │
├─────────────────────────────────┤
│      Application Layer          │
│  (Use Cases, Adapters)          │
├─────────────────────────────────┤
│      Domain Layer               │
│ (Entities, Business Rules)      │
├─────────────────────────────────┤
│   Infrastructure Layer          │
│  (API calls, External services) │
└─────────────────────────────────┘
```

**Regla fundamental**: Cada layer solo conoce las layers debajo de ella.

---

## 📂 Estructura de Carpetas (Definida)

```bash
src/
├── app/                           # Next.js App Router
│   ├── (public)/                  # Grupo: login, register, password-reset
│   │   ├── login/
│   │   ├── register/
│   │   └── page.tsx
│   ├── (paciente)/                # Grupo: rutas protegidas (Paciente)
│   │   ├── dashboard/
│   │   ├── citas/
│   │   ├── historial/
│   │   └── page.tsx
│   ├── (medico)/                  # Grupo: rutas protegidas (Médico)
│   │   ├── agenda/
│   │   ├── teleconsulta/
│   │   └── page.tsx
│   ├── (admin)/                   # Grupo: rutas protegidas (Admin)
│   │   ├── gestión/
│   │   ├── facturación/
│   │   └── page.tsx
│   └── layout.tsx                 # Layout global + Proveedores (Auth, Theme, i18n)
│
├── features/                      # Feature-driven: cada feature es independiente
│   ├── auth/
│   │   ├── domain/
│   │   │   ├── UserEntity.ts
│   │   │   ├── AuthRules.ts
│   │   │   └── exceptions/
│   │   ├── use-cases/
│   │   │   ├── login.use-case.ts
│   │   │   ├── register.use-case.ts
│   │   │   └── logout.use-case.ts
│   │   ├── adapters/
│   │   │   └── auth.adapter.ts    # mapea API ↔ dominio
│   │   ├── services/
│   │   │   └── auth.service.ts    # llamadas a backend
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── AuthContainer.tsx      # Orquestador
│   │   └── mocks/
│   │       └── auth.mocks.ts      # MSW handlers
│   │
│   ├── appointments/
│   │   ├── domain/
│   │   ├── use-cases/
│   │   ├── adapters/
│   │   ├── services/
│   │   ├── components/
│   │   ├── AppointmentsContainer.tsx
│   │   └── mocks/
│   │
│   ├── medical-records/
│   │   └── [estructura similar]
│   │
│   ├── video-call/
│   │   ├── infrastructure/        # WebRTC stub
│   │   ├── domain/
│   │   ├── adapters/
│   │   ├── components/
│   │   ├── VideoCallContainer.tsx
│   │   └── mocks/
│   │
│   └── [otras features...]
│
├── shared/                        # SOLO código global/reusable
│   ├── core/
│   │   ├── providers/
│   │   │   ├── AuthProvider.tsx   # Gestión de sesión y tokens
│   │   │   ├── ThemeProvider.tsx  # next-themes
│   │   │   └── I18nProvider.tsx   # next-intl
│   │   └── guards/
│   │       └── role.guard.ts      # Protección por rol
│   ├── ui/                        # Componentes atómicos (shadcn/ui)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── [otros...]
│   ├── config/
│   │   ├── app.config.ts          # Configuración global
│   │   └── api.config.ts          # Base URL, timeouts, etc.
│   ├── utils/
│   │   ├── format-date.ts
│   │   ├── cn.ts                  # Utilidad para clases (classnames)
│   │   └── [helpers genéricos]
│   ├── types/
│   │   ├── api.types.ts           # Tipos de respuestas API
│   │   └── domain.types.ts        # Tipos globales del dominio
│   └── hooks/
│       ├── useAuth.ts             # Hook global
│       └── useTheme.ts
│
├── styles/
│   ├── globals.css
│   ├── tailwind.css
│   └── theme.css
│
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
│
└── mocks/                         # Configuración global de MSW
    └── handlers.ts                # Agrupa handlers por feature
```

---

## ⚙️ Stack Técnico

| Capa | Herramienta | Propósito |
|------|-------------|----------|
| **Framework** | Next.js 14 (App Router) | Servidor + rendering |
| **Lenguaje** | TypeScript (strict: `true`) | Type safety |
| **Estilos** | Tailwind CSS | Utilidades CSS |
| **Componentes** | shadcn/ui | UI atómica |
| **Estado (UI)** | Zustand | State management ligero |
| **i18n** | next-intl | Internacionalización |
| **Temas** | next-themes | Dark/Light mode |
| **Mock API** | MSW (Mock Service Worker) | Testing e dev |
| **Videollamada** | WebRTC | Teleconsultas |
| **Deploy** | Vercel | Hosting |

---

## 📏 Convenciones (Orden de Precedencia)

### Nombres de Archivos

```typescript
// ✅ Contenedores (orquestadores)
LoginContainer.tsx
AppointmentsContainer.tsx

// ✅ Entidades de dominio
UserEntity.ts
AppointmentEntity.ts
MedicalRecordEntity.ts

// ✅ Casos de uso
login.use-case.ts
create-appointment.use-case.ts
fetch-medical-records.use-case.ts

// ✅ Servicios (comunicación con backend)
auth.service.ts
appointments.service.ts

// ✅ Adaptadores (mapeo API ↔ dominio)
auth.adapter.ts
appointments.adapter.ts

// ✅ Componentes UI
LoginForm.tsx
AppointmentCard.tsx
```

### Estructura de Imports

```typescript
// ✅ CORRECTO: rutas absolutas
import { UserEntity } from '@/features/auth/domain/UserEntity';
import { loginUseCase } from '@/features/auth/use-cases/login.use-case';
import { Button } from '@/shared/ui/Button';

// ❌ INCORRECTO: rutas relativas
import UserEntity from '../../auth/domain/UserEntity';
```

### Organización de Lógica

```typescript
// ✅ CORRECTO: lógica en domain/ o use-cases/
export class UserEntity {
  isEmailValid(): boolean {
    // Regla de negocio: validación de email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }
}

// ✅ CORRECTO: use-case orquesta todo
export async function loginUseCase(email: string, password: string) {
  const user = await authService.login(email, password);
  const userEntity = authAdapter.toDomain(user);
  return userEntity;
}

// ✅ CORRECTO: componente solo renderiza
export function LoginForm() {
  const [email, setEmail] = useState('');
  const handleLogin = async () => {
    const user = await loginUseCase(email, password);
    // Despacha a Zustand o similar
  };
  return <form>{/* UI aquí */}</form>;
}

// ❌ PROHIBIDO: lógica en componente
export function BadForm() {
  const handleLogin = async () => {
    // ❌ ¡Lógica de negocio directa!
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // ...
    }
  };
}
```

---

## 🔐 Seguridad y Control de Acceso

### Niveles de Protección

| Nivel | Mecanismo | Ubicación |
|-------|-----------|-----------|
| **Token** | JWT en localStorage | `AuthProvider` |
| **Rol** | Validado en `role.guard.ts` | `app/(role)/` layout |
| **Dominio** | Reglas de negocio | `domain/` |
| **Datos sensibles** | Encriptados en tránsito | Backend (HTTPS) |

### Implementación

```typescript
// shared/core/providers/AuthProvider.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserEntity | null>(null);

  return (
    <AuthContext.Provider value={{ token, user }}>
      {children}
    </AuthContext.Provider>
  );
}

// shared/core/guards/role.guard.ts
export function withRoleGuard(allowedRoles: string[]) {
  return function Protected({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    if (!allowedRoles.includes(user?.role)) {
      return <Unauthorized />;
    }
    return children;
  };
}
```

---

## ��️ Herramientas de Desarrollo

### ESLint + Prettier

**Configuración en proyecto base** ✅

\\\ash
# Ejecutar linter
npm run lint

# Formatear código
npm run format

# ESLint auto-fix
npm run lint:fix
\\\

**Reglas principales:**
- TypeScript strict mode
- Prohibición de \ny\ (con excepciones)
- Espacios antes de \{\
- Punto y coma requerido
- Comillas simples para strings

---

### MSW (Mock Service Worker)

**Propósito**: Interceptar y mockear endpoints durante desarrollo.

**Estructura base:**
\\\
src/mocks/
├── browser.ts                    # Setup de MSW
├── handlers/
│   ├── index.ts                  # Agregador central
│   ├── auth.ts                   # Handlers de autenticación
│   ├── admin.ts                  # Handlers de admin
│   └── [feature].ts
├── data/
│   └── [feature].mock.ts         # Datos simulados
└── providers/
    └── MSWProvider.tsx           # Proveedor React
\\\

**Crear handler:**

\\\	ypescript
// src/mocks/handlers/example.ts
import { http, HttpResponse } from 'msw';

export const exampleHandlers = [
  http.get('*/api/example', async () => {
    return HttpResponse.json({ message: 'OK' }, { status: 200 });
  }),
];
\\\

---

### Zustand - Gestión de Estado

**Crear store:**

\\\	ypescript
// src/shared/stores/user.store.ts
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
\\\

**Usar en componente:**

\\\	ypescript
import { useUserStore } from '@/shared/stores/user.store';

export function Profile() {
  const { user, clearUser } = useUserStore();
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={clearUser}>Logout</button>
    </div>
  );
}
\\\

---

**Última actualización**: 21 de octubre de 2025  
**Versión**: 1.2 (Agregado: ESLint, Prettier, MSW, Zustand)
