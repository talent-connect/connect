import { FC } from 'react'
import { Content } from 'react-bulma-components'
import { connect } from 'react-redux'

import { Caption } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
  shortInfo?: boolean
}

const ReadContactDetails: FC<Props> = ({
  profile: { firstName, lastName, contactEmail, telephoneNumber },
  shortInfo
}) => {
  return (
    <>
      {shortInfo && <Caption>Contact Details</Caption>}
      <Content>
        {contactEmail && <p>{contactEmail}</p>}
        {!shortInfo && (firstName || lastName) && (
          <p>
            {firstName} {lastName}
          </p>
        )}
        {telephoneNumber && <p>{telephoneNumber}</p>}
      </Content>
    </>
  )
}

export default {
  /** */
  Me: connect(mapStateToProps, {})(ReadContactDetails),
  /** */
  Some: (props: Props) => <ReadContactDetails {...props} />,
}
