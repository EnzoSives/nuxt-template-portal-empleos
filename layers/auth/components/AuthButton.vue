<template>
  <div class="flex items-center gap-4">
    <template v-if="isAuthenticated">
      <div class="flex items-center gap-2">
        <UAvatar
          :src="user?.image"
          :alt="user?.name || 'Usuario'"
          size="sm"
        />
        <span class="text-sm text-gray-700">{{ user?.name || user?.email }}</span>
      </div>
      <UButton
        variant="ghost"
        color="red"
        @click="handleSignOut"
        :loading="isLoading"
      >
        Cerrar sesión
      </UButton>
    </template>

    <template v-else>
      <UButton
        variant="ghost"
        to="/auth/login"
      >
        Iniciar sesión
      </UButton>
      <UButton
        to="/auth/register"
      >
        Registrarse
      </UButton>
    </template>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, signOut, isLoading } = useAuth()

const handleSignOut = async () => {
  try {
    await signOut()
    await navigateTo('/')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>
