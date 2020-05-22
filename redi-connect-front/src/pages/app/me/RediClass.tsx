import React from 'react'
import { Content } from 'react-bulma-components'
import FormSelect from '../../../components/atoms/FormSelect'
import Editable from '../../../components/molecules/Editable'
import { RedProfile } from '../../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'

import {
  profileSaveStart
} from '../../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import {
  courses,
  courseIdToLabelMap
} from '../../../config/config'

const formCourses = courses.map(course => ({ value: course.id, label: course.label }))

export interface RediClassFormValues {
  mentee_currentlyEnrolledInCourse: string
}

const validationSchema = Yup.object({
  mentee_currentlyEnrolledInCourse: Yup.string()
    .required()
    .oneOf(courses.map(level => level.id))
    .label('Currently enrolled in course')
})

// props: FormikProps<AboutFormValues>
const RediClass = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    mentee_currentlyEnrolledInCourse
  } = profile

  const submitForm = async (
    values: FormikValues
  ) => {
    const rediClass = values as Partial<RedProfile>
    profileSaveStart({ ...rediClass, id })
  }

  const initialValues: RediClassFormValues = {
    mentee_currentlyEnrolledInCourse
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm
  })

  const readRediClass = <p>{courseIdToLabelMap[mentee_currentlyEnrolledInCourse]}</p>

  return (
    <Editable
      title="Redi Class"
      onSave={ () => formik.handleSubmit()}
      savePossible={(formik.dirty && formik.isValid)}
      read={<Content>{readRediClass}</Content>}
    >
      <FormSelect
        label="Which course are you taking at ReDI?"
        name="mentee_currentlyEnrolledInCourse"
        items={formCourses}
        {...formik}
      />
    </Editable>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(RediClass)
