import React, { useEffect } from 'react'

import { Columns, Content, Element } from 'react-bulma-components'
import Heading from '../../../components/atoms/Heading'
import Avatar from '../../../components/organisms/Avatar'

import About from './About'
import Mentoring from './Mentoring'
import Contacts from './Contacts'
import SocialMedia from './SocialMedia'
import PersonalDetail from './PersonalDetail'
import Languages from './Languages'
import RediClass from './RediClass'
import Occupation from './Occupation'

import LoggedIn from '../../../components/templates/LoggedIn'
// CHECK OUT THE LOADER
// import { FullScreenCircle } from '../../../hooks/WithLoading'
import { RootState } from '../../../redux/types'
import { connect } from 'react-redux'
import {
  profileFetchStart
} from '../../../redux/user/actions'

const Me = ({ loading, saveResult, profileFetchStart, profile }: any) => {
  // const [uploadInput, setUploadInput] = useState<HTMLInputElement>()

  // not sure if this is really needed since the profile is loaded when the user is logged in
  useEffect(() => {
    profileFetchStart()
  }, [profileFetchStart])

  return (
    <LoggedIn>
      {loading && 'page loading...'}
      {saveResult === 'error' && <><br /><br /><br />An error occurred, please try again.</>}
      {!loading &&
        <>
          {saveResult === 'submitting' && 'part of the page loading...'}

          <Columns vCentered breakpoint="mobile">
            <Columns.Column size={3}>
              <Avatar />
            </Columns.Column>
            <Columns.Column size={8}>
              <Heading>Hi, {profile.firstName}</Heading>
              <Content size="medium" renderAs="p" responsive={{ mobile: { hide: { value: true } } }}>
                You have completed 15% of your profile. Let potential mentors know a little bit more about you, so you can find the perfect fit.
              </Content>
            </Columns.Column>
          </Columns>
          <Element className="block-separator" responsive={{ tablet: { hide: { value: true } } }}>
            <Content size="medium" renderAs="p">
              You have completed 15% of your profile. Let potential mentors know a little bit more about you, so you can find the perfect fit.
            </Content>
          </Element>
          <Element className="block-separator">
            <About />
          </Element>

          <Element className="block-separator">
            <Mentoring />
          </Element>

          <Element className="block-separator">
            <Columns>
              <Columns.Column size={6}>
                <Element className="block-separator">
                  <Contacts />
                </Element>
              </Columns.Column>
              <Columns.Column size={6}>
                <SocialMedia />
              </Columns.Column>
            </Columns>
          </Element>

          <Element className="block-separator">
            <Columns>
              <Columns.Column size={6}>
                <Element className="block-separator">
                  <PersonalDetail />
                </Element>
              </Columns.Column>
              <Columns.Column size={6}>
                <Languages />
              </Columns.Column>
            </Columns>
          </Element>

          <Element className="block-separator">
            <Columns>
              <Columns.Column size={6}>
                <Element className="block-separator">
                  <Occupation />
                </Element>
              </Columns.Column>
              <Columns.Column size={6}>
                {profile.userType === 'mentee' && <RediClass />}
              </Columns.Column>
            </Columns>
          </Element>
        </>
      }
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  saveResult: state.user.saveResult,
  loading: state.user.loading,
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileFetchStart: () => dispatch(profileFetchStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Me)
