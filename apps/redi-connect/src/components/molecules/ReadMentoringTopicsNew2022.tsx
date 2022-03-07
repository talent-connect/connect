import {
  Caption,
  CardTags,
  CardTagsProps,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { MENTORING_TOPICS_MAP } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

interface ReadMentoringProps {
  profile: RedProfile
  caption?: boolean
}

export const ProfileTags = ({ items, shortList }: CardTagsProps) => (
  <CardTags
    items={items}
    shortList={shortList}
    formatter={(item: string) => MENTORING_TOPICS_MAP[item]}
  />
)

const ReadMentoringTopicsNew2022 = ({
  profile,
  caption,
}: ReadMentoringProps) => {
  const { mentoringTopics } = profile

  if (!mentoringTopics?.length && !caption)
    return <Placeholder>Please pick mentoring topics.</Placeholder>

  return (
    <>
      {caption && <Caption>{'Mentoring Topics'}</Caption>}
      <ProfileTags items={mentoringTopics} />
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadMentoringTopicsNew2022),
  Some: ({ profile }: ReadMentoringProps) => (
    <ReadMentoringTopicsNew2022 profile={profile} caption />
  ),
  Tags: ({ items, shortList }: CardTagsProps) => (
    <ProfileTags items={items} shortList />
  ),
}
