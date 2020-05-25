import React from 'react'
import clsx from 'clsx'
import { RedProfile } from '../types/RedProfile'
import { Grid, Icon } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'

const slackIcon = <Icon className={clsx('fab fa-slack')} />
const githubIcon = <Icon className={clsx('fab fa-github')} />
const linkedInIcon = <Icon className={clsx('fab fa-linkedin')} />

export const ContactInfo = ({ profile }: { profile: RedProfile }) => (
  <>
    <h3>Contact info</h3>
    {profile.contactEmail && (
      <Placeholder
        icon={<EmailIcon />}
        content={<a href={`mailto:${profile.contactEmail}`} onClick={e => e.stopPropagation()}>{profile.contactEmail}</a>}
      />
    )}
    {profile.linkedInProfileUrl && (
      <Placeholder
        icon={linkedInIcon}
        content={<a href={profile.linkedInProfileUrl} target="_blank" onClick={e => e.stopPropagation()}>{profile.linkedInProfileUrl}</a>}
      />
    )}
    {profile.slackUsername && (
      <Placeholder icon={slackIcon} content={profile.slackUsername} />
    )}
    {profile.telephoneNumber && (
      <Placeholder icon={<PhoneIcon />} content={profile.telephoneNumber} />
    )}
    {profile.githubProfileUrl && (
      <Placeholder
        icon={githubIcon}
        content={<a href={profile.linkedInProfileUrl} target="_blank" onClick={e => e.stopPropagation()}>{profile.linkedInProfileUrl}</a>}
      />
    )}
  </>
)

const Placeholder = ({ icon, content }: any) => (
  <Grid container spacing={1} alignItems="center" style={{ margin: '5px 0' }}>
    <Grid item>{icon}</Grid>
    <Grid item>{content}</Grid>
  </Grid>
)
