import React from 'react'
import { Grid } from '@material-ui/core'
import { RedProfile } from '../types/RedProfile'
import { courseIdToLabelMap } from '../config/config'

export const ProfileCourse = ({
  courseId
}: {
  courseId: RedProfile['mentee_currentlyEnrolledInCourse']
}) => {
  return (
    <Grid container spacing={1} alignItems="center" style={{ margin: '5px 0' }}>
      <Grid item>Course: {courseIdToLabelMap[courseId]}</Grid>
    </Grid>
  )
}
