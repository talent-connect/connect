import { useLoadMyProfileQuery } from '@talent-connect/data-access'
import {
  Caption,
  PipeList,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadLanguagesProfilePropFragment } from './ReadLanguages.generated'

interface Props {
  profile: ReadLanguagesProfilePropFragment
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

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <Me profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => <Some profile={profile} />,
}
