import { FC } from 'react'
import { Content } from 'react-bulma-components'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Caption } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'

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

const mapStateToProps = ({ user: { profile }}: RootState) => ({ profile })

export default {
  Me: connect(mapStateToProps, {})(ReadContactDetails),
  Some: ({ profile }: Props) => (
    <ReadContactDetails profile={profile} shortInfo />
  ),
}
