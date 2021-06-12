import {
  Button,
  FormInput,
  FormTextArea,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { TpCompanyProfile } from '@talent-connect/shared-types'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpcompanyUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import Avatar from '../Avatar'

export function EditableNamePhotoLocation() {
  const { data: profile } = useTpCompanyProfileQuery()
  const mutation = useTpcompanyUpdateMutation()
  const [isEditing, setIsEditing] = useState(false)

  const isLocationEmpty = EditableNamePhotoLocation.isSectionEmpty(profile)

  return (
    <Editable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      readComponent={
        <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
          <Columns.Column size={5}>
            {profile ? (
              <Avatar.Editable
                profile={profile}
                profileSaveStart={mutation.mutate}
              />
            ) : null}
          </Columns.Column>
          <Columns.Column size={7}>
            <Heading size="medium">{profile?.companyName}</Heading>
            <Element
              renderAs="p"
              textSize={4}
              responsive={{ mobile: { textSize: { value: 5 } } }}
              className="oneandhalf-bs"
            >
              {profile?.tagline ? profile.tagline : 'Add your tagline here.'}
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
                  text="Add your location"
                  onClick={() => setIsEditing(true)}
                  style={{ width: '18rem', margin: '0 0 0 1rem' }}
                />
              ) : (
                <Content>
                  <strong>{profile?.location}</strong>
                </Content>
              )}
            </div>
          </Columns.Column>
        </Columns>
      }
      modalTitle="Introductions"
      modalHeadline="Overview"
      modalBody={<Form setIsEditing={setIsEditing} />}
    />
  )
}

EditableNamePhotoLocation.isSectionFilled = (
  profile: Partial<TpCompanyProfile>
) => profile?.location
EditableNamePhotoLocation.isSectionEmpty = (
  profile: Partial<TpCompanyProfile>
) => !EditableNamePhotoLocation.isSectionFilled(profile)

const validationSchema = Yup.object({
  companyName: Yup.string().required('Your company name is required'),
  location: Yup.string().required('Your location is required'),
})

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpCompanyProfileQuery()
  const mutation = useTpcompanyUpdateMutation()
  const initialValues: Partial<TpCompanyProfile> = {
    companyName: profile?.companyName ?? '',
    location: profile?.location ?? '',
    tagline: profile?.tagline ?? '',
  }
  const onSubmit = (values: Partial<TpCompanyProfile>) => {
    formik.setSubmitting(true)
    mutation.mutate(values, {
      onSettled: () => {
        formik.setSubmitting(false)
      },
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
    validateOnMount: true,
  })

  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Applying for jobs can be a challenging process –– our platform is
        focused on bring companies and talent together. Telling candidates a bit
        about yourself puts a friendly face on the other side of the table and
        encourages candidates to put their best foot forward.
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
        {...formik}
      />
      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
    </>
  )
}
