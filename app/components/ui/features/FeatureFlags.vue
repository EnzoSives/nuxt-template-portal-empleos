<script setup lang="ts">
const appConfig = useAppConfig()
const features = appConfig.features

function toggleFeature(feature: string) {
  const featureConfig = features[feature as keyof typeof features]
  featureConfig.enabled = !featureConfig.enabled
}
</script>
<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <div class="flex flex-col w-full md:w-6/12 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg gap-4">
      <h2 class="title">Gestión de Feature Flags</h2>

      <div class="flex flex-col gap-4">
        <UCard v-for="(feature, index) in features" :key="index" :class="{'active': feature.enabled}">

          <template #header>
            <h3 class="text-lg font-bold capitalize">{{ feature.name }}</h3>
          </template>
          <div class="flex justify-between gap-2">
            <p class="text-sm text-gray-500">{{ feature.description }}</p>
            <USwitch
              v-model="feature.enabled"
              size="lg"
              class="feature-switch"
            />
          </div>
          <template #footer>
              <UButton @click="navigateTo(feature.routes[0])" variant="solid" color="primary" class="save-button">
                Go to {{ feature.name }}
              </UButton>

          </template>
        </UCard>
      </div>

    </div>
  </div>
</template>


