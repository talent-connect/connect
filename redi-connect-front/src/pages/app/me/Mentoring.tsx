import React from 'react'
import FormTextArea from '../../../components/atoms/FormTextArea'
import FormCheckbox from '../../../components/atoms/FormCheckbox'
import Editable from '../../../components/molecules/Editable'
import { RedProfile } from '../../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import {
  categories as formCategories
} from '../../../config/config'

import {
  profileSaveStart
} from '../../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, FormikHelpers as FormikActions, useFormik, FormikProps } from 'formik'

export interface MentoringFormValues {
  categories: string[]
}

const validationSchema = Yup.object({
  categories: Yup.array()
    .compact(v => v === 'dontKnowYet')
    .min(0)
    .max(3)
})
// props: FormikProps<AboutFormValues>
const Mentoring = ({ profile, profileSaveStart }: any) => {
  const submitForm = async (
    values: FormikValues
  ) => {
    const profileMentoring = values as Partial<RedProfile>
    console.log(profileMentoring)
    profileSaveStart({ ...profileMentoring, id: profile.id })
  }

  const initialValues: MentoringFormValues = {
    categories: profile.categories
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  const readMentoring = () => {
    return profile.categories.map((categorie: any) => <div>{categorie}</div>)
  }

  const categoriesChange = (name: any, e: any) => {
    e.persist()
    const value = e.target.value
    let newCategories
    if (e.target.checked) {
      newCategories = formik.values.categories.concat(value)
    } else {
      newCategories = formik.values.categories.filter((cat: any) => cat !== value)
    }
    formik.setFieldValue('categories', newCategories)
    formik.setFieldTouched('categories', true, false)
  }

  return (
    <Editable
      title="Mentoring Topics"
      onSave={() => formik.handleSubmit()}
      read={readMentoring()}
    >
      {formCategories.map(({ id, label }) => (
        <FormCheckbox
          name={`categories-${id}`}
          value={id}
          checked={formik.values.categories.includes(id)}
          setFieldTouched={formik.setFieldTouched}
          handleChange={formik.handleChange}
          isSubmitting={formik.isSubmitting}
          customOnChange={categoriesChange}
        >
          {label}
        </FormCheckbox>
      ))}
    </Editable>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentoring)
