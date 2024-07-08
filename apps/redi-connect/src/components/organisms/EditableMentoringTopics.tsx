import {
  MentoringTopic,
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Checkbox,
  Editable,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { CATEGORIES, CATEGORY_GROUPS } from '@talent-connect/shared-config'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'

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

export type MentoringFormValues = {
  isMentor: boolean
} & Record<keyof typeof CATEGORY_GROUPS, MentoringTopic[]>

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

const formSelectItemsConverter = (category) => {
  return category.map((entry) => {
    return { name: entry.label, value: entry.id, label: entry.label }
  })
}

function EditableMentoringTopics() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data?.conProfile

  const userType = profile?.userType
  const categories = profile?.categories

  const submitForm = async (values: MentoringFormValues) => {
    const newArr = []
    const keysOfValues = Object.keys(values)

    for (let i = 0; i < keysOfValues.length; i++) {
      keysOfValues[i] !== 'isMentor' && newArr.push(values[keysOfValues[i]])
    }
    const flattenedArr = [...new Set(newArr.flat())]

    const cleanValues = { categories: flattenedArr }
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: cleanValues,
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const groups = Object.keys(
    CATEGORY_GROUPS
  ) as unknown as (keyof typeof CATEGORY_GROUPS)[]

  const emptyGroups = Object.fromEntries(
    groups.map((key) => [key, []])
  ) as Record<keyof typeof CATEGORY_GROUPS, []>

  const initialValues: MentoringFormValues = {
    isMentor: userType === 'MENTOR',
    ...emptyGroups,
  }

  for (let i = 0; i < groups.length; i++) {
    const groupName = groups[i]
    const groupItems = categoriesByGroup[groupName]

    for (let j = 0; j < groupItems.length; j++) {
      const groupItem = groupItems[j].id as MentoringTopic

      if (categories.includes(groupItem)) {
        initialValues[groupName].push(groupItem)
      }
    }
  }

  const formik = useFormik<MentoringFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

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

      {formCategoryGroups.map(([groupId, groupLabel]) => (
        <FormSelect
          label={groupLabel}
          name={groupId}
          key={groupId}
          items={formSelectItemsConverter(categoriesByGroup[groupId])}
          multiselect
          placeholder="Start typing and select a Topic"
          formik={formik}
        />
      ))}
    </Editable>
  )
}

export default EditableMentoringTopics
