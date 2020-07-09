import React from 'react'
import { FormSelect } from '../atoms'
import { Editable, ReadMenteeCount } from '../molecules'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import {
  profileSaveStart
} from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import {
  menteeCountCapacityOptions
} from '../../config/config'

const formMenteeCountCapacity = menteeCountCapacityOptions.map(option => ({ value: option, label: option }))

export interface AboutFormValues {
  menteeCountCapacity: number
}

const validationSchema = Yup.object({
  menteeCountCapacity: Yup.number().when('userType', {
    is: 'mentor',
    then: Yup.number()
      .required('Please specify the number of mentees you can take on')
      .min(1)
      .max(2)
  })
})
// props: FormikProps<AboutFormValues>
const EditableMenteeCount = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    menteeCountCapacity
  } = profile

  const submitForm = async (
    values: FormikValues
  ) => {
    const profileAbout = values as Partial<RedProfile>
    profileSaveStart({ ...profileAbout, id })
  }

  const initialValues: AboutFormValues = {
    menteeCountCapacity
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm
  })

  return (
    <Editable
      title="Mentee Count"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={(formik.dirty && formik.isValid)}
      read={<ReadMenteeCount.Me />}
    >
      <FormSelect
        label="How many mentees would you be willing to mentor this semester?"
        name="menteeCountCapacity"
        placeholder="Mentee count"
        items={formMenteeCountCapacity}
        {...formik}
      />
      {/* } */}
    </Editable>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableMenteeCount)
