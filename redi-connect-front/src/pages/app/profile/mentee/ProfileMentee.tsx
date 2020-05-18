import React from 'react'
import { RedProfile } from '../../../../types/RedProfile'
import { Theme, createStyles, withStyles, Grid } from '@material-ui/core'
import { ProfileName } from '../../../../components/ProfileName'
import { ProfileOccupation } from '../../../../components/ProfileOccupation'
import { ProfileWorkPlace } from '../../../../components/ProfileWorkPlace'
import { ProfileLanguages } from '../../../../components/ProfileLanguages'
import { CategoryChip } from '../../../../components/CategoryChip'
// import { Avatar } from '../../../../components/Avatar'
import { ProfileCourse } from '../../../../components/ProfileCourse'
import { ConnectButton } from '../../../../components/ConnectButton'
import { ContactInfo } from '../../../../components/ContactInfo'

interface Props {
  mentee: RedProfile
  classes: {
    avatar: string
    category: string
    personalDescription: string
  }
}

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      width: '100px',
      height: '100px'
    },
    category: {
      color: 'white',
      fontSize: '12px',
      margin: '3px',
      height: '20px'
    },
    personalDescription: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      overflowWrap: 'break-word'
    }
  })

export const ProfileMentee = withStyles(styles)(
  ({ mentee, classes }: Props) => {
    const match =
      mentee.redMatchesWithCurrentUser && mentee.redMatchesWithCurrentUser[0]
    const occupation = occupationFormatter(mentee)
    const workPlace = workPlaceFormatter(mentee)
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            {/* <Avatar
              className={classes.avatar}
              s3Key={mentee.profileAvatarImageS3Key}
              style={{ width: '100%', height: '20vh' }}
            /> */}
          </Grid>
          <Grid item xs={12} sm={7}>
            <h3 style={{ fontWeight: 700, fontFamily: 'Roboto', margin: 0 }}>
              <ProfileName name={`${mentee.firstName} ${mentee.lastName}`} />
            </h3>
            <ProfileCourse courseId={mentee.mentee_currentlyEnrolledInCourse} />
            {occupation && <ProfileOccupation occupation={occupation} />}
            {workPlace && <ProfileWorkPlace workPlace={workPlace} />}
            <ProfileLanguages languages={mentee.languages} />
          </Grid>
        </Grid>

        <p>I want help with:</p>
        {mentee.categories.map(catId => (
          <CategoryChip
            key={catId}
            className={classes.category}
            categoryId={catId}
          />
        ))}
        <p className={classes.personalDescription}>
          {mentee.personalDescription}
        </p>
        {mentee.expectations && (
          <>
            <h4 style={{ marginBottom: 0 }}>Expectations to my mentor:</h4>
            <p
              className={classes.personalDescription}
              style={{ marginTop: '0.3em' }}
            >
              {mentee.expectations}
            </p>
          </>
        )}

        {match && match.status === 'applied' && (
          <>
            <h3>Application message from the student</h3>
            <p style={{ overflowWrap: 'break-word' }}>
              {match.applicationText}
            </p>
            <ContactInfo profile={mentee} />
            <p>Feel free to communicate with your potential mentee before accepting their mentorship request.</p>
            <Grid container justify="center">
              <ConnectButton matchId={match.id} />
            </Grid>
          </>
        )}
      </>
    )
  }
)

const occupationFormatter = (mentee: RedProfile) => {
  switch (mentee.mentee_occupationCategoryId) {
    case 'job':
      return (
        'Job' +
        (mentee.mentee_occupationJob_position
          ? ` (${mentee.mentee_occupationJob_position})`
          : '')
      )
    case 'student':
      return (
        'Student' +
        (mentee.mentee_occupationStudent_studyName
          ? ` (${mentee.mentee_occupationStudent_studyName})`
          : '')
      )
    case 'lookingForJob':
      return (
        'Looking for a job' +
        (mentee.mentee_occupationLookingForJob_what
          ? ` ${mentee.mentee_occupationLookingForJob_what})`
          : '')
      )
    case 'other':
      return mentee.mentee_occupationOther_description
    default:
      return undefined
  }
}

const workPlaceFormatter = (mentee: RedProfile) => {
  switch (mentee.mentee_occupationCategoryId) {
    case 'job':
      return mentee.mentee_occupationJob_placeOfEmployment
    case 'student':
      return mentee.mentee_occupationStudent_studyPlace
    case 'lookingForJob':
    case 'other':
    default:
      return undefined
  }
}
