import React from 'react';
import classNames from 'classnames';
import { RedProfile } from '../types/RedProfile';
import { Grid, Icon } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

const SlackIcon = <Icon className={classNames('fab fa-slack')} />;

export const ContactInfo = ({ profile }: { profile: RedProfile }) => (
  <>
    <h3>Contact info</h3>
    {profile.contactEmail && (
      <Placeholder icon={<EmailIcon />} content={profile.contactEmail} />
    )}
    {profile.slackUsername && (
      <Placeholder icon={SlackIcon} content={profile.slackUsername} />
    )}
    {profile.telephoneNumber && (
      <Placeholder icon={<PhoneIcon />} content={profile.telephoneNumber} />
    )}
  </>
);

const Placeholder = ({ icon, content }: any) => (
  <Grid container spacing={8} alignItems="center" style={{ margin: '5px 0' }}>
    <Grid item>{icon}</Grid>
    <Grid item>{content}</Grid>
  </Grid>
);
