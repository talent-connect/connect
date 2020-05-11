import React from 'react'
import { Content } from 'react-bulma-components'
import FormInput from '../../../components/atoms/FormInput'
import FormSelect from '../../../components/atoms/FormSelect'
import Editable from '../../../components/molecules/Editable'
import { RedProfile } from '../../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import {
  genders as formGenders
} from '../../../config/config'

import {
  profileSaveStart
} from '../../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

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
  const submitForm = async (
    values: FormikValues
  ) => {
    const personalDetail = values as Partial<RedProfile>
    profileSaveStart({ ...personalDetail, id: profile.id })
  }

  const initialValues: PersonalDetailFormValues = {
    gender: profile.gender,
    age: profile.age
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  const readPersonalDetail = () => {
    return <Content>
      <p>{formGenders.filter(gender => gender.id === profile.gender).map(gender => gender.label) }</p>
      <p>{profile.age}</p>
    </Content>
  }

  return (
    <Editable
      title="Personal Detail"
      onSave={ () => formik.handleSubmit()}
      savePossible={!(formik.dirty && formik.isValid)}
      read={readPersonalDetail()}
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
