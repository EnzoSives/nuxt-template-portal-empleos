/**
 * Información de versión de la aplicación
 * Único lugar donde se permite console.log para mostrar versión
 */

export interface AppVersion {
  name: string
  version: string
  description: string
  nuxtVersion: string
  nodeEnv: string
}

/**
 * Obtiene la información de versión de la aplicación
 */
export function getAppVersion(): AppVersion {
  return {
    name: 'Nuxt Layers Starter Template',
    version: '1.0.0', // Se mantiene en sincronía con package.json
    description: 'Template para crear aplicaciones Nuxt 4 con la arquitectura de Layers',
    nuxtVersion: '4.x',
    nodeEnv: process.env.NODE_ENV || 'development'
  }
}

/**
 * Muestra la información de versión en la consola con un estilo específico
 * @param version - Versión de la aplicación
 * @param message - Mensaje a mostrar
 * @param type - Tipo de mensaje
 */
export function logVersionWithStyle(version: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
  const style = {
    info: 'background-color: #00bcd4; color: white; font-weight: bold; padding: 2px 10px; border-radius: 5px;',
    success: 'background-color: #00bcd4; color: white; font-weight: bold; padding: 2px 10px; border-radius: 5px;',
    warning: 'background-color: #00bcd4; color: white; font-weight: bold; padding: 2px 10px; border-radius: 5px;',
    error: 'background-color: #00bcd4; color: white; font-weight: bold; padding: 2px 10px; border-radius: 5px;'
  }[type]
  // eslint-disable-next-line no-console
  console.log(`%cv${version}%c ${message}`, style, 'color: white;')
}

/**
 * Muestra la información de versión en la consola
 * Este es el ÚNICO console.log permitido en la aplicación
 */
export function logAppVersion(): void {
  if (import.meta.client) {
    const versionInfo = getAppVersion()

    logVersionWithStyle(versionInfo.version, `🌍 ${versionInfo.nodeEnv} | 🚀 ${versionInfo.name}`)
  }
}
