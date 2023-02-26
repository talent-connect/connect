import { useCallback, useState, useRef } from 'react'
import { FormikValues, useFormik } from 'formik'
import classnames from 'classnames'
import * as Yup from 'yup'
import Cropper from 'react-easy-crop'
import ReactS3Uploader from 'react-s3-uploader'
import { Element } from 'react-bulma-components'
import { CircularProgress, LinearProgress } from '@material-ui/core'

import { Button, Modal } from '@talent-connect/shared-atomic-design-components'
import {
  AWS_PROFILE_AVATARS_BUCKET_BASE_URL,
  S3_UPLOAD_SIGN_URL,
} from '@talent-connect/shared-config'
import {
  TpCompanyProfile,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import { getCroppedImg } from '@talent-connect/shared-utils'

import placeholderImage from '../../assets/img-placeholder.png'
import { ReactComponent as UploadImage } from '../../assets/uploadImage.svg'
import './Avatar.scss'

const MAX_FILE_SIZE = 1000000
const CROPPER_CONTAINER_HEIGHT = 450

interface AvatarProps {
  profile: Partial<TpJobseekerProfile> | Partial<TpCompanyProfile>
  shape?: 'circle' | 'square'
}
interface AvatarEditable {
  profile: Partial<TpJobseekerProfile> | Partial<TpCompanyProfile>
  profileSaveStart: (
    profile: Partial<TpJobseekerProfile> | Partial<TpCompanyProfile>
  ) => void
  callToActionText?: string
  shape?: 'circle' | 'square'
}

interface AvatarFormValues {
  profileAvatarImageS3Key: string
}

const validationSchema = Yup.object({
  profileAvatarImageS3Key: Yup.string().max(255),
})

const Avatar = ({ profile, shape = 'circle' }: AvatarProps) => {
  const { profileAvatarImageS3Key } = profile
  const imgSrc = profileAvatarImageS3Key
    ? AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key
    : placeholderImage

  return (
    <div
      className={classnames('avatar', {
        'avatar--placeholder': !profileAvatarImageS3Key,
        'avatar--square': shape === 'square',
      })}
    >
      <img
        src={imgSrc}
        alt={`${profile.firstName} ${profile.lastName}`}
        className={classnames('avatar__image', {
          'avatar__image--square': shape === 'square',
        })}
      />
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const AvatarEditable = ({
  profile,
  profileSaveStart,
  callToActionText = 'Add your picture',
  shape = 'circle',
}: AvatarEditable) => {
  const [showCropperModal, setShowCropperModal] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [imageFileName, setImageFileName] = useState('')

  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)

  // This is how to keep functions in React state: https://stackoverflow.com/questions/55621212/is-it-possible-to-react-usestate-in-react
  const [nextFn, setNextFn] = useState(() => (croppedImgFile) => {
    return
  })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const { profileAvatarImageS3Key } = profile
  const imgURL = AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key

  const submitForm = async (values: FormikValues) => {
    const profileMe = values as Partial<TpJobseekerProfile>
    profileSaveStart({ ...profileMe, id: profile.id })
  }

  const initialValues: AvatarFormValues = {
    profileAvatarImageS3Key: profileAvatarImageS3Key,
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm,
  })

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onUploadStart = async (file, next) => {
    // Alert the user that the file is too big if the file size is more than 1MB
    if (file.size > MAX_FILE_SIZE) {
      alert('File Size Error: Please select a file smaller than 1MB')
      return
    }

    const imageDataUrl = await readFile(file)

    setImageSrc(imageDataUrl)
    setImageFileName(file.name)

    // Storing next function passed by react-s3-uploader to be called in another function (onSaveClick)
    setNextFn(() => (croppedImgFile) => next(croppedImgFile))

    setShowCropperModal(true)
  }

  const onSaveClick = useCallback(async () => {
    try {
      setIsUploading(true)

      const croppedImage = (await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      )) as BlobPart
      const croppedImgFile = new File([croppedImage], imageFileName)

      nextFn(croppedImgFile)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, imageFileName, croppedAreaPixels, nextFn])

  const onUploadFinish = (result: any) => {
    formik.setFieldValue('profileAvatarImageS3Key', result.fileKey)
    formik.handleSubmit()

    setIsUploading(false)
    setShowCropperModal(false)
    setMinZoom(1)
    setZoom(1)
    setUploadProgress(0)
  }

  return (
    <div
      className={classnames('avatar avatar--editable', {
        'avatar--placeholder': !profileAvatarImageS3Key,
        'avatar--square': shape === 'square',
      })}
    >
      {profileAvatarImageS3Key && (
        <>
          <img
            src={imgURL}
            alt={`${profile.firstName} ${profile.lastName}`}
            className={classnames('avatar__image', {
              'avatar__image--square': shape === 'square',
            })}
          />
          <Element
            renderAs="span"
            className="avatar__button"
            textSize={7}
            textTransform="uppercase"
          >
            Edit Photo
          </Element>
        </>
      )}

      {!profileAvatarImageS3Key && (
        <div className="avatar__placeholder">
          <UploadImage className="avatar__placeholder__image" />
          <Element
            textSize={6}
            className="avatar__placeholder__text"
            responsive={{ mobile: { hide: { value: true } } }}
          >
            {callToActionText}
          </Element>
        </div>
      )}

      <ReactS3Uploader
        name="avatar-upload"
        id="avatar-upload"
        className="avatar__input"
        signingUrl={S3_UPLOAD_SIGN_URL}
        accept="image/*"
        uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
        onError={(c: any) => console.log(c)}
        preprocess={onUploadStart}
        onProgress={setUploadProgress}
        onFinish={onUploadFinish}
        contentDisposition="auto"
      />

      <Modal
        show={showCropperModal && imageSrc}
        stateFn={setShowCropperModal}
        title="Crop your profile picture"
      >
        <Modal.Body
          style={{
            padding: 0,
            height: CROPPER_CONTAINER_HEIGHT,
          }}
        >
          <Cropper
            style={{
              containerStyle: {
                position: 'relative',
                height: '100%',
              },
            }}
            image={imageSrc}
            crop={crop}
            aspect={1 / 1}
            zoom={zoom}
            minZoom={minZoom}
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onMediaLoaded={(mediaSize) => {
              if (mediaSize.naturalHeight < mediaSize.naturalWidth) {
                setMinZoom(
                  (mediaSize.naturalHeight / mediaSize.naturalWidth) * 0.9
                )
              } else {
                setMinZoom(
                  (mediaSize.naturalWidth / mediaSize.naturalHeight) * 0.9
                )
              }
            }}
            restrictPosition={false}
          />
        </Modal.Body>
        <Modal.Foot>
          <Button onClick={onSaveClick} disabled={isUploading}>
            {isUploading ? 'Uploading... ' + uploadProgress + '%' : 'Save'}
          </Button>
        </Modal.Foot>
      </Modal>
    </div>
  )
}

Avatar.Some = (profile: TpJobseekerProfile) => <Avatar profile={profile} />
Avatar.Editable = AvatarEditable

export default Avatar
