import {
  Checkbox,
  Editable,
} from '@talent-connect/shared-atomic-design-components'
import { MENTORING_GOALS } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'
import React from 'react'
import { Content, Element } from 'react-bulma-components'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { RootState } from '../../../../redux/types'
import { profileSaveStart } from '../../../../redux/user/actions'
import ReadMentoringGoal from './ReadMentoringGoal'

export interface FormValues {
  mentoringGoals: string[]
}

const formMentoringGoals = objectEntries(MENTORING_GOALS)

interface Props {
  profile: RedProfile | undefined
  profileSaveStart: Function
}

const validationSchema = Yup.object({
  mentoringGoals: Yup.array().min(1, 'You need to select one mentoring goal'),
})

const EditableMentoringGoal = ({ profile, profileSaveStart }: Props) => {
  const { id, mentoringGoals } = profile as RedProfile

  const submitForm = async (values: FormikValues) => {
    const profileMentoring = values as Partial<RedProfile>
    profileSaveStart({ ...profileMentoring, id })
  }

  const initialValues: FormValues = {
    mentoringGoals: mentoringGoals || [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  const { mentoringGoals: selectedMentoringGoals } = formik.values

  const mentoringGoalsChange = (e: any) => {
    e.persist()
    const value = e.target.value
    let newMentoringGoals
    if (e.target.checked) {
      newMentoringGoals = selectedMentoringGoals.concat(value)
    } else {
      newMentoringGoals = selectedMentoringGoals.filter(
        (cat: any) => cat !== value
      )
    }
    formik.setFieldValue('mentoringGoals', newMentoringGoals)
    formik.setFieldTouched('mentoringGoals', true, false)
  }

  return (
    <Editable
      title="Goal"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadMentoringGoal.Me />}
      className="mentoring"
    >
      <Content>
        Select at least one goal you would like to support mentees with
      </Content>
      <Element className="mentoring__group">
        {formMentoringGoals.map(([fieldId, fieldLabel]) => (
          <MentoringGoal
            key={fieldId}
            id={fieldId}
            label={fieldLabel}
            selectedMentoringGoals={selectedMentoringGoals}
            onChange={mentoringGoalsChange}
            formik={formik}
          />
        ))}
      </Element>
    </Editable>
  )
}

const MentoringGoal = ({
  id,
  label,
  selectedMentoringGoals,
  onChange,
  formik,
}: any) => {
  return (
    <Checkbox.Form
      name={`mentoringGoals-${id}`}
      key={id}
      value={id}
      checked={selectedMentoringGoals.includes(id)}
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
)(EditableMentoringGoal)
