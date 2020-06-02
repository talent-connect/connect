import React, { ReactNode, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Button, Heading } from '../atoms'
import { Navbar, SideMenu } from '../organisms'
import { Container, Section, Columns, Content, Modal, Box } from 'react-bulma-components'
import { getRedProfile } from '../../services/auth/auth'
import { matchesFetchStart, matchesMarkAsDismissed } from '../../redux/matches/actions'

import Footer from '../organisms/Footer'
import { RedMatch } from '../../types/RedMatch'

export interface Props {
  children: ReactNode
  matches: RedMatch[]
  matchesFetchStart: () => void
  matchesMarkAsDismissed: (redMatchId: string) => void
}
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
      <Section className="section--bottom-large-spaceing color-half--side-menu section--separator">
        <Container className="color-side-menu">
          <Columns>
            <Columns.Column
              className="side-menu__nav is-2 is-12-touch"
            >
              <SideMenu />
            </Columns.Column>
            <Columns.Column
              className="is-9 is-offset-1 is-12-touch is-offset-0-touch"
            >
              {profile.userType === 'public-sign-up-mentee-pending-review' &&
                <Content>
                  <p>
                    Thanks for signing up! We are reviewing your profile and will send
                    you an email once we're done.
                  </p>
                  <p>You'll be able to find a mentor once your account is active.</p>
                </Content>
              }
              {profile.userType === 'public-sign-up-mentor-pending-review' &&
                <Content>
                  <p>
                    Thanks for signing up! We are reviewing your profile and will send
                    you an email once we're done.
                  </p>
                  <p>
                    Students will be able to apply to become your mentee once your
                    account is active.
                  </p>
                </Content>
              }
              {match && isNewMatch &&
                <Modal show={isNewMatch} showClose={false}>
                  <Modal.Content>
                    <Box>
                      <Heading className="box__heading" size="small">You’ve got a mentor match!</Heading>
                      <Content>
                        Hey {match.mentee && match.mentee.firstName}, good news!
                        {match.mentor && ` ${match.mentor.firstName} ${match.mentor.lastName} `}
                        accepted your application. Here are already a few welcome words from your new mentor.
                      </Content>
                      <Content italic>
                        "{match.mentorReplyMessageOnAccept}"
                      </Content>
                      <Button onClick={() => handleModalClose(match.id as string)}>
                        Go to Dashboard
                      </Button>
                    </Box>
                  </Modal.Content>
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
