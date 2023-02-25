import {
  Caption,
  PipeList,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { GENDERS } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

interface Props {
  profile: RedProfile
  caption?: boolean
}

const ReadPersonalDetail = ({ profile, caption }: Props) => {
  const { gender, birthDate } = profile

  const age = moment().diff(birthDate, 'years')

  const detailsList: string[] = gender ? [GENDERS[gender]] : []
  if (age) detailsList.push(`${age} years old`)

  if (!gender && !age)
    return <Placeholder>Input your gender and date of birth.</Placeholder>

  return (
    <>
      {caption && <Caption>Personal Details</Caption>}
      <PipeList items={detailsList} />
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

export default {
  Me: connect(mapStateToProps, {})(ReadPersonalDetail),
  Some: ({ profile }: Props) => (
    <ReadPersonalDetail profile={profile} caption />
  ),
}
