import { useLoadMyProfileQuery } from '@talent-connect/data-access'
import {
  Caption,
  PipeList,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { GENDERS } from '@talent-connect/shared-config'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadPersonalDetailProfilePropFragment } from './ReadPersonalDetail.generated'

interface Props {
  profile: ReadPersonalDetailProfilePropFragment
  caption?: boolean
}

function ReadPersonalDetail({ profile, caption }: Props) {
  const { gender, age } = profile

  const detailsList: string[] = gender ? [GENDERS[gender]] : []
  if (age) detailsList.push(`${age} years old`)

  if (!gender && !age)
    // Age is temporary disabled until datepicker returns only date (not datetime).
    // Update this placeholder back to 'Input your gender and date of birth', when datepicker is enabled.
    return <Placeholder>Input your gender.</Placeholder>

  return (
    <>
      {caption && <Caption>Personal Details</Caption>}
      <PipeList items={detailsList} />
    </>
  )
}

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <ReadPersonalDetail profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => (
    <ReadPersonalDetail profile={profile} caption />
  ),
}
