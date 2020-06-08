import React from 'react'
import { FormTextArea, FormSelect } from '../atoms'
import { Editable, ReadAbout } from '../molecules'
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

// do we really need all these type???
export type UserType =
  | 'mentor'
  | 'mentee';

export interface AboutFormValues {
  userType: UserType
  personalDescription: string
  expectations: string
  menteeCountCapacity: number
}

const validationSchema = Yup.object({
  personalDescription: Yup.string()
    .required()
    .min(100)
    .max(600)
    .label('Personal description'),
  menteeCountCapacity: Yup.number().when('userType', {
    is: 'mentor',
    then: Yup.number()
      .required('Please specify the number of mentees you can take on')
      .min(1)
      .max(2)
  })
})
// props: FormikProps<AboutFormValues>
const EditableAbout = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    userType,
    personalDescription,
    expectations,
    menteeCountCapacity
  } = profile

  const submitForm = async (
    values: FormikValues
  ) => {
    const profileAbout = values as Partial<RedProfile>
    profileSaveStart({ ...profileAbout, id })
  }

  const initialValues: AboutFormValues = {
    userType,
    personalDescription,
    expectations,
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
      title="About You"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={(formik.dirty && formik.isValid)}
      read={<ReadAbout.Me />}
    >
      <FormTextArea
        label="Tell us a few words about yourself (this will be displayed on your profile)* (100-600 characters)"
        name="personalDescription"
        rows={4}
        placeholder="About you"
        {...formik}
      />
      <FormTextArea
        label={
          userType === 'mentee'
            ? 'What do you expect from your mentor?'
            : 'Feel free to share expectations towards your mentees (shown on your profile)'
        }
        name="expectations"
        rows={4}
        placeholder="Expectations"
        {...formik}
      />
      {userType === 'mentor' &&
        <FormSelect
          label="How many mentees would you be willing to mentor this semester?"
          name="menteeCountCapacity"
          placeholder="Mentee count"
          items={formMenteeCountCapacity}
          {...formik}
        />
      }
    </Editable>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableAbout)
