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

export function EditableDetails() {
  const { data: profile } = useTpCompanyProfileQuery()
  const [isEditing, setIsEditing] = useState(false)

  const isEmpty = EditableDetails.isSectionEmpty(profile)

  return (
    <Editable
      isEditing={isEditing}
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
                      .map((link) => (
                        <a href={link} target="_blank">
                          {link}
                        </a>
                      ))}
                  </Content>
                </>
              ) : null}
            </Columns.Column>
          </Columns>
        )
      }
      modalTitle="Help employers get in touch"
      modalHeadline="Important Details"
      modalBody={<Form setIsEditing={setIsEditing} />}
      modalStyles={{ minHeight: '40rem' }}
    />
  )
}

EditableDetails.isSectionFilled = (profile: Partial<TpCompanyProfile>) =>
  profile?.industry || profile?.website || profile?.linkedInUrl
EditableDetails.isSectionEmpty = (profile: Partial<TpCompanyProfile>) =>
  !EditableDetails.isSectionFilled(profile)

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpCompanyProfileQuery()
  const mutation = useTpCompanyProfileUpdateMutation()

  const initialValues: Partial<TpCompanyProfile> = {
    industry: profile?.industry ?? '',
    website: profile?.website ?? '',
    linkedInUrl: profile?.linkedInUrl ?? '',
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
    </>
  )
}
