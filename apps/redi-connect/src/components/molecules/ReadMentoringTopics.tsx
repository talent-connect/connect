import {
  ConProfile,
  useLoadMyProfileQuery,
  UserType,
} from '@talent-connect/data-access'
import {
  Caption,
  CardTags,
  CardTagsProps,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { CATEGORIES_MAP } from '@talent-connect/shared-config'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'

interface ReadMentoringProps {
  profile: Pick<ConProfile, 'categories' | 'userType'>
  caption?: boolean
}

export const ProfileTags = ({ items, shortList }: CardTagsProps) => (
  <CardTags
    items={items}
    shortList={shortList}
    formatter={(item: string) => CATEGORIES_MAP[item]}
  />
)

const ReadMentoringTopics = ({ profile, caption }: ReadMentoringProps) => {
  const { categories, userType } = profile

  const showPlaceholderCaption = !categories?.length && !caption

  if (showPlaceholderCaption && userType === UserType.Mentee)
    return <Placeholder>Please pick up to four mentoring topics.</Placeholder>

  if (showPlaceholderCaption && userType === UserType.Mentor)
    return (
      <Placeholder>
        Please pick topics where you believe you can support you future mentee.
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
  Tags: ({ items, shortList }: CardTagsProps) => (
    <ProfileTags items={items} shortList />
  ),
}
