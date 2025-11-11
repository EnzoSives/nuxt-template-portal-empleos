import type { Job, JobApplication, JobFilters } from '../../shared/types/jobs'

export const useJobs = () => {
  const jobs = ref<Job[]>([])
  const filteredJobs = ref<Job[]>([])
  const selectedJob = ref<Job | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<JobFilters>({
    type: '',
    location: '',
    search: ''
  })

  // Fetch jobs from API
  const fetchJobs = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<Job[]>('/api/jobs')
      jobs.value = data
      applyFilters()
    } catch (e) {
      error.value = 'Error al cargar los empleos'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  // Apply filters to jobs
  const applyFilters = () => {
    let result = [...jobs.value]

    if (filters.value.type) {
      result = result.filter(job => job.type === filters.value.type)
    }

    if (filters.value.location) {
      result = result.filter(job =>
        job.location.toLowerCase().includes(filters.value.location!.toLowerCase())
      )
    }

    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase()
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      )
    }

    filteredJobs.value = result
  }

  // Update filters
  const updateFilters = (newFilters: Partial<JobFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    applyFilters()
  }

  // Clear filters
  const clearFilters = () => {
    filters.value = {
      type: '',
      location: '',
      search: ''
    }
    applyFilters()
  }

  // Submit job application
  const submitApplication = async (application: JobApplication) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch('/api/jobs/apply', {
        method: 'POST',
        body: application
      })
      return response
    } catch (e) {
      error.value = 'Error al enviar la postulación'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    jobs: readonly(jobs),
    filteredJobs: readonly(filteredJobs),
    selectedJob,
    loading: readonly(loading),
    error: readonly(error),
    filters: readonly(filters),
    fetchJobs,
    updateFilters,
    clearFilters,
    submitApplication
  }
}
