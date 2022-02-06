import { connect } from 'react-redux'

import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

function ReadSocialMedia ({
  profile: { linkedInProfileUrl, githubProfileUrl, slackUsername },
  shortInfo = false
}: Props) {

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
      {shortInfo &&
        <Caption>Social Media</Caption>}
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
          </p>)}
        {githubProfileUrl && (
          <p>
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {githubProfileUrl}
            </a>
          </p>)}
        {slackUsername &&
          <p>{slackUsername}</p>}
      </Content>
    </>
  )
}

export default {
  /** */
  Me: connect(mapStateToProps, {})(ReadSocialMedia),
  /** */
  Some: (props: Props) => <ReadSocialMedia {...props} />,
}
