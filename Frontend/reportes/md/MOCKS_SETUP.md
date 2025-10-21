# 📦 Resumen: MSW Mocks - Login por Roles

## ✅ Qué se creó

### 1. **Tipos Compartidos** (`src/shared/types/auth.types.ts`)
- ✅ `User` - Estructura de usuario con rol
- ✅ `LoginRequest/Response` - DTO para login
- ✅ `RegisterRequest/Response` - DTO para registro
- ✅ `UserRole` type con 3 roles: `paciente | medico | admin`

### 2. **Datos Mock** (`src/mocks/data/users.mock.ts`)
- ✅ 3 usuarios de prueba (paciente, médico, admin)
- ✅ Funciones helper: `getMockUser`, `validateMockCredentials`
- ✅ Contraseña común: `password123`

### 3. **Utilidades JWT** (`src/mocks/utils/jwt.mock.ts`)
- ✅ `generateMockToken()` - Crea JWT mock funcional
- ✅ `decodeMockToken()` - Decodifica tokens
- ✅ `isMockTokenExpired()` - Valida expiración
- ✅ Compatible con payload del backend

### 4. **Handlers MSW** (`src/mocks/handlers/auth.ts`)
- ✅ `POST /api/auth/login` - Login con rol validation
- ✅ `POST /api/auth/register` - Registro de nuevos usuarios
- ✅ `POST /api/auth/logout` - Cierre de sesión
- ✅ `GET /api/auth/me` - Obtener usuario actual
- ✅ Errores tipados y descriptivos
- ✅ Simulación de latencia de red (delay)

### 5. **Agregador de Handlers** (`src/mocks/handlers/handlers.ts`)
- ✅ Centraliza todos los handlers
- ✅ Fácil de extender con nuevos handlers

### 6. **Proveedor MSW** (`src/mocks/providers/MSWProvider.tsx`)
- ✅ Hook React para inicializar MSW
- ✅ Solo funciona en desarrollo
- ✅ Logging de requests

### 7. **Documentación** (`src/mocks/README.md`)
- ✅ Guía de uso completa
- ✅ Ejemplos de código
- ✅ Testing con MSW
- ✅ Cómo agregar nuevos handlers

---

## 🎯 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| 👤 Paciente | `paciente@clinic.com` | `password123` |
| 👨‍⚕️ Médico | `medico@clinic.com` | `password123` |
| 🔐 Admin | `admin@clinic.com` | `password123` |

---

## 🔄 Flujo de Login

```
Usuario ingresa email/contraseña
    ↓
LoginForm.tsx (componente)
    ↓
loginUseCase() (orquestador)
    ↓
loginService() (llamada HTTP)
    ↓
MSW Handler (intercepta)
    ↓
validateMockCredentials() ✅
    ↓
generateMockToken() 🔑
    ↓
Retorna { token, user } ✅
    ↓
Zustand store actualiza
    ↓
Redirige a /{role}/dashboard
```

---

## 📝 Próximos Pasos

1. **Actualizar `app/layout.tsx`** - Añadir MSWProvider
   ```typescript
   import MSWProvider from '@/mocks/providers/MSWProvider';

   export default function RootLayout({...}) {
     return (
       <html>
         <body>
           <MSWProvider>
             {children}
           </MSWProvider>
         </body>
       </html>
     );
   }
   ```

2. **Crear LoginContainer** - Usar los handlers
   ```typescript
   // src/features/auth/AuthContainer.tsx
   import { LoginForm } from './components/LoginForm';
   import { loginUseCase } from './use-cases/login.use-case';
   ```

3. **Crear rutas dinámicas** por rol
   ```
   app/
   ├── (public)/login/page.tsx
   ├── (paciente)/dashboard/page.tsx
   ├── (medico)/agenda/page.tsx
   └── (admin)/gestión/page.tsx
   ```

4. **Agregar más handlers** (appointments, medical-records, etc.)

5. **Testing** - Usar MSW en tests

---

## 🧪 Testear MSW

### Con curl
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"paciente@clinic.com","password":"password123"}'
```

### Con Postman
```
POST: http://localhost:3000/api/auth/login
Body (JSON):
{
  "email": "paciente@clinic.com",
  "password": "password123"
}
```

### En el navegador (DevTools Console)
```javascript
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'paciente@clinic.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(console.log)
```

---

## 📊 Estructura Final

```
src/
├── mocks/
│   ├── browser.ts                 # Setup para navegador
│   ├── data/
│   │   └── users.mock.ts          # Usuarios de prueba
│   ├── handlers/
│   │   ├── auth.ts                # Handlers de auth
│   │   └── handlers.ts            # Agregador
│   ├── providers/
│   │   └── MSWProvider.tsx        # Hook para iniciar MSW
│   ├── utils/
│   │   └── jwt.mock.ts            # Utilidades JWT
│   ├── mockServiceWorker.js       # Worker de MSW
│   └── README.md                  # Documentación
├── shared/
│   └── types/
│       └── auth.types.ts          # Tipos de auth
└── features/
    └── auth/
        ├── domain/
        ├── use-cases/
        ├── services/
        ├── adapters/
        └── components/
```

---

## ✨ Características

- ✅ **Type-safe**: Todo tipado con TypeScript
- ✅ **Validación**: Email, contraseña, usuarios
- ✅ **Roles**: Paciente, Médico, Admin
- ✅ **Tokens**: JWT mock funcionales
- ✅ **Latencia**: Simula delay de red
- ✅ **Errores**: Respuestas realistas
- ✅ **Documentado**: README con ejemplos
- ✅ **Escalable**: Fácil agregar nuevos handlers

---

## 🚀 Ready to Use

Los mocks están listos para usar. Solo necesitas:

1. Instalar dependencias (si las necesitas):
   ```bash
   npm install msw
   ```

2. Importar `MSWProvider` en `app/layout.tsx`

3. ¡Comenzar a desarrollar! 🎉

