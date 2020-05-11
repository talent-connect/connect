import React from 'react'
import { Content } from 'react-bulma-components'
import FormSelect from '../../../components/atoms/FormSelect'
import FormInput from '../../../components/atoms/FormInput'
import Editable from '../../../components/molecules/Editable'
import { RedProfile } from '../../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'

import {
  Languages as availableLanguages
} from '../../../config/config'

import {
  profileSaveStart
} from '../../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

const formLanguages = availableLanguages.map(language => ({ id: language, label: language }))

export interface LanguagesFormValues {
  languages: string[]
  otherLanguages: string
}

const validationSchema = Yup.object({
  languages: Yup.array()
    .min(1)
    .of(Yup.string().max(255))
    .label('Languages')
})

// props: FormikProps<AboutFormValues>
const Languages = ({ profile, profileSaveStart }: any) => {
  const submitForm = async (
    values: FormikValues
  ) => {
    const languagesContacts = values as Partial<RedProfile>
    profileSaveStart({ ...languagesContacts, id: profile.id })
  }

  const initialValues: LanguagesFormValues = {
    languages: profile.languages || [],
    otherLanguages: profile.otherLanguages
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  const readLanguages = () => {
    return (
      <Content>
        {profile.languages && profile.languages.map((language: any, index: number) => <p key={`${language}_${index}`}>{language}</p>)}
        <p>{profile.otherLanguages}</p>
      </Content>
    )
  }

  return (
    <Editable
      title="Languages"
      onSave={ () => formik.handleSubmit()}
      savePossible={!(formik.dirty && formik.isValid)}
      read={readLanguages()}
    >
      <FormSelect
        label="Which of these languages do you speak?*"
        name="languages"
        items={formLanguages}
        multiselect
        {...formik}
      />

      <FormInput
        name="otherLanguages"
        placeholder="Any other languages?"
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

export default connect(mapStateToProps, mapDispatchToProps)(Languages)
