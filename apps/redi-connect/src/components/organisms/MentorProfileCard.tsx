import placeholderImage from '../../assets/images/img-placeholder.png'
import { ProfileCardProfilePropFragment } from './ProfileCard.generated'
import './MentorProfileCard.scss'
import { NewProfileCard } from '../../../../../libs/shared-atomic-design-components/src/lib/molecules/NewProfileCard'
import {
  REDI_LOCATION_NAMES,
  CATEGORIES_MAP,
} from '@talent-connect/shared-config'

interface MentorProfileCardProps {
  mentorProfile: ProfileCardProfilePropFragment
  linkTo?: string
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

export function MentorProfileCard({
  mentorProfile,
  toggleFavorite,
  linkTo,
  isFavorite,
}: MentorProfileCardProps) {
  const {
    id,
    profileAvatarImageS3Key,
    fullName,
    rediLocation,
    languages,
    categories,
  } = mentorProfile
  const tags = categories.map((category) => CATEGORIES_MAP[category])
  const location = `ReDI ${REDI_LOCATION_NAMES[rediLocation]}`
  const avatar = profileAvatarImageS3Key || placeholderImage

  return (
    <div className="mentor-profile-card-wrapper">
      <NewProfileCard
        profile={{ id, avatar, fullName, location, languages }}
        tags={tags}
        linkTo={linkTo}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </div>
  )
}
