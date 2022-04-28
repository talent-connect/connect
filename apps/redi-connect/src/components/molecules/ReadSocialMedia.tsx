import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Content } from 'react-bulma-components'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'

interface Props {
  profile: Pick<
    ConProfile,
    'linkedInProfileUrl' | 'githubProfileUrl' | 'slackUsername'
  >
  shortInfo?: boolean
}

const ReadSocialMedia = ({ profile, shortInfo }: Props) => {
  const { linkedInProfileUrl, githubProfileUrl, slackUsername } = profile

  if (
    !shortInfo &&
    !linkedInProfileUrl &&
    !githubProfileUrl &&
    !slackUsername
  ) {
    return <Placeholder>Input your social media channels here.</Placeholder>
  }

  return (
    <>
      {shortInfo && <Caption>Social Media</Caption>}
      <Content>
        {linkedInProfileUrl && (
          <p>
            <a
              href={linkedInProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkedInProfileUrl}
            </a>
          </p>
        )}
        {githubProfileUrl && (
          <p>
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {githubProfileUrl}
            </a>
          </p>
        )}
        {slackUsername && <p>{slackUsername}</p>}
      </Content>
    </>
  )
}

export default {
  Me: () => {
    const loopbackUserId = getAccessTokenFromLocalStorage().userId
    const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

    if (!myProfileQuery.isSuccess) return null

    return <ReadSocialMedia profile={myProfileQuery.data.conProfile} />
  },
  Some: ({ profile }: Props) => <ReadSocialMedia profile={profile} shortInfo />,
}
