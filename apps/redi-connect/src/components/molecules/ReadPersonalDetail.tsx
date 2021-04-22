import React from 'react'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import PipeList from './PipeList'
import { Caption, Placeholder } from '../atoms'
import {
  gendersIdToLabelMap
} from '../../config/config'

interface Props {
  profile: RedProfile
  caption?: boolean
}

const ReadPersonalDetail = ({ profile, caption }: Props) => {
  const {
    gender,
    age
  } = profile

  const detailsList = gender ? [gendersIdToLabelMap[gender]] : []
  if (age) detailsList.push(`${age} years old`)

  if (!gender && !age) return <Placeholder>Input your gender and age.</Placeholder>

  return <>
    {caption && <Caption>Personal Details</Caption>}
    <PipeList items={detailsList} />
  </>
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

export default {
  Me: connect(mapStateToProps, {})(ReadPersonalDetail),
  Some: ({ profile }: Props) => <ReadPersonalDetail profile={profile} caption />
}
