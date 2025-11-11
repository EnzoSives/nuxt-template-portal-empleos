// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // Bloquear console.log PERO permitir específicamente el log de versión
      'no-console': ['error', {
        allow: ['warn', 'error'] // Permitir console.warn y console.error en casos legítimos
      }],
      // Permitir console.log SOLO cuando tenga el comentario eslint-disable-next-line
      'no-console-restricted': 'off', // Esta regla se desactiva porque usamos eslint-disable específico,
      // preferir quotes simples
      'quotes': ['error', 'single'],
      // Preferir funciones declaradas tradicionales sobre funciones flecha
      'prefer-arrow-functions': 'off', // Deshabilitamos la regla que prefiere arrow functions
      'func-style': ['error', 'declaration', {
        allowArrowFunctions: true // Permitir arrow functions solo cuando sean necesarias
      }],
      // Preferir declaraciones de función para funciones que serán llamadas
      'prefer-function-declarations': 'error',

      // Formato y estilo de funciones
      'func-names': 'error', // Requerir nombres de función para expresiones
      'func-call-spacing': ['error', 'never'], // Sin espacios en llamadas function()

      // Evitar funciones flecha anónimas cuando se puede usar función declarada
      'id-length': 'off', // Deshabilitar límite de longitud de nombres

      // Preferir asignaciones de funciones con nombres explícitos
      'no-inner-declarations': ['error', 'functions'], // No declarar funciones dentro de bloques

      // Estilo de parámetros de función
      'no-useless-return': 'error' // No hacer return innecesario en funciones
    }
  }
)
