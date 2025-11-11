export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'remote'
  salary?: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits?: string[]
  postedDate: string
  applicationDeadline?: string
  isActive: boolean
}

export interface JobApplication {
  id?: string
  jobId: string
  applicantName: string
  email: string
  phone: string
  resume?: File | string
  coverLetter?: string
  linkedIn?: string
  portfolio?: string
  appliedDate?: string
  status?: 'pending' | 'reviewed' | 'accepted' | 'rejected'
}

export interface JobFilters {
  type?: string
  location?: string
  search?: string
}
