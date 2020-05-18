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

import './Me.scss'

const Me = ({ loading, saveResult, profileFetchStart, profile }: any) => {
  // const [uploadInput, setUploadInput] = useState<HTMLInputElement>()

  // not sure if this is really needed since the profile is loaded when the user is logged in
  useEffect(() => {
    profileFetchStart()
  }, [profileFetchStart])

  return (
    <LoggedIn>
      {loading && 'page loading...'}
      {saveResult === 'error' && <><br/><br/><br/>An error occurred, please try again.</>}
      {!loading &&
        <>
          {saveResult === 'submitting' && 'part of the page loading...'}

          <Columns vCentered breakpoint="mobile">
            <Columns.Column size={3}>
              <Avatar />
            </Columns.Column>
            <Columns.Column size={8}>
              <Heading>Hi, {profile.firstName}</Heading>
              <Content size="medium" renderAs="p">
              You have completed 15% of your profile. Let potential mentors know a little bit more about you, so you can find the perfect fit.
              </Content>
            </Columns.Column>
          </Columns>

          <Element className="me__block">
            <About />
          </Element>

          <Element className="me__block">
            <Mentoring />
          </Element>

          <Element className="me__block">
            <Columns>
              <Columns.Column size={6}>
                <Contacts/>
              </Columns.Column>
              <Columns.Column size={6}>
                <SocialMedia/>
              </Columns.Column>
            </Columns>
          </Element>

          <Element className="me__block">
            <Columns>
              <Columns.Column size={6}>
                <PersonalDetail/>
              </Columns.Column>
              <Columns.Column size={6}>
                <Languages/>
              </Columns.Column>
            </Columns>
          </Element>

          <Element className="me__block">
            <Columns>
              <Columns.Column size={6}>
                <Occupation/>
              </Columns.Column>
              <Columns.Column size={6}>
                { profile.userType === 'mentee' && <RediClass/>}
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
