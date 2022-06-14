import {
  Caption,
  Editable,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import {
  DESIRED_ROLES,
  MENTORING_GOALS,
  MENTORING_TOPICS,
} from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Columns, Element } from 'react-bulma-components'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { RootState } from '../../../../redux/types'
import { profileSaveStart } from '../../../../redux/user/actions'
import ReadMentoringGoalTopics from './ReadMentoringGoalTopics'

type FormValues = Pick<
  RedProfile,
  | 'mentee_mentoringGoal'
  | 'mentee_overarchingMentoringTopics'
  | 'mentee_primaryRole_fieldOfExpertise'
  | 'mentee_primaryRole_mentoringTopics'
  | 'mentee_secondaryRole_fieldOfExpertise'
  | 'mentee_secondaryRole_mentoringTopics'
>

interface Props {
  profile: RedProfile | undefined
  profileSaveStart: Function
}

const validationSchema = Yup.object({
  mentee_mentoringGoal: Yup.string()
    .nullable()
    .required('Select a mentoring goal'),
  mentee_primaryRole_fieldOfExpertise: Yup.string()
    .nullable()
    .required('Select a role'),
  mentee_overarchingMentoringTopics: Yup.array().max(
    3,
    'You can select up to three topics'
  ),
  mentee_primaryRole_mentoringTopics: Yup.array().max(
    3,
    'You can select up to three skills'
  ),
  mentee_secondaryRole_mentoringTopics: Yup.array().max(
    3,
    'You can select up to three skills'
  ),
})

const EditableMentoringGoalTopics = ({ profile, profileSaveStart }: Props) => {
  const {
    id,
    mentee_mentoringGoal,
    mentee_overarchingMentoringTopics = [],
    mentee_primaryRole_fieldOfExpertise,
    mentee_primaryRole_mentoringTopics = [],
    mentee_secondaryRole_fieldOfExpertise,
    mentee_secondaryRole_mentoringTopics = [],
  } = profile as RedProfile

  const submitForm = async (values: FormikValues) => {
    const profileMentoring = values as Partial<RedProfile>
    profileSaveStart({ ...profileMentoring, id })
  }

  const initialValues: FormValues = {
    mentee_mentoringGoal,
    mentee_overarchingMentoringTopics,
    mentee_primaryRole_fieldOfExpertise,
    mentee_primaryRole_mentoringTopics,
    mentee_secondaryRole_fieldOfExpertise,
    mentee_secondaryRole_mentoringTopics,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  useEffect(() => {
    if (mentee_primaryRole_fieldOfExpertise)
      formik.setFieldValue('mentee_primaryRole_mentoringTopics', [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.mentee_primaryRole_fieldOfExpertise])

  useEffect(() => {
    if (mentee_secondaryRole_fieldOfExpertise)
      formik.setFieldValue('mentee_secondaryRole_mentoringTopics', [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.mentee_secondaryRole_fieldOfExpertise])

  return (
    <>
      <Caption bold></Caption>
      <Editable
        title="Mentoring Goals and Topics"
        titleBold
        onSave={() => formik.handleSubmit()}
        onClose={() => formik.resetForm()}
        savePossible={formik.dirty && formik.isValid}
        read={<ReadMentoringGoalTopics.Me caption />}
        className="mentoring"
      >
        <Element className="block-thicker-separator-dashed">
          <Columns>
            <Columns.Column size={6}>
              <Caption>Goal</Caption>
              <FormSelect
                label="The most important goal you would like to adress with your mentor"
                name="mentee_mentoringGoal"
                placeholder="Select..."
                items={formMentoringGoals}
                {...formik}
              />
            </Columns.Column>
            <Columns.Column size={6}>
              <Caption>Topics</Caption>
              <FormSelect
                label="General topics you would like to me mentored on"
                name="mentee_overarchingMentoringTopics"
                placeholder="Select..."
                items={formMentoringTopicsInGroup('overarchingTopics')}
                multiselect
                {...formik}
              />
            </Columns.Column>
          </Columns>
        </Element>
        <Element className="block-thicker-separator-dashed">
          <Columns>
            <Columns.Column size={6}>
              <Caption>Primary role</Caption>
              <FormSelect
                label="The primary role you would like to be mentored on."
                name="mentee_primaryRole_fieldOfExpertise"
                placeholder="Select..."
                items={formFieldsOfExpertise}
                {...formik}
              />
            </Columns.Column>
            <Columns.Column size={6}>
              <Caption>Skills</Caption>
              <FormSelect
                label="Role-related skills you would like to mentored on (optional)"
                name="mentee_primaryRole_mentoringTopics"
                placeholder="Select..."
                disabled={
                  formik.values.mentee_primaryRole_fieldOfExpertise === 'other'
                }
                items={formMentoringTopicsInGroup(
                  formik.values.mentee_primaryRole_fieldOfExpertise
                )}
                multiselect
                {...formik}
              />
            </Columns.Column>
          </Columns>
        </Element>
        <Element className="block-thicker-separator-dashed">
          <Columns>
            <Columns.Column size={6}>
              <Caption>Secondary role</Caption>
              <FormSelect
                label="The secondary role you would like to be mentored on."
                name="mentee_secondaryRole_fieldOfExpertise"
                placeholder="Select..."
                items={formFieldsOfExpertise}
                {...formik}
              />
            </Columns.Column>
            <Columns.Column size={6}>
              <Caption>Skills</Caption>
              <FormSelect
                label="Role-related skills you would like to mentored on (optional)"
                name="mentee_secondaryRole_mentoringTopics"
                placeholder="Select..."
                disabled={
                  formik.values.mentee_secondaryRole_fieldOfExpertise ===
                  'other'
                }
                items={formMentoringTopicsInGroup(
                  formik.values.mentee_secondaryRole_fieldOfExpertise
                )}
                multiselect
                {...formik}
              />
            </Columns.Column>
          </Columns>
        </Element>
      </Editable>
    </>
  )
}

const formMentoringGoals = objectEntries(MENTORING_GOALS).map(
  ([value, label]) => ({ value, label })
)
const formFieldsOfExpertise = objectEntries(DESIRED_ROLES).map(
  ([value, label]) => ({ value, label })
)
const formMentoringTopicsInGroup = (group) =>
  MENTORING_TOPICS.filter((topic) => topic.group === group).map(
    ({ id, label }) => ({ value: id, label })
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
)(EditableMentoringGoalTopics)
