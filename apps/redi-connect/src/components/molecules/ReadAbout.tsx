import { FunctionComponent } from 'react'
import { Content } from 'react-bulma-components'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  Caption,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'

interface Props {
  profile: RedProfile
}

const Me: FunctionComponent<Props> = ({
  profile: { personalDescription, expectations }
}) => {
  if (!personalDescription && !expectations) {
    return <Placeholder>Please tell us a bit about yourself</Placeholder>
  }

  return (
    <Content>
      {personalDescription && <p>{personalDescription}</p>}
      {expectations && <p>{expectations}</p>}
    </Content>
  )
}

const Some: FunctionComponent<Props> = ({
  profile: { firstName, lastName, personalDescription, expectations }
}) => {
  return (
    <>
      <Caption>
        About {firstName} {lastName}
      </Caption>
      <Content>
        {personalDescription && <p>{personalDescription}</p>}
        {expectations && <p>{expectations}</p>}
      </Content>
    </>
  )
}

const mapStateToProps = ({ user: { profile }}: RootState) => ({ profile })

export default {
  Me: connect(mapStateToProps, {})(Me),
  Some: ({ profile }: Props) => <Some profile={profile} />,
}
