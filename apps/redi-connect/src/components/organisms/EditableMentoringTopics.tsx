import { ChangeEventHandler } from 'react'
import { connect } from 'react-redux'
import groupBy from 'lodash/groupBy'
import { Columns, Heading, Element, Content } from 'react-bulma-components'

import { Checkbox } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { CategoryGroupId, RedProfile } from '@talent-connect/shared-types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { useFormik } from 'formik'
import { CATEGORIES, CategoryKey, CATEGORY_GROUPS } from '@talent-connect/shared-config'
import { ReadMentoringTopics } from '../molecules'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { mapStateToProps } from '../../helpers';

export type UserType =
  | 'mentor'
  | 'mentee'
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review'

export interface MentoringFormValues {
  isMentor: boolean
  categories: CategoryKey[]
}

const MAX_MENTORING_TOPICS_IF_USER_IS_MENTEE = 4

const validationSchema = Yup.object({
  categories: Yup.array()
    .min(1)
    .when('isMentor', {
      is: false,
      then: Yup.array()
        .max(MAX_MENTORING_TOPICS_IF_USER_IS_MENTEE),
    }),
})

const categoriesByGroup = groupBy(CATEGORIES, (category) => category.group)

const formCategoryGroups = objectEntries(CATEGORY_GROUPS)

interface Props {
  profile: RedProfile
  profileSaveStart: (arg: MentoringFormValues & { id: string }) => void
}

function EditableMentoringTopics ({
  profile: { id, userType, categories },
  profileSaveStart
}: Props) {

  const isMentor =
    userType === 'mentor' || userType === 'public-sign-up-mentor-pending-review'

  const formik = useFormik<MentoringFormValues>({
    initialValues: {
      isMentor,
      categories: categories || [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (profileMentoring) => {
      profileSaveStart({ ...profileMentoring, id })
    },
  })

  const { categories: selectedCategories } = formik.values

  const categoriesChange = (e: any) => {
    e.persist()
    const value = e.target.value
    const newCategories = e.target.checked
      ? selectedCategories.concat(value)
      : selectedCategories.filter((cat) => cat !== value)
    formik.setFieldValue('categories', newCategories)
    formik.setFieldTouched('categories', true, false)
  }

  return (
    <Editable
      title="Mentoring Topics"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadMentoringTopics.Me />}
      className="mentoring"
    >
      <Content>
        {isMentor
          ? 'Select at least one topic where you would like to support mentees.'
          : 'You can select between 1 and up to 4 topics.'}
      </Content>
      <Columns>
        {formCategoryGroups.map(([groupId, groupLabel]) => (
          <CategoryGroup
            key={groupId}
            id={groupId}
            label={groupLabel}
            selectedCategories={selectedCategories}
            onChange={categoriesChange}
            formik={formik}
          />
        ))}
      </Columns>
    </Editable>
  )
}

interface CategoryGroupProps {
  id: CategoryGroupId,
  label: string,
  selectedCategories: CategoryKey[],
  onChange: ChangeEventHandler,
  formik: any // TODO: remove this or workaround
}

function CategoryGroup ({
  id,
  label,
  selectedCategories,
  onChange,
  formik,
}: CategoryGroupProps) { // TODO: types
  // The current REDI_LOCATION might not use the current CategoryGroup (e.g.
  // Munich doesnt, at the time or writing, use 'coding' or 'other'. If it's the case, return null

  if (!categoriesByGroup[id]) return null
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
        {categoriesByGroup[id].map(({ id, label }) => (
          <Checkbox.Form
            name={`categories-${id}`}
            key={id}
            value={id}
            checked={selectedCategories.includes(id)}
            handleChange={onChange}
            disabled={
              !formik.values.isMentor &&
              selectedCategories.length >= MAX_MENTORING_TOPICS_IF_USER_IS_MENTEE &&
              !selectedCategories.includes(id)
            }
            {...formik}
          >
            {label}
          </Checkbox.Form>
        ))}
      </Element>
    </Columns.Column>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableMentoringTopics)
