import React from 'react';
import { Grid } from '@material-ui/core';
import { RedProfile } from '../types/RedProfile';
import { Place as PlaceIcon } from '@material-ui/icons';

export const ProfileWorkPlace = ({ workPlace }: { workPlace: RedProfile['mentor_workPlace'] }) => {
  return (
    <Grid container spacing={8} alignItems="center" style={{ margin: '5px 0' }}>
      <Grid item>
        <PlaceIcon />
      </Grid>
      <Grid item>{workPlace}</Grid>
    </Grid>
  );
};