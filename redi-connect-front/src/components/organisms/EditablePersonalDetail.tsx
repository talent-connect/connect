import React from 'react'
import { FormInput, FormSelect } from '../atoms'
import { Editable, PipeList } from '../molecules'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { Element } from 'react-bulma-components'

import {
  profileSaveStart
} from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import {
  genders,
  gendersIdToLabelMap
} from '../../config/config'

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

const EditablePersonalDetail = ({ profile, profileSaveStart }: any) => {
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

  const detailsList = [gendersIdToLabelMap[gender]]
  if (age) detailsList.push(`${age} years old`)

  const emptyProfile =
    !!age ||
    !!gender

  return (
    <Editable
      title="Personal Detail"
      onSave={() => formik.handleSubmit()}
      placeholder="Input your gender and age."
      savePossible={(formik.dirty && formik.isValid)}
      read={emptyProfile && <Element className="me__block--split"><PipeList items={detailsList} /></Element>}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditablePersonalDetail)
