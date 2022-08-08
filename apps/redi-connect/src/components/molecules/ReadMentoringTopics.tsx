import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import {
  Caption,
  CardTags,
  CardTagsProps,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { CATEGORIES_MAP } from '@talent-connect/shared-config'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'

interface ReadMentoringProps {
  profile: Pick<ConProfile, 'categories'>
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
  const { categories } = profile

  if (!categories?.length && !caption)
    return <Placeholder>Please pick up to four mentoring topics.</Placeholder>

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
