import React from 'react'
import {
  Checkbox,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import {
  MENTEE_COUNT_CAPACITY_OPTIONS,
  REDI_LOCATION_NAMES,
} from '@talent-connect/shared-config'
import { RediLocation } from '@talent-connect/shared-types'
import { ReadMenteeCount } from '../molecules'

const menteeCountExplanation = (amount: number) => {
  switch (amount) {
    case 0:
      return '(Select this option if you need a break from mentoring)'
    case 1:
      return 'mentee'
    default:
      return 'mentees'
  }
}

const formMenteeCountCapacityOptions = MENTEE_COUNT_CAPACITY_OPTIONS.map(
  (option) => ({
    value: option,
    label: `${option} ${menteeCountExplanation(option)}`,
  })
)

export interface AboutFormValues {
  menteeCountCapacity: number
  optOutOfMenteesFromOtherRediLocation: boolean
}

const validationSchema = Yup.object({
  menteeCountCapacity: Yup.number().when('userType', {
    is: 'mentor',
    then: Yup.number()
      .required('Please specify the number of mentees you can take on')
      .min(0)
      .max(2),
  }),
})
// props: FormikProps<AboutFormValues>
const EditableMenteeCount = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    menteeCountCapacity,
    optOutOfMenteesFromOtherRediLocation,
    rediLocation,
  } = profile

  const submitForm = async (values: FormikValues) => {
    console.log(values)
    const profileMenteeCount = values as Partial<RedProfile>
    profileSaveStart({ ...profileMenteeCount, id })
  }

  const initialValues: AboutFormValues = {
    menteeCountCapacity,
    optOutOfMenteesFromOtherRediLocation,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  return (
    <Editable
      title="Mentee Count and Location"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadMenteeCount.Me />}
    >
      <FormSelect
        label="How many mentees would you be willing to mentor this semester?"
        name="menteeCountCapacity"
        placeholder="Mentee count"
        items={formMenteeCountCapacityOptions}
        formik={formik}
      />
      <Checkbox.Form
        name="optOutOfMenteesFromOtherRediLocation"
        checked={formik.values.optOutOfMenteesFromOtherRediLocation}
        {...formik}
      >
        Only let mentees from my own city/location apply for mentorship (i.e.
        people in {REDI_LOCATION_NAMES[rediLocation as RediLocation]})
      </Checkbox.Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditableMenteeCount)
