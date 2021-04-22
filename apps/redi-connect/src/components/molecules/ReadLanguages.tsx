import React from 'react'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import PipeList from './PipeList'
import { Caption, Placeholder } from '../atoms'

interface Props {
  profile: RedProfile
}

const Me = ({ profile }: Props) => {
  const { languages } = profile

  if (!languages)
    return <Placeholder>Input languages you speak here.</Placeholder>

  return <PipeList items={languages} />
}

const Some = ({ profile }: Props) => {
  const { languages } = profile

  return (
    <>
      <Caption>Languages</Caption>
      {languages && <PipeList items={languages} />}
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(Me),
  Some: ({ profile }: Props) => <Some profile={profile} />,
}
