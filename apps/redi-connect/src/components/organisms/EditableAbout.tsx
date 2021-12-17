import { FunctionComponent } from 'react'
import { FormTextArea } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile, UserType } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { profileSaveStart } from '../../redux/user/actions'

import * as Yup from 'yup'

import { FormikProps, FormikValues, useFormik } from 'formik'
import { ReadAbout } from '../molecules'

import { assertUnreachable } from '@talent-connect/shared-utils'

export interface AboutFormValues {
  userType: UserType
  personalDescription: string
  expectations: string
}

const personalDescriptionRange = { min: 100, max: 600 }
const validationSchema = Yup.object({
  personalDescription: Yup.string()
    .required('Write at least 100 characters about yourself.')
    .min(
      personalDescriptionRange.min,
      'Write at least 100 characters about yourself.'
    )
    .max(
      personalDescriptionRange.max,
      'The introduction text can be up to 600 characters long.'
    )
    .label('Personal description'),
})

interface Props {
  profile: RedProfile
  profileSaveStart: Function
}

const EditableAbout: FunctionComponent<Props> = ({
  profile: { id, userType, personalDescription, expectations },
  profileSaveStart
}) => {

  const submitForm = async (values: FormikValues) => {
    const profileAbout = values as Partial<RedProfile>
    profileSaveStart({ ...profileAbout, id })
  }

  const initialValues: AboutFormValues = {
    userType,
    personalDescription,
    expectations,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  return (
    <Editable
      title="About You"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadAbout.Me />}
    >
      <FormTextArea
        label="Tell us a few words about yourself (this will be displayed on your profile)* (100-600 characters)"
        name="personalDescription"
        rows={4}
        placeholder="About you"
        minChar={personalDescriptionRange.min}
        maxChar={personalDescriptionRange.max}
        {...formik}
      />
      <FormTextArea
        label={expectationsFieldLabel(userType)}
        name="expectations"
        rows={4}
        placeholder={expectationsFieldPlaceholder(userType)}
        {...formik}
      />
    </Editable>
  )
}

const expectationsFieldLabel = (userType: UserType): string => {
  switch (userType) {
    case 'mentee':
    case 'public-sign-up-mentee-pending-review':
    case 'public-sign-up-mentee-rejected':
      return 'What do you expect from a mentorship and which short- to medium-term goals would you like to achieve in about 5-6 mentoring sessions?'

    case 'mentor':
    case 'public-sign-up-mentor-pending-review':
    case 'public-sign-up-mentor-rejected':
      return 'Feel free to share how you can best support your mentees and any expectations you may have towards them'
  }

  return assertUnreachable(userType)
}

const expectationsFieldPlaceholder = (userType: UserType): string => {
  switch (userType) {
    case 'mentee':
    case 'public-sign-up-mentee-pending-review':
    case 'public-sign-up-mentee-rejected':
      return 'Support with finding a job, get better with my tech skills, build a portfolio, etc.'

    case 'mentor':
    case 'public-sign-up-mentor-pending-review':
    case 'public-sign-up-mentor-rejected':
      return 'Providing career or technical support, expecting commitment, etc.'
  }

  return assertUnreachable(userType)
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile,
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableAbout)
