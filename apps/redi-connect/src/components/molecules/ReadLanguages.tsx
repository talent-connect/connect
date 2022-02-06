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

// TODO: language check due to previous wrong typing?

function Me ({ profile: { languages } }: Props) {
  if (!languages)
    return <Placeholder>Input languages you speak here.</Placeholder>

  return <PipeList items={languages} />
}

function Some ({ profile: { languages } }: Props) {
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
