import {
  Button,
  FormInput,
  FormSelect,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerProfile } from '@talent-connect/shared-types'
import {
  availabilityOptions,
  desiredEmploymentTypeOptions,
  germanFederalStates,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import Avatar from '../Avatar'

interface Props {
  profile: Partial<TpJobseekerProfile>
  disableEditing?: boolean
}

const federalStatesOptions = Object.entries(germanFederalStates).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export function EditableNamePhotoLocation({ profile, disableEditing }: Props) {
  const mutation = useTpjobseekerprofileUpdateMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isLocationEmpty = EditableNamePhotoLocation.isSectionEmpty(profile)

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      readComponent={
        <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
          <Columns.Column size={5}>
            {profile && !disableEditing ? (
              <Avatar.Editable
                profile={profile}
                profileSaveStart={mutation.mutate}
              />
            ) : null}
            {profile && disableEditing ? <Avatar profile={profile} /> : null}
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
      modalTitle="Basic information"
      modalHeadline="Name and location"
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
  profile: Partial<TpJobseekerProfile>
) => profile?.location
EditableNamePhotoLocation.isSectionEmpty = (
  profile: Partial<TpJobseekerProfile>
) => !EditableNamePhotoLocation.isSectionFilled(profile)

const validationSchema = Yup.object({
  firstName: Yup.string().required('Your first name is required'),
  lastName: Yup.string().required('Your last name is required'),
  location: Yup.string().required('Your location is required'),
  federalState: Yup.string().required('Please select the state you live in'),
})

function ModalForm({
  setIsEditing,
  setIsFormDirty,
}: {
  setIsEditing: (boolean) => void
  setIsFormDirty: (boolean) => void
}) {
  const { data: profile } = useTpJobseekerProfileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()
  const initialValues: Partial<TpJobseekerProfile> = useMemo(
    () => ({
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      genderPronouns: profile?.genderPronouns ?? '',
      location: profile?.location ?? '',
      federalState: profile?.federalState ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const onSubmit = (values: Partial<TpJobseekerProfile>) => {
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
  useEffect(
    () => setIsFormDirty?.(formik.dirty),
    [formik.dirty, setIsFormDirty]
  )

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
      <FormInput
        name="firstName"
        placeholder="James"
        label="First name*"
        {...formik}
      />
      <FormInput
        name="lastName"
        placeholder="Smith"
        label="Last name*"
        {...formik}
      />
      <FormInput
        name="genderPronouns"
        placeholder="She/Her/Hers, He/Him/His, They/Them/Theirs, etc."
        label="Gender pronouns"
        {...formik}
      />
      <FormInput
        name="location"
        placeholder="Berlin, Germany"
        label="Your place of residence (city, country)*"
        {...formik}
      />
      <FormSelect
        name="federalState"
        label="Your place of residence (state)*"
        items={federalStatesOptions}
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

const formDesiredEmploymentType = desiredEmploymentTypeOptions.map(
  ({ id, label }) => ({ value: id, label })
)

const formAvailabilityOptions = availabilityOptions.map(({ id, label }) => ({
  value: id,
  label,
}))
