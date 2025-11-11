# portal-prueba Layer

Este layer contiene la funcionalidad de portal-prueba.

## Estructura

- `app/` - Componentes, páginas, composables del layer
- `server/` - APIs y endpoints del layer
- `shared/` - Tipos, constantes, modelos y esquemas compartidos

## Uso

Este layer se extiende automáticamente cuando se agrega a `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: [
    './layers/portal-prueba'
  ]
})
```

## Testing

Este layer incluye:
- **Estructura completa de test** con directorios organizados (`test/nuxt`, `test/unit`, `test/e2e`)
- **Test básico automático** en `test/nuxt/portal-prueba.test.ts` para la página principal
- **Configuración lista para Vitest** con `@nuxt/test-utils`

Para ejecutar los tests:
```bash
pnpm run test:run  # Ejecutar todos los tests una vez
npx vitest --project nuxt  # Solo tests de Nuxt
```

## Desarrollo

Los directorios vacíos contienen archivos `.gitkeep` con explicaciones detalladas sobre su propósito.
