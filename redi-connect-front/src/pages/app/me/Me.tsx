import React, { useEffect } from 'react'
import * as Yup from 'yup'

import About from './About'
import Mentoring from './Mentoring'
import { Step2Background } from './steps/Step2Background'
import { Step3Profile } from './steps/Step3Profile'

import LoggedIn from '../../../components/templates/LoggedIn'
import { Step4ContactData } from './steps/Step4ContactData'
import { Step5Categories } from './steps/Step5Categories'
import { FullScreenCircle } from '../../../hooks/WithLoading'
import { RootState } from '../../../redux/types'
import { connect } from 'react-redux'
import {
  profileFetchStart
} from '../../../redux/user/actions'
import {
  educationLevels,
  courses,
  menteeOccupationCategories
} from '../../../config/config'

export type SignUpFormType =
  | 'mentor'
  | 'mentee'
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review'
  | 'public-sign-up-mentor-rejected'
  | 'public-sign-up-mentee-rejected';

export interface SignUpFormValues {
  formType: SignUpFormType
  mentor_occupation: string
  mentor_workPlace: string
  expectations: string
  mentee_occupationCategoryId: string // TODO: do TS magic to make this a union type
  mentee_occupationJob_placeOfEmployment: string
  mentee_occupationJob_position: string
  mentee_occupationStudent_studyPlace: string
  mentee_occupationStudent_studyName: string
  mentee_occupationLookingForJob_what: string
  mentee_occupationOther_description: string
  mentee_highestEducationLevel: string
  mentee_currentlyEnrolledInCourse: string
  profileAvatarImageS3Key: string
  firstName: string
  lastName: string
  gender: string
  age?: number
  languages: string[]
  otherLanguages: string
  personalDescription: string
  contactEmail: string
  linkedInProfileUrl: string
  githubProfileUrl: string
  slackUsername: string
  telephoneNumber: string
  categories: string[]
  menteeCountCapacity: number
}

const validationSchema = Yup.object({
  mentor_occupation: Yup.string().when('formType', {
    is: 'mentor',
    then: Yup.string()
      .required()
      .max(255)
      .label('Occupation')
  }),
  mentor_workPlace: Yup.string()
    .max(255)
    .label('Work place'),
  mentee_occupationCategoryId: Yup.string().when('formType', {
    is: 'mentee',
    then: Yup.string()
      .required()
      .oneOf(menteeOccupationCategories.map(v => v.id))
      .label('Current occupation')
  }),
  mentee_occupationJob_placeOfEmployment: Yup.string()
    .max(255)
    .label('Where are you employed'),
  mentee_occupationJob_position: Yup.string()
    .max(255)
    .label('At what university do you study'),
  mentee_occupationStudent_studyPlace: Yup.string()
    .max(255)
    .label('Where do you study'),
  mentee_occupationStudent_studyName: Yup.string()
    .max(255)
    .label('What do you study'),
  mentee_occupationLookingForJob_what: Yup.string()
    .max(255)
    .label('What kind of job'),
  mentee_occupationOther_description: Yup.string()
    .max(255)
    .label('What are you currently doing'),
  mentee_highestEducationLevel: Yup.string().when('formType', {
    is: 'mentee',
    then: Yup.string()
      .oneOf(educationLevels.map(level => level.id))
      .label('Highest Education Level')
  }),
  mentee_currentlyEnrolledInCourse: Yup.string().when('formType', {
    is: 'public-sign-up-mentee-pending-review',
    then: Yup.string()
      .required()
      .oneOf(courses.map(level => level.id))
      .label('Currently enrolled in course')
  }),
  profileAvatarImageS3Key: Yup.string().max(255),
  firstName: Yup.string()
    .required()
    .max(255),
  lastName: Yup.string()
    .required()
    .max(255),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'])
    .label('Gender'),
  age: Yup.number()
    .min(16)
    .max(99)
    .label('Age'),
  languages: Yup.array()
    .min(1)
    .of(Yup.string().max(255))
    .label('Languages'),
  personalDescription: Yup.string()
    .required()
    .min(100)
    .max(600)
    .label('Personal description'),
  contactEmail: Yup.string()
    .email()
    .required()
    .max(255)
    .label('Contact email'),
  linkedInProfileUrl: Yup.string()
    .max(255)
    .url()
    .label('LinkedIn Profile'),
  githubProfileUrl: Yup.string()
    .max(255)
    .url()
    .label('Github Profile'),
  slackUsername: Yup.string()
    .max(255)
    .label('Slack username'),
  telephoneNumber: Yup.string()
    .max(255)
    .label('Telephone number'),
  categories: Yup.array().when('formType', {
    is: 'mentee',
    then: Yup.array()
      .compact(v => v === 'dontKnowYet')
      .min(0)
      .max(3)
  }),
  menteeCountCapacity: Yup.number().when('formType', {
    is: 'mentor',
    then: Yup.number()
      .required('Please specify the number of mentees you can take on')
      .min(1)
      .max(4)
  })
})

const Me = ({ loading, saveResult, profileFetchStart }: any) => {
  // not sure if this is really neede since the profile is loaded when the user is logged in
  useEffect(() => {
    profileFetchStart()
  }, [profileFetchStart])

  return (
    <LoggedIn>
      <FullScreenCircle loading={loading} />
      {!loading &&
        <>
          <FullScreenCircle loading={saveResult === 'submitting'} />
          {/* <Button
            onClick={() => {
              formik.handleSubmit()
            }}
            disabled={saveResult === 'submitting'}
          >
                  Save
          </Button> */}
          {/*
          <form onSubmit={e => e.preventDefault()}> */}
          <About />
          <Mentoring />
          {/* <Step2Background type={profile.userType} {...formik} />
            <Step3Profile type={profile.userType} {...formik} />
            <Step4ContactData type={profile.userType} {...formik} />
            <Step5Categories type={profile.userType} {...formik} /> */}
          {/* </form> */}

          {saveResult === 'error' && <><br/><br/><br/>An error occurred, please try again.</>}
          {saveResult === 'success' && <>Your profile was saved.</>}
        </>
      }
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  saveResult: state.user.saveResult
})

const mapDispatchToProps = (dispatch: any) => ({
  profileFetchStart: () => dispatch(profileFetchStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Me)
