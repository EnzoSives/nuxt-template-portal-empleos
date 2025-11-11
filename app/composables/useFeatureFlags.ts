/**
 * Composables para gestionar toda la lógica relacionada con las feature flags
 */
interface FeatureFlags {
  auth: {
    name: string
    features: string[]
    routes: string[]
    description: string
    enabled: boolean
  }
  cart: {
    name: string
    features: string[]
    routes: string[]
    description: string
    enabled: boolean
  }
}
export function useFeatureFlags() {
  const logger = useLogger('UseFeatureFlags')

  /**
   * Obtiene las feature flags desde el servidor
   * @returns {Promise<FeatureFlags | null>} - Promise con las feature flags
   */
  async function getFeatureFlagsFromServer(): Promise<FeatureFlags | null> {
    const { data }  = await useFetch('/api/feature-flags')
    const features = data.value?.data?.features ?? null

    return features

  }

  /**
   * Obtiene las feature flags desde la app config
   * @returns { FeatureFlags | null} - Objecto con las feature flags
   */
  function getFeatureFlagsFromAppConfig(): FeatureFlags | null {
    const { features } = useAppConfig()
    return features
  }

  /**
   * Obtiene las feature flags desde la app config
   * @returns { boolean } - True si las feature flags se han inicializado desde el servidor
   */
  function getFeatureFlagsInitializedFromAppConfig(): boolean {
    const { featuresInitializedFromServer } = useAppConfig()
    return featuresInitializedFromServer
  }

  /**
   * Establece las feature flags en la app config
   * @param featureFlags - Feature flags
   */
  function setFeatureFlags(featureFlags: FeatureFlags) {
    if (!featureFlags) {
      return
    }
    const appConfig = useAppConfig()
    appConfig.features = featureFlags ?? null
    appConfig.featuresInitializedFromServer = true
  }

  async function initializeFeatureFlags() {
    const featureFlagsInitialized = getFeatureFlagsInitializedFromAppConfig()
    if (featureFlagsInitialized) {
      return
    }

    await waitFor(1000)
    const featureFlagsFromServer = await getFeatureFlagsFromServer()
    logger.info('Feature flags obtenidas desde el servidor', featureFlagsFromServer)
    if (featureFlagsFromServer) {
      setFeatureFlags(featureFlagsFromServer)
    }
  }

  return {
    getFeatureFlagsFromServer,
    getFeatureFlagsFromAppConfig,
    getFeatureFlagsInitializedFromAppConfig,
    setFeatureFlags,
    initializeFeatureFlags
  }
}
