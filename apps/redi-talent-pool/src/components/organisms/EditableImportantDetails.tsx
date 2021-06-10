import {
  Button,
  Caption,
  FormDatePicker,
  FormInput,
  FormSelect,
  PipeList,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerProfile } from '@talent-connect/shared-types'
import {
  availabilityOptions,
  availabilityOptionsIdToLabelMap,
  desiredEmploymentTypeOptions,
  desiredEmploymentTypeOptionsIdToLabelMap,
  desiredPositions,
  desiredPositionsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import { isDate } from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import { Element, Tag, Columns, Content } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpjobseekerprofileUpdateMutation } from '../../react-query/use-tpjobseekerprofile-mutation'
import { useTpjobseekerprofileQuery } from '../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../molecules/Editable'
import { EmptySectionPlaceholder } from '../molecules/EmptySectionPlaceholder'

const formDesiredPositions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))

const validationSchema = Yup.object({
  desiredPositions: Yup.array().max(
    3,
    'You can select up to three desired positions'
  ),
})

export function EditableImportantDetails() {
  const { data: profile } = useTpjobseekerprofileQuery()
  const [isEditing, setIsEditing] = useState(false)

  const isEmpty = !(
    profile?.availability ||
    profile?.desiredEmploymentType?.length > 0 ||
    profile?.phoneNumber
  )

  return (
    <Editable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      title="Important details"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            text="Add your contact details, type of employment and availability"
          />
        ) : (
          <Columns>
            <Columns.Column size={{ size: 6 }}>
              <Caption>Availability</Caption>
              <Content>
                {profile?.availability && profile.availability !== 'date' && (
                  <p>
                    {availabilityOptionsIdToLabelMap[profile?.availability]}
                  </p>
                )}
                {profile?.availability &&
                  profile.availability === 'date' &&
                  profile.ifAvailabilityIsDate_date && (
                    <p>
                      {moment(profile.ifAvailabilityIsDate_date).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  )}
              </Content>
              <Caption>Type of work</Caption>
              <PipeList
                items={
                  profile &&
                  profile.desiredEmploymentType &&
                  profile.desiredEmploymentType.length > 0
                    ? profile.desiredEmploymentType.map(
                        (x) => desiredEmploymentTypeOptionsIdToLabelMap[x]
                      )
                    : null
                }
              />
            </Columns.Column>
            <Columns.Column size={{ size: 6 }}>
              <Caption>Contact</Caption>
              <Content>
                {[
                  profile?.phoneNumber,
                  profile?.contactEmail,
                ].map((contactItem) =>
                  contactItem ? <p>{contactItem}</p> : null
                )}
              </Content>
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

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpjobseekerprofileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()
  const initialValues: Partial<TpJobseekerProfile> = {
    availability: profile?.availability ?? '',
    desiredEmploymentType: profile?.desiredEmploymentType ?? [],
    contactEmail: profile?.contactEmail ?? '',
    phoneNumber: profile?.phoneNumber ?? '',
    ifAvailabilityIsDate_date: profile?.ifAvailabilityIsDate_date
      ? new Date(profile.ifAvailabilityIsDate_date)
      : null,
  }
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
        name="contactEmail"
        placeholder="awesome@gmail.com"
        label="Email*"
        {...formik}
      />
      <FormInput
        name="phoneNumber"
        placeholder="0176 01234567"
        label="Phone Number"
        {...formik}
      />
      <FormSelect
        label="What kind of employment are you looking for?*"
        name="desiredEmploymentType"
        items={formDesiredEmploymentType}
        {...formik}
        multiselect
      />
      <FormSelect
        label="When are you available to start?*"
        name="availability"
        items={formAvailabilityOptions}
        {...formik}
      />
      {formik.values.availability === 'date' ? (
        <FormDatePicker
          placeholder="Select your date"
          name="ifAvailabilityIsDate_date"
          dateFormat="dd MMMM yyyy"
          minDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          isClearable
          {...formik}
        />
      ) : null}
      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
      <div style={{ height: '15rem' }} />
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
