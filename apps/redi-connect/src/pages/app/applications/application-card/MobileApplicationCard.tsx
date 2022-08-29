import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Columns, Content, Heading } from 'react-bulma-components'
import moment from 'moment'
import classnames from 'classnames'

import { RootState } from '../../../../redux/types'
import { RedMatch, RedProfile } from '@talent-connect/shared-types'
import { getHasReachedMenteeLimit } from '../../../../redux/user/selectors'
import { getRedProfileFromLocalStorage } from '../../../../services/auth/auth'
import {
  REDI_LOCATION_NAMES,
  STATUS_LABELS,
} from '@talent-connect/shared-config'
import { Icon } from '@talent-connect/shared-atomic-design-components'
import {
  Avatar,
  ConfirmMentorship,
  DeclineMentorshipButton,
} from '../../../../components/organisms'
import './MobileApplicationCard.scss'
import eachDayOfInterval from 'date-fns/fp/eachDayOfInterval/index'

interface Props {
  application: RedMatch & { createdAt?: string }
  hasReachedMenteeLimit: boolean
  currentUser?: RedProfile
}

const MobileApplicationCard = ({
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
      <Columns
        breakpoint="mobile"
        className={
          application.status !== 'applied'
            ? 'mobile-application-card'
            : 'mobile-application-card-pending'
        }
        onClick={() => setShowDetails(!showDetails)}
      >
        <Columns.Column className="mobile-application-card__avatar">
          <Avatar profile={applicationUser} />
        </Columns.Column>
        <Columns>
          <Columns.Column>
            {applicationUser && (
              <span
                className="mobile-application-card__link"
                onClick={() =>
                  history.push(
                    `/app/applications/profile/${
                      applicationUser && applicationUser.id
                    }`
                  )
                }
              >
                <p>
                  {applicationUser.firstName} {applicationUser.lastName}
                </p>
              </span>
            )}
          </Columns.Column>
          <Columns.Column>
            {applicationUser && (
              <p>{REDI_LOCATION_NAMES[applicationUser.rediLocation]}</p>
            )}
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column
            className={
              application.status === 'applied'
                ? 'application-card-pending__status'
                : null
            }
          >
            {STATUS_LABELS[application.status]}
          </Columns.Column>
          <Columns.Column>
            {moment(applicationDate).format('DD.MM.YYYY')}
          </Columns.Column>
        </Columns>
        <Columns.Column className="mobile-application-card__icon">
          <Icon
            icon="chevron"
            size="small"
            className={classnames({ 'icon--rotate': showDetails })}
          />
        </Columns.Column>
      </Columns>

      <div
        className={classnames('mobile-application-card-details', {
          'mobile-application-card-details--show': showDetails,
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
          <div className="action-buttons">
            <div>
              <DeclineMentorshipButton match={application} />
            </div>
            <div>
              <ConfirmMentorship
                match={application}
                hasReachedMenteeLimit={hasReachedMenteeLimit}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentUser: state.user.profile,
  hasReachedMenteeLimit: getHasReachedMenteeLimit(state.user),
})

export default connect(mapStateToProps)(MobileApplicationCard)
