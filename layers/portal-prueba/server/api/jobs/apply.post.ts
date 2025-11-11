import type { JobApplication } from '../../../shared/types/jobs'

export default defineEventHandler(async (event) => {
  const application = await readBody<JobApplication>(event)

  // Validación básica
  if (!application.jobId || !application.applicantName || !application.email || !application.phone) {
    throw createError({
      statusCode: 400,
      message: 'Faltan campos requeridos'
    })
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(application.email)) {
    throw createError({
      statusCode: 400,
      message: 'Email inválido'
    })
  }

  // Simular guardado en base de datos
  await new Promise(resolve => setTimeout(resolve, 1000))

  // En producción, aquí guardarías en la base de datos
  const savedApplication = {
    ...application,
    id: Math.random().toString(36).substring(7),
    appliedDate: new Date().toISOString(),
    status: 'pending' as const
  }

  return {
    success: true,
    message: 'Postulación enviada exitosamente',
    application: savedApplication
  }
})
