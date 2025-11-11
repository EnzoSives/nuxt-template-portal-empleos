import { createSharedLogger } from '~/utils/logger'

/**
 * Composable para usar el logger compartido en toda la aplicación
 * @param tag - Etiqueta opcional para identificar el origen del log
 */
export function useLogger(tag?: string): ReturnType<typeof createSharedLogger> {
  // Usar el logger compartido con la etiqueta
  return createSharedLogger(tag)
}
