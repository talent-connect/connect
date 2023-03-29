import { FormikValues, useFormik } from 'formik'
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

import { useQueryClient } from 'react-query'
import placeholderImage from '../../assets/img-placeholder.png'
import { ReactComponent as UploadImage } from '../../assets/uploadImage.svg'
import './Avatar.scss'

import { IconButton, Tooltip } from '@material-ui/core'
import { ZoomIn, ZoomOut, ZoomOutMap } from '@material-ui/icons'
import classnames from 'classnames'
import { useCallback, useRef, useState } from 'react'
import Resizer from 'react-image-file-resizer'

const MAX_FILE_SIZE = 1000000
const CROPPER_CONTAINER_HEIGHT = 450

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

function readFile(file): Promise<string | ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const resizeFile = (
  file,
  width,
  height
): Promise<string | Blob | File | ProgressEvent<FileReader>> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      'JPEG',
      100,
      0,
      (value) => resolve(value),
      'base64'
    )
  })

const AvatarEditable = ({
  profile,
  profileSaveStart,
  callToActionText = 'Add your picture',
  shape = 'circle',
}: AvatarEditable) => {
  const queryClient = useQueryClient()
  const [showCropperModal, setShowCropperModal] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [imageFileName, setImageFileName] = useState('')

  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)

  const nextFnRef = useRef(null)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const { profileAvatarImageS3Key } = profile
  const imgURL = profileAvatarImageS3Key

  const submitForm = async (values: FormikValues) => {
    await profileSaveStart(
      'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/' +
        values.profileAvatarImageS3Key
    )
    queryClient.invalidateQueries()
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
    let imageDataUrl = ''
    let imageWidth = 0
    let imageHeight = 0

    const image = new Image()

    image.onload = async function () {
      imageWidth = image.width
      imageHeight = image.height

      if (file.size > MAX_FILE_SIZE) {
        const resizeRatio = Math.sqrt(MAX_FILE_SIZE / file.size)
        const newWidth = Math.round(imageWidth * resizeRatio)
        const newHeight = Math.round(imageHeight * resizeRatio)

        imageDataUrl = (await resizeFile(file, newWidth, newHeight)) as string
      } else {
        imageDataUrl = (await readFile(file)) as string
      }

      setImageSrc(imageDataUrl)
      setImageFileName(file.name)

      // Storing next function passed by react-s3-uploader to be called in another function (onSaveClick)
      nextFnRef.current = next
      setShowCropperModal(true)
    }

    image.src = URL.createObjectURL(file)
  }

  const onZoomIn = () => {
    setZoom(zoom + 0.1)
  }

  const onZoomOut = () => {
    if (zoom <= minZoom) return
    setZoom(zoom - 0.1)
  }

  const onZoomReset = () => {
    setZoom(1)
    setCrop({ x: 0, y: 0 })
  }

  const onSaveClick = useCallback(async () => {
    try {
      setIsUploading(true)

      const croppedImage = (await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      )) as BlobPart
      const croppedImgFile = new File([croppedImage], imageFileName)

      nextFnRef.current(croppedImgFile)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, imageFileName, croppedAreaPixels])

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
          <div className="zoom-icons-container">
            <Tooltip title="Zoom In" placement="top">
              <IconButton onClick={onZoomIn} aria-label="zoom in">
                <ZoomIn />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out" placement="top">
              <IconButton onClick={onZoomOut} aria-label="zoom out">
                <ZoomOut />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reset Zoom" placement="top">
              <IconButton onClick={onZoomReset} aria-label="reset zoom">
                <ZoomOutMap />
              </IconButton>
            </Tooltip>
          </div>
        </Modal.Foot>
      </Modal>
    </div>
  )
}

Avatar.Some = (profile: TpJobseekerProfile) => <Avatar profile={profile} />
Avatar.Editable = AvatarEditable

export default Avatar
