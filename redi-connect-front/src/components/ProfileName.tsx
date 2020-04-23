import React from 'react'
import { Grid } from '@material-ui/core'

export const ProfileName = ({ name }: { name: string }) => {
  return (
    <Grid container spacing={1} alignItems="center" style={{ margin: '5px 0' }}>
      <Grid item>{name}</Grid>
    </Grid>
  )
}
