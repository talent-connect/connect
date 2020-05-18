import { createStyles, Grid, Theme, withStyles } from '@material-ui/core'
import React from 'react'
// import { Avatar } from '../../../../components/Avatar'
import { CategoryChip } from '../../../../components/CategoryChip'
import { ProfileAvailableMenteeSlots } from '../../../../components/ProfileAvailableMenteeSlots'
import { ProfileLanguages } from '../../../../components/ProfileLanguages'
import { ProfileName } from '../../../../components/ProfileName'
import { ProfileOccupation } from '../../../../components/ProfileOccupation'
import { ProfileWorkPlace } from '../../../../components/ProfileWorkPlace'
import { RedProfile } from '../../../../types/RedProfile'
import { ConnectionRequestForm } from './ConnectionRequestForm'
import { getRedProfile } from '../../../../services/auth/auth'

interface Props {
  mentor: RedProfile
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

export const ProfileMentor = withStyles(styles)(
  ({ mentor, classes }: Props) => {
    const profile = getRedProfile()

    return <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          {/* <Avatar
            className={classes.avatar}
            s3Key={mentor.profileAvatarImageS3Key}
            style={{ width: '100%', height: '20vh' }}
          /> */}
        </Grid>
        <Grid item xs={12} sm={7}>
          <h3 style={{ fontWeight: 700, fontFamily: 'Roboto' }}>
            <ProfileName name={`${mentor.firstName} ${mentor.lastName}`} />
            <ProfileOccupation occupation={mentor.mentor_occupation} />
            <ProfileWorkPlace workPlace={mentor.mentor_workPlace} />
            <ProfileLanguages languages={mentor.languages} />
          </h3>
        </Grid>
      </Grid>

      <ProfileAvailableMenteeSlots
        totalCapacity={mentor.menteeCountCapacity}
        currentFreeCapacity={mentor.currentFreeMenteeSpots}
      />
      <p>I can help you with:</p>
      {mentor.categories.map(catId => (
        <CategoryChip
          key={catId}
          className={classes.category}
          categoryId={catId}
        />
      ))}
      <p className={classes.personalDescription}>
        {mentor.personalDescription}
      </p>
      {mentor.expectations && (
        <>
          <h4 style={{ marginBottom: 0 }}>Expectations to my mentee:</h4>
          <p
            className={classes.personalDescription}
            style={{ marginTop: '0.3em' }}
          >
            {mentor.expectations}
          </p>
        </>
      )}

      {(mentor.numberOfPendingApplicationWithCurrentUser === 0 && profile.userType === 'mentee') && (
        <ConnectionRequestForm mentorId={mentor.id} />
      )}
      {mentor.numberOfPendingApplicationWithCurrentUser > 0 && (
        <p>You have already applied to this mentor.</p>
      )}
    </>
  }
)
