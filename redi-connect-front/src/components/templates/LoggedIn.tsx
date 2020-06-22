import React, { ReactNode, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Button, Icon } from '../atoms'
import { Modal } from '../molecules'
import { Navbar, SideMenu } from '../organisms'
import { Container, Section, Columns, Content, Notification } from 'react-bulma-components'
import { getRedProfile } from '../../services/auth/auth'
import { matchesFetchStart, matchesMarkAsDismissed } from '../../redux/matches/actions'

import Footer from '../organisms/Footer'
import { RedMatch } from '../../types/RedMatch'

interface Props {
  children: ReactNode
  matches: RedMatch[]
  matchesFetchStart: () => void
  matchesMarkAsDismissed: (redMatchId: string) => void
}

const AccountNotReDI: React.FC = ({ children }) => (
  <Notification className="account-not-active double-bs">
    <Icon className="account-not-active__icon" icon="mail" size="large" space="right"/>
    <Content size="small">{children}</Content>
  </Notification>
)

const LoggedIn = ({ children, matches, matchesFetchStart, matchesMarkAsDismissed }: Props) => {
  const profile = getRedProfile()
  const history = useHistory()

  const match = matches && matches.find(match => match.status === 'accepted')

  const isNewMatch =
    profile.userType === 'mentee' &&
    match &&
    !match.hasMenteeDismissedMentorshipApplicationAcceptedNotification

  useEffect(() => {
    matchesFetchStart()
  }, [matchesFetchStart])

  const handleModalClose = (redMatchId: string) => {
    matchesMarkAsDismissed(redMatchId)
    // dashboard will be reafctored and this should be too
    history.push('/app/dashboard')
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
            <Columns.Column desktop={{ size: 9, offset: 1 }} className="column--main-content">
              {profile.userType === 'public-sign-up-mentee-pending-review' &&
                <AccountNotReDI>
                  <strong>Thanks for signing up!</strong> We are reviewing your profile and will send
                    you an email once we're done. You'll be able to find a mentor once your account is active.
                </AccountNotReDI>
              }
              {profile.userType === 'public-sign-up-mentor-pending-review' &&
                <AccountNotReDI>
                  <strong>Thanks for signing up!</strong> We are reviewing your profile and will send
                    you an email once we're done. Students will be able to apply to become your mentee once your
                    account is active.
                </AccountNotReDI>
              }
              {match && isNewMatch &&
                <Modal
                  show={isNewMatch}
                  confirm
                  title="You’ve got a mentor match!"
                >
                  <Content>
                    Hey <strong>{match.mentee && match.mentee.firstName}</strong>, good news!
                    <strong>{match.mentor && ` ${match.mentor.firstName} ${match.mentor.lastName} `}</strong>
                      accepted your application. Here are already a few welcome words from your new mentor.
                  </Content>
                  <Content italic>
                    "{match.mentorReplyMessageOnAccept}"
                  </Content>
                  <Modal.Buttons>
                    <Button onClick={() => handleModalClose(match.id as string)}>
                    Go to Dashboard
                    </Button>
                  </Modal.Buttons>
                </Modal>
              }
              {children}
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <Footer />
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  matchesFetchStart: () => dispatch(matchesFetchStart()),
  matchesMarkAsDismissed: (redMatchId: string) => dispatch(matchesMarkAsDismissed(redMatchId))
})

const mapStateToProps = (state: RootState) => ({
  matches: state.matches.matches
})

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn)
