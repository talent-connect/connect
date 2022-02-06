import { Content } from 'react-bulma-components'
import { connect } from 'react-redux'

import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
}

function Me ({ profile: { personalDescription, expectations }}: Props) {
  if (!personalDescription && !expectations)
    return <Placeholder>Please tell us a bit about yourself</Placeholder>

  return (
    <Content>
      {personalDescription &&
        <p>{personalDescription}</p>}
      {expectations &&
        <p>{expectations}</p>}
    </Content>
  )
}

function Some ({
  profile: { firstName, lastName, personalDescription, expectations }
}: Props) {
  return (
    <>
      <Caption>
        About {firstName} {lastName}
      </Caption>
      <Content>
        {personalDescription &&
          <p>{personalDescription}</p>}
        {expectations &&
          <p>{expectations}</p>}
      </Content>
    </>
  )
}

export default {
  /** */
  Me: connect(mapStateToProps, {})(Me),
  /** */
  Some: (props: Props) => <Some {...props} />,
}
