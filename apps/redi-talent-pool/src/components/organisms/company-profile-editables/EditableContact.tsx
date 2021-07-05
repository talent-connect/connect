import {
  Button,
  Caption,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpCompanyProfile } from '@talent-connect/shared-types'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

interface Props {
  profile: Partial<TpCompanyProfile>
  disableEditing?: boolean
}

export function EditableContact({ profile, disableEditing }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableContact.isSectionEmpty(profile)

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Contact"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            onClick={() => setIsEditing(true)}
          >
            Add your contact details
          </EmptySectionPlaceholder>
        ) : (
          <div
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gridColumnGap: '32px',
              gridRowGap: '32px',
            }}
          >
            {profile?.firstName || profile?.lastName ? (
              <div>
                <Caption>Name</Caption>
                <Content>
                  <p>
                    {profile?.firstName} {profile?.lastName}
                  </p>
                </Content>
              </div>
            ) : null}
            {profile.phoneNumber ? (
              <div>
                <Caption>Phone</Caption>
                <Content>
                  <p>{profile?.phoneNumber}</p>
                </Content>
              </div>
            ) : null}
            {profile.contactEmail ? (
              <div>
                <Caption>Email</Caption>
                <Content>
                  <p>{profile?.contactEmail}</p>
                </Content>
              </div>
            ) : null}
          </div>
        )
      }
      modalTitle="Help applicants get in touch"
      modalHeadline="Contact"
      modalBody={
        <ModalForm
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
        />
      }
      modalStyles={{ minHeight: '40rem' }}
    />
  )
}

EditableContact.isSectionFilled = (profile: Partial<TpCompanyProfile>) =>
  profile?.firstName ||
  profile?.lastName ||
  profile?.contactEmail ||
  profile?.phoneNumber
EditableContact.isSectionEmpty = (profile: Partial<TpCompanyProfile>) =>
  !EditableContact.isSectionFilled(profile)

function ModalForm({
  setIsEditing,
  setIsFormDirty,
}: {
  setIsEditing: (boolean) => void
  setIsFormDirty: (boolean) => void
}) {
  const { data: profile } = useTpCompanyProfileQuery()
  const mutation = useTpCompanyProfileUpdateMutation()
  const initialValues: Partial<TpCompanyProfile> = useMemo(
    () => ({
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      contactEmail: profile?.contactEmail ?? '',
      phoneNumber: profile?.phoneNumber ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
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
    enableReinitialize: true,
    onSubmit,
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
        Let ReDI Jobseekers know how to get in touch.
      </Element>
      <FormInput
        name="firstName"
        placeholder="Erika"
        label="First name"
        {...formik}
      />
      <FormInput
        name="lastName"
        placeholder="Mustermann"
        label="Last name"
        {...formik}
      />
      <FormInput
        name="contactEmail"
        placeholder="your.name@company.com"
        label="Email"
        {...formik}
      />
      <FormInput
        name="phoneNumber"
        placeholder="0176 01234567"
        label="Phone Number"
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
