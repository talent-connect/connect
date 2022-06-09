import {
  Caption,
  CardTags,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import {
  FIELDS_OF_EXPERTISE,
  MENTORING_GOALS,
  MENTORING_TOPICS_MAP,
} from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import React from 'react'
import { Columns, Element } from 'react-bulma-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../redux/types'

interface ReadMentoringProps {
  profile: RedProfile
  caption?: boolean
}

const ReadMentoringGoalTopics = ({ profile, caption }: ReadMentoringProps) => {
  const {
    mentee_mentoringGoal,
    mentee_overarchingMentoringTopics = [],
    mentee_primaryRole_fieldOfExpertise,
    mentee_primaryRole_mentoringTopics = [],
    mentee_secondaryRole_fieldOfExpertise,
    mentee_secondaryRole_mentoringTopics = [],
  } = profile

  return (
    <>
      <Element className="block-thicker-separator-dashed">
        <Columns>
          <Columns.Column size={6}>
            <Caption>Goal</Caption>
            {mentee_mentoringGoal ? (
              <CardTags items={[MENTORING_GOALS[mentee_mentoringGoal]]} />
            ) : (
              <Placeholder>
                The most important goal you would like to adress with your
                mentor
              </Placeholder>
            )}
          </Columns.Column>
          <Columns.Column size={6}>
            <Caption>Topics</Caption>
            {mentee_overarchingMentoringTopics.length > 0 ? (
              <CardTags
                items={mentee_overarchingMentoringTopics}
                formatter={(item) => MENTORING_TOPICS_MAP[item]}
              />
            ) : (
              <Placeholder>
                General topics you would like to me mentored on
              </Placeholder>
            )}
          </Columns.Column>
        </Columns>
      </Element>
      <Element className="block-thicker-separator-dashed">
        <Columns>
          <Columns.Column size={6}>
            <Caption>Primary role</Caption>
            {mentee_primaryRole_fieldOfExpertise ? (
              <CardTags
                items={[
                  FIELDS_OF_EXPERTISE[mentee_primaryRole_fieldOfExpertise],
                ]}
              />
            ) : (
              <Placeholder>
                The primary role you would like to be mentored on.
              </Placeholder>
            )}
          </Columns.Column>
          <Columns.Column size={6}>
            <Caption>Skills</Caption>
            {mentee_primaryRole_mentoringTopics.length > 0 ? (
              <CardTags
                items={mentee_primaryRole_mentoringTopics}
                formatter={(item) => MENTORING_TOPICS_MAP[item]}
              />
            ) : (
              <Placeholder>
                Role-related skills you would like to mentored on (optional)
              </Placeholder>
            )}
          </Columns.Column>
        </Columns>
      </Element>
      <Element className="block-thicker-separator-dashed">
        <Columns>
          <Columns.Column size={6}>
            <Caption>Secondary role (optional)</Caption>
            {mentee_secondaryRole_fieldOfExpertise ? (
              <CardTags
                items={[
                  FIELDS_OF_EXPERTISE[mentee_secondaryRole_fieldOfExpertise],
                ]}
              />
            ) : (
              <Placeholder>
                The secondary role you would like to be mentored on.
              </Placeholder>
            )}
          </Columns.Column>
          <Columns.Column size={6}>
            <Caption>Skills</Caption>
            {mentee_secondaryRole_mentoringTopics.length > 0 ? (
              <CardTags
                items={mentee_secondaryRole_mentoringTopics}
                formatter={(item) => MENTORING_TOPICS_MAP[item]}
              />
            ) : (
              <Placeholder>
                Role-related skills you would like to mentored on (optional)
              </Placeholder>
            )}
          </Columns.Column>
        </Columns>
      </Element>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadMentoringGoalTopics),
  Some: ({ profile }: ReadMentoringProps) => (
    <ReadMentoringGoalTopics profile={profile} />
  ),
}
