import {
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
  UserType,
} from '@talent-connect/data-access'
import {
  Editable,
  FormInput,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { MENTEE_OCCUPATION_CATEGORY } from '@talent-connect/shared-config'
import { objectKeys } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'
import { omit } from 'lodash'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadOccupation } from '../molecules'

const formMenteeOccupationCategories = Object.entries(
  MENTEE_OCCUPATION_CATEGORY
).map(([value, label]) => ({ value, label }))

export interface OccupationFormValues {
  userType: UserType
  mentor_occupation: string
  mentor_workPlace: string
  mentee_occupationCategoryId: string
  mentee_occupationJob_placeOfEmployment: string
  mentee_occupationJob_position: string
  mentee_occupationStudent_studyPlace: string
  mentee_occupationStudent_studyName: string
  mentee_occupationLookingForJob_what: string
  mentee_occupationOther_description: string
}

const validationSchema = Yup.object({
  mentor_occupation: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTOR',
      then: (schema) => schema.required().max(255).label('Occupation'),
    }),
  mentor_workPlace: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTOR',
      then: (schema) => schema.max(255).label('Work place'),
    }),
  mentee_occupationCategoryId: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTEE',
      then: (schema) =>
        schema
          .required()
          .oneOf(objectKeys(MENTEE_OCCUPATION_CATEGORY))
          .label('Current occupation'),
    }),
  mentee_occupationJob_placeOfEmployment: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTEE',
      then: (schema) => schema.max(255).label('Where are you employed'),
    }),

  mentee_occupationJob_position: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTEE',
      then: (schema) =>
        schema.max(255).label('At what university do you study'),
    }),

  mentee_occupationStudent_studyPlace: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTEE',
      then: (schema) => schema.max(255).label('Where do you study'),
    }),

  mentee_occupationStudent_studyName: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTEE',
      then: (schema) => schema.max(255).label('What do you study'),
    }),

  mentee_occupationLookingForJob_what: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTEE',
      then: (schema) => schema.max(255).label('What kind of job'),
    }),

  mentee_occupationOther_description: Yup.string()
    .nullable()
    .when('userType', {
      is: 'MENTEE',
      then: (schema) => schema.max(255).label('What are you currently doing'),
    }),
})

function EditableOccupation() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data?.conProfile

  const userType = profile?.userType
  const mentor_occupation = profile?.mentor_occupation
  const mentor_workPlace = profile?.mentor_workPlace
  const mentee_occupationCategoryId = profile?.mentee_occupationCategoryId
  const mentee_occupationJob_placeOfEmployment =
    profile?.mentee_occupationJob_placeOfEmployment
  const mentee_occupationJob_position = profile?.mentee_occupationJob_position
  const mentee_occupationStudent_studyPlace =
    profile?.mentee_occupationStudent_studyPlace
  const mentee_occupationStudent_studyName =
    profile?.mentee_occupationStudent_studyName
  const mentee_occupationLookingForJob_what =
    profile?.mentee_occupationLookingForJob_what
  const mentee_occupationOther_description =
    profile?.mentee_occupationOther_description

  const isMentee = userType === 'MENTEE'
  const isMentor = userType === 'MENTOR'

  const submitForm = async (values: FormikValues) => {
    const cleanValues = omit(values, ['userType'])
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: { id: profile.id, ...cleanValues },
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const initialValues: OccupationFormValues = {
    userType,
    mentor_occupation,
    mentor_workPlace,
    mentee_occupationCategoryId,
    mentee_occupationJob_placeOfEmployment,
    mentee_occupationJob_position,
    mentee_occupationStudent_studyPlace,
    mentee_occupationStudent_studyName,
    mentee_occupationLookingForJob_what,
    mentee_occupationOther_description,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  const { mentee_occupationCategoryId: occupation } = formik.values

  if (!myProfileQuery.isSuccess) return null

  return (
    <Editable
      title="Occupation"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadOccupation.Me />}
    >
      {isMentor && (
        <>
          <FormInput
            name="mentor_occupation"
            label="What is your job title?"
            placeholder="Your job"
            {...formik}
          />
          <FormInput
            name="mentor_workPlace"
            label="Which company are you working for?"
            placeholder="Company"
            {...formik}
          />
        </>
      )}

      {isMentee && (
        <>
          <FormSelect
            label="What is your current occupation?"
            name="mentee_occupationCategoryId"
            placeholder="Current Occupation"
            items={formMenteeOccupationCategories}
            formik={formik}
          />
          {occupation === 'job' && (
            <>
              <FormInput
                name="mentee_occupationJob_placeOfEmployment"
                label="Where are you employed?"
                placeholder="Company"
                {...formik}
              />
              <FormInput
                name="mentee_occupationJob_position"
                label="What is your position?"
                placeholder="Job position"
                {...formik}
              />
            </>
          )}
          {occupation === 'student' && (
            <>
              <FormInput
                name="mentee_occupationStudent_studyPlace"
                label="At what university do you study?"
                placeholder="University"
                {...formik}
              />
              <FormInput
                name="mentee_occupationStudent_studyName"
                label="What do you study?"
                placeholder="Study"
                {...formik}
              />
            </>
          )}
          {occupation === 'lookingForJob' && (
            <FormInput
              name="mentee_occupationLookingForJob_what"
              label="What kind of job?"
              placeholder="Dreamjob..."
              {...formik}
            />
          )}
          {occupation === 'other' && (
            <FormInput
              name="mentee_occupationOther_description"
              label="What are you currently doing?"
              placeholder="Whats up?"
              {...formik}
            />
          )}
        </>
      )}
    </Editable>
  )
}

export default EditableOccupation
