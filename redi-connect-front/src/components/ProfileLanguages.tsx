import React from 'react'
import { Grid } from '@material-ui/core'
import { RedProfile } from '../types/RedProfile'
import { Language as LanguageIcon } from '@material-ui/icons'

export const ProfileLanguages = ({
  languages
}: {
  languages: RedProfile['languages']
}) => {
  return (
    <Grid container spacing={1} alignItems="center" style={{ margin: '5px 0' }}>
      <Grid item>
        <LanguageIcon />
      </Grid>
      <Grid item>{languages.join(', ')}</Grid>
    </Grid>
  )
}
