import { CardTags, Icon } from '@talent-connect/shared-atomic-design-components'
import {
  desiredPositionsIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import React from 'react'
import placeholderImage from '../../assets/img-placeholder.png'
import { JobseekerProfileCardJobseekerProfilePropFragment } from './JobseekerProfileCard.generated'
import './JobseekerProfileCard.scss'
import { ProfileCard } from '../../../../../libs/shared-atomic-design-components/src/lib/atoms/ProfileCard'

interface JobseekerProfileCardProps {
  jobseekerProfile: JobseekerProfileCardJobseekerProfilePropFragment
  linkTo?: string
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

export function JobseekerProfileCard({
  jobseekerProfile,
  linkTo,
  toggleFavorite,
  isFavorite,
}: JobseekerProfileCardProps) {
  return (
    <ProfileCard
      profile={jobseekerProfile}
      linkTo={linkTo}
      isFavorite={isFavorite}
      toggleFavorite={toggleFavorite}
    />
  )
}
