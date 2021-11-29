import React from 'react'
import { FormSelect } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import { LANGUAGES } from '@talent-connect/shared-config'
import { ReadLanguages } from '../molecules'

const formLanguages = LANGUAGES.map((language) => ({
  value: language,
  label: language,
}))

export interface LanguagesFormValues {
  languages: string[]
}

const validationSchema = Yup.object({
  languages: Yup.array().min(1).of(Yup.string().max(255)).label('Languages'),
})

// props: FormikProps<AboutFormValues>
const EditableLanguages = ({ profile, profileSaveStart }: any) => {
  const { id, languages } = profile

  const submitForm = async (values: FormikValues) => {
    const languagesContacts = values as Partial<RedProfile>
    profileSaveStart({ ...languagesContacts, id })
  }

  const initialValues: LanguagesFormValues = {
    languages: languages || [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  return (
    <Editable
      title="Languages"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadLanguages.Me />}
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
  profile: state.user.profile,
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableLanguages)
