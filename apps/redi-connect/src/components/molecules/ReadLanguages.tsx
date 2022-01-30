import { FC } from 'react'
import { connect } from 'react-redux'

import { RedProfile } from '@talent-connect/shared-types'
import {
  Caption,
  Placeholder,
  PipeList,
} from '@talent-connect/shared-atomic-design-components'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
}

const Me: FC<Props> = ({ profile: { languages } }) => {
  if (!languages)
    return <Placeholder>Input languages you speak here.</Placeholder>

  return <PipeList items={languages} />
}

const Some: FC<Props> = ({ profile: { languages } }) => {
  return (
    <>
      <Caption>Languages</Caption>
      {languages &&
        <PipeList items={languages} />}
    </>
  )
}

export default {
  /** */
  Me: connect(mapStateToProps, {})(Me),
  /** */
  Some: (props: Props) => <Some {...props} />,
}
