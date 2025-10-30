# 📋 Carpeta de Reportes y Documentación

Esta carpeta contiene toda la documentación de desarrollo, guías técnicas y reportes del proyecto Frontend.

## 📂 Estructura

```
reportes/
├── md/                          # Documentación en Markdown
│   ├── AGENTS.md               # Contexto arquitectónico para agentes de IA
│   ├── COMO_PROBAR_MOCKS.md    # Guía completa de testing con MSW
│   ├── MOCKS_SETUP.md          # Resumen de configuración MSW
│   └── ZUSTAND_AUTH_README.md  # Guía de inicio rápido con Zustand
│
└── txt/                         # Documentación en texto plano
    ├── COMO_PROBAR_ZUSTAND.txt         # 4 métodos de testing
    ├── MSW_SETUP_COMPLETE.txt          # Setup completado de MSW
    ├── TEST_MOCKS_QUICK.txt            # Guía rápida de testing
    ├── ZUSTAND_ARQUITECTURA.txt        # Diagrama de arquitectura
    ├── ZUSTAND_EJEMPLOS_RAPIDOS.ts     # 15+ ejemplos copy-paste
    ├── ZUSTAND_RESUMEN_FINAL.txt       # Resumen completo del sistema
    └── ZUSTAND_SETUP_COMPLETE.txt      # Setup completado de Zustand
```

## 📖 Guía de Lectura

### Para Empezar Rápido
1. Lee: `md/ZUSTAND_AUTH_README.md` - Inicio rápido
2. Explora: `txt/ZUSTAND_EJEMPLOS_RAPIDOS.ts` - Ejemplos prácticos
3. Prueba: `txt/COMO_PROBAR_ZUSTAND.txt` - Métodos de testing

### Para Entender la Arquitectura
1. Lee: `md/AGENTS.md` - Contexto general
2. Visualiza: `txt/ZUSTAND_ARQUITECTURA.txt` - Diagramas y flujos
3. Referencia: `md/ZUSTAND_AUTH_README.md` - API completa

### Para Configurar MSW
1. Lee: `md/MOCKS_SETUP.md` - Qué se creó
2. Aprende: `md/COMO_PROBAR_MOCKS.md` - Cómo testearlo
3. Referencia: `txt/MSW_SETUP_COMPLETE.txt` - Setup detallado

## 🧪 Testing

### Opción 1: Interfaz Web (Recomendado)
```bash
npm run dev
# Abre: http://localhost:3000/auth/login
# Haz clic en los botones de prueba rápida
```

### Opción 2: DevTools Console
```javascript
// F12 → Console
import { useAuthStore } from '@/shared/store/auth.store';
const store = useAuthStore.getState();
await store.login('paciente@clinic.com', 'password123');
console.log(store.user);
```

### Opción 3: Postman
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "paciente@clinic.com",
  "password": "password123"
}
```

## 📝 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| 👤 Paciente | paciente@clinic.com | password123 |
| 🏥 Médico | medico@clinic.com | password123 |
| ⚙️ Admin | admin@clinic.com | password123 |

## 🎯 Documentos por Tema

### Sistema de Autenticación (Zustand)
- `md/ZUSTAND_AUTH_README.md` - API reference
- `txt/ZUSTAND_SETUP_COMPLETE.txt` - Setup step by step
- `txt/ZUSTAND_ARQUITECTURA.txt` - Arquitectura y flujos
- `txt/ZUSTAND_RESUMEN_FINAL.txt` - Resumen ejecutivo
- `txt/ZUSTAND_EJEMPLOS_RAPIDOS.ts` - Ejemplos de código

### Mock Service Worker (MSW)
- `md/MOCKS_SETUP.md` - Qué se creó
- `md/COMO_PROBAR_MOCKS.md` - Cómo testearlo
- `txt/MSW_SETUP_COMPLETE.txt` - Setup completo
- `txt/TEST_MOCKS_QUICK.txt` - Guía rápida

### Testing
- `txt/COMO_PROBAR_ZUSTAND.txt` - 4 métodos de testing
- `md/COMO_PROBAR_MOCKS.md` - Testing MSW
- `txt/TEST_MOCKS_QUICK.txt` - Casos de prueba

### Arquitectura General
- `md/AGENTS.md` - Contexto del proyecto
- `txt/ZUSTAND_ARQUITECTURA.txt` - Diagramas

## ✨ Características Implementadas

✅ **Zustand Store** - State management centralizado  
✅ **localStorage Persistence** - Sesión persistente  
✅ **MSW Mocks** - API mocking en desarrollo  
✅ **AuthGuard** - Protección de rutas  
✅ **8+ Hooks** - Hooks personalizados  
✅ **TypeScript** - Type-safe completo  
✅ **Roles** - Paciente, Médico, Admin  
✅ **LoginForm** - Formulario funcional  

## 🚀 Próximos Pasos

1. **Crear rutas por rol**
   ```
   app/(paciente)/dashboard
   app/(medico)/dashboard
   app/(admin)/dashboard
   ```

2. **Agregar más mocks**
   ```
   src/mocks/handlers/appointments.ts
   src/mocks/handlers/medical-records.ts
   ```

3. **Crear páginas específicas por rol**
   ```
   src/features/paciente/components/
   src/features/medico/components/
   src/features/admin/components/
   ```

## 📌 Nota Importante

**ARCHIVOS EXCLUIDOS** de esta carpeta (permanecen en root):
- `README.md` - README del Frontend
- `package.json` - Dependencias

**FUTURA**: Manual de usuario para GitHub Wiki
- Estos reportes serán procesados para crear el manual de usuario
- Se pasará a la wiki del repositorio

## 📞 Soporte

Si tienes preguntas sobre algún documento:
1. Busca en el archivo específico
2. Revisa los ejemplos en `ZUSTAND_EJEMPLOS_RAPIDOS.ts`
3. Consulta `ZUSTAND_ARQUITECTURA.txt` para entender el flujo

---

**Última actualización**: 21 de octubre de 2025  
**Proyecto**: ClinicaNC - Healthcare Portal
