import {
  MentorshipMatchStatus,
  useMyMatchesQuery,
} from '@talent-connect/data-access'
import { Heading } from '@talent-connect/shared-atomic-design-components'
import { Columns, Content } from 'react-bulma-components'
import { Redirect } from 'react-router-dom'
import { ConUserProfileCard } from '../../../components/organisms'
import LoggedIn from '../../../components/templates/LoggedIn'

function MentorshipList() {
  const myMatchesQuery = useMyMatchesQuery({
    filter: { status: MentorshipMatchStatus.Accepted },
  })

  if (!myMatchesQuery.isSuccess) return null

  const myActiveMatches = myMatchesQuery.data.conMentorshipMatches.filter(
    (match) => match.status === MentorshipMatchStatus.Accepted
  )

  if (myActiveMatches.length === 1)
    return <Redirect to={`/app/mentorships/${myActiveMatches[0].id}`} />

  const subHeading =
    myActiveMatches.length === 0 ? (
      <>
        You currently have no active mentorship. Once a mentee applies to you,
        we will inform you via email and you will see their application in the
        ‘Applications’ section.
      </>
    ) : (
      <>
        You currently mentor <strong>{myActiveMatches.length} mentees</strong>.
      </>
    )

  return (
    <LoggedIn>
      <Heading size="small" subtitle className="double-bs">
        My mentees
      </Heading>
      <Content
        italic={myActiveMatches.length === 0}
        size="medium"
        className="double-bs"
        renderAs="p"
      >
        {subHeading}
      </Content>
      <Columns>
        {myActiveMatches.map((match) => (
          <Columns.Column size={4} key={match.id}>
            <ConUserProfileCard
              profile={match.mentee}
              linkTo={`/app/mentorships/${match.id}`}
            />
          </Columns.Column>
        ))}
      </Columns>
    </LoggedIn>
  )
}

export default MentorshipList
