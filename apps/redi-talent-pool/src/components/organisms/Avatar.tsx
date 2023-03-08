import classnames from 'classnames'
import { FormikValues, useFormik } from 'formik'
import { useCallback, useState } from 'react'
import { Element } from 'react-bulma-components'
import Cropper from 'react-easy-crop'
import ReactS3Uploader from 'react-s3-uploader'
import * as Yup from 'yup'

import { Button, Modal } from '@talent-connect/shared-atomic-design-components'
import { S3_UPLOAD_SIGN_URL } from '@talent-connect/shared-config'
import {
  TpCompanyProfile,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import { getCroppedImg } from '@talent-connect/shared-utils'

import placeholderImage from '../../assets/img-placeholder.png'
import { ReactComponent as UploadImage } from '../../assets/uploadImage.svg'
import './Avatar.scss'

interface AvatarProps {
  profile: {
    profileAvatarImageS3Key?: string
  }
  shape?: 'circle' | 'square'
}
interface AvatarEditable {
  profile: Partial<TpJobseekerProfile> | Partial<TpCompanyProfile>
  profileSaveStart: (newAvatarUrl: string) => void
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
    ? profileAvatarImageS3Key
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

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  // This is how to keep functions in React state: https://stackoverflow.com/questions/55621212/is-it-possible-to-react-usestate-in-react
  const [nextFn, setNextFn] = useState(() => (croppedImgFile) => {
    return
  })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const { profileAvatarImageS3Key } = profile
  const imgURL = profileAvatarImageS3Key

  const submitForm = async (values: FormikValues) => {
    profileSaveStart(imgURL)
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
    const imageDataUrl = await readFile(file)

    setImageSrc(imageDataUrl)
    setImageFileName(file.name)

    // Storing next function passed by react-s3-uploader to be called in another function (onSaveClick)
    setNextFn(() => (croppedImgFile) => next(croppedImgFile))

    setShowCropperModal(true)
  }

  const onSaveClick = useCallback(async () => {
    try {
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

    setShowCropperModal(false)
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
        onFinish={onUploadFinish}
        contentDisposition="auto"
      />

      <Modal
        styles={{
          height: 600,
        }}
        show={showCropperModal && imageSrc}
        stateFn={setShowCropperModal}
        title="Crop your profile picture"
      >
        <Modal.Body>
          <Cropper
            image={imageSrc}
            crop={crop}
            aspect={1 / 1}
            zoom={zoom}
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Modal.Body>
        <Modal.Foot>
          <Button onClick={onSaveClick}>Save</Button>
        </Modal.Foot>
      </Modal>
    </div>
  )
}

Avatar.Some = (profile: TpJobseekerProfile) => <Avatar profile={profile} />
Avatar.Editable = AvatarEditable

export default Avatar
