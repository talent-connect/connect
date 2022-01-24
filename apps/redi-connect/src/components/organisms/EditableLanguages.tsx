import { FC } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { FormSelect } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'

import { profileSaveStart } from '../../redux/user/actions'

import { LANGUAGES } from '@talent-connect/shared-config'
import { ReadLanguages } from '../molecules'
import { mapOptionsArray } from '@talent-connect/typescript-utilities'
import { mapStateToProps } from '../../helpers';

const formLanguages = mapOptionsArray(LANGUAGES)

export interface LanguagesFormValues {
  languages: string[]
}

const validationSchema = Yup.object({
  languages: Yup.array()
    .min(1)
    .of(Yup.string().max(255))
    .label('Languages'),
})

interface Props {
  profile: RedProfile
  profileSaveStart: (arg: LanguagesFormValues & { id: string }) => void
}

const EditableLanguages: FC<Props> = ({
  profile: { id, languages },
  profileSaveStart
}) => {

  const formik = useFormik<LanguagesFormValues>({
    initialValues: { languages },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (languagesContacts) => {
      profileSaveStart({ ...languagesContacts, id })
    },
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
        multiSelect
        {...formik}
      />
    </Editable>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableLanguages)
