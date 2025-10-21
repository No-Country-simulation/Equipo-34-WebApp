# 📦 Auth Store con Zustand

> Sistema centralizado de autenticación con persistencia en localStorage y sincronización con mocks MSW

## 🏗️ Estructura

```
src/
├── shared/
│   ├── store/
│   │   └── auth.store.ts        # Store principal con Zustand
│   ├── hooks/
│   │   └── useAuth.ts           # Hooks personalizados
│   ├── providers/
│   │   └── AuthProvider.tsx     # Proveedor para sincronizar sesión
│   ├── components/
│   │   └── AuthGuard.tsx        # Componentes de protección de rutas
│   └── types/
│       └── auth.types.ts        # Tipos de autenticación
```

## 🎯 Características

✅ **Persistencia automática** en localStorage  
✅ **Sincronización** con MSW mocks  
✅ **Protección de rutas** por rol  
✅ **Hooks personalizados** para cada caso de uso  
✅ **TypeScript strict** para seguridad de tipos  
✅ **Estados de carga y error** integrados  

---

## 📚 API del Store

### Estado

```typescript
interface AuthState {
  user: User | null;              // Datos del usuario actual
  token: string | null;           // Token JWT
  isAuthenticated: boolean;       // ¿Está logueado?
  isLoading: boolean;             // ¿Está cargando?
  error: string | null;           // Mensaje de error
}
```

### Acciones

#### `login(email, password)`
Autentica al usuario y guarda el token

```typescript
const { login } = useAuthStore();
const result = await login('paciente@clinic.com', 'password123');

if (result.success) {
  // ✅ Logueado, redirigir a dashboard
} else {
  // ❌ Error: result.message
}
```

#### `register(data)`
Registra un nuevo usuario

```typescript
const { register } = useAuthStore();
const result = await register({
  email: 'nuevo@clinic.com',
  password: 'password123',
  name: 'Juan',
  last_name: 'Pérez',
  phone: '+34 912345678',
  role_id: '2', // 1=paciente, 2=medico, 3=admin
});
```

#### `logout()`
Cierra la sesión y limpia el estado

```typescript
const { logout } = useAuthStore();
await logout(); // Token y user se eliminan
```

#### `getCurrentUser()`
Sincroniza el usuario actual desde el backend

```typescript
const { getCurrentUser } = useAuthStore();
const user = await getCurrentUser();
```

---

## 🎣 Hooks Personalizados

### `useAuth()`
Acceso a todo el estado y acciones

```typescript
'use client';

import { useAuth } from '@/shared/hooks/useAuth';

export function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      // ✅ Éxito
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <button disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Ingresar'}
      </button>
    </form>
  );
}
```

### `useCurrentUser()`
Obtiene solo el usuario actual

```typescript
const user = useCurrentUser();

return (
  <div>
    {user ? (
      <p>Bienvenido, {user.name}!</p>
    ) : (
      <p>No autenticado</p>
    )}
  </div>
);
```

### `useIsAuthenticated()`
Solo para validar si está logueado

```typescript
const isAuth = useIsAuthenticated();

return isAuth ? <Dashboard /> : <LoginPage />;
```

### `useUserRole()`
Obtiene el rol del usuario

```typescript
const role = useUserRole(); // 'paciente' | 'medico' | 'admin'

if (role === 'medico') {
  return <MedicoFeatures />;
}
```

### `useHasRole(role | roles[])`
Valida si tiene un rol específico (para renderizado condicional)

```typescript
// Un rol
const isPaciente = useHasRole('paciente');

// Múltiples roles
const isDoctor = useHasRole(['medico', 'admin']);

return isDoctor ? <MedicoPanel /> : null;
```

### `useAuthActions()`
Acceso a login/logout/register solamente

```typescript
const { login, logout } = useAuthActions();
```

### `useAuthStatus()`
Solo estado de carga y error

```typescript
const { isLoading, error } = useAuthStatus();
```

### `useSyncCurrentUser()`
Hook para sincronizar la sesión al montar

```typescript
// Se ejecuta automáticamente en AuthProvider
// Úsalo si necesitas sincronizar en un componente específico
export function MyComponent() {
  const { isSyncing } = useSyncCurrentUser();

  if (isSyncing) {
    return <div>Recuperando sesión...</div>;
  }

  return <div>Contenido</div>;
}
```

---

## 🔐 Protección de Rutas

### `<ProtectedRoute>`
Componente genérico para proteger rutas

```typescript
import { ProtectedRoute } from '@/shared/components/AuthGuard';

export default function Dashboard() {
  return (
    <ProtectedRoute requiredRoles="medico">
      <MedicoDashboard />
    </ProtectedRoute>
  );
}
```

### `<AuthGuard>`
Solo valida autenticación (sin rol)

```typescript
import { AuthGuard } from '@/shared/components/AuthGuard';

export default function PrivatePage() {
  return (
    <AuthGuard>
      <SecretContent />
    </AuthGuard>
  );
}
```

### `<RoleGuard>`
Valida rol específico

```typescript
import { RoleGuard } from '@/shared/components/AuthGuard';

export default function AdminPanel() {
  return (
    <RoleGuard roles={['admin']} fallback={<AccessDenied />}>
      <AdminContent />
    </RoleGuard>
  );
}
```

### `useCanAccess(roles)`
Hook para lógica condicional compleja

```typescript
export function ConditionalContent() {
  const { canAccess, isLoading } = useCanAccess(['medico', 'admin']);

  if (isLoading) return <div>Cargando...</div>;
  if (!canAccess) return <div>No tienes acceso</div>;

  return <div>Contenido restringido</div>;
}
```

---

## 🧪 Ejemplos Completos

### Ejemplo 1: Login Form

```typescript
'use client';

import { useAuth } from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      {error && <p className="error">{error}</p>}
      <button disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Ingresar'}
      </button>
    </form>
  );
}
```

### Ejemplo 2: Navbar con Rol

```typescript
'use client';

import { useCurrentUser, useUserRole } from '@/shared/hooks/useAuth';

export function Navbar() {
  const user = useCurrentUser();
  const role = useUserRole();

  if (!user) return <div>No autenticado</div>;

  return (
    <nav>
      <h1>Bienvenido, {user.name}</h1>
      <p>Rol: {role}</p>
      <a href={`/${role}/dashboard`}>Ir a mi dashboard</a>
    </nav>
  );
}
```

### Ejemplo 3: Rutas Protegidas por Rol

```typescript
import { RoleGuard } from '@/shared/components/AuthGuard';

export default function AdminPage() {
  return (
    <RoleGuard
      roles="admin"
      fallback={<div>Solo administradores</div>}
    >
      <div>Panel de Administración</div>
    </RoleGuard>
  );
}
```

---

## 💾 Persistencia en localStorage

El store guarda automáticamente en localStorage:

```javascript
// En DevTools Console
JSON.parse(localStorage.getItem('auth-store'))
// {
//   "state": {
//     "token": "eyJ...",
//     "user": { "id": "1", "name": "Juan", "role": "paciente", ... }
//   },
//   "version": 0
// }
```

### ¿Cómo funciona?

1. **Login** → Token + user se guardan en localStorage
2. **Recargar página** → AuthProvider recupera datos de localStorage
3. **`useSyncCurrentUser()`** → Valida token con `/api/auth/me`
4. **Logout** → localStorage se limpia

---

## 🧹 Debugging

### Ver estado en tiempo real

```typescript
import { useAuthDebug } from '@/shared/hooks/useAuth';

export function DebugAuth() {
  const state = useAuthDebug();

  return (
    <pre className="debug">
      {JSON.stringify(state, null, 2)}
    </pre>
  );
}
```

### En DevTools Console

```javascript
// Acceder directo al store
import { useAuthStore } from '@/shared/store/auth.store';
const state = useAuthStore.getState();
console.log(state);

// Suscribirse a cambios
const unsubscribe = useAuthStore.subscribe((state) => {
  console.log('Auth state cambió:', state);
});
```

---

## 📋 Resumen de Flujo

```
Usuario hace login
    ↓
LoginForm → useAuth().login()
    ↓
Fetch a /api/auth/login (interceptado por MSW)
    ↓
MSW retorna { token, user }
    ↓
Store guarda en estado + localStorage
    ↓
Componentes suscritos se re-renderizan
    ↓
useRouter().push() redirige a dashboard
```

---

## 🚀 Checklist de Integración

- [x] Store creado con Zustand
- [x] Persistencia en localStorage
- [x] Hooks personalizados
- [x] Componentes de protección
- [x] AuthProvider en layout.tsx
- [ ] Crear LoginForm.tsx
- [ ] Crear rutas protegidas por rol
- [ ] Crear dashboard por rol
- [ ] Testing de flujos

---

## 🔗 Archivos relacionados

- Store: `src/shared/store/auth.store.ts`
- Hooks: `src/shared/hooks/useAuth.ts`
- Provider: `src/shared/providers/AuthProvider.tsx`
- Guards: `src/shared/components/AuthGuard.tsx`
- Tipos: `src/shared/types/auth.types.ts`
- Mocks: `src/mocks/handlers/auth.ts`
