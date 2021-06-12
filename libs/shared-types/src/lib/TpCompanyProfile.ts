export type TpCompanyProfile = {
  id: string
  firstName: string
  lastName: string
  contactEmail: string

  profileAvatarImageS3Key: string

  companyName?: string
  location?: string
  tagline?: string

  industry?: string
  website?: string
  linkedInUrl?: string

  phone?: string

  about?: string

  createdAt: Date
  updatedAt: Date
}
