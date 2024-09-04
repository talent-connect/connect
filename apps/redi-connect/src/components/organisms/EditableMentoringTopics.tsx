import {
  MentoringTopic,
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
  UserType as ProfileUserType,
} from '@talent-connect/data-access'
import {
  Editable,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { CATEGORIES, CATEGORY_GROUPS } from '@talent-connect/shared-config'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { useFormik } from 'formik'

import groupBy from 'lodash/groupBy'
import { Content, Notification } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadMentoringTopics } from '../molecules'

export type UserType =
  | 'mentor'
  | 'mentee'
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review'

export type CategoryGroup = keyof typeof CATEGORY_GROUPS

export type MentoringFormValues = {
  isMentor: boolean
} & Record<CategoryGroup, MentoringTopic[]>

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

const getInitialValues = ({
  userType,
  categories,
}: {
  userType: ProfileUserType
  categories: MentoringTopic[]
}) => {
  const groups = Object.keys(CATEGORY_GROUPS) as unknown as CategoryGroup[]

  const emptyGroups = Object.fromEntries(
    groups.map((key) => [key, []])
  ) as Record<CategoryGroup, []>

  const initialValues: MentoringFormValues = {
    isMentor: userType === 'MENTOR',
    ...emptyGroups,
  }
  for (const groupName of groups) {
    const groupItems = categoriesByGroup[groupName]

    for (const groupItem of groupItems) {
      const itemId = groupItem.id as MentoringTopic

      if (categories.includes(itemId)) {
        initialValues[groupName].push(itemId)
      }
    }
  }
  return initialValues
}

const getFormSelectItemsFromCategory = (category) => {
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
  const isMentee = userType === 'MENTEE'

  const submitForm = async (values: MentoringFormValues) => {
    const { isMentor, ...formCategories } = values
    const valuesOfCategories = Object.entries(formCategories)
      .map(([, value]) => value)
      .flat()

    const uniqueCategories = {
      categories: [...new Set(valuesOfCategories)],
    }
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: uniqueCategories,
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const formik = useFormik<MentoringFormValues>({
    initialValues: getInitialValues({
      userType,
      categories,
    }),
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  const selectionsLeft =
    MAX_MENTORING_TOPICS_IF_USER_IS_MENTEE -
    (Object.entries(formik.values)
      .map(([, value]) => value)
      .flat().length -
      1)

  if (!myProfileQuery.isSuccess) return null

  const customOnChange =
    (groupId) =>
    (selectedOption: any = []) => {
      const { setFieldValue, setFieldTouched, values } = formik

      const isUserTryingToAddNewValue =
        selectedOption.length > values[groupId].length
      setFieldTouched(groupId, true, false)

      if (isUserTryingToAddNewValue && !selectionsLeft) {
        return
      }

      // this is a copy of the default onChange
      if (!selectedOption) {
        setFieldValue(groupId, [], true)
      } else {
        setFieldValue(
          groupId,
          selectedOption ? selectedOption.map((item: any) => item.value) : [],
          true
        )
      }
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
        {!isMentee ? (
          'Select at least one topic where you would like to support mentees.'
        ) : selectionsLeft ? (
          `You can select between 1 and up to 4 topics.`
        ) : (
          <Notification color="info" className="is-light">
            You’ve selected the maximum number of topics. If you wish to choose
            another, please deselect one.
          </Notification>
        )}
      </Content>

      {formCategoryGroups.map(([groupId, groupLabel]) => (
        <FormSelect
          label={groupLabel}
          name={groupId}
          key={groupId}
          items={getFormSelectItemsFromCategory(categoriesByGroup[groupId])}
          multiselect
          disabled={
            isMentee && formik.values[groupId].length === 0 && !selectionsLeft
          }
          placeholder="Start typing and select a Topic"
          formik={formik}
          customOnChange={isMentee && customOnChange(groupId)}
        />
      ))}
    </Editable>
  )
}

export default EditableMentoringTopics
