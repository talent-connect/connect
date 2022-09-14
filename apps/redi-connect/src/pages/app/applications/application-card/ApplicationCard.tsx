import { Icon } from '@talent-connect/shared-atomic-design-components'
import { RedMatch, RedProfile } from '@talent-connect/shared-types'
import classnames from 'classnames'
import moment from 'moment'
import React, { useState } from 'react'
import { Columns, Content, Heading } from 'react-bulma-components'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../../../redux/types'
import { getHasReachedMenteeLimit } from '../../../../redux/user/selectors'
import { getRedProfileFromLocalStorage } from '../../../../services/auth/auth'
import {
  Avatar,
  ConfirmMentorship,
  DeclineMentorshipButton,
} from '../../../../components/organisms'
import './ApplicationCard.scss'
import {
  REDI_LOCATION_NAMES,
  STATUS_LABELS,
} from '@talent-connect/shared-config'

interface Props {
  application: RedMatch & { createdAt?: string }
  hasReachedMenteeLimit: boolean
  currentUser?: RedProfile
}

const ApplicationCard = ({
  application,
  hasReachedMenteeLimit,
  currentUser,
}: Props) => {
  const history = useHistory()
  const profile = getRedProfileFromLocalStorage()
  const [showDetails, setShowDetails] = useState(false)
  const applicationDate = new Date(application.createdAt || '')
  const applicationUser =
    profile.userType === 'mentee' ? application.mentor : application.mentee
  const currentUserIsMentor = currentUser?.userType === 'mentor'

  return (
    <>
      <div
        className={
          application.status !== 'applied'
            ? 'application-card'
            : 'application-card-pending'
        }
        onClick={() => setShowDetails(!showDetails)}
      >
        <Columns vCentered>
          <Columns.Column className="application-card__avatar">
            <Avatar profile={applicationUser} />
          </Columns.Column>

          <Columns.Column size={3} textAlignment="left">
            {applicationUser && (
              <>
                <p>
                  {applicationUser.firstName} {applicationUser.lastName}
                </p>
                <p>{REDI_LOCATION_NAMES[applicationUser.rediLocation]}</p>
              </>
            )}
          </Columns.Column>

          <Columns.Column textAlignment="centered">
            <span
              className="application-card__link"
              onClick={() =>
                history.push(
                  `/app/applications/profile/${
                    applicationUser && applicationUser.id
                  }`
                )
              }
            >
              Visit Profile
            </span>
          </Columns.Column>

          <Columns.Column textAlignment="centered" tablet={{ narrow: true }}>
            From {moment(applicationDate).format('DD.MM.YYYY')}
          </Columns.Column>

          <Columns.Column
            className={
              application.status === 'applied'
                ? 'application-card-pending__status'
                : null
            }
            textAlignment="centered"
          >
            {STATUS_LABELS[application.status]}
          </Columns.Column>

          <Columns.Column
            className="application-card-dropdown"
            style={{ flexGrow: '0' }}
          >
            <Icon
              icon="chevron"
              size="small"
              className={classnames({ 'icon--rotate': showDetails })}
            />
          </Columns.Column>
        </Columns>
      </div>

      <div
        className={classnames('application-card-details', {
          'application-card-details--show': showDetails,
        })}
      >
        <Heading
          size={6}
          weight="normal"
          renderAs="h3"
          subtitle
          textTransform="uppercase"
        >
          Motivation
        </Heading>
        <Content className="oneandhalf-bs">
          {application.applicationText}
        </Content>

        {application.expectationText && (
          <>
            <Heading
              size={6}
              weight="normal"
              renderAs="h3"
              subtitle
              textTransform="uppercase"
            >
              Expectation
            </Heading>
            <Content>{application.expectationText}</Content>
          </>
        )}
        {currentUserIsMentor && application.status === 'applied' ? (
          <>
            <ConfirmMentorship
              match={application}
              hasReachedMenteeLimit={hasReachedMenteeLimit}
            />
            <DeclineMentorshipButton match={application} />
          </>
        ) : null}
      </div>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentUser: state.user.profile,
  hasReachedMenteeLimit: getHasReachedMenteeLimit(state.user),
})

export default connect(mapStateToProps)(ApplicationCard)
