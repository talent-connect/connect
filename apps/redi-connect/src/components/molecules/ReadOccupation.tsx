import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { MENTEE_OCCUPATION_CATEGORY } from '@talent-connect/shared-config'
import { objectEntries } from '@talent-connect/typescript-utilities'

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const formMenteeOccupationCategories = objectEntries(
  MENTEE_OCCUPATION_CATEGORY
).map(([value, label]) => ({ value, label }))

const ReadOccupation = ({ profile, shortInfo }: Props) => {
  const {
    userType,
    mentor_occupation,
    mentor_workPlace,
    mentee_occupationCategoryId,
    mentee_occupationJob_placeOfEmployment,
    mentee_occupationJob_position,
    mentee_occupationStudent_studyPlace,
    mentee_occupationStudent_studyName,
    mentee_occupationLookingForJob_what,
    mentee_occupationOther_description,
  } = profile

  if (!mentor_occupation && !mentee_occupationCategoryId) {
    return (
      <Placeholder>
        Input your information about your Education and Occupation here.
      </Placeholder>
    )
  }

  const isMentee =
    userType === 'mentee' || userType === 'public-sign-up-mentee-pending-review'
  const isMentor =
    userType === 'mentor' || userType === 'public-sign-up-mentor-pending-review'

  return (
    <>
      {shortInfo && <Caption>Occupation</Caption>}
      <Content>
        {isMentor && (
          <>
            <p>{mentor_occupation}</p>
            <p>{mentor_workPlace}</p>
          </>
        )}
        {isMentee && (
          <>
            <p>
              {formMenteeOccupationCategories
                .filter((level) => level.value === mentee_occupationCategoryId)
                .map((level) => level.label)}
            </p>

            {mentee_occupationCategoryId === 'job' && (
              <>
                <p>{mentee_occupationJob_placeOfEmployment}</p>
                <p>{mentee_occupationJob_position}</p>
              </>
            )}

            {mentee_occupationCategoryId === 'student' && (
              <>
                <p>{mentee_occupationStudent_studyPlace}</p>
                <p>{mentee_occupationStudent_studyName}</p>
              </>
            )}
            {mentee_occupationCategoryId === 'lookingForJob' && (
              <>
                <p>{mentee_occupationLookingForJob_what}</p>
              </>
            )}

            {mentee_occupationCategoryId === 'other' && (
              <>
                <p>{mentee_occupationOther_description}</p>
              </>
            )}
          </>
        )}
      </Content>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadOccupation),
  Some: ({ profile }: Props) => <ReadOccupation profile={profile} shortInfo />,
}
