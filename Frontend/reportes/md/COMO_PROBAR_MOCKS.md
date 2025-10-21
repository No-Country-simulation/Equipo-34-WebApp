# 🧪 Guía Completa: Cómo Probar los MSW Mocks

## 📋 Tabla de Contenidos

1. [Setup inicial](#setup-inicial)
2. [Método 1: En DevTools del navegador](#método-1-devtools)
3. [Método 2: Con curl/PowerShell](#método-2-curl)
4. [Método 3: Con Postman](#método-3-postman)
5. [Método 4: Crear página de prueba](#método-4-página-de-prueba)
6. [Troubleshooting](#troubleshooting)

---

## Setup Inicial

### Paso 1: Actualizar `app/layout.tsx`

Añade el `MSWProvider` en tu layout principal:

```typescript
import MSWProvider from '@/mocks/providers/MSWProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ClinicaNC',
  description: 'Healthcare App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <MSWProvider>
          {children}
        </MSWProvider>
      </body>
    </html>
  );
}
```

### Paso 2: Instalar dependencias

```bash
npm install msw
```

---

## Método 1: En DevTools del Navegador

### Opción A: Desde la Console

1. **Inicia tu app**:
   ```bash
   npm run dev
   ```

2. **Abre DevTools** (F12) → **Console**

3. **Copia y pega este código**:

```javascript
// Login como Paciente
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'paciente@clinic.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ Respuesta:', data);
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
})
.catch(e => console.error('❌ Error:', e));
```

4. **Verifica en Console**:
   ```
   ✅ Respuesta: {
     token: "eyJhbGc...",
     user: {
       id: "user-paciente-001",
       email: "paciente@clinic.com",
       name: "Juan",
       role: "paciente",
       ...
     }
   }
   ```

### Opción B: Probar diferentes usuarios

```javascript
// Login como Médico
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'medico@clinic.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);

// Login como Admin
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@clinic.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### Opción C: Probar credenciales inválidas

```javascript
// Contraseña incorrecta
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'paciente@clinic.com',
    password: 'wrongpassword'
  })
})
.then(r => r.json())
.then(console.log);

// Usuario inexistente
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'noexiste@clinic.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(console.log);
```

### Opción D: Ver Network Requests

1. **Abre DevTools** → **Network**
2. **Ejecuta el fetch desde Console**
3. **Verifica en Network**:
   - Busca la request a `/api/auth/login`
   - Status: `200` (éxito) o `401`/`404` (error)
   - Headers y Response

---

## Método 2: Con curl/PowerShell

### Login exitoso - Paciente

```powershell
curl -X POST "http://localhost:3000/api/auth/login" `
  -H "Content-Type: application/json" `
  -d '{
    "email": "paciente@clinic.com",
    "password": "password123"
  }'
```

**Respuesta esperada** (status 200):
```json
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

### Login como Médico

```powershell
curl -X POST "http://localhost:3000/api/auth/login" `
  -H "Content-Type: application/json" `
  -d '{
    "email": "medico@clinic.com",
    "password": "password123"
  }'
```

### Login como Admin

```powershell
curl -X POST "http://localhost:3000/api/auth/login" `
  -H "Content-Type: application/json" `
  -d '{
    "email": "admin@clinic.com",
    "password": "password123"
  }'
```

### Error: Contraseña incorrecta

```powershell
curl -X POST "http://localhost:3000/api/auth/login" `
  -H "Content-Type: application/json" `
  -d '{
    "email": "paciente@clinic.com",
    "password": "wrongpassword"
  }'
```

**Respuesta esperada** (status 401):
```json
{
  "status": 401,
  "message": "Contraseña incorrecta",
  "code": "INVALID_PASSWORD"
}
```

### Error: Usuario no existe

```powershell
curl -X POST "http://localhost:3000/api/auth/login" `
  -H "Content-Type: application/json" `
  -d '{
    "email": "noexiste@clinic.com",
    "password": "password123"
  }'
```

**Respuesta esperada** (status 404):
```json
{
  "status": 404,
  "message": "Usuario no encontrado",
  "code": "USER_NOT_FOUND"
}
```

---

## Método 3: Con Postman

### Configuración

1. **Abre Postman** (o descárgalo)
2. **Crea una nueva request**:
   - Método: `POST`
   - URL: `http://localhost:3000/api/auth/login`

3. **Headers**:
   ```
   Content-Type: application/json
   ```

4. **Body (raw, JSON)**:
   ```json
   {
     "email": "paciente@clinic.com",
     "password": "password123"
   }
   ```

5. **Click en "Send"**

### Guardar como Collection

Para usar luego:

1. **File** → **Save as Collection**
2. Nombre: `ClinicaNC Auth`
3. Guarda las requests:
   - Login Paciente
   - Login Médico
   - Login Admin
   - Login Error

---

## Método 4: Crear Página de Prueba

### Crear archivo: `app/test-login/page.tsx`

```typescript
'use client';

import { useState } from 'react';

export default function TestLoginPage() {
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error desconocido');
      } else {
        setResponse(data);
        localStorage.setItem('token', data.token);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧪 Test Login MSW</h1>

      {/* Botones de prueba */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => testLogin('paciente@clinic.com', 'password123')}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          👤 Paciente
        </button>

        <button
          onClick={() => testLogin('medico@clinic.com', 'password123')}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          👨‍⚕️ Médico
        </button>

        <button
          onClick={() => testLogin('admin@clinic.com', 'password123')}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          🔐 Admin
        </button>
      </div>

      {/* Botones de error */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => testLogin('paciente@clinic.com', 'wrongpassword')}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          ❌ Contraseña incorrecta
        </button>

        <button
          onClick={() => testLogin('noexiste@clinic.com', 'password123')}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          ❌ Usuario no existe
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-blue-600">⏳ Cargando...</p>}

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded">
          <strong>✅ Éxito!</strong>
          <pre className="mt-2 p-2 bg-white rounded text-sm overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {/* Info */}
      <div className="p-4 bg-gray-100 rounded text-sm">
        <p className="font-semibold mb-2">📝 Usuarios disponibles:</p>
        <ul className="space-y-1">
          <li>👤 <strong>Paciente:</strong> paciente@clinic.com</li>
          <li>👨‍⚕️ <strong>Médico:</strong> medico@clinic.com</li>
          <li>🔐 <strong>Admin:</strong> admin@clinic.com</li>
          <li className="mt-2"><strong>Contraseña (todos):</strong> password123</li>
        </ul>
      </div>
    </div>
  );
}
```

### Uso:

1. Inicia tu app: `npm run dev`
2. Abre: `http://localhost:3000/test-login`
3. Haz click en los botones para probar
4. Verás las respuestas en tiempo real

---

## Troubleshooting

### ❌ MSW no se inicia

**Error en Console:**
```
❌ Error iniciando MSW: TypeError: Could not find a mocking worker...
```

**Solución:**
1. Asegúrate de que `MSWProvider` está en `app/layout.tsx`
2. Verifica que el archivo `mockServiceWorker.js` existe en `public/`
3. Reinstala MSW: `npm install msw`

### ❌ Las requests no se interceptan

**Console muestra:**
```
[MSW] Warning: unhandled "GET" request to...
```

**Solución:**
1. Verifica que el endpoint está en `src/mocks/handlers/auth.ts`
2. Revisa que el agregador en `handlers.ts` incluye los handlers
3. Reinicia el servidor: `Ctrl+C` y `npm run dev`

### ❌ Token inválido

**Si el token no se guarda en localStorage:**

```javascript
// En Console, verifica:
localStorage.getItem('token')
localStorage.getItem('user')

// Si están vacíos, el login no funcionó
// Revisa la respuesta en Network o Console
```

### ✅ MSW está funcionando

En Console verás:
```
✅ MSW iniciado correctamente
```

En Network verás que las requests a `/api/` son interceptadas (mostradas en consola, no en servidor real).

---

## 🎯 Checklist de Prueba

- [ ] MSW se inicia correctamente (✅ en console)
- [ ] Login Paciente funciona
- [ ] Login Médico funciona
- [ ] Login Admin funciona
- [ ] Error: Contraseña incorrecta
- [ ] Error: Usuario no existe
- [ ] Token se guarda en localStorage
- [ ] Usuario se guarda en localStorage
- [ ] Página de test muestra respuestas

---

## 🚀 Próximos Pasos

Después de probar exitosamente:

1. Crear LoginContainer.tsx usando los mocks
2. Crear rutas dinámicas por rol
3. Agregar más handlers (appointments, etc.)
4. Implementar AuthGuard para proteger rutas

¡Listo para probar! 🎉
