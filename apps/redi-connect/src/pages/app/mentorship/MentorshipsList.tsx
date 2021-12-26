import { FC } from 'react'
import { Redirect } from 'react-router'
import { Columns, Content } from 'react-bulma-components'
import LoggedIn from '../../../components/templates/LoggedIn'
import { ProfileCard } from '../../../components/organisms'
import { RootState } from '../../../redux/types'
import { getMatches } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { RedMatch } from '@talent-connect/shared-types'
import { Heading } from '@talent-connect/shared-atomic-design-components'

interface Props {
  matches: RedMatch[]
}

const  MentorshipList: FC<Props> = ({ matches }) => {
  if (matches.length === 1)
    return <Redirect to={`/app/mentorships/${matches[0].id}`} />

  const subHeading =
    matches.length === 0 ? (
      <>
        You currently have no active mentorship. Once a mentee applies to you,
        we will inform you via email and you will see their application in the
        ‘Applications’ section.
      </>
    ) : (
      <>
        You currently mentor <strong>{matches.length} mentees</strong>.
      </>
    )

  return (
    <LoggedIn>
      <Heading size="small" subtitle className="double-bs">
        My mentees
      </Heading>
      <Content
        italic={matches.length === 0}
        size="medium"
        className="double-bs"
        renderAs="p"
        responsive={{ mobile: { hide: { value: true } } }}
      >
        {subHeading}
      </Content>
      <Columns>
        {matches.map(({ id, mentee }) => (
          <Columns.Column size={4} key={id}>
            <ProfileCard
              linkTo={`/app/mentorships/${id}`}
              profile={mentee}
            />
          </Columns.Column>
        ))}
      </Columns>
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  matches: getMatches(state.matches),
})

export default connect(mapStateToProps, null)(MentorshipList)
