# 📝 Commit Message Prompt Template para Conventional Commits

## 📋 Contexto de Conventional Commits

Este proyecto sigue la especificación de **Conventional Commits** para mantener un historial de commits limpio, semántico y automatizable. Esto permite:
- **Generación automática** de changelogs
- **Versionado semántico** automático
- **Mejor comunicación** entre desarrolladores
- **Facilita debugging** y revisión de código

## 🎯 Estructura de Commit Message

### 📐 Formato Estándar
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 🔍 Componentes Explicados

#### 1. **Type** (Obligatorio)
Define el tipo de cambio realizado:

```bash
feat:      # Nueva funcionalidad
fix:       # Corrección de bug
docs:      # Solo cambios en documentación
style:     # Cambios de formato, espacios, puntos y comas, etc.
refactor:  # Refactorización de código sin cambiar funcionalidad
perf:      # Cambios que mejoran performance
test:      # Agregar o modificar tests existentes
build:     # Cambios al sistema de build, dependencias, etc.
ci:        # Cambios en configuración CI/CD
chore:     # Tareas de mantenimiento, limpieza de código
revert:    # Revertir commits previos
```

#### 2. **Scope** (Opcional)
Especifica el área del proyecto afectada:
```bash
feat(auth):    # Cambios relacionados con autenticación
fix(cart):     # Correcciones en carrito de compras
docs(readme):  # Cambios en README específico
style(ui):     # Cambios de estilo en UI
refactor(api): # Refactorización en APIs
test(layer):   # Tests de un layer específico
build(deps):   # Cambios en dependencias
```

#### 3. **Description** (Obligatorio)
Descripción concisa del cambio:
```bash
✅ Buenas prácticas:
- En minúsculas
- Sin punto final
- Imperativo ("add button" no "adds button")
- Máximo 50 caracteres

❌ Evitar:
- "Fixed bug" → mejor "fix: resolve validation error"
- "Updated dependencies" → mejor "build: update Nuxt to v4.1.2"
- "Made changes" → mejor ser específico sobre qué cambió
```

## 🎨 Ejemplos Prácticos

### ✅ Ejemplos Correctos

#### Funcionalidades Nuevas
```bash
feat(auth): add JWT token validation middleware
feat(cart): implement add to cart functionality
feat(layers): create users management layer
feat(ui): add dark mode toggle component
feat(api): add user profile endpoints
```

#### Corrección de Bugs
```bash
fix(auth): resolve token expiration handling
fix(cart): prevent duplicate item addition
fix(navigation): correct mobile menu toggle
fix(validation): fix email regex pattern
fix(build): resolve TypeScript compilation errors
```

#### Documentación
```bash
docs(readme): update installation instructions
docs(api): add endpoint documentation
docs(layers): document user layer structure
docs(testing): add testing best practices guide
docs(deployment): update Vercel deployment steps
```

#### Refactorización
```bash
refactor(components): extract common UI patterns
refactor(auth): simplify authentication flow
refactor(api): consolidate error handling
refactor(utils): improve date formatting functions
refactor(layouts): optimize navigation structure
```

#### Tests
```bash
test(auth): add unit tests for auth middleware
test(components): test UserProfile component rendering
test(api): add integration tests for user endpoints
test(e2e): add full authentication flow tests
test(layers): verify layer integration works correctly
```

#### Build y Dependencias
```bash
build(deps): update Nuxt to version 4.1.2
build(deps): add @nuxt/test-utils for testing
build(deps): upgrade TypeScript to v5.3
build(deps): remove unused lodash dependency
build(deps): update eslint configuration
```

### ❌ Ejemplos Incorrectos

```bash
❌ Bad: "Fixed bug"
✅ Good: "fix: resolve null pointer in user validation"

❌ Bad: "Updated stuff"
✅ Good: "refactor: simplify component props interface"

❌ Bad: "Changes to the system."
✅ Good: "feat: implement file upload functionality"

❌ Bad: "Updates dependencies and fixes bugs"
✅ Good: "build: update dependencies" (separar cambios)

❌ Bad: "fixes"
✅ Good: "fix: handle undefined user state in dashboard"
```

## 📐 Mensajes Multi-línea

### 🔍 Para Cambios Complejos
```bash
feat(auth): implement OAuth2 integration

Add support for Google and GitHub OAuth2 authentication:
- Create OAuth2Service class with strategy pattern
- Add middleware for token validation
- Implement user creation from OAuth data
- Add configuration for OAuth providers
- Include proper error handling and logging

Closes #123
Related to #456
```

### 🧪 Para Nuevas Features con Tests
```bash
feat(cart): add persistent cart storage

Implement localStorage persistence for shopping cart:
- Add CartStorageService for data persistence
- Update cart composable to use storage service
- Add cart restoration on app initialization
- Include proper error handling for storage failures

Tests:
- Add unit tests for CartStorageService
- Add integration tests for cart persistence
- Add E2E tests for cart restoration flow

Closes #789
```

### 🔧 Para Refactorización Mayor
```bash
refactor(layers): restructure user layer architecture

Reorganize user layer following clean architecture principles:
- Separate concerns into service, repository, and entity layers
- Implement dependency injection for better testability
- Add proper TypeScript interfaces for all components
- Update API endpoints to use new service layer

Breaking Changes:
- UserService constructor now requires UserRepository
- API endpoints moved from /users to /api/users/
- User entity properties restructured

Migration Guide: See docs/migration/user-layer-v2.md
```

## 🎯 Tips para Mensajes Efectivos

### 📝 Writing Guidelines
1. **Usa el imperativo**: "add feature" no "added feature"
2. **Sé específico**: Describir QUÉ cambió, no solo QUE cambió
3. **Mantén brevedad**: Máximo 50 caracteres en la primera línea
4. **Sé consistente**: Usa las mismas convenciones siempre
5. **Explícate cuando sea necesario**: Body para cambios complejos

### 🔍 Scopes Recomendados para este Proyecto
```bash
# Por layer/dominio
auth      # Autenticación y autorización
cart      # Carrito de compras
users     # Gestión de usuarios
products  # Catálogo de productos
orders    # Gestión de pedidos
payments  # Procesamiento de pagos

# Por área técnica
api       # APIs y endpoints
ui        # Componentes de interfaz
utils     # Funciones utilitarias
types     # Definiciones TypeScript
config    # Configuraciones
deps      # Dependencias
tests     # Tests y testing
docs      # Documentación
ci        # CI/CD pipeline
```

### 🎨 Mensajes para Tipos de Cambios Específicos

#### 📦 Nuevas Dependencies
```bash
build(deps): add @nuxt/test-utils for component testing
build(deps): upgrade Nuxt from v4.0.1 to v4.1.2
build(deps): add Zod for runtime validation
build(deps): remove deprecated axios dependency
```

#### 🎨 UI/UX Changes
```bash
style(ui): update button colors to match design system
style(ui): improve mobile responsiveness for navigation
feat(ui): add loading states for async operations
fix(ui): resolve hover state inconsistency
```

#### 🔧 Configuration Changes
```bash
config(eslint): add prettier integration rules
config(vitest): update test environment configuration
config(nuxt): enable experimental features
config(ci): add automated testing workflow
```

## 🚀 Automatización y Herramientas

### 📋 Commitlint Configuration
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ],
    'scope-max-length': [2, 'always', 20],
    'subject-max-length': [2, 'always', 50],
    'body-max-line-length': [2, 'always', 100]
  }
}
```

### 🔄 Husky Pre-commit Hook
```bash
# .husky/commit-msg
#!/usr/bin/env sh
npx --no-install commitlint --edit "$1"
```

### 📊 Generación de Changelog
```bash
# package.json scripts
{
  "scripts": {
    "changelog": "conventional-changelog -p conventionalcommits -i CHANGELOG.md -s",
    "version": "conventional-changelog -p conventionalcommits -i CHANGELOG.md -s && git add CHANGELOG.md"
  }
}
```

## ✅ Checklist por Commit

### 🔍 Antes de hacer commit:
- [ ] **Verificar cambios**: `git status` y `git diff`
- [ ] **Ejecutar tests**: `pnpm run test:run`
- [ ] **Verificar lint**: `pnpm run lint`
- [ ] **Revisar scope**: ¿El cambio afecta un área específica?
- [ ] **Elegir type correcto**: ¿feat, fix, refactor, etc.?

### 📝 Al escribir el mensaje:
- [ ] **Type obligatorio**: Siempre empezar con type válido
- [ ] **Descripción clara**: "¿Qué hace este commit?"
- [ ] **Imperativo**: Si es necesario usar "Add feature"
- [ ] **Límite de caracteres**: Máximo 50 en la primera línea
- [ ] **Sin punto final**: Terminar sin punto en la descripción

### 🎯 Para cambios complejos:
- [ ] **Body detallado**: Explicar el POR QUÉ del cambio
- [ ] **Lista de cambios**: Usar bullet points para claridad
- [ ] **Breaking changes**: Documentar cambios que rompen compatibilidad
- [ ] **Referencias**: Incluir issue numbers o PRs relacionados

## 🚨 Errores Comunes a Evitar

### ❌ Mensajes Vagos
```bash
❌ "Made changes"
❌ "Updated files"
❌ "Fixed bug"
❌ "Added stuff"
```

### ❌ Formato Incorrecto
```bash
❌ "Add user functionality"
❌ "feat: Added user functionality."
❌ "feat(): Add user functionality"
❌ "FEAT: Add user functionality"
```

### ❌ Demasiada Información
```bash
❌ "feat: Add comprehensive user management system with authentication, authorization, profile management, password reset, email verification, social login, role-based access control, audit logging and admin dashboard"
```

## 💡 Best Practices Específicas del Proyecto

### 🏗️ Para Layers
```bash
feat(auth-layer): add password reset functionality
feat(cart-layer): implement checkout process
refactor(user-layer): extract validation logic to composables
test(auth-layer): add integration tests for auth flow
```

### 🧪 Para Testing
```bash
test(unit): add utility functions tests
test(nuxt): add component rendering tests
test(e2e): add user authentication flow tests
test(integration): add API endpoint tests
```

### 📚 Para Documentación
```bash
docs(api): add comprehensive endpoint documentation
docs(testing): update testing best practices guide
docs(deployment): add environment variables guide
docs(layers): document new layer architecture
```

Siguiendo estas convenciones, el proyecto mantendrá un historial de commits limpio y profesional que facilita el mantenimiento y colaboración del proyecto. 🚀
