import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { profileFetchStart } from '../../../redux/user/actions'
import { Columns, Content, Element } from 'react-bulma-components'
import {
  Heading,
  Loader,
} from '@talent-connect/shared-atomic-design-components'
import {
  Avatar,
  EditableAbout,
  EditableContactDetails,
  EditableEducation,
  EditableLanguages,
  EditableMentoringTopics,
  EditableOccupation,
  EditablePersonalDetail,
  EditableRediClass,
  EditableSocialMedia,
  EditableMenteeCount,
} from '../../../components/organisms'

import { LoggedIn } from '../../../components/templates'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'

import { useLoadMyProfileQuery } from '@talent-connect/data-access'
// CHECK OUT THE LOADER

const Me = ({ loading, saveResult, profileFetchStart, profile }: any) => {
  const myProfileResult = useLoadMyProfileQuery({
    loopbackUserId: getAccessTokenFromLocalStorage().userId,
  })

  useEffect(() => {
    profileFetchStart()
  }, [profileFetchStart])

  if (myProfileResult.isLoading || loading) return <Loader loading={true} />
  if (myProfileResult.isLoading) return <Loader loading={true} />

  // TODO: insert proper error handling here and elsewhere. We should cover cases where we
  // get values usch as myProfileResult.isError. Perhaps we-ure the error boundary logic
  // that Eric has been looking into.

  const conProfile = myProfileResult.data.conProfile

  console.log(conProfile)

  const userIsMentee =
    profile.userType === 'mentee' ||
    profile.userType === 'public-sign-up-mentee-pending-review'

  const userIsMentor =
    profile.userType === 'mentor' ||
    profile.userType === 'public-sign-up-mentor-pending-review'

  return (
    <LoggedIn>
      {saveResult === 'error' && <>An error occurred, please try again.</>}
      {saveResult === 'submitting' && <Loader loading={true} />}

      <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
        <Columns.Column size={3}>
          <Avatar.Editable />
        </Columns.Column>
        <Columns.Column size={8}>
          <Heading>Hi, {profile.firstName}</Heading>
          <Content
            size="medium"
            renderAs="p"
            responsive={{ mobile: { hide: { value: true } } }}
          >
            {`Please fill out your profile. Let potential ${
              userIsMentee ? 'mentors' : 'mentees'
            } know a little bit more about you, so you can find the perfect fit. If you have filled out your profile: Great! Make sure you keep it up to date.`}
          </Content>
        </Columns.Column>
      </Columns>
      <Element
        className="block-separator"
        responsive={{ tablet: { hide: { value: true } } }}
      >
        <Content size="medium" renderAs="p">
          {`Please fill out your profile. Let potential ${
            userIsMentee ? 'mentors' : 'mentees'
          } know a little bit more about you, so you can find the perfect fit. If you have filled out your profile: Great! Make sure you keep it up to date.`}
        </Content>
      </Element>
      <Element className="block-separator">
        <EditableAbout />
      </Element>

      <Element className="block-separator">
        <EditableMentoringTopics />
      </Element>

      {userIsMentor && (
        <Element className="block-separator">
          <Columns>
            <Columns.Column size={12}>
              <EditableMenteeCount />
            </Columns.Column>
          </Columns>
        </Element>
      )}

      <Element className="block-separator">
        <Columns>
          <Columns.Column size={6}>
            <Element className="block-separator">
              <EditableContactDetails />
            </Element>
          </Columns.Column>
          <Columns.Column size={6}>
            <EditableSocialMedia />
          </Columns.Column>
        </Columns>
      </Element>

      <Element className="block-separator">
        <Columns>
          <Columns.Column size={6}>
            <Element className="block-separator">
              <EditablePersonalDetail />
            </Element>
          </Columns.Column>
          <Columns.Column size={6}>
            <EditableLanguages />
          </Columns.Column>
        </Columns>
      </Element>

      {userIsMentee && (
        <Element className="block-separator">
          <Columns>
            <Columns.Column size={6}>
              <Element className="block-separator">
                <EditableEducation />
              </Element>
            </Columns.Column>
            <Columns.Column size={6}>
              <EditableRediClass />
            </Columns.Column>
          </Columns>
        </Element>
      )}

      <Element className="block-separator">
        <Columns>
          <Columns.Column size={6}>
            <EditableOccupation />
          </Columns.Column>
        </Columns>
      </Element>
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  saveResult: state.user.saveResult,
  loading: state.user.loading,
  profile: state.user.profile,
})

const mapDispatchToProps = (dispatch: any) => ({
  profileFetchStart: () => dispatch(profileFetchStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Me)
