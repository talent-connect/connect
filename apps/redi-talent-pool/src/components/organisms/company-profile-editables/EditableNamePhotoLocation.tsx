import {
  useMyTpDataQuery,
  usePatchTpCompanyProfileMutation,
} from '@talent-connect/data-access'
import {
  Button,
  FormInput,
  FormTextArea,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import Avatar from '../Avatar'
import { EditableNamePhotoLocationProfilePropFragment } from './EditableNamePhotoLocation.generated'

interface Props {
  companyProfile: EditableNamePhotoLocationProfilePropFragment
  disableEditing?: boolean
}

export function EditableNamePhotoLocation({
  companyProfile,
  disableEditing,
}: Props) {
  const queryClient = useQueryClient()
  const mutation = usePatchTpCompanyProfileMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isLocationEmpty =
    EditableNamePhotoLocation.isSectionEmpty(companyProfile)

  const onNewAvatarReady = async (newAvatarUrl: string) => {
    await mutation.mutateAsync({
      input: {
        profileAvatarImageS3Key: newAvatarUrl,
      },
    })
    queryClient.invalidateQueries()
  }

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      readComponent={
        <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
          <Columns.Column size={5}>
            {companyProfile ? (
              <Avatar.Editable
                profile={companyProfile}
                profileSaveStart={onNewAvatarReady}
                callToActionText="Please add your company logo"
                shape="square"
              />
            ) : null}
          </Columns.Column>
          <Columns.Column size={7}>
            <Heading size="medium">{companyProfile.companyName}</Heading>
            <Element
              renderAs="p"
              textSize={4}
              responsive={{ mobile: { textSize: { value: 5 } } }}
              className="oneandhalf-bs"
            >
              {companyProfile.tagline
                ? companyProfile.tagline
                : 'Add your tagline here.'}
            </Element>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon icon="mapPin" />{' '}
              {isLocationEmpty ? (
                <EmptySectionPlaceholder
                  height="extra-slim"
                  onClick={() => setIsEditing(true)}
                  style={{ width: '18rem', margin: '0 0 0 1rem' }}
                >
                  Add your location
                </EmptySectionPlaceholder>
              ) : (
                <Content>
                  <strong>{companyProfile.location}</strong>
                </Content>
              )}
            </div>
          </Columns.Column>
        </Columns>
      }
      modalTitle="Introductions"
      modalHeadline="Overview"
      modalBody={
        <ModalForm
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
        />
      }
    />
  )
}

EditableNamePhotoLocation.isSectionFilled = (
  companyProfile: EditableNamePhotoLocationProfilePropFragment
) => companyProfile.location
EditableNamePhotoLocation.isPhotoSelected = (
  companyProfile: EditableNamePhotoLocationProfilePropFragment
) => companyProfile.profileAvatarImageS3Key
EditableNamePhotoLocation.isSectionEmpty = (
  companyProfile: EditableNamePhotoLocationProfilePropFragment
) => !EditableNamePhotoLocation.isSectionFilled(companyProfile)

const validationSchema = Yup.object({
  companyName: Yup.string().required('Your company name is required'),
  location: Yup.string().required('Your location is required'),
})

function ModalForm({
  setIsEditing,
  setIsFormDirty,
}: {
  setIsEditing: (boolean) => void
  setIsFormDirty: (boolean) => void
}) {
  const queryClient = useQueryClient()
  const myData = useMyTpDataQuery()
  const companyProfile = myData?.data?.tpCurrentUserDataGet?.representedCompany
  const mutation = usePatchTpCompanyProfileMutation()
  console.log(myData)
  const initialValues: Partial<EditableNamePhotoLocationProfilePropFragment> =
    useMemo(
      () => ({
        companyName: companyProfile?.companyName ?? '',
        location: companyProfile?.location ?? '',
        tagline: companyProfile?.tagline ?? '',
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )
  const onSubmit = async (
    values: Partial<EditableNamePhotoLocationProfilePropFragment>
  ) => {
    formik.setSubmitting(true)
    await mutation.mutateAsync({ input: values })
    formik.setSubmitting(false)
    setIsEditing(false)
    queryClient.invalidateQueries()
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
    validateOnMount: true,
  })
  useEffect(() => setIsFormDirty(formik.dirty), [formik.dirty, setIsFormDirty])

  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Applying for jobs can be a challenging process –– our platform is
        focused on bringing companies and talent together. Telling candidates a
        bit about yourself puts a friendly face on the other side of the table
        and encourages candidates to put their best foot forward.
      </Element>
      <FormInput
        name="companyName"
        placeholder="ACME Inc."
        label="Company name*"
        {...formik}
      />
      <FormInput
        name="location"
        placeholder="Relevant city/cities, regions, country..."
        label="Location(s)*"
        {...formik}
      />
      <FormTextArea
        name="tagline"
        rows={2}
        placeholder="Let candidates know a bit why you love what you do."
        label="Your tagline"
        formik={formik}
      />
      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
      <Button
        simple
        disabled={mutation.isLoading}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </>
  )
}
