import React from 'react'
import { Content } from 'react-bulma-components'
import FormSelect from '../../../components/atoms/FormSelect'
import FormInput from '../../../components/atoms/FormInput'
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
  Languages as availableLanguages
} from '../../../config/config'
const formLanguages = availableLanguages.map(language => ({ value: language, label: language }))

export interface LanguagesFormValues {
  languages: string[]
}

const validationSchema = Yup.object({
  languages: Yup.array()
    .min(1)
    .of(Yup.string().max(255))
    .label('Languages')
})

// props: FormikProps<AboutFormValues>
const Languages = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    languages
  } = profile

  const submitForm = async (
    values: FormikValues
  ) => {
    const languagesContacts = values as Partial<RedProfile>
    profileSaveStart({ ...languagesContacts, id })
  }

  const initialValues: LanguagesFormValues = {
    languages: languages || []
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm
  })

  const readLanguages = () => {
    return (
      <Content className="profile__list">
        {languages && languages.map((language: any, index: number) => <span key={`${language}_${index}`}>{language}</span>)}
      </Content>
    )
  }

  return (
    <Editable
      title="Languages"
      onSave={ () => formik.handleSubmit()}
      placeholder="Input languages you speak here."
      savePossible={(formik.dirty && formik.isValid)}
      read={!!languages && readLanguages()}
    >
      <FormSelect
        label="Which of these languages do you speak?*"
        name="languages"
        items={formLanguages}
        multiselect
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
