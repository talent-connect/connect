import {
  CardTags,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { MENTORING_TOPICS_MAP } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import React from 'react'
import { Element } from 'react-bulma-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../redux/types'

interface ReadMentoringProps {
  profile: RedProfile
  caption?: boolean
}

const ReadToolsAndFrameworks = ({ profile, caption }: ReadMentoringProps) => {
  const { mentee_toolsAndFrameworks_mentoringTopics = [] } = profile

  return (
    <Element className="block-separator">
      {mentee_toolsAndFrameworks_mentoringTopics.length > 0 ? (
        <CardTags
          items={mentee_toolsAndFrameworks_mentoringTopics}
          formatter={(item) => MENTORING_TOPICS_MAP[item]}
        />
      ) : (
        <Placeholder>
          Please select tool and technologies you are particularly interested in
          (max 3).
        </Placeholder>
      )}
    </Element>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadToolsAndFrameworks),
  Some: ({ profile }: ReadMentoringProps) => (
    <ReadToolsAndFrameworks profile={profile} />
  ),
}
