import {
  Checkbox,
  Editable,
} from '@talent-connect/shared-atomic-design-components'
import { PROFESSIONAL_EXPERIENCE_FIELDS } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'
import React from 'react'
import { Content, Element } from 'react-bulma-components'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { profileSaveStart } from '../../redux/user/actions'
import { ReadMentoringTopics } from '../molecules'
import ReadProfessionalExperienceFields from '../molecules/ReadProfessionalExperienceFields'

export interface FormValues {
  isMentor: boolean
  professionalExperienceFields: string[]
}

const formProfessionalExperienceFields = objectEntries(
  PROFESSIONAL_EXPERIENCE_FIELDS
)

interface Props {
  profile: RedProfile | undefined
  profileSaveStart: Function
}

const EditableProfessionalExperienceFields = ({
  profile,
  profileSaveStart,
}: Props) => {
  const { id, userType, professionalExperienceFields } = profile as RedProfile

  const submitForm = async (values: FormikValues) => {
    const profileMentoring = values as Partial<RedProfile>
    profileSaveStart({ ...profileMentoring, id })
  }

  const isMentor =
    userType === 'mentor' || userType === 'public-sign-up-mentor-pending-review'

  const initialValues: FormValues = {
    isMentor,
    professionalExperienceFields: professionalExperienceFields || [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: submitForm,
  })

  const { professionalExperienceFields: selectedProfessionalExperienceFields } =
    formik.values

  const professionalExperienceFieldsChange = (e: any) => {
    e.persist()
    const value = e.target.value
    let newProfessionalExperienceFields
    if (e.target.checked) {
      newProfessionalExperienceFields =
        selectedProfessionalExperienceFields.concat(value)
    } else {
      newProfessionalExperienceFields =
        selectedProfessionalExperienceFields.filter((cat: any) => cat !== value)
    }
    formik.setFieldValue(
      'professionalExperienceFields',
      newProfessionalExperienceFields
    )
    formik.setFieldTouched('professionalExperienceFields', true, false)
  }

  return (
    <Editable
      title="Professional experience"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadProfessionalExperienceFields.Me />}
      className="mentoring"
    >
      <Content>Select your fields of expertise</Content>
      <Element className="mentoring__group">
        {formProfessionalExperienceFields.map(([fieldId, fieldLabel]) => (
          <ProfessionalExperienceField
            key={fieldId}
            id={fieldId}
            label={fieldLabel}
            selectedProfessionalExperienceFields={
              selectedProfessionalExperienceFields
            }
            onChange={professionalExperienceFieldsChange}
            formik={formik}
          />
        ))}
      </Element>
    </Editable>
  )
}

const ProfessionalExperienceField = ({
  id,
  label,
  selectedProfessionalExperienceFields,
  onChange,
  formik,
}: any) => {
  return (
    <Checkbox.Form
      name={`professionalExperienceFields-${id}`}
      key={id}
      value={id}
      checked={selectedProfessionalExperienceFields.includes(id)}
      customOnChange={onChange}
      {...formik}
    >
      {label}
    </Checkbox.Form>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile,
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableProfessionalExperienceFields)
