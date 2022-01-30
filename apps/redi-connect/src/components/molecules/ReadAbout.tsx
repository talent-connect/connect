import { FC } from 'react'
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

const Me: FC<Props> = ({ profile: { personalDescription, expectations }}) => {
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

const Some: FC<Props> = ({
  profile: { firstName, lastName, personalDescription, expectations }
}) => {
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
