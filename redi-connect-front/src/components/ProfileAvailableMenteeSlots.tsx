import React from 'react';
import { Grid } from '@material-ui/core';
import { range } from 'lodash';
import { RedProfile } from '../types/RedProfile';
import {
  Person as PersonIcon,
  PersonOutline as PersonOutlineIcon,
} from '@material-ui/icons';

export const ProfileAvailableMenteeSlots = ({
  totalCapacity,
  currentFreeCapacity,
}: {
  totalCapacity: number;
  currentFreeCapacity: number;
}) => {
  return (
    <Grid container direction="column">
      <Grid item>Still want to have {currentFreeCapacity} more mentee(s).</Grid>
      <Grid item>
        {range(totalCapacity).map(index =>
          index < currentFreeCapacity ? (
            <PersonIcon key={index} />
          ) : (
            <PersonOutlineIcon key={index} />
          )
        )}
      </Grid>
    </Grid>
  );
};
