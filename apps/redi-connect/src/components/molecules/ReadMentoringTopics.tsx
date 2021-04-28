import React from 'react'
import { Tag } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { categoriesIdToLabelMap } from '../../config/config'

interface ReadMentoringProps {
  profile: RedProfile
  caption?: boolean
}

interface TagsProps {
  items: string[]
  shortList?: boolean
}

interface TagProps {
  children: string
  className?: string
  key: string
}

const ProfileTag = ({ children, className }: TagProps) => (
  <Tag className={className} size="medium" textWeight="bold" rounded>
    {children}
  </Tag>
)

const ProfileTags = ({ items, shortList }: TagsProps) => {
  const additionalTagsCount = items.length - 3
  const tagList = shortList ? items.slice(0, 3) : items
  const hasAdditionalTags = shortList && additionalTagsCount > 0

  return (
    <Tag.Group>
      {tagList.map((tagId, i) => {
        const currentTag = (
          <ProfileTag key={tagId}>{categoriesIdToLabelMap[tagId]}</ProfileTag>
        )
        const isLastVisibleTag = i === 2

        return hasAdditionalTags && isLastVisibleTag ? (
          <div className="tags__last-row">
            {currentTag}
            <ProfileTag key={`restNr-${i}`} className="tag--rest">
              {'+' + additionalTagsCount}
            </ProfileTag>
          </div>
        ) : (
          currentTag
        )
      })}
    </Tag.Group>
  )
}

const ReadMentoringTopics = ({ profile, caption }: ReadMentoringProps) => {
  const { categories } = profile

  if (!categories?.length && !caption)
    return <Placeholder>Please pick up to three mentoring topics.</Placeholder>

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
  Tags: ({ items, shortList }: TagsProps) => (
    <ProfileTags items={items} shortList />
  ),
}
