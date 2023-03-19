import {
  Button,
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextArea,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerCv, TpJobseekerProfile } from '@talent-connect/shared-types'
import {
  availabilityOptions,
  employmentTypes,
  immigrationStatusOptions,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import { Element } from 'react-bulma-components'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Subject } from 'rxjs'
import * as Yup from 'yup'
import { useTpjobseekerCvUpdateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobseekerCvByIdQuery } from '../../../react-query/use-tpjobseekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'
interface Props {
  tpJobseekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export function AccordionFormCvImportantDetails({
  tpJobseekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}: Props) {
  const onClose = () => {
    parentOnCloseCallback()
  }

  const queryHookResult = useTpJobseekerCvByIdQuery(tpJobseekerCvId)
  const mutationHookResult = useTpjobseekerCvUpdateMutation(tpJobseekerCvId)

  return (
    <AccordionForm
      title="Contact"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobseekerFormSectionImportantDetails
        hideNonContactDetailsFields
        setIsEditing={(isEditing) => {
          onClose()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}

const validationSchema = Yup.object({
  desiredPositions: Yup.array().max(
    3,
    'You can select up to three desired positions'
  ),
})
interface JobseekerFormSectionImportantDetailsProps {
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
  queryHookResult: UseQueryResult<
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown
  >
  mutationHookResult: UseMutationResult<
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown,
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown
  >
  // TODO: this is a slippery slope. When this form section is used in the
  // Profiile Builder, we need all the below fields. In the CV Builder we
  // only need these "contact details" fields. Instead of "customizing"
  // from component, we should probably build a new component
  // EditableContactDetails or something. Over the longer run, we might
  // want to create one component per field and compose forms together
  // elegantly.
  hideNonContactDetailsFields?: boolean
}

function JobseekerFormSectionImportantDetails({
  setIsEditing,
  setIsFormDirty,
  queryHookResult,
  mutationHookResult,
  hideNonContactDetailsFields,
}: JobseekerFormSectionImportantDetailsProps) {
  const { data: profile } = queryHookResult
  const mutation = mutationHookResult
  const initialValues: Partial<TpJobseekerProfile> = useMemo(
    () => ({
      availability: profile?.availability ?? '',
      desiredEmploymentType: profile?.desiredEmploymentType ?? [],
      email: profile?.email ?? '',
      telephoneNumber: profile?.telephoneNumber ?? '',
      postalMailingAddress: profile?.postalMailingAddress ?? '',
      ifAvailabilityIsDate_date: profile?.ifAvailabilityIsDate_date
        ? new Date(profile.ifAvailabilityIsDate_date)
        : null,
      immigrationStatus: profile?.immigrationStatus ?? '',
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
        This is where employers can get the basics that they need to get in
        touch and see your work.
      </Element>
      <FormInput
        name="email"
        placeholder="awesome@gmail.com"
        label="Email*"
        {...formik}
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
