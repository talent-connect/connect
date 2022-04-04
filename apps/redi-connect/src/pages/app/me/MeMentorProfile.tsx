import {
  Heading,
  Loader,
} from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import { connect } from 'react-redux'
import {
  Avatar,
  EditableAbout,
  EditableContactDetails,
  EditableLanguages,
  EditableMenteeCount,
  EditableOccupation,
  EditablePersonalDetail,
  EditableSocialMedia,
} from '../../../components/organisms'
import EditableMentoringGoals from '../../../components/organisms/EditableMentoringGoals'
import EditableMentoringTopicsNew2022 from '../../../components/organisms/EditableMentoringTopicsNew2022'
import EditableProfessionalExperienceFields from '../../../components/organisms/EditableProfessionalExperienceFields'
import { LoggedIn } from '../../../components/templates'
import { RootState } from '../../../redux/types'
import { profileFetchStart } from '../../../redux/user/actions'

const MeMentorProfile = ({ loading, saveResult, profile }: any) => {
  if (loading) return <Loader loading={true} />

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
            Please fill out your profile. Let potential mentees know a little
            bit more about you, so you can find the perfect fit. If you have
            filled out your profile: Great! Make sure you keep it up to date.
          </Content>
        </Columns.Column>
      </Columns>
      <Element
        className="block-separator"
        responsive={{ tablet: { hide: { value: true } } }}
      >
        <Content size="medium" renderAs="p">
          Please fill out your profile. Let potential mentees know a little bit
          more about you, so you can find the perfect fit. If you have filled
          out your profile: Great! Make sure you keep it up to date.
        </Content>
      </Element>
      <Element className="block-separator">
        <EditableAbout />
      </Element>

      <Element className="block-separator">
        <Columns>
          <Columns.Column size={12}>
            <EditableMenteeCount />
          </Columns.Column>
        </Columns>
      </Element>

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

      <Element className="block-separator">
        <Columns>
          <Columns.Column size={6}>
            <EditableOccupation />
          </Columns.Column>
        </Columns>
      </Element>

      <Element className="block-separator">
        <Columns>
          <Columns.Column size={6}>
            <EditableMentoringGoals />
          </Columns.Column>
          <Columns.Column size={6}>
            <EditableProfessionalExperienceFields />
          </Columns.Column>
        </Columns>
      </Element>

      <Element className="block-separator">
        <EditableMentoringTopicsNew2022 />
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

export default connect(mapStateToProps, mapDispatchToProps)(MeMentorProfile)
