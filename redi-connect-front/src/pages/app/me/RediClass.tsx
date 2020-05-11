import React from 'react'
import { Content } from 'react-bulma-components'
import FormSelect from '../../../components/atoms/FormSelect'
import Editable from '../../../components/molecules/Editable'
import { RedProfile } from '../../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'

import {
  courses
} from '../../../config/config'

import {
  profileSaveStart
} from '../../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

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
  const submitForm = async (
    values: FormikValues
  ) => {
    const rediClass = values as Partial<RedProfile>
    profileSaveStart({ ...rediClass, id: profile.id })
  }

  const initialValues: RediClassFormValues = {
    mentee_currentlyEnrolledInCourse: profile.mentee_currentlyEnrolledInCourse
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  const readRediClass = () => {
    return <Content>
      <p>{courses.filter(course => course.id === profile.mentee_currentlyEnrolledInCourse).map(course => course.label)}</p>
    </Content>
  }

  return (
    <Editable
      title="Redi Class"
      onSave={ () => formik.handleSubmit()}
      savePossible={!(formik.dirty && formik.isValid)}
      read={readRediClass()}
    >
      <FormSelect
        label="Which course are you taking at ReDI?"
        name="mentee_currentlyEnrolledInCourse"
        items={courses}
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
