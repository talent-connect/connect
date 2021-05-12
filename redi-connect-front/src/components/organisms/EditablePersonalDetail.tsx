import React from 'react'
import { connect } from 'react-redux'
import { subYears } from 'date-fns'
import { FormSelect, FormDatePicker } from '../atoms'
import { Editable, ReadPersonalDetail } from '../molecules'
import { RedProfile } from '../../types/RedProfile'
import { RootState } from '../../redux/types'

import {
  profileSaveStart
} from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import {
  genders
} from '../../config/config'
import { SignalCellularNullRounded } from '@material-ui/icons'

const formGenders = genders.map(gender => ({ value: gender.id, label: gender.label }))

export interface PersonalDetailFormValues {
  gender: string
  birthDate: Date | null
}

const validationSchema = Yup.object({
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'])
    .label('Gender'),
  birthDate: Yup.date()
    .nullable(true)
    .label('Date')
})

const EditablePersonalDetail = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    gender,
    birthDate
  } = profile

  const submitForm = async (
    values: FormikValues
  ) => {
    const personalDetail = values as Partial<RedProfile>
    profileSaveStart({ ...personalDetail, id })
  }

  const initialValues: PersonalDetailFormValues = {
    gender,
    birthDate: birthDate ? new Date(birthDate) : null
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm
  })

  return (
    <Editable
      title="Personal Details"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={(formik.dirty && formik.isValid)}
      read={<ReadPersonalDetail.Me />}
    >
      <FormSelect
        label="Gender"
        name="gender"
        placeholder="Prefer not to answer"
        items={formGenders}
        {...formik}
      />

      <FormDatePicker
        label="Date of birth"
        name="birthDate"
        placeholder="Add your date of birth"
        dateFormat="dd MMMM yyyy"
        minDate={subYears(new Date(), 100)}
        maxDate={subYears(new Date(), 18)}
        openToDate={subYears(new Date(), 18)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        {...formik}
      />
    </Editable>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditablePersonalDetail)
