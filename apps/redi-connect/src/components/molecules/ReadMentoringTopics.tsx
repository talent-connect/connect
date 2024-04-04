import {
  ConProfile,
  MentoringTopic,
  useLoadMyProfileQuery,
  UserType,
} from '@talent-connect/data-access'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { CATEGORIES_MAP } from '@talent-connect/shared-config'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import Chip from '../../../../../libs/shared-atomic-design-components/src/lib/atoms/Chip'
import './ReadMentoringTopics.scss'

interface ReadMentoringProps {
  profile: Pick<ConProfile, 'categories' | 'userType'>
  caption?: boolean
}

interface ProfileTagsProps {
  items: MentoringTopic[]
}

export const ProfileTags = ({ items }: ProfileTagsProps) => {
  const formattedItems = items.map((item) => CATEGORIES_MAP[item])
  return (
    <div className="mentoring-topics__container">
      {formattedItems.map((chip) => (
        <Chip chip={chip} />
      ))}
    </div>
  )
}
const ReadMentoringTopics = ({ profile, caption }: ReadMentoringProps) => {
  const { categories, userType } = profile

  const showPlaceholderCaption = !categories?.length && !caption

  if (showPlaceholderCaption && userType === UserType.Mentee)
    return <Placeholder>Please pick up to four mentoring topics.</Placeholder>

  if (showPlaceholderCaption && userType === UserType.Mentor)
    return (
      <Placeholder>
        Please pick topics where you believe you can support your future mentee.
      </Placeholder>
    )

  return (
    <>
      {caption && <Caption>{'Mentoring Topics'}</Caption>}
      <ProfileTags items={categories} />
    </>
  )
}

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <ReadMentoringTopics profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: ReadMentoringProps) => (
    <ReadMentoringTopics profile={profile} caption />
  ),
  Tags: ({ items }: ProfileTagsProps) => <ProfileTags items={items} />,
}
