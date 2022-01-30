import { Dispatch, SetStateAction } from 'react';
import { omit } from 'lodash';

import { createComponentForm } from '@talent-connect/shared-utils';
import { courses } from '../../../config/config'
import { signUp } from '../../../services/api/api'
import { history } from '../../../services/history/history'
import { Extends, RedProfile } from '@talent-connect/shared-types';


export type SignUpUserType = Extends< // TODO necessary?
  RedProfile['userType'],
  | 'public-sign-up-mentee-pending-review'
  | 'public-sign-up-mentor-pending-review'
>

interface ComponentFormProps {
  userType: SignUpUserType;
  setSubmitError: Dispatch<SetStateAction<boolean>>;
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    firstName: yup.string()
      .required('Your first name is invalid').max(255),
    lastName: yup.string()
      .required('Your last name is invalid').max(255),
    contactEmail: yup.string()
      .email('Your email is invalid')
      .required('You need to give an email address')
      .label('Email')
      .max(255),
    password: yup.string()
      .min(8, 'The password has to consist of at least eight characters')
      .required('You need to set a password')
      .label('Password'),
    passwordConfirm: yup.string()
      .required('Confirm your password')
      .oneOf([yup.ref('password')], 'Passwords does not match'),
    agreesWithCodeOfConduct: yup.boolean()
      .required()
      .oneOf([true]),
    gaveGdprConsent: yup.boolean()
      .required()
      .oneOf([true]),
    mentee_currentlyEnrolledInCourse: yup.string()
      .when('userType', {
        is: 'public-sign-up-mentee-pending-review',
        then: yup.string()
          .required()
          .oneOf(courses.map((level) => level.id))
          .label('Currently enrolled in course'),
      }),
  }))
  .initialValues(({ userType }) => ({
    userType,
    gaveGdprConsent: false,
    contactEmail: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    agreesWithCodeOfConduct: false,
    mentee_currentlyEnrolledInCourse: '',
  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit(async (profile, { setSubmitting }, { setSubmitError }) => {
      setSubmitError(false)
      // TODO: this needs to be done in a smarter way, like iterating over the RedProfile definition or something
      const cleanProfile = omit(profile, [
        'password',
        'passwordConfirm',
        'agreesWithCodeOfConduct',
        'gaveGdprConsent',
      ])
      const complementedProfile = {
        ...cleanProfile,
        userActivated: false,
        signupSource: 'public-sign-up' as 'public-sign-up',
        menteeCountCapacity: 1,
      }
      try {
        await signUp(profile.contactEmail, profile.password, complementedProfile)
        setSubmitting(false)
        history.push(`/front/signup-email-verification/${cleanProfile.userType}`)
      } catch (error) {
        setSubmitting(false)
        setSubmitError(!!error)
      }
  })