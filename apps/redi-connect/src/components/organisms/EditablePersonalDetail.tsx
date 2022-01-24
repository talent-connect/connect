import { FC } from 'react'
import { subYears } from 'date-fns'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import {
  FormDatePicker,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'

import { profileSaveStart } from '../../redux/user/actions'


import { GENDERS } from '@talent-connect/shared-config'
import { ReadPersonalDetail } from '../molecules'

import { mapOptionsObject, objectKeys } from '@talent-connect/typescript-utilities'
import { mapStateToProps } from '../../helpers';

const formGenders = mapOptionsObject(GENDERS)

export interface PersonalDetailFormValues {
  gender: string
  birthDate: Date | null
}

const validationSchema = Yup.object({
  gender: Yup.string()
    .oneOf(objectKeys(GENDERS))
    .label('Gender'),
  birthDate: Yup.date()
    .nullable(true)
    .label('Date'),
})

interface Props {
  profile: RedProfile
  profileSaveStart: (arg: PersonalDetailFormValues & { id: string}) => void
}

const EditablePersonalDetail: FC<Props> = ({
  profile: { id, gender, birthDate },
  profileSaveStart
}) => {

  const formik = useFormik<PersonalDetailFormValues>({
    initialValues: {
      gender,
      birthDate: birthDate ? new Date(birthDate) : null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (personalDetail) => {
      profileSaveStart({ ...personalDetail, id })
    },
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
        {...formik}
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

const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditablePersonalDetail)
