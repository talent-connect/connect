import {
  MentorshipMatchStatus,
  useMyMatchesQuery,
} from '@talent-connect/data-access'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Columns, Content } from 'react-bulma-components'
import { Redirect } from 'react-router-dom'
import { ProfileCard } from '../../../components/organisms'
import LoggedIn from '../../../components/templates/LoggedIn'

function MentorshipList() {
  const myMatchesQuery = useMyMatchesQuery({
    status: MentorshipMatchStatus.Accepted,
  })

  if (!myMatchesQuery.isSuccess) return null

  const myMatches = myMatchesQuery.data.conMentorshipMatches

  if (myMatches.length === 1)
    return <Redirect to={`/app/mentorships/${myMatches[0].id}`} />

  const subHeading =
    myMatches.length === 0 ? (
      <>
        You currently have no active mentorship. Once a mentee applies to you,
        we will inform you via email and you will see their application in the
        ‘Applications’ section.
      </>
    ) : (
      <>
        You currently mentor <strong>{myMatches.length} mentees</strong>.
      </>
    )

  return (
    <LoggedIn>
      <Heading size="small" subtitle className="double-bs">
        My mentees
      </Heading>
      <Content
        italic={myMatches.length === 0}
        size="medium"
        className="double-bs"
        renderAs="p"
        responsive={{ mobile: { hide: { value: true } } }}
      >
        {subHeading}
      </Content>
      <Columns>
        {myMatches.map((match) => (
          <Columns.Column size={4} key={match.id}>
            <ProfileCard
              linkTo={`/app/mentorships/${match.id}`}
              profile={match.mentee}
            />
          </Columns.Column>
        ))}
      </Columns>
    </LoggedIn>
  )
}

export default MentorshipList
