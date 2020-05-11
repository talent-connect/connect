import React, { useEffect } from 'react'
import * as Yup from 'yup'

import { Columns } from 'react-bulma-components'
import Heading from '../../../components/atoms/Heading'

import About from './About'
import Mentoring from './Mentoring'
import Contacts from './Contacts'
import SocialMedia from './SocialMedia'
import PersonalDetail from './PersonalDetail'
import Languages from './Languages'
import RediClass from './RediClass'
import Occupation from './Occupation'

import LoggedIn from '../../../components/templates/LoggedIn'
// CHECK OUT THE LOADER
// import { FullScreenCircle } from '../../../hooks/WithLoading'
import { RootState } from '../../../redux/types'
import { connect } from 'react-redux'
import {
  profileFetchStart,
  profileSaveStart
} from '../../../redux/user/actions'

import {
  S3_UPLOAD_SIGN_URL
} from '../../../config/config'

import { FormikValues, useFormik } from 'formik'
import { RedProfile } from '../../../types/RedProfile'

import ReactS3Uploader from 'react-s3-uploader'

// import { Avatar } from '../../../../components/Avatar'

export interface MeFormValues {
  profileAvatarImageS3Key: string
}

const validationSchema = Yup.object({
  profileAvatarImageS3Key: Yup.string().max(255)
})

const Me = ({ loading, saveResult, profileFetchStart, profileSaveStart, profile }: any) => {
  // const [uploadInput, setUploadInput] = useState<HTMLInputElement>()

  // not sure if this is really needed since the profile is loaded when the user is logged in
  useEffect(() => {
    profileFetchStart()
  }, [profileFetchStart])

  const initialValues: MeFormValues = {
    profileAvatarImageS3Key: profile && profile.profileAvatarImageS3Key
  }

  const submitForm = async (
    values: FormikValues
  ) => {
    const profileMe = values as Partial<RedProfile>
    profileSaveStart({ ...profileMe, id: profile.id })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  // THIS COULD BE HELPFUL LATER
  // const onUploadStart = (file: any, next: any) => {
  //   setLoading(true)
  //   next(file)
  // }
  const onUploadSuccess = (result: any) => {
    formik.setFieldValue('profileAvatarImageS3Key', result.fileKey)
    formik.handleSubmit()
  }

  return (
    <LoggedIn>
      {loading && 'page loading...'}
      {saveResult === 'error' && <><br/><br/><br/>An error occurred, please try again.</>}
      {saveResult === 'success' && <>Your profile was saved.</>}
      {!loading &&
        <>
          {saveResult === 'submitting' && 'part of the page loading...'}

          <Columns>
            <Columns.Column size={3}>
              <div className="file is-boxed">
                {/* SHOWING THE AVATAR
                 <Avatar s3Key={profileAvatarImageS3Key} /> */}
                <label className="file-label" htmlFor="avatar-upload">
                  <span className="file-cta">
                    <span className="file-label">Upload file</span>
                  </span>
                  <ReactS3Uploader
                    name="avatar-upload"
                    id="avatar-upload"
                    className="file-input"
                    signingUrl={S3_UPLOAD_SIGN_URL}
                    accept="image/*"
                    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
                    // preprocess={onUploadStart}
                    onSignedUrl={(c: any) => console.log(c)}
                    onError={(c: any) => console.log(c)}
                    onFinish={onUploadSuccess}
                    contentDisposition="auto"
                    // inputRef={(cmp: any) => setUploadInput(cmp)}
                  />
                </label>
              </div>
            </Columns.Column>
            <Columns.Column size={9}>
              <Heading>Hi, {profile.firstName}</Heading>
            </Columns.Column>
          </Columns>

          <About />
          <Mentoring />
          <Columns>
            <Columns.Column size={6}>
              <Contacts/>
            </Columns.Column>
            <Columns.Column size={6}>
              <SocialMedia/>
            </Columns.Column>
          </Columns>

          <Columns>
            <Columns.Column size={6}>
              <PersonalDetail/>
            </Columns.Column>
            <Columns.Column size={6}>
              <Languages/>
            </Columns.Column>
          </Columns>

          <Columns>
            <Columns.Column size={6}>
              <Occupation/>
            </Columns.Column>
            <Columns.Column size={6}>
              { profile.userType === 'mentee' && <RediClass/>}
            </Columns.Column>
          </Columns>
        </>
      }
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  saveResult: state.user.saveResult,
  loading: state.user.loading,
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile)),
  profileFetchStart: () => dispatch(profileFetchStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Me)
