import {
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Editable,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { EDUCATION_LEVELS } from '@talent-connect/shared-config'
import { objectEntries, objectKeys } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadEducation } from '../molecules'

const formEducationLevels = objectEntries(EDUCATION_LEVELS).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export interface EducationFormValues {
  mentee_highestEducationLevel: string
}

const validationSchema = Yup.object({
  mentee_highestEducationLevel: Yup.string()
    .oneOf(objectKeys(EDUCATION_LEVELS))
    .label('Highest Education Level'),
})

function EditableEducation() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data?.conProfile

  const mentee_highestEducationLevel = profile?.mentee_highestEducationLevel

  const submitForm = async (values: FormikValues) => {
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: values,
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const initialValues: EducationFormValues = {
    mentee_highestEducationLevel,
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
      title="Highest Education (optional)"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadEducation.Me />}
    >
      <FormSelect
        label="What is your highest Education Level?"
        name="mentee_highestEducationLevel"
        placeholder="Education Level"
        items={formEducationLevels}
        formik={formik}
      />
    </Editable>
  )
}

export default EditableEducation
