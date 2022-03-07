import {
  Checkbox,
  Editable,
} from '@talent-connect/shared-atomic-design-components'
import {
  MentoringTopicKey,
  MENTORING_TOPICS,
  MENTORING_TOPIC_GROUPS,
} from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'
import groupBy from 'lodash/groupBy'
import React from 'react'
import { Columns, Content, Element, Heading } from 'react-bulma-components'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { profileSaveStart } from '../../redux/user/actions'
import ReadMentoringTopicsNew2022 from '../molecules/ReadMentoringTopicsNew2022'

export type UserType =
  | 'mentor'
  | 'mentee'
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review'

export interface FormValues {
  mentoringTopics: MentoringTopicKey[]
}

const mentoringTopicsByGroup = groupBy(MENTORING_TOPICS, (topic) => topic.group)

const formMentoringTopicGroups = objectEntries(MENTORING_TOPIC_GROUPS)

interface Props {
  profile: RedProfile | undefined
  profileSaveStart: Function
}

const EditableMentoringTopics = ({ profile, profileSaveStart }: Props) => {
  const { id, userType, mentoringTopics } = profile as RedProfile

  const submitForm = async (values: FormikValues) => {
    const profileMentoring = values as Partial<RedProfile>
    profileSaveStart({ ...profileMentoring, id })
  }

  const initialValues: FormValues = {
    mentoringTopics: mentoringTopics || [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: submitForm,
  })

  const { mentoringTopics: selectedMentoringTopics } = formik.values

  const mentoringTopicsChange = (e: any) => {
    e.persist()
    const value = e.target.value
    let newMentoringTopics
    if (e.target.checked) {
      newMentoringTopics = selectedMentoringTopics.concat(value)
    } else {
      newMentoringTopics = selectedMentoringTopics.filter(
        (cat: any) => cat !== value
      )
    }
    formik.setFieldValue('mentoringTopics', newMentoringTopics)
    formik.setFieldTouched('mentoringTopics', true, false)
  }

  return (
    <Editable
      title="Mentoring Topics"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadMentoringTopicsNew2022.Me />}
      className="mentoring"
    >
      <Content>
        Select at least one topic where you would like to support mentees.
      </Content>
      <Columns>
        {formMentoringTopicGroups.map(([groupId, groupLabel]) => (
          <MentoringTopicGroup
            key={groupId}
            id={groupId}
            label={groupLabel}
            selectedMentoringTopics={selectedMentoringTopics}
            onChange={mentoringTopicsChange}
            formik={formik}
          />
        ))}
      </Columns>
    </Editable>
  )
}

const MentoringTopicGroup = ({
  id,
  label,
  selectedMentoringTopics,
  onChange,
  formik,
}: any) => {
  if (!mentoringTopicsByGroup[id]) return null
  return (
    <Columns.Column size={4}>
      <Heading
        size={6}
        weight="normal"
        renderAs="h3"
        subtitle
        textTransform="uppercase"
      >
        {label}
      </Heading>
      <Element className="mentoring__group">
        {mentoringTopicsByGroup[id].map((groupItem) => (
          <Checkbox.Form
            name={`mentoringTopics-${groupItem.id}`}
            key={groupItem.id}
            value={groupItem.id}
            checked={selectedMentoringTopics.includes(groupItem.id)}
            customOnChange={onChange}
            {...formik}
          >
            {groupItem.label}
          </Checkbox.Form>
        ))}
      </Element>
    </Columns.Column>
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
)(EditableMentoringTopics)
