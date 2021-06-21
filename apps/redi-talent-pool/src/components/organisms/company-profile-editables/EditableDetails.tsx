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
import React, { useEffect, useMemo, useState } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

export function EditableDetails() {
  const { data: profile } = useTpCompanyProfileQuery()
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableDetails.isSectionEmpty(profile)

  return (
    <Editable
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Details"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            text="Add your website and industry details"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <Columns>
            <Columns.Column size={6}>
              {profile?.industry ? (
                <>
                  <Caption>Industry</Caption>
                  <Content>
                    <p>{profile.industry}</p>
                  </Content>
                </>
              ) : null}
            </Columns.Column>
            <Columns.Column size={6}>
              {profile?.website || profile?.linkedInUrl ? (
                <>
                  <Caption>Links</Caption>
                  <Content>
                    {[profile?.website, profile?.linkedInUrl]
                      .filter((l) => l)
                      .map((link, idx) => (
                        <p key={idx}>
                          <a href={link} target="_blank" rel="noreferrer">
                            {link.replace(/http(s)?:\/\//g, '')}
                          </a>
                        </p>
                      ))}
                  </Content>
                </>
              ) : null}
            </Columns.Column>
          </Columns>
        )
      }
      modalTitle="Help jobseekers get in touch"
      modalHeadline="Important Details"
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

EditableDetails.isSectionFilled = (profile: Partial<TpCompanyProfile>) =>
  profile?.industry || profile?.website || profile?.linkedInUrl
EditableDetails.isSectionEmpty = (profile: Partial<TpCompanyProfile>) =>
  !EditableDetails.isSectionFilled(profile)

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
      industry: profile?.industry ?? '',
      website: profile?.website ?? '',
      linkedInUrl: profile?.linkedInUrl ?? '',
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
        This is where employers can get the basics that they need to get in
        touch and see your work.
      </Element>
      <FormInput
        name="industry"
        placeholder="Company Software"
        label="Industry"
        {...formik}
      />
      <FormInput
        name="website"
        placeholder="https://www.company.de"
        label="Website"
        {...formik}
      />
      <FormInput
        name="linkedInUrl"
        placeholder="https://www.linkedin.com/company-page"
        label="LinkedIn Page"
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
