# Resumen de Arquitectura
Este documento sirve como una plantilla crítica y viviente diseñada para equipar a los agentes con una comprensión rápida y completa de la arquitectura del código base, permitiendo navegación eficiente y contribución efectiva desde el primer día. Actualiza este documento a medida que el código base evoluciona.

## 0. Protocolo de Desarrollo con IA

**ANTES DE COMENZAR**: Lee este documento completo y confirma que entiendes y obedecerás estas reglas.

**⚠️ REGLAS OBLIGATORIAS**:
- **AI-TDD OBLIGATORIO**: SIEMPRE generar tests PRIMERO antes que código
- **Nuxt Focus**: Respetar completamente la arquitectura de layers Nuxt
- **Documentación**: Todo código debe incluir JSDocs y ejemplos
- **TypeScript**: Estricto typing con Zod para validación
- **Validación Humana**: Sin código en producción sin revisión humana

## 1. Estructura del Proyecto
Esta sección proporciona una visión general de alto nivel de la estructura de directorios y archivos del proyecto, categorizada por capa arquitectónica o área funcional principal. Es esencial para navegar rápidamente por el código base, localizar archivos relevantes y comprender la organización general y la separación de responsabilidades.

**Estructura completa de un proyecto Nuxt 4**
https://nuxt.com/docs/4.x/guide/directory-structure/app/pages

```bash
[Raíz del Proyecto]
nuxt-layers-app-template/
├── .copilot/               # Instrucciones para el agente
├── .github/                # Configuración de GitHub Actions
├── .vscode/                # Configuración de VSCode
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
│   ├── app.config.ts        # Config global accesible vía useAppConfig()
│   └── error.vue           # Página de error global para 404/500/etc.

├── content/                # (opcional, si usas @nuxt/content) Markdown, JSON, docs
├── layers/                 # Carpeta opcional para extender la funcionalidad del proyecto en CAPAS
├── modules/                # Módulos/layers locales de Nuxt (extensiones personalizadas)
├── node_modules/           # Dependencias instaladas por npm/yarn/pnpm
├── public/                 # Archivos estáticos (favicon, robots.txt, imágenes públicas)
├── server/                 # Endpoints, APIs y server routes (API interna con Nitro)
├── shared/                 # Código compartido entre server y client (types, modelos, constantes)
├── test/                   # Tests unitarios y end-to-end
├── .env                    # Variables de entorno (API keys, configuraciones sensibles)
├── .gitignore              # Archivos y carpetas ignoradas por git
├── .nuxtignore             # Archivos/carpetas ignoradas por Nuxt en el escaneo automático
├── .nuxtrc                 # Configuración CLI de Nuxt (opcional, para proyectos complejos)

├── nuxt.config.ts           # Configuración principal de Nuxt (plugins, módulos, runtimeConfig)
├── package.json            # Dependencias y scripts npm
└── tsconfig.json            # Configuración de TypeScript

[Layers]
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

[Tests]
├── test/                   # Tests unitarios y end-to-end
├── nuxt/           # Tests que requieren ambiente Nuxt
│   └── AppLogo.test.ts
├── unit/           # Tests unitarios rápidos (Node)
└── e2e/           # Tests end-to-end
```


## 2. Diagrama del Sistema de Alto Nivel
Este diagrama muestra la arquitectura de Nuxt con layers. 
Los usuarios interactúan con la aplicación frontend de Nuxt que combina múltiples layers
para crear una experiencia cohesiva. Cada layer puede tener sus propias APIs,
componentes, páginas y lógica de negocio, manteniéndose modular y escalable.
Los layers se comunican entre sí y con servicios externos según sea necesario.

```bash
[Usuarios] <--> [Nuxt App Frontend] <--> [Core Layer] --> [Base de Datos / APIs Externas]
                |                        |
                |                        +--> [Auth Layer] --> [Servicios de Autenticación]
                |                        |
                |                        +--> [Cart Layer] --> [APIs de E-commerce]
                |                        |
                |                        +--> [Mi Feature Layer] --> [APIs Especializadas]
                |
                +--> [Pages Layer A] --> [Rutas: /auth/*]
                |
                +--> [Pages Layer B] --> [Rutas: /cart/*]
                |
                +--> [Shared Layers] --> [Tipos, Constantes, Schemas] 
```

## 3. Componentes Centrales
(Lista y describe brevemente los componentes principales del sistema. Para cada uno, incluye su responsabilidad principal y las tecnologías clave utilizadas.)

### 3.1. Frontend

Nombre: [Aplicación Web Nuxt con Layers Modulares]

Descripción: 
Cada Nuxt layer es una capa completa y autónoma que incluye tanto presentación como servicios backend.
A diferencia de otras arquitecturas donde el frontend y backend están separados, 
en Nuxt Layers cada feature contiene sus propios componentes Vue, páginas, layouts, middleware y APIs del servidor.
Esto permite que cada feature sea mantenible y reutilizable como una unidad cohesiva.

Tecnologías: [Vue 3, Nuxt 4, TypeScript, Tailwind CSS, HTML/CSS/JS, H3, Nitro]

Despliegue: [Digital Ocean, Docker, Docker Compose]

### 3.2. Servicios Backend

Cada layer Nuxt implementa el patrón "stack-full", incluyendo todas las capas necesarias para manejar una funcionalidad completa:

#### 🔴 Capa de Presentación (Frontend)
```
layers/auth/
├── app/
│   ├── pages/login.vue          # IU de login
│   ├── components/              # Componentes específicos
│   │   ├── LoginForm.vue        # Formulario de login
│   │   ├── AuthButton.vue       # Botón de autenticación
│   │   └── ProtectedRoute.vue   # Protección de rutas
│   ├── layouts/auth.vue         # Layout específico de auth
│   ├── middleware/auth.ts       # Guards de rutas
│   └── composables/
│       ├── useAuth.ts           # Hook de autenticación
│       └── useLogin.ts          # Hook específico de login
```

#### 🔵 Capa de Servidor (Backend)
```
layers/auth/
├── server/
│   └── api/
│       ├── auth/
│       │   ├── login.post.ts    # POST /api/auth/login
│       │   ├── register.post.ts # POST /api/auth/register
│       │   ├── logout.post.ts   # POST /api/auth/logout
│       │   └── profile.get.ts   # GET /api/auth/profile
│       ├── middleware/
│       │   └── auth.ts          # Middleware de autenticación
│       └── plugins/
│           └── auth.ts          # Plugin de configuración JWT
```

#### 🟢 Capa de Datos (Shared)
```
layers/auth/
├── shared/
│   ├── types/
│   │   ├── User.ts              # Tipos de usuario
│   │   └── Auth.ts              # Tipos de autenticación
│   ├── schemas/
│   │   ├── login.schema.ts      # Schema Zod para login
│   │   └── user.schema.ts       # Schema Zod para usuario
│   ├── constants/
│   │   ├── auth.ts              # Constantes de auth
│   │   └── permissions.ts       # Permisos del sistema
│   └── models/
│       ├── User.ts              # Modelo de usuario
│       └── Session.ts           # Modelo de sesión
```

#### 3.2.1. Beneficios de Stack-Full Layers

**Colocalización**: Componentes Vue están junto a sus APIs correspondientes  
**Mantenibilidad**: Cambios en UI requieren cambios en el mismo directorio que la API  
**Reutilización**: Una layer completa puede ser instalada en otro proyecto Nuxt  
**Independencia**: Cada feature funciona de forma autónoma  
**Testing**: Tests pueden incluir tanto frontend como backend de la feature

#### 3.2.2. Core Layer APIs

Nombre: [Core Layer Server APIs]

Descripción: Es el layer base que contiene las APIs comunes del sistema. Aquí deberían estar las
funcionalidades principales del sistema como gestión de usuarios, configuraciones base,
y servicios compartidos entre todas las layers.

Tecnologías: [Node.js, H3, Nuxt Server API, TypeScript, Zod, Jest, Nitro]

Despliegue: [Digital Ocean]

#### 3.2.3. Feature Layer APIs

Nombre: [Feature Layer Server APIs]

Descripción: Cada feature layer puede contener sus propias APIs del servidor (server/api).
Por ejemplo, una Auth Layer tendría APIs como `/api/auth/login`, `/api/auth/register`, etc.
Una Cart Layer tendría APIs como `/api/cart/add`, `/api/cart/remove`, etc.
Conceptualmente, cada layer es independiente y puede ser reutilizado en otros proyectos Nuxt.

Tecnologías: [Node.js, H3, Nuxt Server API, TypeScript, Zod, Jest, @tanstack/query]

Despliegue: [Digital Ocean, Docker]

#### 3.2.4. Tipos de Layers
Por convención, las nuevas features son layers completas que pueden contener múltiples tipos de funcionalidades.

Las estructuras disponibles en cada layer son:

- **pages**: Páginas y rutas específicas de la feature (`/api/auth/login`)
- **components**: Componentes Vue reutilizables (`AuthButton.vue`, `CartItem.vue`)
- **composables**: Funciones con API de Vue (`useAuth()`, `useCart()`, `useApi()`)
- **server/api**: APIs del servidor con H3 (cada archivo = endpoint)
- **middleware**: Guards y lógica de rutas (`auth.ts`, `admin.ts`)
- **shared**: Tipos, constantes, modelos y esquemas compartidos



## 4. Almacenes de Datos

Pinia: Store de datos centralizado.


## 5. Integraciones Externas / APIs

(Lista cualquier servicio de terceros o APIs externas con las que el sistema interactúa.)

Nombre del Servicio 1: [ej., Stripe, SendGrid, Google Maps API]

Propósito: [Describe brevemente su función, ej., "Procesamiento de pagos."]

Método de Integración: [ej., REST API, SDK]

## 6. Despliegue e Infraestructura

Proveedor en la Nube: [Digital Ocean]

Servicios Clave Utilizados: [EC2, RDS, Kubernetes, Cloud Functions, App Engine]

Pipeline CI/CD: [GitHub Actions]

Monitoreo y Registro: [Prometheus, Grafana, CloudWatch, Stackdriver, ELK Stack]

## 7. Consideraciones de Seguridad

(Destaca cualquier aspecto crítico de seguridad, mecanismos de autenticación o prácticas de cifrado de datos.)

Autenticación: [ej., OAuth2, JWT, API Keys]

Autorización: [ej., RBAC, ACLs]

Cifrado de Datos: [ej., TLS en tránsito, AES-256 en reposo]

Herramientas de Seguridad/Practicas Clave: [ej., WAF, auditorías regulares de seguridad]

## 8. Entorno de Desarrollo y Pruebas

Instrucciones de Configuración Local: Ver README.md en el directorio raíz del proyecto

Frameworks de Pruebas: [Jest con configuración personalizada]

Herramientas de Calidad de Código: [TypeScript compiler, Nuxt Types, Jest, ESLint, Prettier, SonarQube]

Herramientas de Desarrollo: [Nuxt, Vue, Tailwind CSS, Zod para validación, Nuxt UI, Nuxt Modules]

## 9. Hoja de Ruta para Aplicación Nuxt

**Versión Actual:**
Versión: [1.0.0]

###  Infraestructura y Layers Base
**Objetivos**: Establecer arquitectura sólida y layers fundamentales
- ✅ Template base de Nuxt Layers creado
- ⏳ Auth Layer completa (login, registro, middleware)
- ⏳ Dashboard Layer básico con componentes comunes
- ⏳ Sistema de testing automatizado para layers
- ⏳ CI/CD pipeline optimizado para layers

### Funcionalidades Core
**Objetivos**: Desarrollar funcionalidades principales del negocio
- ⏳ E-commerce Layer (carrito, productos, pagos)
- ⏳ Content Management Layer (blogs, páginas)
- ⏳ Notification Layer (email, push, SMS)
- ⏳ Analytics Layer (métricas, dashboards)
- ⏳ Multi-tenancy support en layers

### Optimización y Escalabilidad
**Objetivos**: Mejorar rendimiento y preparar escalabilidad
- ⏳ Cache Layer con Redis
- ⏳ CDN integration para assets estáticos
- ⏳ Microservices preparation (layer decomposition)
- ⏳ Performance monitoring y alerting
- ⏳ Load balancing para múltiples instancias

### Innovación y Expansión
**Objetivos**: Características avanzadas y expansión
- ⏳ AI/ML integration layers
- ⏳ Real-time features (WebSockets, SSE)
- ⏳ Progressive Web App capabilities
- ⏳ Mobile app companion (React Native/Flutter)
- ⏳ Headless CMS integration

### Roadmap Técnico

**Performance & Optimization:**
- Implementar lazy loading por layer
- Optimizar bundle splitting por feature
- Implementar service worker para caching
- Métricas de Core Web Vitals por route
- Database optimization con Prisma/Drizzle ORM

**Developer Experience:**
- Nuxt DevTools customizado para layers
- Storybook integration por layer
- Hot reloading optimizado para development
- VS Code extension para layer management
- Cli tools mejorados para automation

**Testing & Quality:**
- E2E testing con Playwright por layer
- Visual regression testing
- Performance testing automatizado
- Accessibility testing por componente
- Security scanning automatizado

**Deployment & DevOps:**
- Edge deployment con Cloudflare Workers
- Container orchestration con Kubernetes
- Database migrations automatizadas
- Blue-green deployments
- Feature flags por layer

**Deuda Técnica Conocida:**
- Proteger endpoints de backend utilizando Proxy Endpoints Nuxt
- Optimización de SSR/hydration patterns
- Mejora de error boundaries por layer
- Documentación automatizada con JSDoc
- ImplementarFeature flags por layer para activar/desactivar features/módulos


## 10. Identificación del Proyecto

Nombre del Proyecto: [Nuxt Layers Application Template]

URL del Repositorio: [https://github.com/dforce2055/nuxt-layers-app-template]

Contacto Principal/Equipo: [Diego Pérez]

Fecha de Última Actualización: [2025-10-02]

## 11. Glosario / Acrónimos

Define cualquier término o acrónimo específico del proyecto.

[Acrónimo]: [Definición Completa]

[Término]: [Explicación]
