import { createConsola } from 'consola'

/**
 * Crea una instancia de logger compartida entre cliente y servidor
 */
export function createSharedLogger(tag?: string) {
  // Detectar el entorno
  const isProduction = process.env.NODE_ENV === 'production'
  const isServer = import.meta.server ?? false

  // Configuración base del logger
  const loggerConfig = {
    level: isProduction ? (isServer ? 1 : 2) : 4,
    formatOptions: {
      colors: !isProduction,
      compact: isProduction,
      date: isServer,
      tagBrackets: ['[', ']']
    }
  }

  // Crear la instancia de consola
  const consolaLogger = createConsola(loggerConfig)

  // Función helper para agregar tag
  const formatMessage = (message: string) => {
    return tag ? `[${tag}] ${message}` : message
  }

  // Crear el objeto logger compartido
  const sharedLogger = {
    info: (message: string, ...args: unknown[]) => {
      consolaLogger.info(formatMessage(message), ...args)
    },

    warn: (message: string, ...args: unknown[]) => {
      consolaLogger.warn(formatMessage(message), ...args)
    },

    error: (message: string, ...args: unknown[]) => {
      consolaLogger.error(formatMessage(message), ...args)
    },

    debug: (message: string, ...args: unknown[]) => {
      // Debug solo en desarrollo
      if (isProduction) return
      consolaLogger.debug(formatMessage(message), ...args)
    },

    success: (message: string, ...args: unknown[]) => {
      consolaLogger.success(formatMessage(message), ...args)
    }
  }

  return sharedLogger
}

// Instancia por defecto para usar directamente
export const sharedLogger = createSharedLogger()
