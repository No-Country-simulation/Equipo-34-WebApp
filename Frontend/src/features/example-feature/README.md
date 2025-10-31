# 📖 Guía de Desarrollo - Example Feature

Esta carpeta contiene una **feature de ejemplo** que sirve como **plantilla arquitectónica** para todas las features del proyecto.

## 🏗️ Estructura de la Feature

```
/src/features/example-feature/
├── ExampleContainer.tsx       → Patrón Container (punto de entrada)
├── index.ts                   → Exportaciones públicas
├── domain/
│   └── types.ts              → Entidades, interfaces y reglas de negocio
├── use-cases/
│   └── example.use-case.ts   → Lógica de aplicación (hook personalizado)
├── adapters/
│   └── example.adapter.ts    → Mapeo API ↔ Dominio
├── services/
│   └── example.service.ts    → Comunicación con backend
└── components/
    └── ExampleUI.tsx         → Componentes de UI específicos
```

## 📦 Responsabilidades de cada capa

### 1. **Domain** (Dominio)

- ✅ Define entidades e interfaces puras
- ✅ Contiene reglas de negocio (validaciones, lógica de dominio)
- ❌ NO debe depender de servicios externos
- ❌ NO debe contener lógica de UI

**Ejemplo:**

```typescript
export interface IExampleEntity {
  readonly id: string;
  readonly title: string;
  readonly status: ExampleStatus;
}

export const ExampleBusinessRules = {
  isValidTitle: (title: string) => title.length >= 3,
};
```

### 2. **Services** (Servicios)

- ✅ Maneja comunicación con el backend
- ✅ Define DTOs (Data Transfer Objects)
- ✅ Retorna datos en formato API (no dominio)
- ❌ NO debe contener lógica de negocio

**Ejemplo:**

```typescript
export class ExampleService {
  async getAll(): Promise<PaginatedResponseDTO<ExampleDTO>> {
    const response = await fetch(`${API_URL}/examples`);
    return response.json();
  }
}
```

### 3. **Adapters** (Adaptadores)

- ✅ Mapea DTOs del API a entidades del dominio
- ✅ Transforma datos de dominio a DTOs para el API
- ❌ NO debe contener lógica de negocio
- ❌ NO debe llamar directamente a servicios

**Ejemplo:**

```typescript
export function mapDTOToEntity(dto: ExampleDTO): IExampleEntity {
  return {
    id: dto.id,
    title: dto.title,
    status: dto.status as ExampleStatus,
    createdAt: new Date(dto.created_at),
  };
}
```

### 4. **Use Cases** (Casos de Uso)

- ✅ Orquesta servicios, adapters y reglas de negocio
- ✅ Maneja estado de la aplicación
- ✅ Retorna datos del dominio (no DTOs)
- ❌ NO debe contener lógica de UI
- ❌ NO debe acceder directamente al backend

**Ejemplo:**

```typescript
export function useExampleUseCase() {
  const [state, setState] = useState({...});

  const fetchData = async () => {
    const response = await exampleService.getAll();
    const entities = ExampleAdapter.toDomain.paginated(response);
    setState({ data: entities });
  };

  return { data: state.data, fetchData };
}
```

### 5. **Components** (Componentes UI)

- ✅ Componentes de presentación puros
- ✅ Reciben datos via props
- ✅ Emiten eventos via callbacks
- ❌ NO deben contener lógica de negocio
- ❌ NO deben llamar directamente a servicios

**Ejemplo:**

```tsx
export function ExampleUI({ data, loading, onRefresh }) {
  return (
    <div>
      {loading ? <Spinner /> : <DataGrid data={data} />}
      <button onClick={onRefresh}>Refresh</button>
    </div>
  );
}
```

### 6. **Container** (Contenedor)

- ✅ Punto de entrada de la feature
- ✅ Conecta casos de uso con componentes UI
- ✅ Maneja handlers y callbacks
- ❌ NO debe contener lógica de negocio
- ❌ NO debe contener JSX complejo (delegar a componentes)

**Ejemplo:**

```tsx
export function ExampleContainer() {
  const { data, loading, fetchData } = useExampleUseCase();

  return (
    <ExampleUI
      data={data}
      loading={loading}
      onRefresh={fetchData}
    />
  );
}
```

## 🔄 Flujo de datos

```
┌─────────────────────────────────────────────────────────┐
│                    ExampleContainer                      │
│  (orquesta lógica y UI, maneja eventos)                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ├─► useExampleUseCase()
                     │    ├─► exampleService.getAll()
                     │    ├─► ExampleAdapter.toDomain()
                     │    └─► ExampleBusinessRules.validate()
                     │
                     └─► <ExampleUI /> (presenta datos)
```

## 🎯 Cómo usar esta plantilla

### Opción 1: Copiar la carpeta completa

```bash
cd src/features
cp -r example-feature mi-nueva-feature
```

### Opción 2: Crear desde cero siguiendo la estructura

```bash
mkdir -p src/features/mi-feature/{domain,use-cases,adapters,services,components}
```

### Paso a paso:

1. **Copiar la carpeta**

   ```bash
   cp -r src/features/example-feature src/features/mi-feature
   ```

2. **Renombrar archivos**
   - `ExampleContainer.tsx` → `MiFeatureContainer.tsx`
   - `example.use-case.ts` → `mi-feature.use-case.ts`
   - `example.service.ts` → `mi-feature.service.ts`
   - `example.adapter.ts` → `mi-feature.adapter.ts`
   - `ExampleUI.tsx` → `MiFeatureUI.tsx`

3. **Actualizar importaciones y exports**

   ```typescript
   // En index.ts
   export { MiFeatureContainer } from './MiFeatureContainer';
   export { MiFeatureUI } from './components/MiFeatureUI';
   ```

4. **Crear la página que usa la feature**

   ```tsx
   // src/app/(role)/mi-ruta/page.tsx
   import { MiFeatureContainer } from '@/features/mi-feature';

   export default function Page() {
     return <MiFeatureContainer />;
   }
   ```

5. **Implementar la lógica específica**
   - Actualizar `domain/types.ts` con tus entidades
   - Modificar `services/` para tus endpoints
   - Adaptar `adapters/` a tu estructura de datos
   - Implementar lógica en `use-cases/`
   - Diseñar UI en `components/`

## ✅ Checklist para nueva feature

- [ ] Copiar carpeta `example-feature` con nuevo nombre
- [ ] Renombrar todos los archivos (Example → MiFeature)
- [ ] Actualizar `domain/types.ts` con entidades del dominio
- [ ] Configurar endpoints en `services/`
- [ ] Implementar mapeos en `adapters/`
- [ ] Desarrollar lógica en `use-cases/`
- [ ] Diseñar componentes en `components/`
- [ ] Conectar todo en el `Container`
- [ ] Crear página en `app/(role)/` que use el Container
- [ ] Agregar handlers MSW en `/mocks` (si aplica)
- [ ] Probar que compila: `npm run build`
- [ ] Probar que funciona: `npm run dev`

## 🚫 Antipatrones a evitar

❌ **NO hacer:** Llamar servicios directamente desde componentes UI

```tsx
// ❌ MAL
function MyComponent() {
  const data = await exampleService.getAll(); // NO!
  return <div>{data}</div>;
}
```

✅ **SÍ hacer:** Usar el caso de uso

```tsx
// ✅ BIEN
function MyContainer() {
  const { data } = useExampleUseCase();
  return <MyUI data={data} />;
}
```

❌ **NO hacer:** Mezclar lógica de negocio en UI

```tsx
// ❌ MAL
function MyUI({ item }) {
  if (item.title.length < 3) return null; // Lógica de negocio en UI
}
```

✅ **SÍ hacer:** Validar en dominio/caso de uso

```typescript
// ✅ BIEN (en domain/types.ts)
export const BusinessRules = {
  isValidTitle: (title: string) => title.length >= 3
};
```

## 📚 Recursos adicionales

- Ver `/Frontend/AGENTS.md` para más detalles arquitectónicos
- Ver `/Frontend/README.md` para configuración del proyecto
- Ver ejemplos de features reales en `/features/auth`, `/features/appointments`

---

**Creado:** 29 de octubre de 2025  
**Autor:** [@davidcoachdev](https://github.com/davidcoachdev)  
**Proyecto:** Clínica NC - Frontend
