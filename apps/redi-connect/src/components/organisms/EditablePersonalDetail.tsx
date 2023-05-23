import {
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Editable,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { GENDERS } from '@talent-connect/shared-config'
import { objectEntries, objectKeys } from '@talent-connect/typescript-utilities'
import { FormikValues, useFormik } from 'formik'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadPersonalDetail } from '../molecules'

const formGenders = objectEntries(GENDERS).map(([value, label]) => ({
  value,
  label,
}))
export interface PersonalDetailFormValues {
  gender: string
  // Disabled for reasons explained above.
  // birthDate: Date | null
}

const validationSchema = Yup.object({
  gender: Yup.string().oneOf(objectKeys(GENDERS)).label('Gender'),
  // Temporarily disabled until datepicker returns only date (not datetime).
  // By saving datetime to Salesforce the saved date is off by one day.
  // birthDate: Yup.date().nullable(true).label('Date'),
})

const EditablePersonalDetail = () => {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data?.conProfile

  const gender = profile?.gender
  // Disabled for reasons explained above.
  // const birthDate = profile?.birthDate

  const submitForm = async (values: FormikValues) => {
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: values,
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const initialValues: PersonalDetailFormValues = {
    gender,
    // Disabled for reasons explained above.
    // birthDate: birthDate ? new Date(birthDate) : null,
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
      title="Personal Details"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadPersonalDetail.Me />}
    >
      <FormSelect
        label="Gender"
        name="gender"
        placeholder="Prefer not to answer"
        items={formGenders}
        {...formik}
      />
      {/* Disabled for reasons explained above */}
      {/* <FormDatePicker
        label="Date of birth"
        name="birthDate"
        placeholder="Add your date of birth"
        dateFormat="dd MMMM yyyy"
        minDate={subYears(new Date(), 100)}
        maxDate={subYears(new Date(), 18)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        isClearable
        {...formik}
      /> */}
    </Editable>
  )
}

export default EditablePersonalDetail
