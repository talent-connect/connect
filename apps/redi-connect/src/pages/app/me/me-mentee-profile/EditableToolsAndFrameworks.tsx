import {
  Caption,
  Checkbox,
  Editable,
  Placeholder,
} from '@talent-connect/shared-atomic-design-components'
import { MENTORING_TOPICS } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import { FormikValues, useFormik } from 'formik'
import { chunk } from 'lodash'
import React from 'react'
import { Columns } from 'react-bulma-components'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { RootState } from '../../../../redux/types'
import { profileSaveStart } from '../../../../redux/user/actions'
import ReadToolsAndFrameworks from './ReadToolsAndFrameworks'

type FormValues = Pick<RedProfile, 'mentee_toolsAndFrameworks_mentoringTopics'>

interface Props {
  profile: RedProfile | undefined
  profileSaveStart: Function
}

const validationSchema = Yup.object({
  mentee_toolsAndFrameworks_mentoringTopics: Yup.array().max(
    3,
    'You can select up to 3 tools and frameworks'
  ),
})

const EditableToolsAndFrameworks = ({ profile, profileSaveStart }: Props) => {
  const { id, mentee_toolsAndFrameworks_mentoringTopics } =
    profile as RedProfile

  const submitForm = async (values: FormikValues) => {
    const profileMentoring = values as Partial<RedProfile>
    profileSaveStart({ ...profileMentoring, id })
  }

  const initialValues: FormValues = {
    mentee_toolsAndFrameworks_mentoringTopics:
      mentee_toolsAndFrameworks_mentoringTopics ?? [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  const selectedValues = formik.values.mentee_toolsAndFrameworks_mentoringTopics

  const onChange = (e: any) => {
    e.persist()
    const value = e.target.value
    let newCategories
    if (e.target.checked) {
      newCategories = selectedValues.concat(value)
    } else {
      newCategories = selectedValues.filter((cat: any) => cat !== value)
    }
    formik.setFieldValue(
      'mentee_toolsAndFrameworks_mentoringTopics',
      newCategories
    )
    formik.setFieldTouched(
      'mentee_toolsAndFrameworks_mentoringTopics',
      true,
      false
    )
  }

  return (
    <>
      <Caption bold></Caption>
      <Editable
        title="Tools and frameworks"
        titleBold
        onSave={() => formik.handleSubmit()}
        onClose={() => formik.resetForm()}
        savePossible={formik.dirty && formik.isValid}
        read={<ReadToolsAndFrameworks.Me caption />}
        className="mentoring"
      >
        <Placeholder>
          Please select tool and technologies you are particularly interested in
          (max 3).
        </Placeholder>
        <Columns>
          {formToolsAndFrameworksGroups.map((group) => (
            <Columns.Column size={4}>
              {group.map((item) => (
                <Checkbox.Form
                  name={`${item.value}`}
                  key={item.value}
                  value={item.value}
                  checked={selectedValues.includes(item.value)}
                  customOnChange={onChange}
                  disabled={
                    selectedValues.length >= 3 &&
                    !selectedValues.includes(item.value)
                  }
                  {...formik}
                >
                  {item.label}
                </Checkbox.Form>
              ))}
            </Columns.Column>
          ))}
        </Columns>
      </Editable>
    </>
  )
}

const formToolsAndFrameworks = MENTORING_TOPICS.filter(
  (topic) => topic.group === 'toolsAndFrameworks'
)
  .map(({ id, label }) => ({ value: id, label }))
  .sort((a, b) => (a.label > b.label ? 1 : -1))
const formToolsAndFrameworksGroups = chunk(
  formToolsAndFrameworks,
  Math.ceil(formToolsAndFrameworks.length / 3)
)

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
)(EditableToolsAndFrameworks)
