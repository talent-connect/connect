import React from 'react'
import { Content, Tag } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption } from '../atoms'
import { categoriesIdToLabelMap } from '../../config/config'

interface ReadMentoringProps {
  profile: RedProfile
  caption?: boolean
}

interface TagsProps {
  items: string[]
}

const Placeholder = () => <Content italic>Please pick up to three mentoring topics.</Content>

const ProfileTags = ({ items }: TagsProps) => (
  <Tag.Group>
    {items.map(tagId =>
      <Tag key={tagId} size="large" rounded>
        {categoriesIdToLabelMap[tagId]}
      </Tag>
    )}
  </Tag.Group>
)

const ReadMentoring = ({ profile, caption }: ReadMentoringProps) => {
  const {
    categories
  } = profile

  if (!categories && !caption) return <Placeholder />

  return (<>
    {caption && <Caption>{'Mentoring Topics'}</Caption>}
    <ProfileTags items={categories} />
  </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

export default {
  Me: connect(mapStateToProps, {})(ReadMentoring),
  Some: ({ profile }: ReadMentoringProps) => <ReadMentoring profile={profile} caption/>,
  Tags: ({ items }: TagsProps) => <ProfileTags items={items} />
}
