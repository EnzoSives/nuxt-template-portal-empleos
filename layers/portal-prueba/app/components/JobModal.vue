<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-container">
          <div class="modal-header">
            <h2>{{ isApplicationMode ? 'Postularse al Empleo' : job?.title }}</h2>
            <button class="close-button" @click="close">✕</button>
          </div>

          <div class="modal-body">
            <!-- Vista de Detalle del Empleo -->
            <div v-if="!isApplicationMode && job" class="job-detail">
              <div class="company-info">
                <h3>{{ job.company }}</h3>
                <div class="info-row">
                  <span>📍 {{ job.location }}</span>
                  <span>💼 {{ jobTypeLabel }}</span>
                  <span v-if="job.salary">💰 {{ job.salary }}</span>
                </div>
              </div>

              <div class="section">
                <h4>Descripción</h4>
                <p>{{ job.description }}</p>
              </div>

              <div class="section">
                <h4>Requisitos</h4>
                <ul>
                  <li v-for="(req, index) in job.requirements" :key="index">{{ req }}</li>
                </ul>
              </div>

              <div class="section">
                <h4>Responsabilidades</h4>
                <ul>
                  <li v-for="(resp, index) in job.responsibilities" :key="index">{{ resp }}</li>
                </ul>
              </div>

              <div v-if="job.benefits && job.benefits.length > 0" class="section">
                <h4>Beneficios</h4>
                <ul>
                  <li v-for="(benefit, index) in job.benefits" :key="index">{{ benefit }}</li>
                </ul>
              </div>

              <div class="section" v-if="job.applicationDeadline">
                <p class="deadline">
                  <strong>Fecha límite:</strong> {{ formatDate(job.applicationDeadline) }}
                </p>
              </div>

              <div class="modal-actions">
                <button class="button button-primary" @click="startApplication">
                  Postularme Ahora
                </button>
                <button class="button button-secondary" @click="close">
                  Cerrar
                </button>
              </div>
            </div>

            <!-- Formulario de Postulación -->
            <div v-if="isApplicationMode && job" class="application-form">
              <div class="form-info">
                <p>Estás postulando para: <strong>{{ job.title }}</strong> en <strong>{{ job.company }}</strong></p>
              </div>

              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="name">Nombre Completo *</label>
                  <input
                    id="name"
                    v-model="formData.applicantName"
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email *</label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                  />
                </div>

                <div class="form-group">
                  <label for="phone">Teléfono *</label>
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    required
                    placeholder="+52 123 456 7890"
                  />
                </div>

                <div class="form-group">
                  <label for="linkedin">LinkedIn</label>
                  <input
                    id="linkedin"
                    v-model="formData.linkedIn"
                    type="url"
                    placeholder="https://linkedin.com/in/tu-perfil"
                  />
                </div>

                <div class="form-group">
                  <label for="portfolio">Portfolio / Website</label>
                  <input
                    id="portfolio"
                    v-model="formData.portfolio"
                    type="url"
                    placeholder="https://tu-portfolio.com"
                  />
                </div>

                <div class="form-group">
                  <label for="coverLetter">Carta de Presentación</label>
                  <textarea
                    id="coverLetter"
                    v-model="formData.coverLetter"
                    rows="5"
                    placeholder="Cuéntanos por qué eres el candidato ideal para este puesto..."
                  ></textarea>
                </div>

                <div v-if="error" class="error-message">
                  {{ error }}
                </div>

                <div v-if="success" class="success-message">
                  ¡Postulación enviada exitosamente! Nos pondremos en contacto pronto.
                </div>

                <div class="modal-actions">
                  <button
                    type="submit"
                    class="button button-primary"
                    :disabled="loading || success"
                  >
                    {{ loading ? 'Enviando...' : 'Enviar Postulación' }}
                  </button>
                  <button
                    type="button"
                    class="button button-secondary"
                    @click="cancelApplication"
                    :disabled="loading"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Job, JobApplication } from '../../shared/types/jobs'

interface Props {
  job: Job | null
  isOpen: boolean
  startInApplicationMode?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  applied: [application: JobApplication]
}>()

const isApplicationMode = ref(props.startInApplicationMode || false)
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const formData = ref<Partial<JobApplication>>({
  applicantName: '',
  email: '',
  phone: '',
  linkedIn: '',
  portfolio: '',
  coverLetter: ''
})

const jobTypeLabel = computed(() => {
  if (!props.job) return ''
  const labels: Record<string, string> = {
    'full-time': 'Tiempo Completo',
    'part-time': 'Medio Tiempo',
    'contract': 'Contrato',
    'remote': 'Remoto'
  }
  return labels[props.job.type] || props.job.type
})

const startApplication = () => {
  isApplicationMode.value = true
}

const cancelApplication = () => {
  isApplicationMode.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    applicantName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: ''
  }
  error.value = null
  success.value = false
}

const close = () => {
  if (loading.value) return
  isApplicationMode.value = false
  resetForm()
  emit('close')
}

const submitForm = async () => {
  if (!props.job) return

  loading.value = true
  error.value = null

  try {
    const application: JobApplication = {
      jobId: props.job.id,
      applicantName: formData.value.applicantName!,
      email: formData.value.email!,
      phone: formData.value.phone!,
      linkedIn: formData.value.linkedIn,
      portfolio: formData.value.portfolio,
      coverLetter: formData.value.coverLetter
    }

    const response = await $fetch('/api/jobs/apply', {
      method: 'POST',
      body: application
    })

    success.value = true
    emit('applied', application)

    // Cerrar modal después de 2 segundos
    setTimeout(() => {
      close()
    }, 2000)
  } catch (e: any) {
    error.value = e.message || 'Error al enviar la postulación. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    isApplicationMode.value = props.startInApplicationMode || false
    resetForm()
  }
})

watch(() => props.startInApplicationMode, (newVal) => {
  if (newVal && props.isOpen) {
    isApplicationMode.value = true
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.modal-container {
  background: white;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  color: #111827;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-button:hover {
  background: #f3f4f6;
  color: #111827;
}

.modal-body {
  overflow-y: auto;
  padding: 24px;
}

.company-info {
  margin-bottom: 24px;
}

.company-info h3 {
  margin: 0 0 12px 0;
  color: #3b82f6;
  font-size: 20px;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
  color: #6b7280;
}

.section {
  margin-bottom: 24px;
}

.section h4 {
  margin: 0 0 12px 0;
  color: #111827;
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section p {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.section ul {
  margin: 0;
  padding-left: 20px;
  color: #4b5563;
}

.section li {
  margin-bottom: 8px;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.deadline {
  padding: 12px;
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.button {
  flex: 1;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
}

.button-primary {
  background: #3b82f6;
  color: white;
}

.button-primary:hover:not(:disabled) {
  background: #2563eb;
}

.button-primary:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.button-secondary {
  background: #f3f4f6;
  color: #4b5563;
}

.button-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.application-form {
  max-width: 100%;
}

.form-info {
  background: #eff6ff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.form-info p {
  margin: 0;
  color: #1e40af;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.error-message {
  padding: 12px;
  background: #fee2e2;
  border-left: 4px solid #ef4444;
  color: #991b1b;
  border-radius: 4px;
  margin-bottom: 16px;
}

.success-message {
  padding: 12px;
  background: #d1fae5;
  border-left: 4px solid #10b981;
  color: #065f46;
  border-radius: 4px;
  margin-bottom: 16px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .modal-container {
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-actions {
    flex-direction: column;
  }

  .info-row {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
