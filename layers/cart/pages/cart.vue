<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Carrito de Compras
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Revisa los productos en tu carrito
        </p>
      </div>

      <!-- Cart Content -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <!-- Empty State -->
        <div v-if="cartItems.length === 0" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <Icon name="lucide:shopping-cart" class="w-16 h-16 mx-auto" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Tu carrito está vacío
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Agrega algunos productos para comenzar
          </p>
          <UButton to="/" color="primary" size="lg">
            Continuar Comprando
          </UButton>
        </div>

        <!-- Cart Items -->
        <div v-else>
          <div class="space-y-4">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Icon name="lucide:package" class="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">
                    {{ item.name }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Cantidad: {{ item.quantity }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900 dark:text-white">
                  ${{ item.price * item.quantity }}
                </p>
                <UButton
                  variant="ghost"
                  color="red"
                  size="sm"
                  @click="removeItem(item.id)"
                >
                  Eliminar
                </UButton>
              </div>
            </div>
          </div>

          <!-- Cart Summary -->
          <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-semibold text-gray-900 dark:text-white">
                Total:
              </span>
              <span class="text-2xl font-bold text-gray-900 dark:text-white">
                ${{ totalPrice }}
              </span>
            </div>
            <div class="flex space-x-4">
              <UButton
                variant="outline"
                color="gray"
                size="lg"
                class="flex-1"
                to="/"
              >
                Continuar Comprando
              </UButton>
              <UButton
                color="primary"
                size="lg"
                class="flex-1"
                @click="checkout"
              >
                Proceder al Pago
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Carrito de Compras',
  meta: [
    { name: 'description', content: 'Revisa los productos en tu carrito de compras' }
  ]
})

// Cart state (mock data for demo)
const cartItems = ref([
  {
    id: 1,
    name: 'Producto Ejemplo 1',
    price: 29.99,
    quantity: 2
  },
  {
    id: 2,
    name: 'Producto Ejemplo 2',
    price: 19.99,
    quantity: 1
  }
])

// Computed properties
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0).toFixed(2)
})

// Methods
const removeItem = (itemId: number) => {
  const index = cartItems.value.findIndex(item => item.id === itemId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const checkout = () => {
  // Aquí iría la lógica de checkout
  console.log('Procediendo al pago...')
  // Por ahora solo mostramos un mensaje
  alert('Funcionalidad de checkout en desarrollo')
}
</script>

