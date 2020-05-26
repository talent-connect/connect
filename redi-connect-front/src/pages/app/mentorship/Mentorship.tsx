import React, { useEffect } from 'react'
import { Columns, Element } from 'react-bulma-components'
import LoggedIn from '../../../components/templates/LoggedIn'
import Heading from '../../../components/atoms/Heading'
import { ProfileCard } from '../../../components/organisms/ProfileCard'
import { RootState } from '../../../redux/types'
import { getMentees } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { matchesFetchStart } from '../../../redux/matches/actions'
import { FullScreenCircle } from '../../../hooks/WithLoading'
import { RedMatch } from '../../../types/RedMatch'

interface Props {
  loading: boolean
  mentees: RedMatch[]
  matchesFetchStart: Function
}

// TODO: add type to Props
function Mentorship ({ loading, mentees, matchesFetchStart }: Props) {
  useEffect(() => {
    matchesFetchStart()
  }, [matchesFetchStart])

  return (
    <LoggedIn>
      <FullScreenCircle loading={loading} />
      {mentees.length === 0 && <>
        <Element>
            Currently you have no mentees.
        </Element>
        <Element>
            We will send you email when students apply for the mentorship.
        </Element>
      </>}
      {mentees.length > 0 && <>
        <Heading size="medium">Your mentees</Heading>
        <Columns>
          {mentees.map(
            (mentee: RedMatch) =>
              mentee.mentee && (
                <Columns.Column size={4} key={mentee.id}>
                  <ProfileCard profile={mentee.mentee} />
                </Columns.Column>
              )
          )}
        </Columns>
      </>}
    </LoggedIn>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  matchesFetchStart: () => dispatch(matchesFetchStart())
})

const mapStateToProps = (state: RootState) => ({
  loading: state.matches.loading,
  mentees: getMentees(state.matches)
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentorship)
