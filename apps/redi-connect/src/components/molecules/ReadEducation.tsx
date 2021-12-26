import { FunctionComponent } from 'react'
import { Content } from 'react-bulma-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { EDUCATION_LEVELS } from '@talent-connect/shared-config'

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadEducation: FunctionComponent<Props> = ({
  profile: { mentee_highestEducationLevel },
  shortInfo
}) => {
  if (!mentee_highestEducationLevel) {
    return (
      <Placeholder>
        Input your information about your Education here.
      </Placeholder>
    )
  }

  return (
    <>
      {shortInfo && <Caption>Highest Education</Caption>}
      <Content>
        <p>{EDUCATION_LEVELS[mentee_highestEducationLevel]}</p>
      </Content>
    </>
  )
}

const mapStateToProps = ({ user: { profile }}: RootState) => ({ profile })

export default {
  Me: connect(mapStateToProps, {})(ReadEducation),
  Some: ({ profile }: Props) => <ReadEducation profile={profile} shortInfo />,
}
