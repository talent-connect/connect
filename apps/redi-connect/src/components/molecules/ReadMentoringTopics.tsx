import { FC } from 'react'
import { connect } from 'react-redux'

import {
  Caption,
  CardTags,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'

import { CATEGORIES_MAP } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import { CardTagsProps } from 'libs/shared-atomic-design-components/src/lib/atoms/CardTags/CardTags.props';
import { mapStateToProps } from '../../helpers';

interface ReadMentoringProps {
  profile: RedProfile
  caption?: boolean
}

export const ProfileTags: FC<CardTagsProps> = (props) => (
  <CardTags
    {...props}
    formatter={(item: string) => CATEGORIES_MAP[item]}
  />
)

const ReadMentoringTopics: FC<ReadMentoringProps> = ({
  profile: { categories },
  caption = false
}) => {

  if (!categories?.length && !caption)
    return <Placeholder>Please pick up to four mentoring topics.</Placeholder>

  return (
    <>
      {caption &&
        <Caption>{'Mentoring Topics'}</Caption>}
      <ProfileTags items={categories} />
    </>
  )
}

export default {
  /** */
  Me: connect(mapStateToProps, {})(ReadMentoringTopics),
  /** */
  Some: (props: ReadMentoringProps) => <ReadMentoringTopics {...props} />,
  /** */
  Tags: (props: CardTagsProps) => <ProfileTags {...props} />,
}
