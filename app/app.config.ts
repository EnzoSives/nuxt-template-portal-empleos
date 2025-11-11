export default defineAppConfig({
  tenant: {
    id: 'tenant-uuid',
    name: 'Nuxt Layers App Template',
    description: 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'
  },
  featuresInitializedFromServer: false,
  features: {
    auth: {
      name: 'authentication',
      features: ['authentication', 'user-management'],
      routes: ['/auth/login', '/auth/register'],
      description: 'Sistema de autenticación de usuarios',
      enabled: true
    },
    cart: {
      name: 'shopping-cart',
      features: ['shopping-cart', 'checkout'],
      routes: ['/cart', '/cart/checkout'],
      description: 'Carrito de compras y proceso de checkout',
      enabled: false
    }
  },
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  }
})
