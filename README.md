# 🚀 Template Nuxt Layers

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&labelColor=020420)](https://www.typescriptlang.org/)

> **📋 Este es un template de repositorio** - Una aplicación moderna construida con **Nuxt 4** utilizando la arquitectura de **Layers** para una separación modular y escalable de funcionalidades.

## 🎯 ¿Cómo usar este template?

### Opción 1: GitHub Template (Recomendado)

1. **Haz clic en "Use this template"** en la página del repositorio
2. **Selecciona "Create a new repository"**
3. **Nombra tu nuevo proyecto**
4. **Clona tu nuevo repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-nuevo-proyecto.git
   cd tu-nuevo-proyecto
   pnpm install
   pnpm run dev
   ```

### Opción 2: Fork del repositorio

1. **Haz clic en "Fork"** en la página del repositorio
2. **Clona tu fork:**
   ```bash
   git clone https://github.com/tu-usuario/nuxt-layers-app-template.git
   cd nuxt-layers-app-template
   pnpm install
   pnpm run dev
   ```

### Opción 3: Clone y configuración manual

```bash
# Clonar el template
git clone https://github.com/dforce2055/nuxt-layers-app-template.git mi-proyecto
cd mi-proyecto

# Eliminar conexión con el template original
rm -rf .git
git init

# Configurar tu nuevo repositorio
git remote add origin https://github.com/tu-usuario/mi-proyecto.git

# Instalar dependencias
pnpm install

# Primer commit
git add .
git commit -m "feat: inicializar proyecto desde template Nuxt Layers"
git push -u origin main
```

## ⚠️ Importante

- **No trabajes directamente en este repositorio** - Es un template
- **Crea tu propio repositorio** usando una de las opciones anteriores
- **Personaliza la información** del proyecto en `package.json` y `README.md`


## 📋 Tabla de Contenidos

- [🏗️ Arquitectura](#️-arquitectura)
- [📝 Sistema de Logging](#-sistema-de-logging)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Configuración](#-configuración)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [📚 Layers Disponibles](#-layers-disponibles)
- [🔌 APIs y Endpoints](#-apis-y-endpoints)
- [🛠️ Desarrollo](#️-desarrollo)
- [📦 Despliegue](#-despliegue)
- [🤝 Contribución](#-contribución)

## ✨ Características

🔧 **Nombres dinámicos**: Los scripts se adaptan automáticamente al nombre de tu feature
📚 **Documentación automática**: Genera documentación completa con archivos .gitkeep explicativos
🏗️ **Estructura modular**: Organiza tus funcionalidades por layers con arquitectura limpia
🐛 **Debugging integrado**: Configuración lista para VSCode con tema personalizado Nuxt
⚡ **Hot reloading**: Recompilación automática durante el desarrollo con Nuxt 4
📦 **Scripts automatizados**: Creación de layers, generación de estructura y más
🎨 **Tema personalizado**: Configuración de VS Code con colores verdes de Nuxt
🔌 **APIs independientes**: Cada layer puede tener sus propias APIs y endpoints
🔄 **Layers remotos**: Soporte para layers desde GitHub y repositorios externos
📁 **Estructura completa**: Directorios organizados con explicaciones detalladas
🚀 **Inicio rápido**: Scripts que automatizan la creación de nuevas funcionalidades
📝 **Logger compartido**: Sistema de logging profesional basado en Consola

## 📋 Requisitos

- Node.js 22+ 
- pnpm 10+
## 🚀 Quick Start


### Instalación

Después de crear tu proyecto desde el template:

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

### Agregar tu primer layer

```bash
pnpm run add-new-feature "mi-primer-layer"
```

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Inicia Nuxt en modo desarrollo |
| `pnpm run build` | Construye la aplicación para producción |
| `pnpm run preview` | Vista previa de la aplicación construida |
| `pnpm run add-new-feature <nombre>` | Crea una nueva layer completa |
| `pnpm run lint` | Ejecuta ESLint para verificar calidad del código |
| `pnpm run typecheck` | Verifica tipos TypeScript |
| `pnpm run postinstall` | Prepara Nuxt después de instalar dependencias |
| `pnpm run test` | Ejecuta tests en modo watch |
| `pnpm run test:run` | Ejecuta todos los tests una vez |
| `pnpm run test:ui` | Ejecuta tests con interfaz gráfica |

### Scripts de Desarrollo
- **`pnpm run dev`**: Servidor de desarrollo con hot reloading
- **`pnpm run build`**: Construcción optimizada para producción
- **`pnpm run preview`**: Vista previa local de la build de producción

### Scripts de Calidad
- **`pnpm run lint`**: Análisis de código con ESLint
- **`pnpm run typecheck`**: Verificación de tipos TypeScript

### Scripts de Layers
- **`pnpm run add-new-feature <nombre>`**: Crea una nueva layer con estructura completa

## 🏗️ Arquitectura

Esta aplicación utiliza la arquitectura de **Nuxt Layers** que permite:

- ✅ **Separación modular** de funcionalidades
- ✅ **Reutilización** de componentes y lógica
- ✅ **Desarrollo independiente** de cada layer
- ✅ **Escalabilidad** y mantenibilidad
- ✅ **Versionado independiente** de features

### Ventajas de Nuxt Layers

1. **Proyectos independientes**: Cada layer puede ser un proyecto Nuxt completo
2. **Repositorios separados**: Posibilidad de mantener cada feature en repositorios independientes
3. **Despliegues independientes**: Cada layer puede desplegarse por separado
4. **Equipos aislados**: Diferentes equipos pueden trabajar en layers específicos
5. **Reutilización nativa**: Compartir componentes, composables y configuraciones
6. **Sistema de prioridades**: Override de configuraciones y herencia de funcionalidades

## 📝 Sistema de Logging

### ⚠️ **IMPORTANTE: NO USES `console.log`**

Este proyecto implementa un sistema de logging profesional que **reemplaza completamente** el uso de `console.log`. ESLint está configurado para **bloquear** cualquier intento de usar `console.log`.

❌ **Prohibido:**
```javascript
console.log('Este código será bloqueado por ESLint')
console.warn('No uses console.warn')
console.error('Ni tampoco console.error')
```

✅ **Correcto:**
```javascript
// Usando el logger compartido
const logger = useLogger('MiComponent')
logger.info('Mensaje informativo')
logger.warn('Advertencia')
logger.error('Error')
logger.success('Éxito')
logger.debug('Debug - solo en desarrollo')
```

### 🔧 Características del Logger Compartido

- **✅ Basado en Consola**: La misma librería que usa Nuxt internamente
- **✅ Funiciona en Cliente y Servidor**: Código compartido real usando carpeta `shared/`
- **✅ Configuración automática**: Se adapta al entorno (desarrollo/producción)
- **✅ Etiquetas opcionales**: Para organizar y filtrar logs por módulo/componente
- **✅ Compatible con ESLint**: Sin errores de `console.log`
- **✅ Colores automáticos**: Formato profesional en desarrollo

### 🚀 Cómo Usar el Logger

#### En Componentes Vue (Cliente)
```typescript
<script setup lang="ts">
// Auto-importado automáticamente
const logger = useLogger('HomePage')

logger.info('Página cargada exitosamente')
logger.warn('Usuario no encontrado')
logger.error('Error de conexión')
logger.success('Operación completada')
logger.debug('Información detallada - solo en desarrollo')
</script>
```

#### En API Endpoints (Servidor)
```typescript
import { createSharedLogger } from '../../shared/utils/logger'

export default defineEventHandler(() => {
  const logger = createSharedLogger('UserAPI')
  
  logger.info('Endpoint /api/users llamado')
  logger.debug('Validando datos de entrada')
  
  // ... lógica de la API ...
  
  logger.success('Usuario creado exitosamente')
  
  return { message: 'success' }
})
```

#### Configuración por Entorno

- **Desarrollo**: Todos los niveles con colores y timestamps
- **Producción**: Solo errores críticos, formato compacto y sin colores

#### Niveles Disponibles

1. **`logger.info()`** - Información general
2. **`logger.warn()`** - Advertencias importantes  
3. **`logger.error()`** - Errores que requieren atención
4. **`logger.success()`** - Operaciones exitosas
5. **`logger.debug()`** - Solo visible en desarrollo

### 🔧 Configuración ESLint

El proyecto tiene configurado ESLint con la regla `no-console: 'error'` que bloquea cualquier uso de `console.*`:

```javascript
// eslint.config.mjs
export default withNuxt({
  rules: {
    'no-console': 'error' // Bloquea todos los console.*
  }
})
```

### 📁 Ubicación del Logger Compartido

```
shared/utils/logger.ts    # ← Logger principal compartido
app/composables/useLogger.ts  # ← Composable auto-importado
```

Este sistema aprovecha las ventajas de **Nuxt 4** usando la carpeta `shared/` para código que funciona tanto en cliente como servidor.

## 🎨 Guía de Estilo de Funciones

Este proyecto tiene reglas específicas de formato para funciones que mantienen consistencia y legibilidad en todo el código.

### 🎯 Objetivo

Preferir funciones declaradas tradicionales sobre funciones flecha para mantener consistencia y legibilidad.

### ✅ Formato Preferido

#### Función Declarada Tradicional
```typescript
// ✅ CORRECTO - Formato preferido
export function getUserById(id: string): User | null {
  return users.find(user => user.id === id)
}

// ✅ CORRECTO - Con parámetros opcionales
export function createUser(name: string, active: boolean = true): User {
  return { id: generateId(), name, active }
}

// ✅ CORRECTO - Función async
export async function fetchUserData(userId: string): Promise<UserData> {
  const response = await fetch(`/api/users/${userId}`)
  return response.json()
}
```

#### Funciones Privadas/Internas
```typescript
// ✅ CORRECTO - Helper functions también como declaración
function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

function validateEmail(email: string): boolean {
  return email.includes('@')
}
```

#### Métodos de Clase
```typescript
// ✅ CORRECTO - Métodos tradicionales
export class UserService {
  constructor(private users: User[] = []) {}
  
  addUser(user: User): void {
    this.users.push(user)
  }
  
  async saveUser(user: User): Promise<void> {
    await this.validateUser(user)
    this.users.push(user)
  }
}
```

### ❌ Formato No Recomendado

#### Evitar Funciones Flecha para Declaraciones Principales
```typescript
// ❌ INCORRECTO - ESLint marcará error
export const getUserById = (id: string): User | null => {
  return users.find(user => user.id === id)
}
```

### 🎨 Casos Donde Arrow Functions SÍ Son Aceptables

#### Callbacks Simples
```typescript
// ✅ CORRECTO - Map/filter/reduce
const userNames = users.map(user => user.name)
const activeUsers = users.filter(user => user.active)
const totalAge = users.reduce((sum, user) => sum + user.age, 0)

// ✅ CORRECTO - Event handlers simples
button.onclick = () => console.log('Clicked')

// ✅ CORRECTO - Funciones muy simples inline
const isValid = value => value !== null && value !== undefined
```

### 🔧 Reglas ESLint Configuradas

```javascript
// eslint.config.mjs
rules: {
  // Preferir funciones declaradas tradicionales
  'prefer-arrow-functions': 'off', 
  'func-style': ['error', 'declaration', { 
    allowArrowFunctions: true // Solo para callbacks necesarios
  }],
  'prefer-function-declarations': 'error',
  
  // Formato consistente
  'func-names': 'error', // Requerir nombres de función
  'func-call-spacing': ['error', 'never'], // function() no function ()
  'no-inner-declarations': ['error', 'functions'], // No declarar dentro de bloques
  'no-useless-return': 'error' // No return innecesario
}
```

### 📋 Checklist para Nuevas Funciones

- [ ] ¿Es la función principal/exportada? → Usar `function name() {}`
- [ ] ¿Es función helper privada? → Usar `function name() {}`
- [ ] ¿Es callback simple? → Arrow function OK `() => {}`
- [ ] ¿Es método de clase? → Usar método tradicional
- [ ] ¿Tiene tipo de retorno explícito? → `function name(): Type {}`
- [ ] ¿Está organizada correctamente? → Parámetros opcionales al final

### 🎯 Ejemplos en el Proyecto

#### Utils
```typescript
// app/utils/logger.ts
export function createSharedLogger(tag?: string) {
  // implementación
}

// app/utils/version.ts  
export function getAppVersion(): AppVersion {
  return { name: 'Template', version: '1.0.0' }
}
```

#### Composables
```typescript
// app/composables/useLogger.ts
export function useLogger(tag?: string) {
  return createSharedLogger(tag)
}
```

#### Servidores APIs
```typescript
// server/api/users.ts
export default defineEventHandler(request => {
  // Arrow OK para handlers de Nuxt
})
```

### 🚨 Errores Comunes

1. **Usar arrow functions para exportaciones principales**
2. **No usar tipos de retorno explícitos**
3. **Declarar funciones dentro de bloques if/for**
4. **Hacer returns innecesarios**
5. **Espacios en llamadas de función incorrectos**

---

**Recuerda**: La consistencia es clave. Sigue este formato en todo el proyecto para mantener código limpio y legible.

### Estructura completa de un proyecto Nuxt 4
https://nuxt.com/docs/4.x/guide/directory-structure/app/pages

```
nuxt-layers-app-template/
├── .nuxt/                  # Carpeta generada automáticamente por Nuxt (build, runtime, caches)
├── .output/                # Resultado final después de compilar para producción (lo que se deploya)

├── app/                    # Núcleo de tu aplicación
│   ├── assets/             # Archivos sin compilar: imágenes, fuentes, estilos SCSS, etc.
│   ├── components/         # Componentes Vue reutilizables (botones, cards, etc.)
│   ├── composables/        # Funciones reutilizables con la API de Vue (ej: useAuth, useCart)
│   ├── layouts/            # Diseños globales para páginas (ej: default.vue, admin.vue)
│   ├── middleware/         # Middlewares para rutas (auth, redirecciones, guards)
│   ├── pages/              # Vistas/páginas -> generan automáticamente rutas
│   ├── plugins/            # Plugins Vue/Nuxt que se cargan antes de renderizar la app
│   ├── store/              # Store de datos centralizado. (Pinia)
│   ├── services/           # Integraciones con API
│   ├── schemas/            # Schemas ZOD
│   ├── types/              # Interfaces typescript
│   ├── utils/              # Funciones utilitarias (helpers puros de TS/JS)
│   ├── app.vue             # Entrada principal de la aplicación (envoltorio raíz)
│   ├── app.config.ts       # Config global accesible vía useAppConfig()
│   └── error.vue           # Página de error global para 404/500/etc.

├── content/                # (opcional, si usas @nuxt/content) Markdown, JSON, docs
├── layers/                 # Carpeta opcional para extender la funcionalidad del proyecto en CAPAS
├── modules/                # Módulos/layers locales de Nuxt (extensiones personalizadas)
├── node_modules/           # Dependencias instaladas por npm/yarn/pnpm
├── public/                 # Archivos estáticos (favicon, robots.txt, imágenes públicas)
├── server/                 # Endpoints, APIs y server routes (API interna con Nitro)
├── shared/                 # Código compartido entre server y client (types, modelos, constantes)
│   └── utils/
│       └── logger.ts       # ✨ Logger compartido basado en Consola

├── .env                    # Variables de entorno (API keys, configuraciones sensibles)
├── .gitignore              # Archivos y carpetas ignoradas por git
├── .nuxtignore             # Archivos/carpetas ignoradas por Nuxt en el escaneo automático
├── .nuxtrc                 # Configuración CLI de Nuxt (opcional, para proyectos complejos)

├── nuxt.config.ts          # Configuración principal de Nuxt (plugins, módulos, runtimeConfig)
├── package.json            # Dependencias y scripts npm
└── tsconfig.json           # Configuración de TypeScript



## Layers
├── layers/                   # Carpeta opcional, no obligatoria
│   ├── auth/                 # Un "layer" = mini-Nuxt con funcionalidades propias
│   │   ├── app/
│   │   │   ├── components/         # Componentes específicos
│   │   │   ├── composables/        # Lógica reutilizable
│   │   │   ├── pages/              # Páginas (opcional)
│   │   │   ├── middleware/         # Middleware (opcional)
│   │   │   ├── services/           # Integraciones con API
│   │   ├─  shared/                 # Tipos, constantes y modelos compartidos
│   │   |   ├── schemas/            # Schemas ZOD
│   │   |   ├── types/              # Tipos TypeScript compartidos
│   │   |   ├── constants/          # Constantes compartidas
│   │   |   └── models/             # Modelos de datos
│   │   ├─  server/
│   │   │   └── api/                # APIs del layer
│   │   └──nuxt.config.ts 
│   └── cart/                       # Un "layer" = mini-Nuxt con funcionalidades propias
│       ├── app/
│       │   ├── components/         # Componentes específicos
│       │   ├── composables/        # Lógica reutilizable
│       │   ├── pages/              # Páginas (opcional)
│       │   ├── middleware/         # Middleware (opcional)
│       │   ├── services/           # Integraciones con API
│       ├─── shared/             # Tipos, constantes y modelos compartidos
│       │       ├── schemas/        # Schemas ZOD
│       │       ├── types/          # Tipos TypeScript compartidos
│       │       ├── constants/      # Constantes compartidas
│       │       └── models/         # Modelos de datos
│       ├─ server/
│       │  └── api/                # APIs del layer
│       └──nuxt.config.ts 
│ 
├── nuxt.config.ts          # Configuración del layer
└── package.json            # Dependencias del layer
```

### 📁 Estructura del Proyecto

```
nuxt-layers-app-template/
├── app/                           # 🎯 Aplicación principal
│   ├── components/                # Componentes principales
│   ├── pages/                     # Páginas principales
│   ├── assets/                    # Recursos estáticos
│   └── app.vue                    # Componente raíz
│
├── layers/                        # 🧩 Layers de funcionalidades
│   ├── auth/                      # Layer de autenticación
│   │   ├── components/            # Componentes de auth
│   │   ├── pages/                 # Páginas de auth
│   │   ├── middleware/            # Middleware de auth
│   │   ├── nuxt.config.ts          # Configuración del layer
│   │   └── package.json           # Dependencias del layer
│   │
│   └── cart/                      # Layer del carrito
│       ├── pages/                 # Páginas del carrito
│       └── nuxt.config.ts          # Configuración del layer
│
├── public/                        # Archivos públicos
├── scripts/                       # Scripts de utilidad
├── nuxt.config.ts                  # Configuración principal
├── package.json                   # Dependencias principales
└── README.md
```

## 🔧 Configuración

### Main Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Extensión de layers locales
  extends: [
    './layers/cart',
    './layers/auth',
    // Layers remotos desde GitHub
    'github:dforce2055/app-remota-2#main', { install: true },
  ],
  
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@vueuse/nuxt'
  ],

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
```

## 📚 Layers Disponibles de Ejemplo

### 🎯 Aplicación Principal
**Ubicación**: `app/`
**Propósito**: Aplicación principal que orquesta todos los layers

**Características**:
- Componentes principales de la aplicación
- Páginas de navegación
- Recursos estáticos (CSS, imágenes)
- Configuración base de la aplicación

### 🔐 Auth Layer
**Ubicación**: `layers/auth/`
**Propósito**: Funcionalidades de autenticación

**Características**:
- Componentes de autenticación (`AuthButton.vue`)
- Páginas de login y registro
- Middleware de autenticación
- Configuración específica de auth

**Páginas Disponibles**:
- `/auth/login` - Página de inicio de sesión
- `/auth/register` - Página de registro

### 🛒 Cart Layer
**Ubicación**: `layers/cart/`
**Propósito**: Funcionalidades del carrito de compras

**Características**:
- Páginas del carrito
- Lógica de gestión de productos
- Configuración específica del carrito

**Páginas Disponibles**:
- `/cart` - Página del carrito

### 🌐 Layers Remotos
**Ubicación**: GitHub
**Propósito**: Layers externos desde repositorios remotos

**Layers Remotos**:
- `github:dforce2055/app-remota-2#main` - App remota 2

**Características**:
- Componentes remotos
- Funcionalidades externas
- Integración con servicios externos

## 🔌 APIs y Endpoints

### Auth Layer APIs
Las APIs de autenticación se manejan a través del layer `auth` y pueden incluir endpoints para:
- Autenticación de usuarios
- Gestión de sesiones
- Validación de tokens

### Cart Layer APIs
Las APIs del carrito se manejan a través del layer `cart` y pueden incluir endpoints para:
- Gestión de productos en el carrito
- Cálculo de totales
- Procesamiento de pedidos

### Layers Remotos APIs
Los layers remotos desde GitHub pueden incluir sus propias APIs:
- APIs específicas de cada layer remoto
- Funcionalidades externas
- Integración con servicios de terceros

### Uso de APIs en Componentes

```vue
<!-- Ejemplo de uso en un componente -->
<template>
  <div>
    <h1>Mi Aplicación</h1>
    <div v-if="pending">Cargando...</div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup>
// Usar API de cualquier layer
const { data, pending } = await useFetch('/api/endpoint')

// Ejemplo con datos del carrito
const { data: cartData } = await useFetch('/api/cart')
</script>
```

## 🛠️ Desarrollo

### 🔄 Flujo de Desarrollo

#### 1. Crear una nueva feature
```bash
pnpm run add-new-feature mi-feature
```

IMPORTANTE: Es necesario agregar Modulo de Testing

```bash
> create-nuxt --template layer con-test


        .d$b.
       i$$A$$L  .d$b
     .$$F` `$$L.$$A$$.
    j$$'    `4$$:` `$$.
   j$$'     .4$:    `$$.
  j$$`     .$$:      `4$L
 :$$:____.d$$:  _____.:$$:
 `4$$$$$$$$P` .i$$$$$$$$P`

ℹ Welcome to Nuxt!
ℹ Creating a new project in 

✔ Which package manager would you like to use?
pnpm

✔ Initialize git repository?
No

✔ Would you like to install any of the official modules?
Yes

✔ Pick the modules to install:
@nuxt/test-utils – Test utilities for Nuxt
```

Este comando creará una nueva layer completa con:

- Estructura de directorios organizada
- Páginas de ejemplo con rutas automáticas
- Schemas de validación con Zod
- Configuración de TypeScript
- README personalizado
- Archivos .gitkeep con explicaciones

#### 2. Desarrollar la feature
```bash
cd layers/mi-feature
pnpm install
pnpm run dev
```

#### 3. Agregar más funcionalidades a la feature
Puedes agregar manualmente:

- **components**: Componentes Vue reutilizables
- **composables**: Lógica reutilizable con API de Vue
- **pages**: Nuevas páginas y rutas
- **middleware**: Guards y lógica de rutas
- **server/api**: Endpoints de API
- **shared**: Tipos, constantes, modelos y esquemas

#### 4. Integrar la feature
```bash
# Agregar el layer a nuxt.config.ts
extends: [
  './layers/mi-feature'
]
```

### 🐛 Debugging

#### Configuración en VSCode
El template incluye configuración completa para debugging:

- Coloca breakpoints en tu código (puntos rojos en el margen)
- Presiona F5 o el botón de play en el panel de debugging
- Accede a tu página: `http://localhost:3000/mi-feature`
- El código se detendrá en los breakpoints

#### Comandos de debugging
- **Step Over (F10)**: Ejecuta la siguiente línea
- **Step Into (F11)**: Entra en la función
- **Step Out (Shift+F11)**: Sale de la función actual
- **Continue (F5)**: Continúa hasta el siguiente breakpoint

#### Hot Reloading
- La aplicación se recompila automáticamente cuando haces cambios
- Los sourcemaps se generan automáticamente
- No necesitas reiniciar el servidor para ver los cambios

#### Solución de problemas
**Los breakpoints no funcionan**
- Verifica que los sourcemaps se están generando
- Asegúrate de que la aplicación está corriendo (`pnpm run dev`)
- Revisa las rutas en la configuración de VSCode

**Cambios no se reflejan**
- Asegúrate de que el watcher está corriendo (`pnpm run dev`)
- Verifica que no hay errores en la compilación
- Revisa la consola del navegador para errores

### 🧪 Testing

#### Configuración de Tests
El proyecto está configurado con:
- **Vitest**: Framework de testing rápido
- **Vue Test Utils**: Utilidades para testing de componentes Vue
- **jsdom**: Entorno DOM simulado

#### Ejecutar Tests
```bash
# Ejecutar tests en modo watch (desarrollo)
pnpm run test

# Ejecutar todos los tests una vez
pnpm run test:run

# Ejecutar tests con interfaz gráfica
pnpm run test:ui
```

#### Estructura de Tests
📁 **Estructura de archivos de test recomendada:**
```
test/
├── nuxt/           # Tests que requieren ambiente Nuxt
│   └── AppLogo.test.ts
├── unit/           # Tests unitarios rápidos (Node)
└── e2e/           # Tests end-to-end
```

🎯 **Comandos disponibles ahora:**
- `npx vitest --project nuxt` - Ejecutar solo tests de Nuxt
- `npx vitest --project unit` - Ejecutar solo tests unitarios  
- `npx vitest` - Ejecutar todos los tests

Los tests ahora están configurados correctamente siguiendo las mejores prácticas de Nuxt 4.x con [`@nuxt/test-utils`](https://nuxt.com/docs/4.x/getting-started/testing). 🎉

**Estructura tradicional de tests por componente:**
```
app/
├── components/
│   ├── AppLogo.vue
│   └── AppLogo.test.ts    # Test específico del componente (mover a test/ si usa Nuxt environment)
└── ...

layers/
├── mi-layer/
│   ├── app/
│   │   ├── components/
│   │   │   ├── MiComponent.vue
│   │   │   └── MiComponent.test.ts
│   │   ├── pages/
│   │   │   ├── mi-pagina/
│   │   │   │   ├── index.vue
│   │   │   │   └── index.test.ts
│   └── server/
│       └── api/
│           └── ejemplo.test.ts
```

#### Ejemplo de Test
```typescript
// app/components/AppLogo.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLogo from './AppLogo.vue'

describe('AppLogo.vue', () => {
  it('renders SVG logo', () => {
    const wrapper = mount(AppLogo)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
```

#### Ejemplo de Test para Layer
```typescript
// layers/con-test/app/pages/con-test/index.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConTestIndex from './index.vue'

describe('ConTestIndex.vue', () => {
  it('displays the correct heading with full path', () => {
    const wrapper = mount(ConTestIndex)
    expect(wrapper.find('h1').text()).toBe('/layers/con-test/app/pages/con-test/index.vue')
  })
})
```

### 🔄 Flujo de Trabajo con Git

#### Crear una nueva feature con Pull Request

##### 1. Preparar el entorno
```bash
# Asegúrate de estar en la branch develop
git checkout develop
git pull origin develop

# Crea una nueva branch para tu feature
git checkout -b feature/nombre-de-tu-feature
```

##### 2. Desarrollar la feature
```bash
# Crea tu nueva feature usando el script
pnpm run add-new-feature nombre-de-tu-feature

# Desarrolla tu funcionalidad
cd layers/nombre-de-tu-feature
pnpm install
pnpm run dev

# Haz tus commits con mensajes descriptivos
git add .
git commit -m "feat: agregar layer de usuarios

- Crear layer completo para gestión de usuarios
- Implementar páginas de login y registro
- Agregar middleware de autenticación
- Incluir componentes reutilizables"
```

##### 3. Actualizar documentación
```bash
# Actualiza el README principal si es necesario
# Agrega el layer a nuxt.config.ts
git add nuxt.config.ts README.md
git commit -m "docs: actualizar configuración para layer usuarios"
```

##### 4. Push y crear Pull Request
```bash
# Push tu branch al repositorio remoto
git push origin feature/nombre-de-tu-feature
```

##### 5. Crear Pull Request
Ve a tu repositorio en GitHub/GitLab
Haz clic en "New Pull Request"
Configura el PR:
- **Base branch**: develop
- **Compare branch**: feature/nombre-de-tu-feature
- **Título**: feat: agregar layer de usuarios
- **Descripción**:
```markdown
## 📝 Descripción
Agrega nuevo layer para gestión de usuarios con páginas y componentes completos.

## ✨ Cambios realizados
- [x] Crear layer `usuarios` con estructura completa
- [x] Implementar páginas de login y registro
- [x] Agregar middleware de autenticación
- [x] Crear componentes reutilizables
- [x] Incluir schemas de validación
- [x] Actualizar configuración de Nuxt

## 🧪 Testing
- [x] Layer probado individualmente
- [x] Páginas funcionando correctamente
- [x] Integración con app principal verificada

## 📚 Documentación
- [x] README del layer actualizado
- [x] Archivos .gitkeep con explicaciones
- [x] Documentación general actualizada

## 🔗 Enlaces relacionados
- Issue #123
- Documentación: [Ver aquí](link-a-docs)
```

##### 6. Revisión y merge
```bash
# Después de la aprobación, el PR se mergea a develop
# Luego puedes eliminar tu branch local
git checkout develop
git pull origin develop
git branch -d feature/nombre-de-tu-feature
```

#### Convenciones de commits
Usa el formato Conventional Commits:

```bash
# Tipos de commits
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato (espacios, etc.)
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento

# Ejemplos
git commit -m "feat: agregar layer de autenticación"
git commit -m "fix: corregir validación en formulario de login"
git commit -m "docs: actualizar README con nuevas layers"
git commit -m "test: agregar tests para componente AuthButton"
```

#### Estructura de branches
```
main
├── develop
│   ├── feature/usuarios
│   ├── feature/productos
│   ├── feature/autenticacion
│   └── hotfix/correccion-critica
└── release/v1.2.0
```

#### Checklist para Pull Requests
Antes de crear un PR, verifica:

- ✅ **Código funcionando**: La layer funciona correctamente
- ✅ **Tests pasando**: Todos los tests pasan (si los hay)
- ✅ **Documentación actualizada**: README y archivos .gitkeep
- ✅ **Sin errores de linting**: Código limpio y bien formateado
- ✅ **Commits descriptivos**: Mensajes claros y siguiendo convenciones
- ✅ **Branch actualizada**: Rebase desde develop si es necesario
- ✅ **Descripción completa**: PR con descripción detallada
- ✅ **Layer integrada**: Agregada a nuxt.config.ts

### Agregar un Nuevo Layer

#### 🚀 Método Automático (Recomendado)

Usa el script automatizado para crear un nuevo layer con estructura completa:

```bash
# Crear nuevo layer con script automatizado
pnpm run add-new-feature "mi-nuevo-layer"

# El script automáticamente:
# ✅ Crea el layer con npm create nuxt@latest
# ✅ Genera estructura completa de directorios Nuxt 4
# ✅ Agrega archivos .gitkeep con explicaciones detalladas
# ✅ Elimina app.vue y crea pages/index.vue
# ✅ Crea README.md y .gitignore
# ✅ Crea página en app/pages/nombre-feature/index.vue
# ✅ Genera test básico automático con 5 casos de prueba
# ✅ Corrige configuración TypeScript (tsconfig.json)
# ✅ Configura paths y aliases de módulos
```

**Próximos pasos después del script:**
```bash
# 1. cd layers/mi-nuevo-layer
# 2. pnpm run dev (para verificar que la nueva feature funciona)
# 3. Agregar el layer a nuxt.config.ts
extends: [
  './layers/cart',
  './layers/auth',
  './layers/mi-nuevo-layer'  # Agregar aquí
]

# 4. pnpm run test:run (ejecutar test básico creado automáticamente)
# 5. Desarrollar tu funcionalidad en layers/mi-nuevo-layer/
# 6. Los directorios vacíos tienen archivos .gitkeep con explicaciones
# 7. Test básico creado automáticamente con 5 casos de prueba
```

#### 🔧 Método Manual

```bash
# Crear nuevo layer manualmente
cd layers/
npm create nuxt@latest -- --template layer mi-nuevo-layer

# Configurar en nuxt.config.ts
extends: [
  './layers/cart',
  './layers/auth',
  './layers/mi-nuevo-layer'  # Agregar aquí
]
```

### Estructura de un Layer

```
layers/mi-nuevo-layer/
├── app/
│   ├── assets/             # Recursos sin compilar
│   ├── components/         # Componentes específicos
│   ├── composables/        # Lógica reutilizable
│   ├── layouts/            # Diseños globales
│   ├── middleware/         # Middleware (opcional)
│   ├── pages/              # Páginas (opcional)
│   ├── plugins/            # Extensiones de Vue/Nuxt
│   └── utils/              # Funciones utilitarias
├── server/
│   └── api/                # APIs del layer
├── shared/
│   ├── types/              # Tipos TypeScript compartidos
│   ├── constants/          # Constantes compartidas
│   ├── models/             # Modelos de datos
│   └── schemas/            # Esquemas de validación
├── content/                # Contenido estático (opcional)
├── public/                 # Archivos estáticos públicos
├── nuxt.config.ts          # Configuración del layer
├── package.json            # Dependencias del layer
├── README.md               # Documentación del layer
└── .gitignore              # Archivos ignorados por Git
```

### 📝 Logging en Layers

#### ✅ **Cómo usar logging en tu layer**

Cada layer puede usar libremente el sistema de logging compartido sin configuración adicional:

**En componentes del layer:**
```typescript
// layers/mi-nuevo-layer/app/components/MiComponent.vue
<script setup lang="ts">
// El logger está disponible automáticamente
const logger = useLogger('MiComponent')

logger.info('Componente inicializado')
</script>
```

**En APIs del layer:**
```typescript
// layers/mi-nuevo-layer/server/api/users.get.ts
import { createSharedLogger } from '../../../shared/utils/logger'

export default defineEventHandler(() => {
  const logger = createSharedLogger('UsersAPI')
  
  logger.info('Obteniendo lista de usuarios')
  logger.debug('Ejecutando query a base de datos')
  
  // ... lógica ...
  
  logger.success('Usuarios obtenidos exitosamente')
  
  return users
})
```

**En composables del layer:**
```typescript
// layers/mi-nuevo-layer/app/composables/useUsers.ts
export const useUsers = () => {
  const logger = useLogger('UsersComposable')
  
  const createUser = async (userData: CreateUserDto) => {
    logger.info('Iniciando creación de usuario', { email: userData.email })
    
    try {
      // ... lógica ...
      logger.success('Usuario creado exitosamente')
      return user
    } catch (error) {
      logger.error('Error creando usuario:', error)
      throw error
    }
  }
  
  return { createUser }
}
```

#### 🚫 **Lo que NO hacer en layers**

❌ **Evita usar `console.*`** - Será bloqueado por ESLint:
```typescript
// ❌ Prohibido - ESLint lo rechazará
console.log('No usar esto')
console.warn('Tampoco esto')
console.error('Ni esto')
```

❌ **No crees tu propio logger** - Usa el compartido:
```typescript
// ❌ No crear logger propio
const miLogger = {
  log: (msg) => console.log(msg) // Prohibido
}

// ✅ Usar el logger compartido
const logger = useLogger('MiLayer')
logger.info('Correcto')
```

### Estructura en la Aplicación Principal

```
app/pages/
└── mi-nuevo-layer/
    └── index.vue           # Página de acceso a la feature
```

**Ruta generada**: `/mi-nuevo-layer` - Acceso directo a la feature desde la app principal

### 🔧 Mejores Prácticas

### 📝 Prácticas de Código

#### ⚠️ **Logging Obligatorio**

**IMPORTANTE**: Este proyecto tiene cero tolerancia al uso de `console.log`. Usa SIEMPRE el logger compartido:

```typescript
// ✅ SIEMPRE usar el logger compartido
const logger = useLogger('ModuleName')

// ✅ Nivel apropiado para cada situación
logger.info('Información general del flujo')
logger.warn('Advertencia sobre configuración')
logger.error('Error que requiere atención inmediata')
logger.success('Operación completada exitosamente')
logger.debug('Información detallada para desarrollo')

// ❌ NUNCA usar console.*
// Este código será rechazado por ESLint
console.log('Prohibido')
console.warn('Bloqueado')
console.error('No permitido')
```

#### Principios SOLID
Aplica los principios SOLID en todo el código:

- **S - Single Responsibility**: Cada clase/función tiene una sola responsabilidad
- **O - Open/Closed**: Abierto para extensión, cerrado para modificación
- **L - Liskov Substitution**: Los objetos derivados deben ser sustituibles por sus bases
- **I - Interface Segregation**: Muchas interfaces específicas son mejoresque una general
- **D - Dependency Inversion**: Depender de abstracciones, no de concreciones


1. **Separación de responsabilidades**: Cada layer debe tener una responsabilidad específica
2. **APIs independientes**: Cada layer puede tener sus propias APIs
3. **Tipos compartidos**: Usar tipos TypeScript para mantener consistencia
4. **Composables reutilizables**: Crear composables para lógica compartida
5. **Configuración modular**: Cada layer puede tener su propia configuración
6. **Acceso directo**: Cada feature tiene una ruta en la app principal (`/nombre-feature`)
7. **Verificación temprana**: Siempre probar el layer con `pnpm run dev` antes de integrarlo

```typescript
// ✅ Buen ejemplo - Single Responsibility
class UserService {
  async createUser(userData: CreateUserDto): Promise<User> {
    // Solo se encarga de crear usuarios
  }
}

class UserValidator {
  validateUserData(data: any): ValidationResult {
    // Solo se encarga de validar datos
  }
}

// ❌ Mal ejemplo - Múltiples responsabilidades
class UserManager {
  async createUser() { /* crear */ }
  async validateUser() { /* validar */ }
  async sendEmail() { /* enviar email */ }
  async logActivity() { /* logging */ }
}
```

#### Nomenclatura Descriptiva
Usa nombres claros y descriptivos:

```typescript
// ✅ Buen ejemplo
const userAuthenticationService = new UserAuthenticationService();
const isUserAuthenticated = await checkUserAuthentication(userId);
const userRegistrationData = await validateUserRegistrationData(data);

// ❌ Mal ejemplo
const uas = new UAS();
const isAuth = await check(userId);
const data = await validate(data);
```

#### Funciones Pequeñas
Mantén funciones enfocadas en una sola responsabilidad:

```typescript
// ✅ Buen ejemplo - Función pequeña y enfocada
async function validateUserEmail(email: string): Promise<boolean> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function createUser(userData: CreateUserDto): Promise<User> {
  const isValidEmail = await validateUserEmail(userData.email);
  if (!isValidEmail) {
    throw new Error('Email inválido');
  }
  
  return await userRepository.create(userData);
}

// ❌ Mal ejemplo - Función muy larga
async function processUser(userData: any): Promise<any> {
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error('Email inválido');
  }
  
  // Validar password
  if (userData.password.length < 8) {
    throw new Error('Password muy corto');
  }
  
  // Crear usuario
  const user = await userRepository.create(userData);
  
  // Enviar email de bienvenida
  await emailService.sendWelcomeEmail(user.email);
  
  // Log de actividad
  await activityLogger.log('user_created', user.id);
  
  return user;
}
```

## 📦 Despliegue

### Construcción

```bash
# Construir para producción
pnpm build

# Vista previa local
pnpm preview
```

### Variables de Entorno

```bash
# .env
NUXT_PUBLIC_API_BASE_URL=https://api.tudominio.com
NUXT_SECRET_KEY=tu-clave-secreta
```

### Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

## 📖 Recursos Adicionales

- [Documentación de Nuxt 4](https://nuxt.com/docs)
- [Nuxt Layers Guide](https://nuxt.com/docs/guide/going-further/layers)
- [Nuxt UI](https://ui.nuxt.com)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 🤝 Contribuir al Template

### Flujo de Trabajo

1. **Fork** del repositorio template
2. **Crear** una rama para tu mejora (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -am 'feat: agregar nueva funcionalidad al template'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

### Estándares de Código

- **ESLint**: Configurado con reglas estrictas
- **TypeScript**: Tipado estricto habilitado
- **Prettier**: Formateo automático de código
- **Conventional Commits**: Mensajes de commit estandarizados

### Mejoras al Template

Si quieres contribuir mejoras al template:

- **Scripts automatizados**: Mejorar o agregar nuevos scripts
- **Documentación**: Actualizar README, comentarios, ejemplos
- **Configuración**: Mejorar configuraciones de Nuxt, ESLint, etc.
- **Estructura**: Optimizar la estructura de directorios
- **Ejemplos**: Agregar más ejemplos de layers

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado por NexusDigital con ❤️ usando Nuxt 4 y la arquitectura de Layers**
**¡Happy coding! 🚀**
