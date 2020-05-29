import React from 'react'
import { Content, Columns } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption } from '../atoms'
import {
  menteeOccupationCategories,
  educationLevels
} from '../../config/config'

interface Props {
  profile: RedProfile
}

const Placeholder = () => <Content italic>Input your information about your Education and Occupation here.</Content>

const formMenteeOccupationCategories = menteeOccupationCategories.map(level => ({ value: level.id, label: level.label }))
const formEducationLevels = educationLevels.map(level => ({ value: level.id, label: level.label }))

const Me = ({ profile }: Props) => {
  const {
    userType,
    mentor_occupation,
    mentor_workPlace,
    mentee_highestEducationLevel,
    mentee_occupationCategoryId,
    mentee_occupationJob_placeOfEmployment,
    mentee_occupationJob_position,
    mentee_occupationStudent_studyPlace,
    mentee_occupationStudent_studyName,
    mentee_occupationLookingForJob_what,
    mentee_occupationOther_description

  } = profile

  if (!mentor_occupation && !mentee_occupationCategoryId) return <Placeholder />

  return (
    <Content>
      {userType === 'mentor' && (
        <>
          <p>{mentor_occupation}</p>
          <p>{mentor_workPlace}</p>
        </>
      )}
      {userType === 'mentee' && (
        <>
          <p>{formMenteeOccupationCategories.filter(level => level.value === mentee_occupationCategoryId).map(level => level.label)}</p>
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
          <p>{formEducationLevels.filter(level => level.value === mentee_highestEducationLevel).map(level => level.label)}</p>
        </>
      )}
    </Content>
  )
}

const Some = ({ profile }: Props) => {
  const {
    mentor_occupation,
    mentor_workPlace
  } = profile

  return <Columns>
    {mentor_occupation && <Columns.Column>
      <Caption>Occupation</Caption>
      <Content className="block-separator">
        {mentor_occupation}
      </Content>
    </Columns.Column>}
    {mentor_workPlace && <Columns.Column>
      <Caption>Company</Caption>
      <Content>
        {mentor_workPlace}
      </Content>
    </Columns.Column>}
  </Columns>

}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

export default {
  Me: connect(mapStateToProps, {})(Me),
  Some: ({ profile }: Props) => <Some profile={profile} />
}
