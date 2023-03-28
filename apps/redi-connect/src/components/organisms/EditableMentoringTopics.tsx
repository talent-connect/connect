import {
  MentoringTopic,
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Checkbox,
  Editable,
} from '@talent-connect/shared-atomic-design-components'
import { CATEGORIES, CATEGORY_GROUPS } from '@talent-connect/shared-config'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'
import { omit } from 'lodash'
import groupBy from 'lodash/groupBy'
import { Columns, Content, Element, Heading } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadMentoringTopics } from '../molecules'

export type UserType =
  | 'mentor'
  | 'mentee'
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review'

export interface MentoringFormValues {
  isMentor: boolean
  categories: MentoringTopic[]
}

const MAX_MENTORING_TOPICS_IF_USER_IS_MENTEE = 4

const validationSchema = Yup.object({
  categories: Yup.array()
    .min(1)
    .when('isMentor', {
      is: false,
      then: Yup.array().max(MAX_MENTORING_TOPICS_IF_USER_IS_MENTEE),
    }),
})

const categoriesByGroup = groupBy(CATEGORIES, (category) => category.group)

const formCategoryGroups = objectEntries(CATEGORY_GROUPS)

function EditableMentoringTopics() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data?.conProfile

  const userType = profile?.userType
  const categories = profile?.categories

  const submitForm = async (values: FormikValues) => {
    const cleanValues = omit(values, ['isMentor'])
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: { id: profile.id, ...cleanValues },
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const initialValues: MentoringFormValues = {
    isMentor: userType === 'MENTOR',
    categories: categories || [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  const { categories: selectedCategories } = formik.values

  const categoriesChange = (e: any) => {
    e.persist()
    const value = e.target.value
    let newCategories
    if (e.target.checked) {
      newCategories = selectedCategories.concat(value)
    } else {
      newCategories = selectedCategories.filter((cat: any) => cat !== value)
    }
    formik.setFieldValue('categories', newCategories)
    formik.setFieldTouched('categories', true, false)
  }

  if (!myProfileQuery.isSuccess) return null

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
        {userType === 'MENTOR'
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

const CategoryGroup = ({
  id,
  label,
  selectedCategories,
  onChange,
  formik,
}: any) => {
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
        {categoriesByGroup[id].map((groupItem) => (
          <Checkbox.Form
            name={`categories-${groupItem.id}`}
            key={groupItem.id}
            value={groupItem.id}
            checked={selectedCategories.includes(groupItem.id)}
            customOnChange={onChange}
            disabled={
              !formik.values.isMentor &&
              selectedCategories.length >=
                MAX_MENTORING_TOPICS_IF_USER_IS_MENTEE &&
              !selectedCategories.includes(groupItem.id)
            }
            {...formik}
          >
            {groupItem.label}
          </Checkbox.Form>
        ))}
      </Element>
    </Columns.Column>
  )
}

export default EditableMentoringTopics
