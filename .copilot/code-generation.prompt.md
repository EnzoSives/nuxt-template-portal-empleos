# 🚀 Code Generation Prompt Template para Nuxt Layers

## 📋 Contexto del Proyecto

Este proyecto utiliza **Nuxt 4** con arquitectura de **Layers** para modularidad y escalabilidad.
Sigue principios SOLID y mejores prácticas de desarrollo frontend moderno.

### 🏗️ Arquitectura Baseline:
- **Nuxt 4** - Framework progresivo de Vue.js
- **TypeScript** - Tipado estático para mejor DX
- **Vitest** + **@nuxt/test-utils** - Testing robusto
- **PNPM** - Gestor de paquetes eficiente
- **ESLint** + **Prettier** - Calidad de código automática

## 🎯 Principios de Generación de Código

### 📐 Diseño Robusto
```typescript
// ✅ Principios SOLID aplicados
interface UserRepository {
  findById(id: string): Promise<User>
  create(data: CreateUserDto): Promise<User>
  update(id: string, data: UpdateUserDto): Promise<User>
  delete(id: string): Promise<void>
}

class UserService {
  constructor(private repository: UserRepository) {}
  
  async getUser(id: string): Promise<User> {
    // Single Responsibility: Solo manejar usuarios
    return await this.repository.findById(id)
  }
}

// ✅ Dependency Injection
const userRepository = new DatabaseUserRepository()
const userService = new UserService(userRepository)
```

### 🧩 Modularidad con Layers
```typescript
// ✅ Cada layer tiene responsabilidad específica
// layers/auth/nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/auth'],
  auth: {
    strategies: {
      local: {
        // Configuración específica de auth
      }
    }
  }
})

// ✅ Componentes específicos por dominio
// layers/auth/components/AuthButton.vue
<template>
  <button @click="login" class="auth-btn">
    {{ isAuthenticated ? 'Logout' : 'Login' }}
  </button>
</template>
```

## 🎨 Estándares de Código

### 📝 Nomenclatura Descriptiva
```typescript
// ✅ Buenas prácticas
const userAuthenticationService = new UserAuthenticationService()
const isUserAuthenticated = await checkUserAuthentication(userId)
const userRegistrationData = await validateUserRegistrationData(data)
const productCatalogService = new ProductCatalogService()

// ❌ Evitar abreviaciones confusas
const uas = new UAS()
const isAuth = await check(userId)
const data = await validate(data)
```

### 🔧 Funciones Pequeñas y Enfocadas
```typescript
// ✅ Función pequeña y enfocada
async function validateUserEmail(email: string): Promise<boolean> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// ✅ Composición de funciones
async function createUser(userData: CreateUserDto): Promise<User> {
  const isValidEmail = await validateUserEmail(userData.email)
  if (!isValidEmail) {
    throw new ValidationError('Email inválido')
  }
  
  const hashedPassword = await hashPassword(userData.password)
  const userWithHashedPassword = {
    ...userData,
    password: hashedPassword
  }
  
  return await userRepository.create(userWithHashedPassword)
}

// ❌ Función monolítica
async function processUser(userData: any): Promise<any> {
  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userData.email)) {
    throw new Error('Email inválido')
  }
  // Validación de password
  if (userData.password.length < 8) {
    throw new Error('Password muy corto')
  }
  // Hash de password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(userData.password, salt)
  // Creación de usuario
  const user = await userRepository.create({
    ...userData,
    password: hashedPassword
  })
  // Email de bienvenida
  await emailService.sendWelcomeEmail(user.email)
  // Log de actividad
  await activityLogger.log('user_created', user.id)
  return user
}
```

## 🧪 Generación con Testing Incluido

### 🔬 Tests Inmediatos
```typescript
// ✅ Siempre incluir tests al generar componentes
// components/UserProfile.vue
<template>
  <div class="user-profile">
    <img :src="user.avatar" :alt="user.name" />
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: string
  name: string
  email: string
  avatar: string
}

defineProps<{
  user: User
}>()
</script>

// ✅ Test correspondiente automático
// test/nuxt/UserProfile.test.ts
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UserProfile from '../../components/UserProfile.vue'

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'avatar.jpg'
}

describe('UserProfile', () => {
  it('renders user information correctly', async () => {
    const wrapper = await mountSuspended(UserProfile, {
      props: { user: mockUser }
    })
    
    expect(wrapper.text()).toContain('john@example.com')
    expect(wrapper.find('h2').text()).toBe('John Doe')
    expect(wrapper.find('img').attributes('src')).toBe('avatar.jpg')
  })
  
  it('has proper accessibility', async () => {
    const wrapper = await mountSuspended(UserProfile, {
      props: { user: mockUser }
    })
    
    expect(wrapper.find('img').attributes('alt')).toBe('John Doe')
  })
})
```

### 🧩 Composables con Tests
```typescript
// ✅ Composable con estado reactivo
// composables/useCounter.ts
export const useCounter = (initialValue = 0) => {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset
  }
}

// ✅ Test del composable
// test/nuxt/useCounter.test.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from '../composables/useCounter'

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })
  
  it('initializes with custom value', () => {
    const { count } = useCounter(10)
    expect(count.value).toBe(10)
  })
  
  it('increments correctly', () => {
    const { count, increment } = useCounter(5)
    increment()
    expect(count.value).toBe(6)
  })
})
```

## 🔄 Patrones de Generación por Componentes

### 📁 CRUD Layer Template
```typescript
// ✅ Generar layer completo con CRUD
// scripts/generate-crud.js
const generateCrudLayer = (entityName) => {
  return `
// entities/${entityName}.dto.ts
export interface Create${entityName}Dto {
  name: string
  description?: string
}

export interface Update${entityName}Dto extends Partial<Create${entityName}Dto> {
  id: string
}

// entities/${entityName}.entity.ts
export class ${entityName} {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public createdAt: Date
  ) {}
}

// services/${entityName}.service.ts
export class ${entityName}Service {
  async getAll(): Promise<${entityName}[]> {
    return [] // Implementar lógica
  }
  
  async getById(id: string): Promise<${entityName}> {
    // Implementar lógica
  }
  
  async create(data: Create${entityName}Dto): Promise<${entityName}> {
    // Implementar lógica
  }
  
  async update(data: Update${entityName}Dto): Promise<${entityName}> {
    // Implementar lógica
  }
  
  async delete(id: string): Promise<void> {
    // Implementar lógica
  }
}

// pages/${entityName.toLowerCase()}/
//   index.vue
//   [id].vue
//   create.vue
//   edit/[id].vue

// components/${entityName.toLowerCase()}/
//   ${entityName}List.vue
//   ${entityName}Form.vue
//   ${entityName}Card.vue`
}
```

### 🎯 API Layer Template
```typescript
// ✅ Generar servidor API completo
// server/api/entities/[entity].ts
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = explodeSlug(event.context.params?.entity || '')
  
  switch (method) {
    case 'GET':
      return await get${entityName}(id)
    case 'POST':
      return await create${entityName}(await readBody(event))
    case 'PUT':
      return await update${entityName}(id, await readBody(event))
    case 'DELETE':
      return await delete${entityName}(id)
    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
      })
  }
})

// ✅ Middleware para validación
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { $auth } = useNuxtApp()
  
  if (!$auth.loggedIn && to.path.startsWith('/admin')) {
    return navigateTo('/login')
  }
})
```

## 📚 Documentación Automática

### 📖 README por Layer
```markdown
# ${layerName} Layer

## 📋 Descripción
${descripción del propósito del layer}

## 🏗️ Estructura
- \`components/\` - Componentes específicos del dominio
- \`pages/\` - Páginas de la funcionalidad  
- \`composables/\` - Lógica reutilizable
- \`server/api/\` - Endpoints específicos
- \`types/\` - Definiciones TypeScript
- \`tests/\` - Tests del layer

## 🚀 Uso
\`\`\`typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['./layers/${layerName}']
})
\`\`\`

## 🧪 Testing
\`\`\`bash
# Ejecutar tests específicos del layer
npx vitest --project nuxt test/nuxt/
\`\`\`
```

### 🔖 Comentarios JSDoc
```typescript
/**
 * Maneja la autenticación de usuarios y tokens JWT
 * 
 * @example
 * ```typescript
 * const auth = useAuth()
 * await auth.login('user@example.com', 'password')
 * ```
 * 
 * @param options - Configuración opcional del servicio
 * @returns Retorna métodos de autenticación
 */
export const useAuth = (options?: AuthOptions) => {
  // Implementación
}

/**
 * Formatea fechas para mostrar en la UI
 * 
 * @param date - Fecha a formatear
 * @param format - Formato deseado ('short' | 'long' | 'time')
 * @returns Fecha formateada como string
 * 
 * @example
 * ```typescript
 * formatDate(new Date(), 'short') // '01/01/2024'
 * ```
 */
export const formatDate = (date: Date, format: 'short' | 'long' | 'time' = 'short') => {
  // Implementación
}
```

## 🎯 Checklist de Generación

### ✅ Antes de generar código:
- [ ] **Analizar el contexto** y los requerimientos
- [ ] **Definir la responsabilidad** única del componente/funciona
- [ ] **Elegir el layer** apropiado (o crear uno nuevo)
- [ ] **Considerar las dependencias** y acoplamiento

### ✅ Durante la generación:
- [ ] **Siguiendo convenciones** de nomenclatura
- [ ] **Aplicando principios SOLID**
- [ ] **Incluyendo TypeScript** types/interfaces
- [ ] **Generando tests** inmediatamente
- [ ] **Documentando** con JSDoc cuando sea necesario

### ✅ Después de generar:
- [ ] **Ejecutar tests** para verificar funcionamiento
- [ ] **Revisar el código** para optimizaciones
- [ ] **Actualizar documentación** si es necesario
- [ ] **Considerar integración** con otros componentes

## 🚀 Tips de Productividad

1. **Genera código acoplado a tests** - Tests primero, implementación después
2. **Usa TypeScript estricto** - Mejor DX y menos bugs
3. **Aprovecha la reactividad de Vue** - No reinventes ruedas
4. **Mantén componentes pequeños** - Más fáciles de testear y mantener
5. **Separa concerns** - UI, lógica de negocio, datos
6. **Aprovecha las convenciones** de Nuxt para estructura y nomenclatura
7. **Documenta decisiones arquitecturales** importantes
