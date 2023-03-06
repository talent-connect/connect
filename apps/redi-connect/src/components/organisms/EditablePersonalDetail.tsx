import { subYears } from 'date-fns'

import {
  FormDatePicker,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import { GENDERS } from '@talent-connect/shared-config'
import { ReadPersonalDetail } from '../molecules'

import { objectEntries, objectKeys } from '@talent-connect/typescript-utilities'

const formGenders = objectEntries(GENDERS).map(([value, label]) => ({
  value,
  label,
}))
export interface PersonalDetailFormValues {
  gender: string
  birthDate: Date | null
}

const validationSchema = Yup.object({
  gender: Yup.string().oneOf(objectKeys(GENDERS)).label('Gender'),
  birthDate: Yup.date().nullable(true).label('Date'),
})

const EditablePersonalDetail = ({ profile, profileSaveStart }: any) => {
  const { id, gender, birthDate } = profile

  const submitForm = async (values: FormikValues) => {
    const personalDetail = values as Partial<RedProfile>
    profileSaveStart({ ...personalDetail, id })
  }

  const initialValues: PersonalDetailFormValues = {
    gender,
    birthDate: birthDate ? new Date(birthDate) : null,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

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
        formik={formik}
      />

      <FormDatePicker
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
      />
    </Editable>
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
)(EditablePersonalDetail)
