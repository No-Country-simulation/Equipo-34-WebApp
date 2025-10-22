// 🚀 EJEMPLOS RÁPIDOS DE USO - COPIA Y PEGA

// ============================
// 1️⃣ LOGIN SIMPLE
// ============================

'use client';
import { useAuth } from '@/shared/hooks/useAuth';

export function QuickLogin() {
  const { login, isLoading, error } = useAuth();

  return (
    <button onClick={() => login('paciente@clinic.com', 'password123')}>
      {isLoading ? 'Cargando...' : 'Login'}
    </button>
  );
}


// ============================
// 2️⃣ MOSTRAR USUARIO ACTUAL
// ============================

'use client';
import { useCurrentUser } from '@/shared/hooks/useAuth';

export function UserInfo() {
  const user = useCurrentUser();

  return user ? (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
    </div>
  ) : (
    <div>No autenticado</div>
  );
}


// ============================
// 3️⃣ LOGOUT
// ============================

'use client';
import { useAuthActions } from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuthActions();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}


// ============================
// 4️⃣ VALIDAR AUTENTICACIÓN
// ============================

'use client';
import { useIsAuthenticated } from '@/shared/hooks/useAuth';

export function ProtectedContent() {
  const isAuth = useIsAuthenticated();

  return isAuth ? (
    <div>Contenido protegido</div>
  ) : (
    <div>Debes iniciar sesión</div>
  );
}


// ============================
// 5️⃣ VALIDAR ROL
// ============================

'use client';
import { useHasRole } from '@/shared/hooks/useAuth';

export function MedicoOnly() {
  const isMedico = useHasRole('medico');

  return isMedico ? (
    <div>Panel de Médico</div>
  ) : (
    <div>Solo para médicos</div>
  );
}


// ============================
// 6️⃣ MÚLTIPLES ROLES
// ============================

'use client';
import { useHasRole } from '@/shared/hooks/useAuth';

export function DoctorOrAdmin() {
  const isStaff = useHasRole(['medico', 'admin']);

  return isStaff ? (
    <div>Acceso de personal</div>
  ) : (
    <div>No tienes acceso</div>
  );
}


// ============================
// 7️⃣ OBTENER ROL ACTUAL
// ============================

'use client';
import { useUserRole } from '@/shared/hooks/useAuth';

export function ShowRole() {
  const role = useUserRole();

  return <p>Tu rol es: {role}</p>;
}


// ============================
// 8️⃣ REDIRIGIR POR ROL
// ============================

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


// ============================
// 9️⃣ PROTEGER RUTA
// ============================

import { ProtectedRoute } from '@/shared/components/AuthGuard';

export default function AdminPanel() {
  return (
    <ProtectedRoute requiredRoles="admin">
      <h1>Panel de Admin</h1>
    </ProtectedRoute>
  );
}


// ============================
// 🔟 PROTEGER CON FALLBACK
// ============================

import { RoleGuard } from '@/shared/components/AuthGuard';

export default function DoctorPage() {
  return (
    <RoleGuard
      roles={['medico', 'admin']}
      fallback={<div>Solo para personal médico</div>}
    >
      <h1>Panel de Médicos</h1>
    </RoleGuard>
  );
}


// ============================
// 1️⃣1️⃣ LÓGICA CONDICIONAL
// ============================

'use client';
import { useCanAccess } from '@/shared/components/AuthGuard';

export function ConditionalUI() {
  const { canAccess, isLoading } = useCanAccess(['medico']);

  if (isLoading) return <div>Cargando...</div>;
  if (!canAccess) return <div>Sin acceso</div>;

  return <div>Contenido para médicos</div>;
}


// ============================
// 1️⃣2️⃣ FORMULARIO DE LOGIN
// ============================

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks/useAuth';

export function LoginForm() {
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
        placeholder="Password"
      />
      {error && <p className="error">{error}</p>}
      <button disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Ingresar'}
      </button>
    </form>
  );
}


// ============================
// 1️⃣3️⃣ ESTADO Y ERRORES
// ============================

'use client';
import { useAuthStatus } from '@/shared/hooks/useAuth';

export function StatusDisplay() {
  const { isLoading, error } = useAuthStatus();

  return (
    <>
      {isLoading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
    </>
  );
}


// ============================
// 1️⃣4️⃣ ACCESO A ACCIONES
// ============================

'use client';
import { useAuthActions } from '@/shared/hooks/useAuth';

export function AuthActions() {
  const { login, logout, register } = useAuthActions();

  return (
    <>
      <button onClick={() => login('email@test.com', 'pass')}>Login</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => register({
        email: 'nuevo@test.com',
        password: 'pass',
        name: 'Juan',
        last_name: 'Pérez',
        phone: '+34 123456',
        role_id: '1'
      })}>Registro</button>
    </>
  );
}


// ============================
// 1️⃣5️⃣ TODO EL ESTADO Y ACCIONES
// ============================

'use client';
import { useAuth } from '@/shared/hooks/useAuth';

export function FullAccess() {
  const {
    user,              // Usuario actual
    token,             // Token JWT
    isAuthenticated,   // ¿Logueado?
    isLoading,         // ¿Cargando?
    error,             // Error actual
    login,             // Función login
    logout,            // Función logout
    register,          // Función register
    getCurrentUser,    // Función sync
    getUserRole,       // Obtener rol
    isUserRole,        // Validar rol
    reset              // Limpiar estado
  } = useAuth();

  return (
    <div>
      {/* Usa lo que necesites */}
      {user && <p>Usuario: {user.name}</p>}
      {isLoading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}


// ============================
// DEPURACIÓN EN CONSOLE
// ============================

// En DevTools Console (F12):

// Acceder al store
import { useAuthStore } from '@/shared/store/auth.store';
const store = useAuthStore.getState();

// Ver estado completo
console.log(store);

// Login
await store.login('paciente@clinic.com', 'password123');

// Ver usuario
console.log(store.user);

// Ver token
console.log(store.token);

// Logout
await store.logout();

// Ver localStorage
console.log(localStorage.getItem('auth-store'));

// Suscribirse a cambios
const unsubscribe = useAuthStore.subscribe((state) => {
  console.log('Auth cambió:', state);
});


// ============================
// USUARIOS DE PRUEBA
// ============================

// Paciente
email: paciente@clinic.com
password: password123
role: paciente

// Médico
email: medico@clinic.com
password: password123
role: medico

// Admin
email: admin@clinic.com
password: password123
role: admin


// ============================
// RUTAS DE PRUEBA
// ============================

GET  /auth/login          → Formulario de login
GET  /dashboard           → Dashboard protegido
GET  /paciente/dashboard  → (crear después)
GET  /medico/dashboard    → (crear después)
GET  /admin/dashboard     → (crear después)


// ============================
// ENDPOINTS MSW
// ============================

POST /api/auth/login      → { email, password }
POST /api/auth/register   → { email, password, name, last_name, phone, role_id }
POST /api/auth/logout     → (no body)
GET  /api/auth/me         → (requiere Authorization header)
