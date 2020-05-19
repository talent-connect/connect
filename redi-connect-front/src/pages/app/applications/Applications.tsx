import React, { useEffect } from 'react'
import LoggedIn from '../../../components/templates/LoggedIn'
import { RootState } from '../../../redux/types'
import { getApplicants, getMentees } from '../../../redux/matches/selectors'
import { connect } from 'react-redux'
import { matchesFetchStart } from '../../../redux/matches/actions'
import { FullScreenCircle } from '../../../hooks/WithLoading'
import { RedMatch } from '../../../types/RedMatch'
import { ApplicationCard } from './ApplicationCard'
import ClockwiseRotationIcon from '../../../assets/clockwise-rotation.png'
import {
  Grid,
  Paper,
  Typography,
  Container
} from '@material-ui/core'
import { MenteeCard } from './MenteeCard'

interface Props {
  loading: boolean
  mentees: RedMatch[]
  applicants: RedMatch[]
  matchesFetchStart: Function
}

// TODO: add type to Props
function Applications ({ loading, mentees, applicants, matchesFetchStart }: Props) {
  useEffect(() => {
    matchesFetchStart()
  }, [matchesFetchStart])

  return (
    <LoggedIn>
      <FullScreenCircle loading={loading} />
      {mentees.length === 0 && applicants.length === 0 && (
        <Container maxWidth="sm">
          <Typography variant="h5" align="center">
            Currently you have no applicants or mentees.
          </Typography>
          <Typography align="center">
            <img
              alt="clock"
              src={ClockwiseRotationIcon}
            />
          </Typography>
          <Typography align="center">
            We will send you email when students apply for the mentorship.
          </Typography>
        </Container>
      )}
      {mentees.length > 0 && (
        <Paper >
          <h1>Your mentees</h1>
          <Grid container spacing={1}>
            {mentees.map(
              (mentee: RedMatch) =>
                mentee.mentee && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                    key={mentee.id}
                  >
                    <MenteeCard mentee={mentee.mentee} />
                  </Grid>
                )
            )}
          </Grid>
        </Paper>
      )}
      {applicants.length > 0 && (
        <Paper>
          <h1>Application list</h1>
          <Grid container spacing={1}>
            {applicants.map((application: RedMatch) => (
              <Grid item xs={12} key={application.id}>
                <ApplicationCard application={application} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </LoggedIn>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  matchesFetchStart: () => dispatch(matchesFetchStart())
})

const mapStateToProps = (state: RootState) => ({
  loading: state.matches.loading,
  mentees: getMentees(state.matches),
  applicants: getApplicants(state.matches)
})

export default connect(mapStateToProps, mapDispatchToProps)(Applications)
