import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { MENTEE_OCCUPATION_CATEGORY } from '@talent-connect/shared-config'
import { objectEntries } from '@talent-connect/typescript-utilities'
import React from 'react'
import { Content } from 'react-bulma-components'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadOccupationProfilePropFragment } from './ReadOccupation.generated'

interface Props {
  profile: ReadOccupationProfilePropFragment
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
        Input your information about your Occupation here.
      </Placeholder>
    )
  }

  const isMentee = userType === 'MENTEE'
  const isMentor = userType === 'MENTOR'

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

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <ReadOccupation profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => <ReadOccupation profile={profile} shortInfo />,
}
