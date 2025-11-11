#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Obtener el nombre del feature desde los argumentos
const featureName = process.argv[2]

if (!featureName) {
  console.error('❌ Error: Debes proporcionar un nombre para el feature')
  console.log('📝 Uso: pnpm run add-new-feature "nombre-del-feature"')
  process.exit(1)
}

// Validar que el nombre sea válido
if (!/^[a-z0-9-]+$/.test(featureName)) {
  console.error('❌ Error: El nombre del feature debe contener solo letras minúsculas, números y guiones')
  process.exit(1)
}

const layersDir = join(__dirname, '..', 'layers')
const featureDir = join(layersDir, featureName)

console.log(`🚀 Creando nuevo feature: ${featureName}`)

try {
  // Verificar si el directorio ya existe
  if (existsSync(featureDir)) {
    console.error(`❌ Error: El feature "${featureName}" ya existe en ${featureDir}`)
    process.exit(1)
  }

  // Crear el directorio layers si no existe
  if (!existsSync(layersDir)) {
    mkdirSync(layersDir, { recursive: true })
  }

  // Crear el layer usando npm create nuxt (más estable para este uso)
  console.log('📦 Creando layer con Nuxt...')
  try {
    execSync(`npx create-nuxt@latest --template layer ${featureName}`, {
      cwd: layersDir,
      stdio: 'inherit'
    })
  } catch (error) {
    // El comando puede fallar en el último paso pero el layer ya está creado
    console.log('⚠️  Comando create-nuxt concluido (puede mostrar error al final)')

    // Verificar que el layer se creó correctamente
    if (!existsSync(featureDir)) {
      throw new Error('El layer no se creó correctamente')
    }
  }

  // Crear estructura completa de directorios de Nuxt 4
  console.log('📁 Creando estructura completa de directorios...')

  const directories = [
    // Estructura principal de app
    'app/assets',
    'app/components',
    'app/composables',
    'app/layouts',
    'app/middleware',
    'app/pages',
    'app/plugins',
    'app/utils',

    // Estructura de server
    'server/api',

    // Estructura de shared
    'shared/types',
    'shared/constants',
    'shared/models',
    'shared/schemas',

    // Estructura de content (opcional)
    'content',

    // Estructura de public
    'public',

    // Estructura de test
    'test/nuxt',
    'test/unit',
    'test/e2e'
  ]

  // Crear directorios y archivos .gitkeep con explicaciones
  directories.forEach((dir) => {
    const fullPath = join(featureDir, dir)
    mkdirSync(fullPath, { recursive: true })

    const gitkeepPath = join(fullPath, '.gitkeep')
    const explanation = getDirectoryExplanation(dir)

    writeFileSync(gitkeepPath, explanation)
  })

  // Crear archivos adicionales importantes
  createAdditionalFiles(featureDir, featureName)

  // Eliminar App.vue y crear pages/index.vue
  createPageIndex(featureDir, featureName)

  // Crear página en la aplicación principal
  createMainAppPage(featureDir, featureName)

  // Crear test básico para la página del layer
  createBasicTest(featureDir, featureName)

  console.log('✅ Feature creado exitosamente!')
  console.log(`📂 Ubicación: ${featureDir}`)
  console.log('📝 Próximos pasos:')
  console.log(`   1. cd layers/${featureName}`)
  console.log(`   2. pnpm run dev (para verificar que la nueva feature funciona)`)
  console.log(`   3. Agregar el layer a nuxt.config.ts: './layers/${featureName}'`)
  console.log(`   4. pnpm run test:run (ejecutar test básico creado automáticamente)`)
  console.log(`   5. Desarrollar tu funcionalidad en layers/${featureName}/`)
  console.log('   6. Los directorios vacíos tienen archivos .gitkeep con explicaciones')
  console.log('   7. Test básico creado automáticamente en test/nuxt/')
} catch (error) {
  console.error('❌ Error creando el feature:', error.message)
  process.exit(1)
}

function getDirectoryExplanation(directory) {
  const explanations = {
    'app/assets': `# Assets - Recursos sin compilar
#
# Este directorio contiene archivos que necesitan ser procesados por Nuxt:
# - Imágenes (PNG, JPG, SVG)
# - Fuentes (TTF, WOFF, WOFF2)
# - Estilos SCSS/SASS
# - Archivos de audio/video
#
# Nuxt procesará automáticamente estos archivos durante el build.
# Ejemplo: ~/assets/images/logo.png`,

    'app/components': `# Components - Componentes Vue reutilizables
#
# Componentes Vue que se pueden usar en cualquier parte de la aplicación.
# Nuxt los auto-importa automáticamente.
#
# Estructura recomendada:
# - Button.vue (componente base)
# - forms/Input.vue (componentes específicos)
# - ui/Card.vue (componentes de UI)
#
# Uso: <Button>Click me</Button> (sin importar)`,

    'app/composables': `# Composables - Lógica reutilizable con API de Vue
#
# Funciones que usan la API de composición de Vue (ref, reactive, computed, etc.)
# Se auto-importan automáticamente.
#
# Ejemplos:
# - useAuth() - manejo de autenticación
# - useCart() - lógica del carrito
# - useApi() - llamadas a APIs
#
# Uso: const { user, login } = useAuth()`,

    'app/layouts': `# Layouts - Diseños globales para páginas
#
# Plantillas que envuelven las páginas y proporcionan estructura común.
# Se aplican automáticamente o se pueden especificar en cada página.
#
# Ejemplos:
# - default.vue (layout por defecto)
# - admin.vue (layout para admin)
# - auth.vue (layout para autenticación)
#
# Uso: definePageMeta({ layout: 'admin' })`,

    'app/middleware': `# Middleware - Guards y lógica de rutas
#
# Funciones que se ejecutan antes de navegar a una página.
# Útiles para autenticación, redirecciones, validaciones.
#
# Ejemplos:
# - auth.ts (verificar autenticación)
# - admin.ts (verificar permisos de admin)
# - guest.ts (solo para usuarios no autenticados)
#
# Uso: definePageMeta({ middleware: 'auth' })`,

    'app/pages': `# Pages - Vistas que generan rutas automáticamente
#
# Cada archivo .vue en este directorio genera una ruta automáticamente.
# Nuxt maneja el routing basado en la estructura de archivos.
#
# Ejemplos:
# - index.vue → /
# - about.vue → /about
# - users/[id].vue → /users/:id
# - admin/index.vue → /admin
#
# Uso: Navegación automática con <NuxtLink>`,

    'app/plugins': `# Plugins - Extensiones de Vue/Nuxt
#
# Código que se ejecuta antes de que la aplicación Vue se monte.
# Útiles para configurar librerías externas, inyección de dependencias.
#
# Ejemplos:
# - vuetify.client.ts (configurar Vuetify)
# - api.client.ts (configurar cliente HTTP)
# - analytics.client.ts (configurar analytics)
#
# Se ejecutan automáticamente al iniciar la app`,

    'app/utils': `# Utils - Funciones utilitarias puras
#
# Funciones helper de JavaScript/TypeScript que no dependen de Vue.
# Lógica pura, sin estado, sin efectos secundarios.
#
# Ejemplos:
# - formatDate.ts (formatear fechas)
# - validateEmail.ts (validar emails)
# - constants.ts (constantes de la app)
# - helpers.ts (funciones auxiliares)
#
# Uso: import { formatDate } from '~/utils/formatDate'`,

    'server/api': `# Server API - Endpoints y rutas del servidor
#
# APIs REST que se ejecutan en el servidor usando Nitro.
# Cada archivo .ts/.js genera un endpoint automáticamente.
#
# Ejemplos:
# - users.get.ts → GET /api/users
# - users.post.ts → POST /api/users
# - users/[id].get.ts → GET /api/users/:id
# - auth/login.post.ts → POST /api/auth/login
#
# Uso: $fetch('/api/users') desde el cliente`,

    'shared/types': `# Shared Types - Tipos TypeScript compartidos
#
# Definiciones de tipos que se usan tanto en cliente como servidor.
# Interfaces, tipos, enums compartidos entre frontend y backend.
#
# Ejemplos:
# - User.ts (interfaz de usuario)
# - ApiResponse.ts (respuesta de API)
# - Product.ts (interfaz de producto)
# - enums.ts (enumeraciones)
#
# Uso: import type { User } from '~/shared/types/User'`,

    'shared/constants': `# Shared Constants - Constantes compartidas
#
# Valores constantes que se usan en toda la aplicación.
# URLs, configuraciones, valores fijos.
#
# Ejemplos:
# - api.ts (URLs de API)
# - config.ts (configuraciones)
# - messages.ts (mensajes de la app)
# - routes.ts (rutas de la aplicación)
#
# Uso: import { API_BASE_URL } from '~/shared/constants/api'`,

    'shared/models': `# Shared Models - Modelos de datos
#
# Clases o interfaces que representan entidades de negocio.
# Modelos de datos, validaciones, transformaciones.
#
# Ejemplos:
# - User.ts (modelo de usuario)
# - Product.ts (modelo de producto)
# - Order.ts (modelo de pedido)
# - BaseModel.ts (modelo base)
#
# Uso: import { User } from '~/shared/models/User'`,

    'shared/schemas': `# Shared Schemas - Esquemas de validación
#
# Esquemas de validación que se usan tanto en cliente como servidor.
# Definiciones de estructura de datos, validaciones, transformaciones.
# Compatible con librerías como Zod, Joi, Yup, etc.
#
# Ejemplos:
# - user.schema.ts (esquema de validación de usuario)
# - product.schema.ts (esquema de validación de producto)
# - api.schema.ts (esquemas de respuesta de API)
# - form.schema.ts (esquemas de formularios)
#
# Uso: import { userSchema } from '~/shared/schemas/user.schema'`,

    'content': `# Content - Contenido estático (opcional)
#
# Archivos de contenido en Markdown, JSON, YAML.
# Útil para blogs, documentación, páginas de contenido.
# Requiere @nuxt/content module.
#
# Ejemplos:
# - blog/post-1.md (artículo de blog)
# - docs/getting-started.md (documentación)
# - pages/about.json (contenido de página)
#
# Uso: <ContentDoc path="/blog/post-1" />`,

    'public': `# Public - Archivos estáticos públicos
#
# Archivos que se sirven directamente sin procesamiento.
# Accesibles desde la raíz del dominio.
#
# Ejemplos:
# - favicon.ico (icono del sitio)
# - robots.txt (directivas para buscadores)
# - images/logo.png (imágenes públicas)
# - files/document.pdf (archivos para descarga)
#
# Uso: /favicon.ico, /images/logo.png`,

    'test/nuxt': `# Test Nuxt - Tests que requieren ambiente Nuxt
#
# Tests que necesitan el runtime completo de Nuxt para funcionar.
# Componentes, composables, páginas que dependen del contexto de Nuxt.
#
# Ejemplos:
# - Component.test.ts (componente que usa Nuxt plugins)
# - Page.test.ts (página que usa middleware)
# - Composable.test.ts (composable que usa useState)
#
# Configuración: Vitest con project 'nuxt'`,

    'test/unit': `# Test Unit - Tests unitarios rápidos (Node)
#
# Tests puros que no dependen del ambiente de Nuxt.
# Funciones utilitarias, helpers, lógica pura.
# Se ejecutan más rápido sin cargar el runtime de Nuxt.
#
# Ejemplos:
# - utils.test.ts (funciones utilitarias)
# - helpers.test.ts (funciones helper)
# - constants.test.ts (validación de constantes)
#
# Configuración: Vitest con project 'unit'`,

    'test/e2e': `# Test E2E - Tests end-to-end
#
# Tests que simulan interacciones reales del usuario en el navegador.
# Usan Playwright para pruebas completas de la aplicación.
#
# Ejemplos:
# - homepage.test.ts (test completo de homepage)
# - auth-flow.test.ts (flujo completo de autenticación)
# - navigation.test.ts (navegación entre páginas)
#
# Configuración: Vitest con project 'e2e'`
  }

  return explanations[directory] || `# ${directory}
#
# Directorio para ${directory.split('/').pop()}
# Agrega aquí los archivos relacionados con esta funcionalidad.`
}

function createAdditionalFiles(featureDir, featureName) {
  // Crear README.md para el layer
  const readmeContent = `# ${featureName} Layer

Este layer contiene la funcionalidad de ${featureName}.

## Estructura

- \`app/\` - Componentes, páginas, composables del layer
- \`server/\` - APIs y endpoints del layer
- \`shared/\` - Tipos, constantes, modelos y esquemas compartidos

## Uso

Este layer se extiende automáticamente cuando se agrega a \`nuxt.config.ts\`:

\`\`\`typescript
export default defineNuxtConfig({
  extends: [
    './layers/${featureName}'
  ]
})
\`\`\`

## Testing

Este layer incluye:
- **Estructura completa de test** con directorios organizados (\`test/nuxt\`, \`test/unit\`, \`test/e2e\`)
- **Test básico automático** en \`test/nuxt/${featureName}.test.ts\` para la página principal
- **Configuración lista para Vitest** con \`@nuxt/test-utils\`

Para ejecutar los tests:
\`\`\`bash
pnpm run test:run  # Ejecutar todos los tests una vez
npx vitest --project nuxt  # Solo tests de Nuxt
\`\`\`

## Desarrollo

Los directorios vacíos contienen archivos \`.gitkeep\` con explicaciones detalladas sobre su propósito.
`

  writeFileSync(join(featureDir, 'README.md'), readmeContent)

  // Crear .gitignore para el layer
  const gitignoreContent = `# Dependencies
node_modules/
.pnpm-store/

# Build outputs
.nuxt/
.output/
dist/

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/
`

  writeFileSync(join(featureDir, '.gitignore'), gitignoreContent)
}

function createPageIndex(featureDir, featureName) {
  // Eliminar App.vue si existe
  const appVuePath = join(featureDir, 'app.vue')
  if (existsSync(appVuePath)) {
    unlinkSync(appVuePath)
    console.log('🗑️  Eliminado app.vue')
  }

  // Crear pages/index.vue con el nombre de la feature
  const pagesDir = join(featureDir, 'app', 'pages')
  const indexVuePath = join(pagesDir, 'index.vue')

  const indexVueContent = `<template>
  <div>
    <h1>${featureName}</h1>
  </div>
</template>
`

  writeFileSync(indexVuePath, indexVueContent)
  console.log('📄 Creado pages/index.vue con el nombre de la feature')
}

function createMainAppPage(featureDir, featureName) {
  // Crear directorio dentro del layer en app/pages/ con el nombre de la feature
  const layerPagesDir = join(featureDir, 'app', 'pages')
  const featurePageDir = join(layerPagesDir, featureName)

  // Crear el directorio si no existe
  if (!existsSync(featurePageDir)) {
    mkdirSync(featurePageDir, { recursive: true })
  }

  // Crear index.vue en el directorio de la feature
  const indexVuePath = join(featurePageDir, 'index.vue')

  const indexVueContent = `<template>
  <div>
    <h1>/layers/${featureName}/app/pages/${featureName}/index.vue</h1>
  </div>
</template>
`

  writeFileSync(indexVuePath, indexVueContent)
  console.log(`📄 Creado layers/${featureName}/app/pages/${featureName}/index.vue`)
}

function createBasicTest(featureDir, featureName) {
  // Crear directorio test/nuxt si no existe
  const testNuxtDir = join(featureDir, 'test', 'nuxt')
  if (!existsSync(testNuxtDir)) {
    mkdirSync(testNuxtDir, { recursive: true })
  }

  // Nombre del componente para testear (la página)
  const componentPath = `../app/pages/${featureName}/index.vue`
  const testFileName = `${featureName}.test.ts`
  const testPath = join(testNuxtDir, testFileName)

  // Template del test básico
  const testContent = `import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Page from '${componentPath}'

describe('${featureName} Page', () => {
  it('renders the page component', async () => {
    const wrapper = await mountSuspended(${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Page)

    // Verificar que el componente existe
    expect(wrapper.exists()).toBe(true)

    // Verificar que contiene un título h1
    const heading = wrapper.find('h1')
    expect(heading.exists()).toBe(true)

    // Verificar el contenido del título
    expect(heading.text()).toBe('/layers/${featureName}/app/pages/${featureName}/index.vue')
  })

  it('displays the correct heading text', async () => {
    const wrapper = await mountSuspended(${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Page)

    const heading = wrapper.find('h1')
    expect(heading.text()).toContain('${featureName}')
  })

  it('has the correct route path', async () => {
    const wrapper = await mountSuspended(${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Page)

    const heading = wrapper.find('h1')
    expect(heading.text()).toContain('/layers/${featureName}/')
  })

  it('renders without errors', async () => {
    const wrapper = await mountSuspended(${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Page)

    // Verificar que el componente se renderiza sin errores
    expect(wrapper.html()).toContain('<h1')
    expect(wrapper.vm.$el).toBeDefined()
  })
})
`

  writeFileSync(testPath, testContent)
  console.log(`🧪 Creado test básico en test/nuxt/${featureName}.test.ts`)
}
