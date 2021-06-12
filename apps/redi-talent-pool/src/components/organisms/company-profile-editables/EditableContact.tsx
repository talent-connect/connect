import {
  Button,
  Caption,
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextArea,
  PipeList,
} from '@talent-connect/shared-atomic-design-components'
import { TpCompanyProfile } from '@talent-connect/shared-types'
import {
  availabilityOptions,
  availabilityOptionsIdToLabelMap,
  desiredEmploymentTypeOptions,
  desiredEmploymentTypeOptionsIdToLabelMap,
  desiredPositions,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

export function EditableContact() {
  const { data: profile } = useTpCompanyProfileQuery()
  const [isEditing, setIsEditing] = useState(false)

  const isEmpty = EditableContact.isSectionEmpty(profile)

  return (
    <Editable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      title="Contact"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            text="Add your contact details"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <Columns>
            {profile?.firstName || profile?.lastName ? (
              <Columns.Column size={6}>
                <Caption>Name</Caption>
                <Content>
                  <p>
                    {profile?.firstName} {profile?.lastName}
                  </p>
                </Content>
              </Columns.Column>
            ) : null}
            {profile.phoneNumber ? (
              <Columns.Column size={6}>
                <Caption>Phone</Caption>
                <Content>
                  <p>{profile?.phoneNumber}</p>
                </Content>
              </Columns.Column>
            ) : null}
            {profile.contactEmail ? (
              <Columns.Column size={6}>
                <Caption>Email</Caption>
                <Content>
                  <p>{profile?.contactEmail}</p>
                </Content>
              </Columns.Column>
            ) : null}
          </Columns>
        )
      }
      modalTitle="Help applicants get in touch"
      modalHeadline="Contact"
      modalBody={<Form setIsEditing={setIsEditing} />}
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

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpCompanyProfileQuery()
  const mutation = useTpCompanyProfileUpdateMutation()
  const initialValues: Partial<TpCompanyProfile> = {
    firstName: profile?.firstName ?? '',
    lastName: profile?.lastName ?? '',
    contactEmail: profile?.contactEmail ?? '',
    phoneNumber: profile?.phoneNumber ?? '',
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
    enableReinitialize: true,
    onSubmit,
  })

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
        name="contactEmail"
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
    </>
  )
}
