<template>
  <div class="jobs-portal">
    <!-- Top Navigation -->
    <header class="top-nav">
      <div class="container">
        <div class="nav-content">
          <div class="brand-section">
            <h1 class="app-title">Portal de Empleos</h1>
          </div>

          <div class="nav-actions">

            <button class="icon-button notification">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span class="notification-badge">1</span>
            </button>
            <div class="user-avatar"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="container">
        <h2 class="filters-title">Filtros</h2>
        <div class="filters-grid">
          <div class="filter-group">
            <label class="filter-label">Buscar por rol</label>
            <div class="filter-input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <input
                v-model="roleFilter"
                type="text"
                placeholder="Desarrollador Front End"
                @input="handleFilterChange"
                class="filter-input"
              />
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Buscar por ubicación</label>
            <div class="filter-input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" stroke-width="2"/>
                <path d="M10 1c-3.866 0-7 3.134-7 7 0 5.25 7 11 7 11s7-5.75 7-11c0-3.866-3.134-7-7-7z" stroke="currentColor" stroke-width="2"/>
              </svg>
              <input
                v-model="locationFilter"
                type="text"
                placeholder="Argentina"
                @input="handleFilterChange"
                class="filter-input"
              />
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Tipo de Trabajo</label>
            <div class="filter-input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M6 2v4m8-4v4M2 8h16" stroke="currentColor" stroke-width="2"/>
              </svg>
              <select v-model="selectedType" @change="handleFilterChange" class="filter-select-styled">
                <option value="">Remoto</option>
                <option value="full-time">Tiempo Completo</option>
                <option value="part-time">Medio Tiempo</option>
                <option value="contract">Contrato</option>
                <option value="remote">Remoto</option>
              </select>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Rango Salarial</label>
            <div class="filter-input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 1v18M14 5h-5a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <select v-model="salaryRange" @change="handleFilterChange" class="filter-select-styled">
                <option value="">$50k-100k</option>
                <option value="0-50k">$0-50k</option>
                <option value="50k-100k">$50k-100k</option>
                <option value="100k-150k">$100k-150k</option>
                <option value="150k+">$150k+</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="results-section">
      <div class="container">
        <div class="results-header">
          <div class="results-info">
            <h3>Mostrando Resultados: {{ filteredJobs.length }}</h3>
            <p class="results-filters">{{ filtersSummary }}</p>
          </div>
          <div class="view-controls">
            <div class="view-toggle">
              <button
                :class="['view-btn', { active: viewMode === 'list' }]"
                @click="viewMode = 'list'"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="3" fill="currentColor"/>
                  <rect x="2" y="9" width="16" height="3" fill="currentColor"/>
                  <rect x="2" y="14" width="16" height="3" fill="currentColor"/>
                </svg>
              </button>
              <button
                :class="['view-btn', { active: viewMode === 'grid' }]"
                @click="viewMode = 'grid'"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="7" height="7" fill="currentColor"/>
                  <rect x="11" y="2" width="7" height="7" fill="currentColor"/>
                  <rect x="2" y="11" width="7" height="7" fill="currentColor"/>
                  <rect x="11" y="11" width="7" height="7" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div class="sort-control">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M6 10h11M9 14h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <select v-model="sortBy" @change="handleSort" class="sort-select">
                <option value="newest">Más Recientes</option>
                <option value="oldest">Más Antiguos</option>
                <option value="salary-high">Salario: Mayor a Menor</option>
                <option value="salary-low">Salario: Menor a Mayor</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Cargando empleos...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>❌ {{ error }}</p>
          <button @click="fetchJobs" class="retry-button">Reintentar</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredJobs.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h3>No se encontraron empleos</h3>
          <p>Intenta ajustar tus filtros de búsqueda</p>
          <button @click="clearAllFilters" class="button-primary">Limpiar filtros</button>
        </div>

        <!-- Jobs List/Grid -->
        <div v-else :class="['jobs-container', viewMode]">
          <JobCard
            v-for="job in filteredJobs"
            :key="job.id"
            :job="job"
            :view-mode="viewMode"
            @select="openJobDetails"
            @apply="openApplicationForm"
          />
        </div>
      </div>
    </div>

    <!-- Job Modal -->
    <JobModal
      :job="selectedJob"
      :is-open="isModalOpen"
      :start-in-application-mode="startInApplicationMode"
      @close="closeModal"
      @applied="handleApplicationSubmitted"
    />

    <!-- Success Toast -->
    <Transition name="toast">
      <div v-if="showSuccessToast" class="success-toast">
        ✅ ¡Postulación enviada exitosamente!
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Job, JobApplication } from '../../shared/types/jobs'
import JobCard from '../components/JobCard.vue'
import JobModal from '../components/JobModal.vue'

// Composables
const {
  filteredJobs,
  loading,
  error,
  filters,
  fetchJobs,
  updateFilters,
  clearFilters
} = useJobs()

// State
const selectedJob = ref<Job | null>(null)
const isModalOpen = ref(false)
const startInApplicationMode = ref(false)
const showSuccessToast = ref(false)
const searchQuery = ref('')
const roleFilter = ref('')
const selectedType = ref('')
const locationFilter = ref('')
const salaryRange = ref('')
const viewMode = ref<'list' | 'grid'>('list')
const sortBy = ref('newest')

// Computed
const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || selectedType.value !== '' || locationFilter.value !== '' || roleFilter.value !== ''
})

const filtersSummary = computed(() => {
  const parts = []
  if (roleFilter.value) parts.push(roleFilter.value)
  if (locationFilter.value) parts.push(locationFilter.value)
  if (selectedType.value) {
    const labels: Record<string, string> = {
      'full-time': 'Tiempo Completo',
      'part-time': 'Medio Tiempo',
      'contract': 'Contrato',
      'remote': 'Remoto'
    }
    parts.push(labels[selectedType.value] || selectedType.value)
  }
  if (salaryRange.value) parts.push(salaryRange.value)
  return parts.join(' | ') || 'Todos los Empleos'
})

// Methods
const handleSearch = () => {
  updateFilters({ search: searchQuery.value })
}

const handleFilterChange = () => {
  let combinedSearch = searchQuery.value
  if (roleFilter.value) {
    combinedSearch = roleFilter.value
  }

  updateFilters({
    search: combinedSearch,
    type: selectedType.value,
    location: locationFilter.value
  })
}

const handleSort = () => {
  // Sorting logic will be implemented if needed
}

const clearAllFilters = () => {
  searchQuery.value = ''
  roleFilter.value = ''
  selectedType.value = ''
  locationFilter.value = ''
  salaryRange.value = ''
  clearFilters()
}

const openJobDetails = (job: Job) => {
  selectedJob.value = job
  startInApplicationMode.value = false
  isModalOpen.value = true
}

const openApplicationForm = (job: Job) => {
  selectedJob.value = job
  startInApplicationMode.value = true
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedJob.value = null
    startInApplicationMode.value = false
  }, 300)
}

const handleApplicationSubmitted = (application: JobApplication) => {
  showSuccessToast.value = true
  setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
}

// Lifecycle
onMounted(() => {
  fetchJobs()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.jobs-portal {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Top Navigation */
.top-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.brand-section {
  flex-shrink: 0;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.search-bar-top {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 8px 16px;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  color: #9ca3af;
}

.search-input-top {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 100%;
  color: #111827;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.search-input-top::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #6b7280;
  transition: color 0.2s;
  position: relative;
}

.icon-button:hover {
  color: #111827;
}

.icon-button.notification {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
}

/* Filters Section */
.filters-section {
  background: white;
  padding: 32px 0;
  margin-bottom: 32px;
}

.filters-title {
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 20px 0;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
}

.filter-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #9ca3af;
  pointer-events: none;
}

.filter-input,
.filter-select-styled {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background: white;
  transition: border-color 0.2s;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.filter-input:focus,
.filter-select-styled:focus {
  outline: none;
  border-color: #3b82f6;
}

.filter-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.filter-input::placeholder {
  color: #9ca3af;
}

.filter-select-styled {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
  cursor: pointer;
}

/* Results Section */
.results-section {
  padding-bottom: 80px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
}

.results-info h3 {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.03em;
}

.results-filters {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.view-toggle {
  display: flex;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
}

.view-btn {
  background: transparent;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn:hover {
  color: #111827;
}

.view-btn.active {
  background: white;
  color: #111827;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sort-control {
  position: relative;
  display: flex;
  align-items: center;
}

.sort-select {
  padding: 10px 36px 10px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.sort-control .input-icon {
  position: absolute;
  left: 12px;
  color: #6b7280;
}

/* Jobs Container */
.jobs-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.jobs-container.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* Loading, Error, Empty States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state p {
  color: #ef4444;
  font-size: 18px;
  margin-bottom: 20px;
}

.retry-button,
.button-primary {
  padding: 12px 32px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-button:hover,
.button-primary:hover {
  background: #2563eb;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  color: #111827;
  margin: 0 0 12px 0;
}

.empty-state p {
  color: #6b7280;
  margin: 0 0 24px 0;
}

/* Success Toast */
.success-toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: #10b981;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  z-index: 2000;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive */
@media (max-width: 1024px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .view-controls {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .nav-content {
    flex-wrap: wrap;
  }

  .brand-section {
    order: 1;
  }

  .search-bar-top {
    flex: 1 1 100%;
    order: 3;
    max-width: 100%;
  }

  .nav-actions {
    order: 2;
  }

  .filters-grid {
    grid-template-columns: 1fr;
  }

  .jobs-container.grid {
    grid-template-columns: 1fr;
  }

  .success-toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
}
</style>
