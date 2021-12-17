import { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  Caption,
  CardTags,
  Placeholder,
  CardTagsProps,
} from '@talent-connect/shared-atomic-design-components'
import { CATEGORIES_MAP } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'

interface ReadMentoringProps {
  profile: RedProfile
  caption?: boolean
}

export const ProfileTags: FunctionComponent<CardTagsProps> = ({ items, shortList }) => (
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

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadMentoringTopics),
  Some: ({ profile }: ReadMentoringProps) => (
    <ReadMentoringTopics profile={profile} caption />
  ),
  Tags: ({ items, shortList }: CardTagsProps) => (
    <ProfileTags items={items} shortList />
  ),
}
