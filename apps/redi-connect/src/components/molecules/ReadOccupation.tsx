import { FC } from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { MENTEE_OCCUPATION_CATEGORY } from '@talent-connect/shared-config'
import { mapOptionsObject } from '@talent-connect/typescript-utilities'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const formMenteeOccupationCategories = mapOptionsObject(MENTEE_OCCUPATION_CATEGORY)

const ReadOccupation: FC<Props> = ({
  profile: {
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
  },
  shortInfo = false
}) => {

  if (!mentor_occupation && !mentee_occupationCategoryId) {
    return (
      <Placeholder>
        Input your information about your Occupation here.
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
                .filter(({ value }) => value === mentee_occupationCategoryId)
                .map(({ label }) => label)}
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

export default {
  /** */
  Me: connect(mapStateToProps, {})(ReadOccupation),
  /** */
  Some: (props: Props) => <ReadOccupation {...props} />,
}
