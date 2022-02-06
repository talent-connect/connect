import {
  Button,
  TextInput,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobSeekerProfile } from '@talent-connect/shared-types'
import {
  availabilityOptions,
  desiredEmploymentTypeOptions,
} from '@talent-connect/talent-pool/config'
import { mapOptions } from '@talent-connect/typescript-utilities';
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobSeekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import Avatar from '../Avatar'

interface EditableNamePhotoLocationProps {
  profile: Partial<TpJobSeekerProfile>
  disableEditing?: boolean
}

export function EditableNamePhotoLocation ({
  profile,
  disableEditing,
}: EditableNamePhotoLocationProps) {
  const mutation = useTpJobSeekerProfileUpdateMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isLocationEmpty = EditableNamePhotoLocation.isSectionEmpty(profile)

  return (
    <Editable
      modalTitle="Basic information"
      modalHeadline="Name and location"
      {...{ disableEditing, isEditing, isFormDirty, setIsEditing }}
      readComponent={
        <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
          <Columns.Column size={5}>
            {profile && !disableEditing && 
              <Avatar.Editable
                profile={profile}
                profileSaveStart={mutation.mutate}
              />}
            {profile && disableEditing &&
              <Avatar profile={profile} />}
          </Columns.Column>
          <Columns.Column size={7}>
            <Heading size="medium">
              {profile?.firstName} {profile?.lastName}{' '}
              {profile?.genderPronouns ? `(${profile.genderPronouns})` : ''}
            </Heading>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon icon="mapPin" />{' '}
              {isLocationEmpty ? (
                disableEditing ? null : (
                  <EmptySectionPlaceholder
                    height="extra-slim"
                    onClick={() => setIsEditing(true)}
                    style={{ width: '18rem', margin: '0 0 0 1rem' }}
                  >
                    Add your location
                  </EmptySectionPlaceholder>
                )
              ) : (
                <Content>
                  <strong>{profile?.location}</strong>
                </Content>
              )}
            </div>
          </Columns.Column>
        </Columns>
      }
      modalBody={
        <ModalForm
          {...{ setIsEditing, setIsFormDirty }}
        />
      }
    />
  )
}

EditableNamePhotoLocation.isSectionFilled = (profile: Partial<TpJobSeekerProfile>) =>
  !!profile?.location

EditableNamePhotoLocation.isSectionEmpty = (profile: Partial<TpJobSeekerProfile>) =>
  !EditableNamePhotoLocation.isSectionFilled(profile)

// ####################################################################################

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('Your first name is required'),
  lastName: Yup.string()
    .required('Your last name is required'),
  location: Yup.string()
    .required('Your location is required'),
})

interface ModalFormProps {
  setIsEditing: (boolean: boolean) => void
  setIsFormDirty: (boolean: boolean) => void
}

function ModalForm ({
  setIsEditing,
  setIsFormDirty,
}: ModalFormProps) {
  const { data: profile } = useTpJobseekerProfileQuery()
  const mutation = useTpJobSeekerProfileUpdateMutation()
  const initialValues = useMemo(() => ({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      genderPronouns: profile?.genderPronouns || '',
      location: profile?.location || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const formik = useFormik<Partial<TpJobSeekerProfile>>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      mutation.mutate(values, {
        onSettled: () => setSubmitting(false),
        onSuccess: () => setIsEditing(false),
      })
    },
  })

  useEffect(() => setIsFormDirty?.(formik.dirty), [
    formik.dirty,
    setIsFormDirty,
  ])

  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Add your name and location to the profile.
      </Element>
      <TextInput
        name="firstName"
        placeholder="James"
        label="First name*"
        {...formik}
      />
      <TextInput
        name="lastName"
        placeholder="Smith"
        label="Last name*"
        {...formik}
      />
      <TextInput
        name="genderPronouns"
        placeholder="She/Her/Hers, He/Him/His, They/Them/Theirs, etc."
        label="Gender pronouns"
        {...formik}
      />
      <TextInput
        name="location"
        placeholder="Berlin, Germany"
        label="Your place of residence (city, country)*"
        {...formik}
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

const formDesiredEmploymentType = mapOptions(desiredEmploymentTypeOptions)

const formAvailabilityOptions = mapOptions(availabilityOptions)
