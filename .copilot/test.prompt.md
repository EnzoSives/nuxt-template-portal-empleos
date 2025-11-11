# 🧪 Testing Prompt Template para Nuxt Layers

## 📋 Contexto del Testing

Este proyecto utiliza **Nuxt 4** con arquitectura de layers y tiene configurado **Vitest** seguido de [`@nuxt/test-utils`](https://nuxt.com/docs/4.x/getting-started/testing).
La configuración de testing está organizada en la estructura de directorios recomendada.

## 🎯 ¿Qué tipo de test necesitas crear?

### Para Tests que requieren ambiente Nuxt:
- **Componentes Vue** que usan composables de Nuxt (`useState`, `useFetch`, etc.)
- **Páginas** que dependen del middleware o configuración de Nuxt
- **Composables** que usan plugins de Nuxt
- **Plugins** que modifican el contexto global

```typescript
// Ubicación: test/nuxt/ComponentName.test.ts
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ComponentName from '../path/to/ComponentName.vue'

describe('ComponentName', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(ComponentName)
    expect(wrapper.exists()).toBe(true)
  })
})
```

### Para Tests unitarios rápidos:
- **Utilidades puras** (`utils/`, helpers, validadores)
- **Constantes** y configuración
- **Funciones** sin dependencias de Nuxt
- **Schemas** de validación con Zod/Joi

```typescript
// Ubicación: test/unit/utilName.test.ts
import { describe, it, expect } from 'vitest'
import { utilFunction } from '../path/to/util'

describe('utilFunction', () => {
  it('should work correctly', () => {
    const result = utilFunction('input')
    expect(result).toBe('expected')
  })
})
```

### Para Tests E2E:
- **Flujos completos** de usuario
- **Navegación** entre páginas
- **Formularios** complejos
- **Integración** de múltiples componentes

```typescript
// Ubicación: test/e2e/feature.test.ts
import { describe, it, expect } from 'vitest'
import { createPage, setup } from '@nuxt/test-utils/e2e'

describe('Feature E2E', () => {
  await setup()

  it('should complete user flow', async () => {
    const page = await createPage('/feature')
    await expect(page.getByRole('heading')).toHaveText('Feature')
  })
})
```

## 🔧 Comandos de Testing

```bash
# Ejecutar todos los tests
npx vitest

# Solo tests de Nuxt
npx vitest --project nuxt

# Solo tests unitarios
npx vitest --project unit

# Solo tests E2E
npx vitest --project e2e

# Tests en modo watch
npx vitest --watch

# Tests con UI interactiva
npx vitest --ui
```

## 📝 Templates de Test Comunes

### Test de Componente Vue con Nuxt:
```typescript
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('ComponentName', () => {
  it('renders the component', async () => {
    const wrapper = await mountSuspended(ComponentName, {
      // Props del componente
      props: { title: 'Test title' }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Test title')
  })

  it('handles clicks correctly', async () => {
    const wrapper = await mountSuspended(ComponentName)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('uses composables correctly', async () => {
    const wrapper = await mountSuspended(ComponentName)
    
    // Test de estado reaccivo
    expect(wrapper.vm.$data.someState).toBe('expected')
  })
})
```

### Test de Composable con Nuxt:
```typescript
import { describe, it, expect } from 'vitest'
import { testUtils } from '@nuxt/test-utils/runtime'

describe('useComposable', () => {
  it('should work with Nuxt context', () => {
    const { $router } = testUtils.mockNuxtImport('$router')
    
    // Test del composable
    const result = useComposable()
    expect(result).toBeDefined()
  })
})
```

### Test de API Route:
```typescript
import { describe, it, expect } from 'vitest'
import { $fetch } from '@nuxt/test-utils/e2e'

describe('/api/endpoint', () => {
  it('returns data correctly', async () => {
    const data = await $fetch('/api/endpoint')
    expect(data).toHaveProperty('success', true)
  })

  it('handles errors', async () => {
    try {
      await $fetch('/api/endpoint/error')
    } catch (error) {
      expect(error.statusCode).toBe(404)
    }
  })
})
```

## 🚨 Problemas Comunes y Soluciones

### ❌ `useState` undefined en tests unitarios:
**Problema**: Tests unitarios no pueden usar composables de Nuxt
**Solución**: Mover test a `test/nuxt/` o mockear el composable

### ❌ Componente no se monta con `mountSuspended`:
**Problema**: El componente depende de plugins o contexto que no está disponible
**Solución**: Verificar que el componente esté en `test/nuxt/` y tenga ambiente Nuxt

### ❌ Tests lentos:
**Problema**: Tests innecesarios en ambiente Nuxt cuando podrían ser unitarios
**Solución**: Separar lógica pura en `test/unit/` y solo usar Nuxt para componentes que lo necesiten

### ❌ Mock de APIs:
**Problema**: Tests dependen de APIs externas
**Solución**: Usar `vi.mock()` para mockear `$fetch` o composables

## 🏗️ Estructura Recomendada

```
test/
├── nuxt/           # ✅ Componentes, páginas, composables que dependen de Nuxt
│   ├── Button.test.ts
│   ├── pages/
│   │   └── index.test.ts
│   └── composables/
│       └── useAuth.test.ts
├── unit/           # ✅ Lógica pura, utils, helpers
│   ├── utils/
│   │   └── formatDate.test.ts
│   ├── constants/
│   │   └── apiConfig.test.ts
│   └── schemas/
│       └── userSchema.test.ts
└── e2e/            # ✅ Flujos completos de usuario
    ├── auth.test.ts
    ├── navigation.test.ts
    └── forms.test.ts
```

## 💡 Tips Importantes

1. **Usa `mountSuspended`** para componentes que usan async/await o composables de Nuxt
2. **Separa tests unitarios** de tests de integración para mejor rendimiento
3. **Mockea dependencias externas** para tests más rápidos y deterministas
4. **Usa beforeEach/afterEach** para setup y cleanup cuando sea necesario
5. **Documenta comportamiento** con nombres descriptivos en tests
6. **Agrupa tests relacionados** en el mismo archivo
7. **Mantén tests sencillos** - un test, una responsabilidad

## 🔍 Debugging Tests

```bash
# Ver detalles de tests fallidos
npx vitest --reporter=verbose

# Tests en modo watch con logs
npx vitest --watch --reporter=verbose

# Solo un archivo específico
npx vitest test/nuxt/Component.test.ts

# Con debugging habilitado
npx vitest --debug
```
