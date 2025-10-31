# 🚀 Sistema de Autenticación Refactorizado

> Store Zustand + MSW Mocks + Hooks Personalizados

## ✨ ¿Qué se creó?

### 1. **Store Zustand** (`src/shared/store/auth.store.ts`)

- Estado centralizado de autenticación
- Persistencia automática en localStorage
- Acciones de login/register/logout
- Helpers para validar roles

### 2. **Hooks Personalizados** (`src/shared/hooks/useAuth.ts`)

- `useAuth()` - Todo el estado y acciones
- `useCurrentUser()` - Solo el usuario
- `useIsAuthenticated()` - Solo autenticación
- `useUserRole()` - Solo el rol
- `useHasRole()` - Validar roles
- `useSyncCurrentUser()` - Sincronizar sesión
- `useAuthActions()` - Solo acciones
- `useAuthStatus()` - Solo loading/error

### 3. **Provider** (`src/shared/providers/AuthProvider.tsx`)

- Sincroniza la sesión al cargar la app
- Recupera el usuario desde localStorage
- Valida el token con el backend

### 4. **AuthGuard** (`src/shared/components/AuthGuard.tsx`)

- `<ProtectedRoute>` - Protege rutas genéricamente
- `<AuthGuard>` - Solo valida autenticación
- `<RoleGuard>` - Valida rol específico
- `useCanAccess()` - Hook para lógica condicional

### 5. **LoginForm** (`src/features/auth/components/LoginForm.tsx`)

- Formulario funcional completo
- Botones de prueba rápida para 3 roles
- Validación de campos
- Manejo de errores

### 6. **Páginas de ejemplo**

- `/auth/login` - Página de login
- `/dashboard` - Dashboard protegido

---

## 🎯 Flujo Completo

```
1. Usuario accede a /auth/login
   ↓
2. Ingresa credenciales y hace submit
   ↓
3. LoginForm llama a store.login(email, password)
   ↓
4. Store hace fetch a /api/auth/login
   ↓
5. MSW intercepta y retorna { token, user }
   ↓
6. Store guarda en estado + localStorage
   ↓
7. Componente se re-renderiza
   ↓
8. Router redirige a /dashboard
   ↓
9. ProtectedRoute valida que está autenticado
   ↓
10. Dashboard muestra datos del usuario con rol
```

---

## 🧪 Cómo Probar

### Opción 1: UI (Más fácil)

```bash
# 1. Abre http://localhost:3000/auth/login
# 2. Haz clic en "Paciente", "Médico" o "Admin"
# 3. Deberías ver el dashboard con tus datos
```

### Opción 2: Console (Debugging)

```javascript
// 1. Abre DevTools (F12) → Console
// 2. Ejecuta:

import { useAuthStore } from '@/shared/store/auth.store';
const store = useAuthStore.getState();

// Login
await store.login('paciente@clinic.com', 'password123');

// Ver estado
console.log(store.user);
console.log(store.token);
console.log(store.isAuthenticated);

// Logout
await store.logout();

// Ver en localStorage
console.log(localStorage.getItem('auth-store'));
```

### Opción 3: Postman

```bash
POST http://192.168.100.9:3000/api/auth/login
Content-Type: application/json

{
  "email": "paciente@clinic.com",
  "password": "password123"
}

# Respuesta:
{
  "token": "eyJ...",
  "user": {
    "id": "1",
    "name": "Juan",
    "email": "paciente@clinic.com",
    "role": "paciente",
    ...
  }
}
```

---

## 📚 Ejemplos de Uso

### En un Componente

```typescript
'use client';

import { useAuth } from '@/shared/hooks/useAuth';

export function MyComponent() {
  const { user, login, logout, isLoading, error } = useAuth();

  if (!user) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <h1>Hola, {user.name}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

### Proteger una Ruta

```typescript
import { ProtectedRoute } from '@/shared/components/AuthGuard';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRoles="admin">
      <h1>Panel de Administración</h1>
    </ProtectedRoute>
  );
}
```

### Validar Rol Condicionalmente

```typescript
'use client';

import { useHasRole } from '@/shared/hooks/useAuth';

export function MyComponent() {
  const isMedico = useHasRole('medico');
  const isDoctor = useHasRole(['medico', 'admin']);

  return (
    <>
      {isMedico && <div>Menú de Médico</div>}
      {isDoctor && <div>Acceso restringido</div>}
    </>
  );
}
```

### Redirigir según Rol

```typescript
'use client';

import { useUserRole } from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function RoleRedirect() {
  const router = useRouter();
  const role = useUserRole();

  useEffect(() => {
    if (role) {
      router.push(`/${role}/dashboard`);
    }
  }, [role, router]);

  return <div>Redirigiendo...</div>;
}
```

---

## 🔄 Persistencia en localStorage

Cuando haces login, el store guarda automáticamente:

```javascript
// En DevTools Console:
JSON.parse(localStorage.getItem('auth-store'))

// Resultado:
{
  "state": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": "1",
      "email": "paciente@clinic.com",
      "name": "Juan",
      "last_name": "Pérez",
      "role": "paciente",
      "phone": "+34 912345678",
      "created_at": "2025-10-21T10:00:00Z"
    }
  },
  "version": 0
}
```

**Cuando recargas la página:**

1. `AuthProvider` se monta
2. Llama a `useSyncCurrentUser()`
3. Lee el token de localStorage
4. Valida con `/api/auth/me`
5. Restaura la sesión automáticamente

---

## 📁 Estructura de Archivos

```
src/
├── shared/
│   ├── store/
│   │   ├── auth.store.ts              ← Store principal
│   │   └── ZUSTAND_AUTH_GUIDE.md      ← Documentación detallada
│   ├── hooks/
│   │   └── useAuth.ts                 ← Hooks personalizados
│   ├── providers/
│   │   └── AuthProvider.tsx           ← Proveedor de sesión
│   ├── components/
│   │   └── AuthGuard.tsx              ← Protección de rutas
│   └── types/
│       └── auth.types.ts              ← Tipos TypeScript
├── features/
│   └── auth/
│       └── components/
│           └── LoginForm.tsx          ← Formulario de login
└── app/
    ├── auth/
    │   └── login/
    │       └── page.tsx               ← Página de login
    ├── dashboard/
    │   └── page.tsx                   ← Dashboard protegido
    ├── layout.tsx                     ← Con MSWProvider + AuthProvider
    └── ...
```

---

## ✅ Checklist de Integración

- [x] Store Zustand creado
- [x] Persistencia en localStorage
- [x] Hooks personalizados
- [x] AuthProvider integrado en layout.tsx
- [x] AuthGuard para proteger rutas
- [x] LoginForm funcional
- [x] Página de login (`/auth/login`)
- [x] Dashboard de ejemplo (`/dashboard`)
- [ ] Crear rutas por rol: `(paciente)`, `(medico)`, `(admin)`
- [ ] Crear dashboards específicos por rol
- [ ] Agregar más mocks (citas, historiales, etc.)

---

## 🚀 Próximos Pasos

### 1. Crear rutas protegidas por rol

```bash
# Estructura:
src/app/
├── (paciente)/
│   ├── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   └── citas/
│       └── page.tsx
├── (medico)/
│   ├── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   └── pacientes/
│       └── page.tsx
└── (admin)/
    ├── layout.tsx
    ├── dashboard/
    │   └── page.tsx
    └── usuarios/
        └── page.tsx
```

### 2. Agregar middlewares de protección

```typescript
// app/auth/layout.tsx
import { useIsAuthenticated } from '@/shared/hooks/useAuth';

export default function AuthLayout() {
  const isAuth = useIsAuthenticated();

  if (isAuth) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
```

### 3. Expandir MSW mocks

```typescript
// src/mocks/handlers/appointments.ts
export const appointmentHandlers = [
  http.get('*/api/appointments', ...),
  http.post('*/api/appointments', ...),
  http.put('*/api/appointments/:id', ...),
  http.delete('*/api/appointments/:id', ...),
];
```

---

## 🐛 Troubleshooting

### "MSW no está interceptando las solicitudes"

→ Verifica que `MSWProvider` esté en `app/layout.tsx` y que esté **fuera** del `<html>`

### "El token no persiste después de recargar"

→ Revisa que `AuthProvider` esté en el layout y que `useSyncCurrentUser()` se ejecute

### "El usuario no se actualiza en los componentes"

→ Asegúrate de usar los hooks dentro de componentes con `'use client'`

### "ProtectedRoute no protege la ruta"

→ Verifica que `<ProtectedRoute>` envuelva el contenido y tenga `requiredRoles` si es necesario

---

## 📖 Documentación Adicional

- Guía completa de Zustand: `src/shared/store/ZUSTAND_AUTH_GUIDE.md`
- Tipos de autenticación: `src/shared/types/auth.types.ts`
- MSW mocks: `src/mocks/handlers/auth.ts`

---

## 🎉 ¡Listo para usar!

Ahora tienes un sistema de autenticación completo, robusto y escalable.

Prueba:

1. Abre `http://192.168.100.9:3000/auth/login`
2. Haz clic en "Paciente", "Médico" o "Admin"
3. ¡Verás el dashboard con tus datos!

**¿Preguntas?** Revisa la documentación en `ZUSTAND_AUTH_GUIDE.md` 🚀
