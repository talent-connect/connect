import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption } from '../atoms'
import { courseIdToLabelMap } from '../../config/config'

interface Props {
  profile: RedProfile
}

const Me = ({ profile }: Props) => {
  const {
    mentee_currentlyEnrolledInCourse
  } = profile

  return <Content>{mentee_currentlyEnrolledInCourse && <p>{courseIdToLabelMap[mentee_currentlyEnrolledInCourse]}</p>}</Content>
}

const Some = ({ profile }: Props) => {
  const {
    mentee_currentlyEnrolledInCourse
  } = profile

  return <>
    <Caption>Redi Class</Caption>
    <Content>{mentee_currentlyEnrolledInCourse && <p>{courseIdToLabelMap[mentee_currentlyEnrolledInCourse]}</p>}</Content>
  </>
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

export default {
  Me: connect(mapStateToProps, {})(Me),
  Some: ({ profile }: Props) => <Some profile={profile} />
}
