/**
 * Middleware para verificar las feature flags
 * @param to - Ruta a la que se está navegando
 * @returns void
 * @docs https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware#when-middleware-runs
 */

export default defineNuxtRouteMiddleware((to) => {
  const { features } = useAppConfig()

  // Proteger la ruta /features con contraseña
  if (to.path.startsWith('/features')) {
    const password = useCookie('password')
    if (password.value != '123456') {
      return navigateTo('/')
    }
  }

  if (to.path.startsWith('/auth')) {
    if (!features.auth.enabled) {
      // mostar notificacion de que el feature no esta habilitado
      useToast().add({
        title: 'Feature not enabled',
        description: 'The feature is not enabled',
        color: 'error'
      })
      return navigateTo('/')
    }
  }
  if (to.path.startsWith('/cart')) {
    if (!features.cart.enabled) {
      useToast().add({
        title: 'Feature not enabled',
        description: 'The feature is not enabled',
        color: 'error'
      })
      return navigateTo('/')
    }
  }
})
