import { COURSES } from '@talent-connect/shared-config';
import { createComponentForm } from '@talent-connect/shared-utils';
import { omit } from 'lodash';
import { signUpCompany, signUpJobSeeker } from '../../../services/api/api'
import { history } from '../../../services/history/history'
import { Dispatch } from 'react';
import * as Yup from 'yup'

export type SignUpPageType = 'jobSeeker' | 'company'
interface ComponentFormProps {
  signUpType: SignUpPageType;
  setSubmitError: Dispatch<any>
}

const baseValidationSchema = {
  firstName: Yup.string()
    .required('Your first name is invalid')
    .max(255),
  lastName: Yup.string()
    .required('Your last name is invalid')
    .max(255),
  contactEmail: Yup.string()
    .email('Your email is invalid')
    .required('You need to give an email address')
    .label('Email')
    .max(255),
  password: Yup.string()
    .min(8, 'The password has to consist of at least eight characters')
    .required('You need to set a password')
    .label('Password'),
  passwordConfirm: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
  gaveGdprConsent: Yup.boolean()
    .required()
    .oneOf([true]),
}

const initialValues = {
  contactEmail: '',
  password: '',
  passwordConfirm: '',
  firstName: '',
  lastName: '',
  gaveGdprConsent: false,
}

export const jobSeekerComponentForm = createComponentForm<ComponentFormProps>()
    .validation((yup) => ({
      ...baseValidationSchema,
      currentlyEnrolledInCourse: yup.string()
        .required()
        .oneOf(COURSES.map(({ id }) => id))
        .label('Currently enrolled in course'),
      agreesWithCodeOfConduct: yup.boolean()
        .required()
        .oneOf([true]),
    }))
    .initialValues(() => ({
      ...initialValues,
      // state: 'drafting-profile', // TODO: Include in form ??
      currentlyEnrolledInCourse: '',
      agreesWithCodeOfConduct: false,
    }))
    .onSubmit(async (profile, { setSubmitting }, { setSubmitError }) => {
      setSubmitError(null)
  
      try {
        // TODO: this needs to be done in a smarter way, like iterating over the TpJobSeekerProfile definition or something
        const cleanProfile = omit(profile, [
          'password',
          'passwordConfirm',
          'agreesWithCodeOfConduct',
          'gaveGdprConsent',
        ])

          // profile.isProfileVisibleToCompanies = true // TODO: why?
  
          await signUpJobSeeker(
            profile.contactEmail,
            profile.password,
            cleanProfile
          )
        setSubmitting(false)
        history.push(`/front/signup-email-verification`)
      } catch (error) {
        setSubmitting(false)
        return error?.response?.data?.error?.details?.codes?.email.includes('uniqueness')
          ? setSubmitError('user-already-exists')
          : setSubmitError('generic')
      }
    })


export const companyComponentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    ...baseValidationSchema,
    companyName: yup.string()
      .required('Your company name is required')
      .max(255),
    howDidHearAboutRediKey: yup.string()
      .required('This field is required'),
    howDidHearAboutRediOtherText: yup.string()
      .when('howDidHearAboutRediKey',
        {
          is: (howDidHearAboutRediKey) => howDidHearAboutRediKey === 'other',
          then: yup.string()
            .required('This field is required'),
        }
      ),
  }))
  .initialValues(() => ({
    ...initialValues,
    companyName: '',
    // state: 'drafting-profile',
    howDidHearAboutRediKey: '',
    howDidHearAboutRediOtherText: '',
  }))
  .onSubmit(async (profile, { setSubmitting }, { setSubmitError }) => {
    setSubmitError(null)

    try {
      // TODO: this needs to be done in a smarter way, like iterating over the TpJobSeekerProfile definition or something
      const cleanProfile = omit(profile, [
        'password',
        'passwordConfirm',
        'agreesWithCodeOfConduct',
        'gaveGdprConsent',
      ])

      await signUpCompany(profile.contactEmail, profile.password, cleanProfile)
      setSubmitting(false)
      history.push(`/front/signup-email-verification`)
    } catch (error) {
      setSubmitting(false)
      return error?.response?.data?.error?.details?.codes?.email.includes('uniqueness')
        ? setSubmitError('user-already-exists')
        : setSubmitError('generic')
    }
  })