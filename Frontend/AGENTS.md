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

## 🔄 Flujo de Desarrollo (Paso a Paso)

### Para agregar una nueva feature:

1. **Crear estructura base**
   ```bash
   mkdir -p src/features/[feature-name]/{domain,use-cases,adapters,services,components}
   ```

2. **Definir entidades y reglas** (`domain/`)
   ```typescript
   // features/appointments/domain/AppointmentEntity.ts
   export class AppointmentEntity {
     constructor(
       public id: string,
       public date: Date,
       public doctorId: string
     ) {}

     isValid(): boolean {
       return this.date > new Date();
     }
   }
   ```

3. **Crear casos de uso** (`use-cases/`)
   ```typescript
   // features/appointments/use-cases/create-appointment.use-case.ts
   export async function createAppointmentUseCase(data: CreateAppointmentDTO) {
     const entity = new AppointmentEntity(data.id, data.date, data.doctorId);
     if (!entity.isValid()) throw new InvalidAppointmentError();
     return await appointmentsService.create(entity);
   }
   ```

4. **Mapear API ↔ Dominio** (`adapters/`)
   ```typescript
   // features/appointments/adapters/appointments.adapter.ts
   export function appointmentApiToDomain(apiData: AppointmentAPI): AppointmentEntity {
     return new AppointmentEntity(apiData.id, new Date(apiData.date), apiData.doctor_id);
   }
   ```

5. **Comunicar con backend** (`services/`)
   ```typescript
   // features/appointments/services/appointments.service.ts
   export async function create(entity: AppointmentEntity) {
     const response = await fetch(`${API_URL}/appointments`, {
       method: 'POST',
       body: JSON.stringify(entity),
     });
     return response.json();
   }
   ```

6. **Construir contenedor** (orquestador)
   ```typescript
   // features/appointments/AppointmentsContainer.tsx
   export function AppointmentsContainer() {
     const [appointments, setAppointments] = useState<AppointmentEntity[]>([]);

     const handleCreate = async (data: CreateAppointmentDTO) => {
       const result = await createAppointmentUseCase(data);
       setAppointments([...appointments, result]);
     };

     return <AppointmentsView onCreateAppointment={handleCreate} />;
   }
   ```

7. **Conectar en rutas** (`app/(role)/`)
   ```typescript
   // app/(paciente)/appointments/page.tsx
   import { AppointmentsContainer } from '@/features/appointments/AppointmentsContainer';

   export default function AppointmentsPage() {
     return <AppointmentsContainer />;
   }
   ```

---

## 🚫 Restricciones Obligatorias

| Prohibición | Razón | Alternativa |
|-------------|-------|-------------|
| Lógica en `page.tsx` | Violation SoC | Mover a `XContainer.tsx` |
| Imports cruzados entre features | Acoplamiento | Usar `shared/` para código global |
| Carpetas vacías | Ruido | Crear solo si se usa |
| Llamadas API directas en componentes | Imposible de testear | Usar `services/` + `use-cases/` |
| Estado en múltiples stores | Inconsistencia | Centralizar en Zustand |
| Tipos locales no globales | Duplicación | Exportar desde `shared/types/` |

---

## ✅ Checklist para Agentes de IA

Antes de hacer cambios, verifica:

- [ ] ¿La lógica nueva va en `domain/` o `use-cases/`?
- [ ] ¿He creado tipos en `shared/types/`?
- [ ] ¿He usado rutas absolutas (`@/...`)?
- [ ] ¿He separado llamadas API en `services/`?
- [ ] ¿He mapeado datos con adaptadores?
- [ ] ¿El componente solo renderiza (sin lógica)?
- [ ] ¿He respetado convenciones de nombres?
- [ ] ¿He evitado imports cruzados entre features?
- [ ] ¿He añadido MSW mocks si es necesario?

---

## 📚 Referencias

- **Clean Architecture (Front-end)**: [Chapter 08 - The Amazing Gentleman Programming Book](https://the-amazing-gentleman-programming-book.vercel.app/es/book/Chapter08_Clean_Architecture_Front_End)
- **Next.js App Router**: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com/)

---

## 🎓 Regla de Oro

> **"La presentación no debe saber cómo funciona el dominio. Solo debe orquestar datos entre capas."**

Cada layer es responsable de una cosa. Las capas superiores NO pueden saltarse capas inferiores.
