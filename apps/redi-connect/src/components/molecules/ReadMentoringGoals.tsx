import {
  Caption,
  CardTags,
  CardTagsProps,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { MENTORING_GOALS } from '@talent-connect/shared-config'
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
    formatter={(item: string) => MENTORING_GOALS[item]}
  />
)

const ReadMentoringGoals = ({ profile, caption }: ReadMentoringProps) => {
  const { mentor_mentoringGoals: mentoringGoals } = profile

  if (!mentoringGoals?.length && !caption)
    return (
      <Placeholder>
        Select at least one goal you would like to support mentees with
      </Placeholder>
    )

  return (
    <>
      {caption && <Caption>Mentoring goals</Caption>}
      <ProfileTags items={mentoringGoals} />
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadMentoringGoals),
  Some: ({ profile }: ReadMentoringProps) => (
    <ReadMentoringGoals profile={profile} caption />
  ),
  Tags: ({ items, shortList }: CardTagsProps) => (
    <ProfileTags items={items} shortList />
  ),
}
