<template>
  <div :class="['job-card', viewMode]" @click="$emit('select', job)">
    <div class="job-card-content">
      <div class="job-header">
        <div class="company-logo">
          <div class="logo-placeholder" :style="{ background: getCompanyColor }">
            {{ getCompanyInitial }}
          </div>
        </div>

        <div class="job-main-info">
          <h3 class="job-title">{{ job.title }}</h3>
          <div class="job-meta">
            <span class="company-name">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M7 1c-2.8 0-5 2.2-5 5 0 3.75 5 7.5 5 7.5s5-3.75 5-7.5c0-2.8-2.2-5-5-5z" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              {{ job.company }}
            </span>
            <span class="separator">|</span>
            <span class="job-location">{{ job.location }}</span>
            <span v-if="job.salary" class="separator">|</span>
            <span v-if="job.salary" class="job-salary">{{ job.salary }}</span>
          </div>
        </div>

        <button class="bookmark-btn" @click.stop="toggleBookmark">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 2h10a1 1 0 0 1 1 1v15l-6-4-6 4V3a1 1 0 0 1 1-1z" :stroke="isBookmarked ? '#3b82f6' : 'currentColor'" :fill="isBookmarked ? '#3b82f6' : 'none'" stroke-width="1.5"/>
          </svg>
        </button>
      </div>

      <div class="job-badges">
        <span :class="['badge', 'badge-type', job.type]">{{ jobTypeLabel }}</span>
        <span v-if="isNew" class="badge badge-new">Presencial</span>
      </div>

      <div class="job-posted-date">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M7 3.5V7h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        {{ formattedDate }}
      </div>
    </div>

    <div class="job-card-actions">
      <button class="btn-apply" @click.stop="$emit('apply', job)">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M6 1v4m6-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Postularme
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '../../shared/types/jobs'

interface Props {
  job: Job
  viewMode?: 'list' | 'grid'
}

const props = withDefaults(defineProps<Props>(), {
  viewMode: 'list'
})

defineEmits<{
  select: [job: Job]
  apply: [job: Job]
}>()

const isBookmarked = ref(false)

const jobTypeLabel = computed(() => {
  const labels: Record<string, string> = {
    'full-time': 'Tiempo Completo',
    'part-time': 'Medio Tiempo',
    'contract': 'Contrato',
    'remote': 'Remoto'
  }
  return labels[props.job.type] || props.job.type
})

const formattedDate = computed(() => {
  const date = new Date(props.job.postedDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  return `Hace ${Math.floor(diffDays / 30)} meses`
})

const isNew = computed(() => {
  const date = new Date(props.job.postedDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 3
})

const getCompanyInitial = computed(() => {
  return props.job.company.charAt(0).toUpperCase()
})

const getCompanyColor = computed(() => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ]
  const index = props.job.company.charCodeAt(0) % colors.length
  return colors[index]
})

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.job-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.job-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d1d5db;
}

.job-card.grid {
  flex-direction: column;
  align-items: flex-start;
}

.job-card-content {
  flex: 1;
  min-width: 0;
}

.job-header {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  align-items: flex-start;
}

.company-logo {
  flex-shrink: 0;
}

.logo-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
}

.job-main-info {
  flex: 1;
  min-width: 0;
}

.job-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.025em;
}

.job-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
  flex-wrap: wrap;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.company-name {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.company-name svg {
  color: #9ca3af;
}

.separator {
  color: #d1d5db;
}

.job-location,
.job-salary {
  white-space: nowrap;
}

.bookmark-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #9ca3af;
  transition: color 0.2s;
  flex-shrink: 0;
}

.bookmark-btn:hover {
  color: #3b82f6;
}

.job-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
}

.badge-type {
  text-transform: capitalize;
}

.badge-type.full-time {
  background: #dbeafe;
  color: #1e40af;
}

.badge-type.part-time {
  background: #fef3c7;
  color: #92400e;
}

.badge-type.contract {
  background: #e0e7ff;
  color: #3730a3;
}

.badge-type.remote {
  background: #d1fae5;
  color: #065f46;
}

.badge-new {
  background: #dcfce7;
  color: #166534;
}

.job-posted-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.job-posted-date svg {
  color: #9ca3af;
}

.job-card-actions {
  flex-shrink: 0;
}

.btn-apply {
  background: #ff5733;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
}

.btn-apply:hover {
  background: #e04527;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 87, 51, 0.3);
}

.btn-apply svg {
  stroke: white;
}

.job-card.grid .job-card-actions {
  width: 100%;
}

.job-card.grid .btn-apply {
  width: 100%;
  justify-content: center;
}

.job-card.grid .job-header {
  width: 100%;
}

.job-card.grid .job-main-info {
  flex: 1;
}

@media (max-width: 768px) {
  .job-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .job-card-actions {
    width: 100%;
  }

  .btn-apply {
    width: 100%;
    justify-content: center;
  }

  .job-title {
    white-space: normal;
  }

  .job-meta {
    flex-wrap: wrap;
  }
}
</style>
