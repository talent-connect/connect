import { useFormik } from 'formik'
import isNil from 'lodash/isNil'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import * as Yup from 'yup'

import {
  useMyTpDataQuery,
  usePatchUserContactMutation,
  useTpJobseekerProfilePatchMutation,
} from '@talent-connect/data-access'
import {
  Button,
  Caption,
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextArea,
  PipeList,
} from '@talent-connect/shared-atomic-design-components'
import {
  availabilityOptions,
  availabilityOptionsIdToLabelMap,
  employmentTypes,
  employmentTypesIdToLabelMap,
  immigrationStatusOptions,
  immigrationStatusOptionsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { useQueryClient } from 'react-query'
import { useIsBusy } from '../../../hooks/useIsBusy'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { EditableImportantDetailsProfilePropFragment } from './EditableImportantDetails.generated'

interface Props {
  profile?: EditableImportantDetailsProfilePropFragment
  disableEditing?: boolean
  showFullAddress?: boolean
}

export function EditableImportantDetails({
  profile,
  disableEditing,
  showFullAddress,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableImportantDetails.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Important details"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            onClick={() => setIsEditing(true)}
          >
            Add your contact details, type of employment and availability
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
            {profile &&
            profile.desiredEmploymentType &&
            profile.desiredEmploymentType.length > 0 ? (
              <div>
                <Caption>Type of work</Caption>
                <PipeList
                  items={profile.desiredEmploymentType.map(
                    (x) => employmentTypesIdToLabelMap[x]
                  )}
                  overflowAllowed
                />
              </div>
            ) : null}

            {profile?.availability ? (
              <div>
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
              </div>
            ) : null}

            {profile?.telephoneNumber || profile?.email ? (
              <div>
                <Caption>Contact</Caption>
                <Content>
                  {[profile?.telephoneNumber, profile?.email].map(
                    (contactItem) => (contactItem ? <p>{contactItem}</p> : null)
                  )}
                </Content>
              </div>
            ) : null}

            {profile?.immigrationStatus ? (
              <div>
                <Caption>Immigration status</Caption>
                <Content>
                  <p>
                    {
                      immigrationStatusOptionsIdToLabelMap[
                        profile?.immigrationStatus
                      ]
                    }
                  </p>
                </Content>
              </div>
            ) : null}

            {showFullAddress && profile?.postalMailingAddress ? (
              <div>
                <Caption>Postal mailing address</Caption>
                <Content>
                  <p>{profile?.postalMailingAddress}</p>
                </Content>
              </div>
            ) : null}

            {!isNil(profile?.willingToRelocate) ? (
              <div>
                <Caption>Willing to relocate</Caption>
                <Content>
                  <p>{profile?.willingToRelocate ? 'Yes' : 'No'}</p>
                </Content>
              </div>
            ) : null}
          </div>
        )
      }
      modalTitle="Help employers get in touch"
      modalHeadline="Important Details"
      modalBody={
        <JobseekerFormSectionImportantDetails
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
        />
      }
      modalStyles={{ minHeight: '40rem' }}
    />
  )
}

EditableImportantDetails.isSectionFilled = (
  profile: EditableImportantDetailsProfilePropFragment
) =>
  profile?.availability ||
  profile?.desiredEmploymentType?.length > 0 ||
  profile?.telephoneNumber ||
  profile?.immigrationStatus ||
  profile?.postalMailingAddress
EditableImportantDetails.isSectionEmpty = (
  profile: EditableImportantDetailsProfilePropFragment
) => !EditableImportantDetails.isSectionFilled(profile)

const validationSchema = Yup.object({
  desiredPositions: Yup.array().max(
    3,
    'You can select up to three desired positions'
  ),
})

interface JobseekerFormSectionImportantDetailsProps {
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
  hideNonContactDetailsFields?: boolean
}

function JobseekerFormSectionImportantDetails({
  setIsEditing,
  setIsFormDirty,
  hideNonContactDetailsFields,
}: JobseekerFormSectionImportantDetailsProps) {
  const queryClient = useQueryClient()
  const myData = useMyTpDataQuery()
  const profile = myData.data?.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
  const tpJobsekerProfileMutation = useTpJobseekerProfilePatchMutation()
  const userContactMutation = usePatchUserContactMutation()
  const isBusy = useIsBusy()

  const initialValues: EditableImportantDetailsProfilePropFragment = useMemo(
    () => ({
      availability: profile?.availability ?? null,
      desiredEmploymentType: profile?.desiredEmploymentType ?? [],
      email: profile?.email ?? null,
      telephoneNumber: profile?.telephoneNumber ?? null,
      postalMailingAddress: profile?.postalMailingAddress ?? null,
      ifAvailabilityIsDate_date: profile?.ifAvailabilityIsDate_date
        ? new Date(profile.ifAvailabilityIsDate_date)
        : null,
      immigrationStatus: profile?.immigrationStatus ?? null,
      willingToRelocate: profile?.willingToRelocate,
    }),
    [
      profile?.availability,
      profile?.email,
      profile?.desiredEmploymentType,
      profile?.ifAvailabilityIsDate_date,
      profile?.immigrationStatus,
      profile?.telephoneNumber,
      profile?.postalMailingAddress,
      profile?.willingToRelocate,
    ]
  )
  const onSubmit = async (
    values: EditableImportantDetailsProfilePropFragment
  ) => {
    formik.setSubmitting(true)
    const tpJobseekerUpdate = tpJobsekerProfileMutation.mutateAsync({
      input: {
        availability: values.availability,
        desiredEmploymentType: values.desiredEmploymentType,
        ifAvailabilityIsDate_date: values.ifAvailabilityIsDate_date,
        immigrationStatus: values.immigrationStatus,
        willingToRelocate: values.willingToRelocate,
      },
    })
    const userContactUpdate = userContactMutation.mutateAsync({
      input: {
        telephoneNumber: values.telephoneNumber,
        postalMailingAddress: values.postalMailingAddress,
      },
    })
    await Promise.all([tpJobseekerUpdate, userContactUpdate])
    queryClient.invalidateQueries()
    formik.setSubmitting(false)
    setIsEditing(false)
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
        This is where employers can get the basics that they need to get in
        touch and see your work.
      </Element>
      <FormInput
        name="email"
        placeholder="awesome@gmail.com"
        label="Email*"
        {...formik}
        disabled
      />
      <FormInput
        name="telephoneNumber"
        placeholder="0176 01234567"
        label="Phone Number"
        {...formik}
      />
      <FormTextArea
        label="Postal mailing address"
        name="postalMailingAddress"
        rows={4}
        placeholder={`Max Mustermann,\nBerlinstraße 123,\n12345 Berlin,\nGermany`}
        formik={formik}
      />
      {hideNonContactDetailsFields ? null : (
        <>
          <FormSelect
            label="What kind of employment are you looking for?*"
            name="desiredEmploymentType"
            items={formDesiredEmploymentType}
            {...formik}
            multiselect
            placeholder="Select desired employment types"
            closeMenuOnSelect={false}
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
          <FormSelect
            label="What is your immigration status?"
            name="immigrationStatus"
            items={formImmigrationStatusOptions}
            {...formik}
          />
        </>
      )}

      <Button disabled={!formik.isValid || isBusy} onClick={formik.submitForm}>
        Save
      </Button>
      <Button simple disabled={isBusy} onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
    </>
  )
}

const formAvailabilityOptions = availabilityOptions.map(({ id, label }) => ({
  value: id,
  label,
}))

const formDesiredEmploymentType = employmentTypes.map(({ id, label }) => ({
  value: id,
  label,
}))

const formImmigrationStatusOptions = immigrationStatusOptions.map(
  ({ id, label }) => ({
    value: id,
    label,
  })
)
