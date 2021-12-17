import { FunctionComponent, useEffect } from 'react'
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
import { RedProfile } from '@talent-connect/shared-types';
// CHECK OUT THE LOADER

interface Props {
  loading: boolean;
  saveResult: 'error' | 'submitting',
  profileFetchStart: Function,
  profile: RedProfile
}

const Me: FunctionComponent<Props> = ({
  loading,
  saveResult,
  profileFetchStart,
  profile: { userType, firstName }
}) => {
  useEffect(() => {
    profileFetchStart()
  }, [profileFetchStart])

  if (loading) return <Loader loading={true} />

  const userIsMentee =
    userType === 'mentee' || userType === 'public-sign-up-mentee-pending-review'

  const userIsMentor =
    userType === 'mentor' || userType === 'public-sign-up-mentor-pending-review'

  return (
    <LoggedIn>
      {saveResult === 'error' && <>An error occurred, please try again.</>}
      {saveResult === 'submitting' && <Loader loading={true} />}

      <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
        <Columns.Column size={3}>
          <Avatar.Editable />
        </Columns.Column>
        <Columns.Column size={8}>
          <Heading>Hi, {firstName}</Heading>
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
