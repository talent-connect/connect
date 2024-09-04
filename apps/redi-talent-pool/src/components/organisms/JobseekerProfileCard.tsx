import {
  desiredPositionsIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { NewProfileCard } from '../../../../../libs/shared-atomic-design-components/src/lib/molecules/NewProfileCard'
import placeholderImage from '../../assets/img-placeholder.png'
import { JobseekerProfileCardJobseekerProfilePropFragment } from './JobseekerProfileCard.generated'
import './JobseekerProfileCard.scss'
import { germanFederalStates } from '@talent-connect/talent-pool/config'

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
  const {
    id,
    profileAvatarImageS3Key,
    fullName,
    desiredPositions,
    federalState,
    workingLanguages,
    topSkills,
  } = jobseekerProfile

  const subheader = desiredPositions
    ?.map((position) => desiredPositionsIdToLabelMap[position])
    .join(', ')

  const languages = workingLanguages?.map(({ language }) => language)
  const tags = topSkills?.map((skill) => topSkillsIdToLabelMap[skill])
  const avatar = profileAvatarImageS3Key || placeholderImage
  const location = `Based in ${germanFederalStates[federalState]}`

  return (
    <div className="jobSeeker-profile-card-wrapper">
      <NewProfileCard
        profile={{ id, avatar, fullName, location, languages }}
        subheader={subheader}
        tags={tags}
        linkTo={linkTo}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </div>
  )
}
