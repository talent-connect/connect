import React from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import PipeList from './PipeList'
import { Caption } from '../atoms'

interface Props {
  profile: RedProfile
}

const Placeholder = () => <Content italic>Input languages you speak here.</Content>

const Me = ({ profile }: Props) => {
  const {
    languages
  } = profile

  if (!languages) return <Placeholder />

  return languages && <PipeList items={languages} />
}

const Some = ({ profile }: Props) => {
  const {
    languages
  } = profile

  return <>
    <Caption>Languages</Caption>
    {languages && <PipeList items={languages} />}
  </>
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

export default {
  Me: connect(mapStateToProps, {})(Me),
  Some: ({ profile }: Props) => <Some profile={profile} />
}
