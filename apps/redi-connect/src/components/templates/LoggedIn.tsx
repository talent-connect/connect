import React, { ReactNode, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Button,
  Icon,
  Loader,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { Navbar, SideMenu } from '../organisms'
import {
  Container,
  Section,
  Columns,
  Content,
  Notification,
} from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import Footer from '../organisms/Footer'
import { RedMatch } from '@talent-connect/shared-types'
import {
  ConnectProfileStatus,
  MentorshipMatchStatus,
  useConMatchMarkMentorshipAcceptedNotificationDismissedMutation,
  useLoadMyProfileQuery,
  useMyMatchesQuery,
} from '@talent-connect/data-access'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { useIsFetching, useIsMutating } from 'react-query'

interface Props {
  children?: ReactNode
}

const RediNotification: React.FC = ({ children }) => (
  <Notification className="account-not-active double-bs">
    <Icon
      className="account-not-active__icon"
      icon="mail"
      size="large"
      space="right"
    />
    <Content dangerouslySetInnerHTML={{ __html: children }} />
  </Notification>
)

function LoggedIn({ children }: Props) {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const myMatchesQuery = useMyMatchesQuery({
    status: MentorshipMatchStatus.Accepted,
  })
  const conMatchMarkMentorshipAcceptedNotificationDismissedMutation =
    useConMatchMarkMentorshipAcceptedNotificationDismissedMutation()
  const ongoingFetchCount = useIsFetching()
  const ongoingMutatationCount = useIsMutating()
  const isFetching = ongoingFetchCount > 0 || ongoingMutatationCount > 0

  const history = useHistory()

  const match =
    myMatchesQuery.isSuccess &&
    myMatchesQuery.data?.conMentorshipMatches.length > 0 &&
    myMatchesQuery.data?.conMentorshipMatches[0]
  const profile = myProfileQuery.data?.conProfile

  const { t } = useTranslation()

  const isNewMatch =
    profile?.userType === 'MENTEE' &&
    match &&
    !match?.hasMenteeDismissedMentorshipApplicationAcceptedNotification

  const handleModalClose = (redMatchId: string) => {
    conMatchMarkMentorshipAcceptedNotificationDismissedMutation.mutate({
      id: redMatchId,
    })
    history.push(`/app/mentorships/${redMatchId}`)
  }

  return (
    <>
      <Navbar />
      <Section className="section--bottom-large-spaceing color-half-tablet section--separator">
        <Container className="color-side-menu">
          <Columns>
            <Columns.Column desktop={{ size: 2 }} className="column--side-menu">
              <SideMenu />
            </Columns.Column>
            <Columns.Column
              desktop={{ size: 9, offset: 1 }}
              className="column--main-content"
            >
              <Loader loading={isFetching} />
              {profile?.userType === 'MENTEE' &&
                profile?.profileStatus === ConnectProfileStatus.Pending && (
                  <RediNotification>
                    {t('loggedInArea.profile.notification.pendingMentee')}
                  </RediNotification>
                )}
              {profile?.userType === 'MENTOR' &&
                profile?.profileStatus === ConnectProfileStatus.Pending && (
                  <RediNotification>
                    {t('loggedInArea.profile.notification.pendingMentor')}
                  </RediNotification>
                )}
              {profile?.userType === 'MENTEE' &&
                profile?.profileStatus === ConnectProfileStatus.Deactivated && (
                  <RediNotification>
                    {t('loggedInArea.profile.notification.deactivatedMentee', {
                      name: profile.firstName,
                      email:
                        '<a href="mailto:paulina@redi-school.org">paulina@red-school.org</a>',
                    })}
                  </RediNotification>
                )}
              {profile?.userType === 'MENTOR' &&
                profile?.profileStatus === ConnectProfileStatus.Deactivated && (
                  <RediNotification>
                    {t('loggedInArea.profile.notification.deactivatedMentor', {
                      name: profile?.firstName,
                      email:
                        '<a href="mailto:miriam@redi-school.org">miriam@redi-school.org</a>',
                    })}
                  </RediNotification>
                )}
              {match && isNewMatch && (
                <Modal
                  show={isNewMatch}
                  confirm
                  title="You’ve got a mentor match!"
                >
                  <Modal.Body>
                    <Content>
                      Hey{' '}
                      <strong>{match.mentee && match.mentee.firstName}</strong>,
                      good news!
                      <strong>
                        {match.mentor && ` ${match.mentor.fullName} `}
                      </strong>
                      accepted your application. Here are already a few welcome
                      words from your new mentor.
                    </Content>
                    <Content italic>
                      "{match.mentorReplyMessageOnAccept}"
                    </Content>
                  </Modal.Body>
                  <Modal.Foot>
                    <Button
                      onClick={() => handleModalClose(match.id as string)}
                    >
                      Go to Mentorship
                    </Button>
                  </Modal.Foot>
                </Modal>
              )}
              {!isFetching && children}
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <Footer />
    </>
  )
}

export default LoggedIn
