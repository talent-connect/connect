import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption, Placeholder } from '../atoms'

interface Props {
  profile: RedProfile
}

const Me = ({ profile }: Props) => {
  const {
    linkedInProfileUrl,
    githubProfileUrl,
    slackUsername
  } = profile

  if (!linkedInProfileUrl && !githubProfileUrl && !slackUsername) {
    return <Placeholder>Input your social media channels here.</Placeholder>
  }

  return (
    <Content>
      {linkedInProfileUrl && <p>{linkedInProfileUrl}</p>}
      {githubProfileUrl && <p>{githubProfileUrl}</p>}
      {slackUsername && <p>{slackUsername}</p>}
    </Content>
  )
}

const Some = ({ profile }: Props) => {
  const {
    linkedInProfileUrl,
    githubProfileUrl,
    slackUsername
  } = profile

  return <>
    <Caption>Social Media</Caption>
    <Content>
      {linkedInProfileUrl && <p>{linkedInProfileUrl}</p>}
      {githubProfileUrl && <p>{githubProfileUrl}</p>}
      {slackUsername && <p>{slackUsername}</p>}
    </Content>
  </>
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

export default {
  Me: connect(mapStateToProps, {})(Me),
  Some: ({ profile }: Props) => <Some profile={profile} />
}
