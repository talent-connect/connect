import React from 'react'
import { Content } from 'react-bulma-components'
import FormInput from '../../../components/atoms/FormInput'
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
  genders
} from '../../../config/config'

const formGenders = genders.map(gender => ({ value: gender.id, label: gender.label }))

export interface PersonalDetailFormValues {
  gender: string
  age?: number
}

const validationSchema = Yup.object({
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'])
    .label('Gender'),
  age: Yup.number()
    .min(16)
    .max(99)
    .label('Age')
})

// props: FormikProps<AboutFormValues>
const PersonalDetail = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    gender,
    age
  } = profile

  const submitForm = async (
    values: FormikValues
  ) => {
    const personalDetail = values as Partial<RedProfile>
    profileSaveStart({ ...personalDetail, id })
  }

  const initialValues: PersonalDetailFormValues = {
    gender,
    age
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm
  })

  const readPersonalDetail = () => {
    // TODO: check if there is a nicer soulution with bulma as the profile__list
    return <Content className="profile__list">
      {gender && <span>{formGenders.filter(formGender => formGender.value === gender).map(formGender => formGender.label) }</span>}
      {age && <span>{`${age} years old`}</span>}
    </Content>
  }

  const emptyProfile =
    !!age ||
    !!gender

  return (
    <Editable
      title="Personal Detail"
      onSave={ () => formik.handleSubmit()}
      placeholder="Input your gender and age."
      savePossible={(formik.dirty && formik.isValid)}
      read={emptyProfile && readPersonalDetail()}
    >
      <FormSelect
        label="Gender"
        name="gender"
        placeholder="Prefer not to answer"
        items={formGenders}
        {...formik}
      />

      <FormInput
        name="age"
        placeholder="Age"
        label="Your age"
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetail)
