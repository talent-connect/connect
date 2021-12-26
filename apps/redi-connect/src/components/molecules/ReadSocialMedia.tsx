import { FC } from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadSocialMedia: FC<Props> = ({
  profile: { linkedInProfileUrl, githubProfileUrl, slackUsername },
  shortInfo
}) => {

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

const mapStateToProps = ({ user: { profile }}: RootState) => ({ profile })

export default {
  Me: connect(mapStateToProps, {})(ReadSocialMedia),
  Some: ({ profile }: Props) => <ReadSocialMedia profile={profile} shortInfo />,
}
