<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Iniciar Sesión
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Ingresa tus credenciales para acceder
        </p>
      </div>

      <!-- Form -->
      <form
        class="mt-8 space-y-6"
        @submit.prevent="handleLogin"
      >
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="tu@email.com"
            >
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Tu contraseña"
            >
          </div>
        </div>

        <!-- Remember me -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.remember"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Recordarme
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-primary-600 hover:text-primary-500"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <!-- Submit button -->
        <div>
          <UButton
            type="submit"
            color="primary"
            size="lg"
            class="w-full"
            :loading="isLoading"
          >
            Iniciar Sesión
          </UButton>
        </div>

        <!-- Demo credentials -->
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <p class="text-xs text-blue-700 dark:text-blue-300 text-center">
            <strong>Demo:</strong> demo@example.com / password123
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Login',
  meta: [
    { name: 'description', content: 'Inicia sesión en tu cuenta' }
  ]
})

// Form state
const form = reactive({
  email: '',
  password: '',
  remember: false
})

const isLoading = ref(false)

// Methods
const handleLogin = async () => {
  isLoading.value = true

  try {
    // Simular autenticación
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Validación básica
    if (form.email === 'demo@example.com' && form.password === 'password123') {
      // Login exitoso
      console.log('Login exitoso')
      await navigateTo('/')
    } else {
      // Error de credenciales
      console.log('Credenciales incorrectas')
      alert('Credenciales incorrectas. Usa: demo@example.com / password123')
    }
  } catch (error) {
    console.error('Error en login:', error)
    alert('Error al iniciar sesión')
  } finally {
    isLoading.value = false
  }
}
</script>
