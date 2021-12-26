import { FunctionComponent } from 'react'
import { FormSelect } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import { EDUCATION_LEVELS } from '@talent-connect/shared-config'
import { ReadEducation } from '../molecules'
import { objectEntries, objectKeys } from '@talent-connect/typescript-utilities'

const formEducationLevels = objectEntries(EDUCATION_LEVELS).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export interface EducationFormValues {
  mentee_highestEducationLevel: string
}

const validationSchema = Yup.object({
  mentee_highestEducationLevel: Yup.string()
    .oneOf(objectKeys(EDUCATION_LEVELS))
    .label('Highest Education Level'),
})

interface Props {
  profile: RedProfile
  profileSaveStart: Function
}

const EditableEducation: FunctionComponent<Props> = ({
  profile: { id, mentee_highestEducationLevel },
  profileSaveStart
}) => {
  const submitForm = async (values: FormikValues) => {
    const education = values as Partial<RedProfile>
    profileSaveStart({ ...education, id })
  }

  const initialValues: EducationFormValues = {
    mentee_highestEducationLevel,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  return (
    <Editable
      title="Highest Education"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadEducation.Me />}
    >
      <FormSelect
        label="What is your highest Education Level?"
        name="mentee_highestEducationLevel"
        placeholder="Education Level"
        items={formEducationLevels}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditableEducation)
