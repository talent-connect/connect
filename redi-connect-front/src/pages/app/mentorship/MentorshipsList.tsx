import React from 'react'
import { Redirect } from 'react-router'
import { Columns, Content } from 'react-bulma-components'
import LoggedIn from '../../../components/templates/LoggedIn'
import Heading from '../../../components/atoms/Heading'
import { ProfileCard } from '../../../components/organisms'
import { RootState } from '../../../redux/types'
import { getMatches } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { RedMatch } from '../../../types/RedMatch'

interface Props {
  mentees: RedMatch[]
}

function MentorshipList ({ mentees }: Props) {
  if (mentees.length === 1) return <Redirect to={`/app/mentorships/${mentees[0].mentee.id}`} />

  return (
    <LoggedIn>
      <Heading size="small" subtitle className="double-bs" >My mentees</Heading>
      {mentees.length === 0 && <>
        <Content italic size="medium" className="double-bs" renderAs="p" responsive={{ mobile: { hide: { value: true } } }}>
            Currently you have no mentees. We will send you email when students apply for the mentorship.
        </Content>
      </>}

      {(mentees.length > 1) && <>
        <Content size="medium" className="double-bs" renderAs="p" responsive={{ mobile: { hide: { value: true } } }}>
          You currently mentor <strong>{mentees.length} mentees</strong>.
        </Content>

        <Columns>
          {mentees.map(
            (mentee: RedMatch) =>
              mentee.mentee && (
                <Columns.Column size={4} key={mentee.id}>
                  <ProfileCard
                    linkTo={`/app/mentorships/${mentee.mentee.id}`}
                    profile={mentee.mentee} />
                </Columns.Column>
              )
          )}
        </Columns>
      </>}
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  mentees: getMatches(state.matches)
})

export default connect(mapStateToProps, null)(MentorshipList)
