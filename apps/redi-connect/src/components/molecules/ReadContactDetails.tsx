import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption } from '../atoms'

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadContactDetails = ({ profile, shortInfo }: Props) => {
  const { firstName, lastName, contactEmail, telephoneNumber } = profile

  return (
    <>
      {shortInfo && <Caption>Contact Details</Caption>}
      <Content>
        {contactEmail && <p>{contactEmail}</p>}
        {!shortInfo && (firstName || lastName) && (
          <p>
            {firstName} {lastName}
          </p>
        )}
        {telephoneNumber && <p>{telephoneNumber}</p>}
      </Content>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadContactDetails),
  Some: ({ profile }: Props) => (
    <ReadContactDetails profile={profile} shortInfo />
  ),
}
