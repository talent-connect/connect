import {
  RediLocation,
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Editable,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { FormikValues, useFormik } from 'formik'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { courses } from '../../config/config'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { envRediLocation } from '../../utils/env-redi-location'
import { ReadRediClass } from '../molecules'

const formCourses = COURSES.filter((course) => {
  const courseLocation = course.location as RediLocation
  return courseLocation === envRediLocation()
}).map((course) => ({
  value: course.id,
  label: course.label,
}))

export interface RediClassFormValues {
  mentee_currentlyEnrolledInCourse: string
}

const validationSchema = Yup.object({
  mentee_currentlyEnrolledInCourse: Yup.string()
    .required()
    .oneOf(courses.map((level) => level.id))
    .label('Currently enrolled in course'),
})

function EditableRediClass() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data?.conProfile

  const mentee_currentlyEnrolledInCourse =
    profile?.mentee_currentlyEnrolledInCourse

  const submitForm = async (values: FormikValues) => {
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: { id: profile.id, ...values },
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const initialValues: RediClassFormValues = {
    mentee_currentlyEnrolledInCourse,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  if (!myProfileQuery.isSuccess) return null

  return (
    <Editable
      title="Redi Class"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadRediClass.Me />}
    >
      <FormSelect
        label="Which course are you taking at ReDI?"
        name="mentee_currentlyEnrolledInCourse"
        items={formCourses}
        {...formik}
      />
    </Editable>
  )
}

export default EditableRediClass
