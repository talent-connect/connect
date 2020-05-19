import { createStyles, Grid, Theme, withStyles } from '@material-ui/core'
import React from 'react'
import { Avatar } from '../../../../components/Avatar'
import { CategoryChip } from '../../../../components/CategoryChip'
import { ProfileAvailableMenteeSlots } from '../../../../components/ProfileAvailableMenteeSlots'
import { ProfileLanguages } from '../../../../components/ProfileLanguages'
import { ProfileName } from '../../../../components/ProfileName'
import { ProfileOccupation } from '../../../../components/ProfileOccupation'
import { ProfileWorkPlace } from '../../../../components/ProfileWorkPlace'
import { RedProfile } from '../../../../types/RedProfile'
import { ConnectionRequestForm } from './ConnectionRequestForm'
import { getRedProfile } from '../../../../services/auth/auth'
import {
  categories as availableCategories, categoriesIdToLabelMap
} from '../../../../config/config'

import { Columns, Element, Content, Tag, Heading as BulmaHeading } from 'react-bulma-components'
import Heading from '../../../../components/atoms/Heading'
import '../../me/Me.scss'

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
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '50%',
      boxShadow: '2px 2px 36px 0 rgba(60,63,66,0.18)'
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
      <Columns vCentered>
        <Columns.Column size={3}>
          <Avatar
            className={classes.avatar}
            s3Key={mentor.profileAvatarImageS3Key}
            style={{ width: '100%', height: '20vh' }}
          />
        </Columns.Column>
        <Columns.Column size={9}>
          <Heading>{`${mentor.firstName} ${mentor.lastName}`}</Heading>
        </Columns.Column>
      </Columns>

      <Element className="me__block">
        <BulmaHeading
          size={5}
          weight="normal"
          renderAs="h3"
          subtitle
          textTransform="uppercase"
        >
          about {`${mentor.firstName} ${mentor.lastName}`}
        </BulmaHeading>
        <BulmaHeading subtitle renderAs='p' size={5}><p>{`${mentor.personalDescription}`}</p></BulmaHeading>
      </Element>

      {/* {(mentor.numberOfPendingApplicationWithCurrentUser === 0 && profile.userType === 'mentee') && (
        <ConnectionRequestForm mentorId={mentor.id} />
      )}
      {mentor.numberOfPendingApplicationWithCurrentUser > 0 && (
        <p>You have already applied to this mentor.</p>
      )} */}

      <Element className="me__block">
        <BulmaHeading
          size={5}
          weight="normal"
          renderAs="h3"
          subtitle
          textTransform="uppercase"
        >
          mentoring topics
        </BulmaHeading>
        <Tag.Group>
          {mentor.categories.map(catId => (
            <Tag key={catId} size="large">
              {categoriesIdToLabelMap[catId]}
            </Tag>
          ))}
        </Tag.Group>
      </Element>
      <Element className="me__block">
        <Columns>
          <Columns.Column>
            <BulmaHeading
              size={5}
              weight="normal"
              renderAs="h3"
              subtitle
              textTransform="uppercase"
            >
              Personal Detail
            </BulmaHeading>
            <Content>
              {mentor.gender}
            </Content>
          </Columns.Column>
          <Columns.Column>
            <BulmaHeading
              size={5}
              weight="normal"
              renderAs="h3"
              subtitle
              textTransform="uppercase"
            >
              languages
            </BulmaHeading>
            <Content>
              {mentor.languages.join(' | ')}
            </Content>
          </Columns.Column>
        </Columns>
      </Element>
    </>
    // <>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} sm={5}>
    //       <Avatar
    //         className={classes.avatar}
    //         s3Key={mentor.profileAvatarImageS3Key}
    //         style={{ width: '100%', height: '20vh' }}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={7}>
    //       <h3 style={{ fontWeight: 700, fontFamily: 'Roboto' }}>
    //         <ProfileName name={`${mentor.firstName} ${mentor.lastName}`} />
    //         <ProfileOccupation occupation={mentor.mentor_occupation} />
    //         <ProfileWorkPlace workPlace={mentor.mentor_workPlace} />
    //         <ProfileLanguages languages={mentor.languages} />
    //       </h3>
    //     </Grid>
    //   </Grid>

    //   <ProfileAvailableMenteeSlots
    //     totalCapacity={mentor.menteeCountCapacity}
    //     currentFreeCapacity={mentor.currentFreeMenteeSpots}
    //   />
    //   <p>I can help you with:</p>
    //   {mentor.categories.map(catId => (
    //     <CategoryChip
    //       key={catId}
    //       className={classes.category}
    //       categoryId={catId}
    //     />
    //   ))}
    //   <p className={classes.personalDescription}>
    //     {mentor.personalDescription}
    //   </p>
    //   {mentor.expectations && (
    //     <>
    //       <h4 style={{ marginBottom: 0 }}>Expectations to my mentee:</h4>
    //       <p
    //         className={classes.personalDescription}
    //         style={{ marginTop: '0.3em' }}
    //       >
    //         {mentor.expectations}
    //       </p>
    //     </>
    //   )}

    //   {mentor.numberOfPendingApplicationWithCurrentUser === 0 && (
    //     <ConnectionRequestForm mentorId={mentor.id} />
    //   )}
    //   {mentor.numberOfPendingApplicationWithCurrentUser > 0 && (
    //     <p>You have already applied to this mentor.</p>
    //   )}
    // </>
  }
)
