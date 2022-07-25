import {
  MentorshipMatchStatus,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import { Icon } from '@talent-connect/shared-atomic-design-components'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import classnames from 'classnames'
import moment from 'moment'
import { useState } from 'react'
import { Columns, Content, Heading } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { Avatar, ConfirmMentorship } from '../organisms'
import { ApplicationCardApplicationPropFragment } from './ApplicationCard.generated'
import './ApplicationCard.scss'
import DeclineMentorshipButton from './DeclineMentorshipButton'

interface Props {
  application: ApplicationCardApplicationPropFragment
  hasReachedMenteeLimit: boolean
  currentUser?: RedProfile
}

const STATUS_LABELS: any = {
  applied: 'Pending',
  accepted: 'Accepted',
  completed: 'Accepted',
  cancelled: 'Cancelled',
  'declined-by-mentor': 'Declined',
  'invalidated-as-other-mentor-accepted': 'Cancelled',
}

const ApplicationCard = ({
  application,
  hasReachedMenteeLimit,
  currentUser,
}: Props) => {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const history = useHistory()
  const [showDetails, setShowDetails] = useState(false)
  const applicationDate = new Date(application.createdAt || '')
  const applicationUser =
    myProfileQuery.data?.conProfile.userType === 'MENTEE'
      ? application.mentor
      : application.mentee
  const currentUserIsMentor =
    myProfileQuery.data?.conProfile.userType === 'MENTOR'

  return (
    <>
      <div
        className="application-card"
        onClick={() => setShowDetails(!showDetails)}
      >
        <Columns vCentered>
          <Columns.Column size={1} className="application-card__avatar">
            <Avatar profile={applicationUser} />
          </Columns.Column>

          <Columns.Column
            size={3}
            textAlignment="left"
            responsive={{ mobile: { textAlignment: { value: 'centered' } } }}
          >
            {applicationUser && (
              <>
                <p>{applicationUser.fullName}</p>
                <p>{REDI_LOCATION_NAMES[applicationUser.rediLocation]}</p>
              </>
            )}
          </Columns.Column>

          <Columns.Column
            size={2}
            responsive={{ mobile: { textAlignment: { value: 'centered' } } }}
          >
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

          <Columns.Column size={3} textAlignment="centered">
            From {moment(applicationDate).format('DD.MM.YYYY')}
          </Columns.Column>

          <Columns.Column
            size={2}
            responsive={{ mobile: { textAlignment: { value: 'centered' } } }}
            textAlignment="right"
          >
            {STATUS_LABELS[application.status]}
          </Columns.Column>

          <Columns.Column
            size={1}
            className="application-card-dropdown"
            textAlignment="centered"
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
        {currentUserIsMentor &&
        application.status === MentorshipMatchStatus.Applied ? (
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

export default ApplicationCard
