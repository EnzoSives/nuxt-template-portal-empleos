import { createSharedLogger as useLogger } from '~/utils/logger'

export default defineEventHandler(() => {
  const logger = useLogger('PING-API')

  logger.info('Endpoint llamado')
  logger.debug('Procesando solicitud ping')

  return {
    message: 'pong',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  }
})
