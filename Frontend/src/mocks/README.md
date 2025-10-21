# 🧪 MSW Mocks - Guía de Uso

## 📋 Resumen

Los mocks con MSW (Mock Service Worker) permiten interceptar llamadas HTTP sin tocar el servidor real. Esto es útil para:

- ✅ Desarrollo sin backend
- ✅ Testing offline
- ✅ Prototipado rápido
- ✅ Simulación de diferentes roles

---

## 🔐 Usuarios de Prueba

### Paciente
```
Email: paciente@clinic.com
Contraseña: password123
Rol: paciente
```

### Médico
```
Email: medico@clinic.com
Contraseña: password123
Rol: medico
```

### Admin
```
Email: admin@clinic.com
Contraseña: password123
Rol: admin
```

---

## 📝 Endpoints Disponibles

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "paciente@clinic.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "user-paciente-001",
    "email": "paciente@clinic.com",
    "name": "Juan",
    "last_name": "Pérez",
    "role": "paciente",
    "phone": "+34 912345678",
    "created_at": "2024-01-15T00:00:00.000Z"
  }
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "nuevo@clinic.com",
  "name": "Pedro",
  "last_name": "García",
  "password": "password123",
  "phone": "+34 912345681",
  "role_id": 1,
  "emergency_contact": "+34 912345682"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "id": "user-current-001",
  "email": "paciente@clinic.com",
  "name": "Juan",
  "role": "paciente",
  ...
}
```

### Logout
```http
POST /api/auth/logout
```

---

## 🔧 Estructura de Carpetas

```
src/mocks/
├── browser.ts                 # Setup de MSW para navegador
├── handlers/
│   ├── auth.ts               # Handlers de autenticación
│   └── handlers.ts           # Agregador central
├── data/
│   └── users.mock.ts         # Datos mock de usuarios
└── utils/
    └── jwt.mock.ts           # Utilidades para generar tokens
```

---

## 💻 Uso en Componentes

### Con Fetch
```typescript
// src/features/auth/services/auth.service.ts
import type { LoginRequest, LoginResponse } from '@/shared/types/auth.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function loginService(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}
```

### En Use-Case
```typescript
// src/features/auth/use-cases/login.use-case.ts
import { loginService } from '../services/auth.service';

export async function loginUseCase(email: string, password: string) {
  try {
    const response = await loginService({ email, password });
    
    // Guardar token y usuario
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response.user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
```

### En Componente
```typescript
// src/features/auth/components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { loginUseCase } from '../use-cases/login.use-case';
import { useAuthStore } from '@/shared/stores/useauthStore';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await loginUseCase(email, password);
      setUser(user);
      setToken(localStorage.getItem('token'));
      // Redirigir según rol
      window.location.href = `/${user.role}/dashboard`;
    } catch (error) {
      console.error('Login error:', error);
      alert('Login fallido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
```

---

## 🧪 Testing con MSW

### Configurar MSW en test
```typescript
// src/__tests__/setup.ts
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Test de login
```typescript
import { loginService } from '@/features/auth/services/auth.service';

describe('Auth Service', () => {
  it('should login with valid credentials', async () => {
    const user = await loginService({
      email: 'paciente@clinic.com',
      password: 'password123',
    });

    expect(user.role).toBe('paciente');
    expect(user.email).toBe('paciente@clinic.com');
  });

  it('should fail with invalid password', async () => {
    await expect(
      loginService({
        email: 'paciente@clinic.com',
        password: 'wrong-password',
      })
    ).rejects.toThrow();
  });
});
```

---

## 🚀 Agregar Nuevos Handlers

### 1. Crear archivo de handlers
```typescript
// src/mocks/handlers/appointments.ts
import { http, HttpResponse, delay } from 'msw';

export const appointmentHandlers = [
  http.get('/api/appointments', async () => {
    await delay(300);
    return HttpResponse.json([
      { id: '1', date: '2024-12-15', doctorId: 'doc-001' },
    ]);
  }),
];
```

### 2. Agregar al agregador
```typescript
// src/mocks/handlers/handlers.ts
import { authHandlers } from './auth';
import { appointmentHandlers } from './appointments';

export const handlers = [...authHandlers, ...appointmentHandlers];
```

---

## 📋 Checklist

- [ ] MSW está instalado y configurado
- [ ] Los tipos están en `shared/types/`
- [ ] Los datos mock están en `mocks/data/`
- [ ] Los handlers están en `mocks/handlers/`
- [ ] El navegador tiene MSW habilitado
- [ ] Los tokens mock se generan correctamente
- [ ] Las redirecciones por rol funcionan

---

## 🔗 Referencias

- [MSW Documentation](https://mswjs.io/)
- [MSW Best Practices](https://mswjs.io/docs/best-practices)
- JWT Mock: `src/mocks/utils/jwt.mock.ts`
- Usuarios Mock: `src/mocks/data/users.mock.ts`
