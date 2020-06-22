import React from 'react'
import { Tag } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption, Placeholder } from '../atoms'
import { categoriesIdToLabelMap } from '../../config/config'

interface ReadMentoringProps {
  profile: RedProfile
  caption?: boolean
}

interface TagsProps {
  items: string[]
  shortList?: boolean
}

const ProfileTags = ({ items, shortList }: TagsProps) => {
  const additionalTagsCount = items.length - 3
  const tagList = shortList ? items.slice(0, 3) : items

  return <Tag.Group>
    {tagList.map(tagId =>
      <Tag key={tagId} size="medium" rounded textWeight="bold">
        {categoriesIdToLabelMap[tagId]}
      </Tag>
    )}
    {(shortList && additionalTagsCount > 0) && <Tag size="medium" rounded textWeight="bold">
      {'+' + additionalTagsCount}
    </Tag>}
  </Tag.Group>
}

const ReadMentoringTopics = ({ profile, caption }: ReadMentoringProps) => {
  const {
    categories
  } = profile

  if (!categories && !caption) return <Placeholder>Please pick up to three mentoring topics.</Placeholder>

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
  Me: connect(mapStateToProps, {})(ReadMentoringTopics),
  Some: ({ profile }: ReadMentoringProps) => <ReadMentoringTopics profile={profile} caption />,
  Tags: ({ items, shortList }: TagsProps) => <ProfileTags items={items} shortList/>
}
