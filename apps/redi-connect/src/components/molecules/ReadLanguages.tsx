import { FunctionComponent } from 'react'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  Caption,
  Placeholder,
  PipeList,
} from '@talent-connect/shared-atomic-design-components'

interface Props {
  profile: RedProfile
}

const Me: FunctionComponent<Props> = ({ profile: { languages } }) => {
  if (!languages)
    return <Placeholder>Input languages you speak here.</Placeholder>

  return <PipeList items={languages} />
}

const Some: FunctionComponent<Props> = ({ profile: { languages } }) => {
  return (
    <>
      <Caption>Languages</Caption>
      {languages && <PipeList items={languages} />}
    </>
  )
}

const mapStateToProps = ({ user: { profile }}: RootState) => ({ profile })

export default {
  Me: connect(mapStateToProps, {})(Me),
  Some: ({ profile }: Props) => <Some profile={profile} />,
}
