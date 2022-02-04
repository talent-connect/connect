import { FC } from 'react'
import { Content } from 'react-bulma-components'
import { connect } from 'react-redux'

import { RedProfile } from '@talent-connect/shared-types'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { EDUCATION_LEVELS } from '@talent-connect/shared-config'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadEducation: FC<Props> = ({
  profile: { mentee_highestEducationLevel },
  shortInfo
}) => {
  if (!mentee_highestEducationLevel)
    return (
      <Placeholder>
        Input your information about your Education here.
      </Placeholder>
    )

  return (
    <>
      {shortInfo &&
        <Caption>Highest Education</Caption>}
      <Content>
        <p>{EDUCATION_LEVELS[mentee_highestEducationLevel]}</p>
      </Content>
    </>
  )
}

export default {
  Me: connect(mapStateToProps, {})(ReadEducation),
  Some: (props: Props) => <ReadEducation {...props} />,
}
