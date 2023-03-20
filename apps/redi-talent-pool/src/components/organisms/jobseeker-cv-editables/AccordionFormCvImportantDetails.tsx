import {
  TpJobseekerCv,
  useFindOneTpJobseekerCvQuery,
  useTpJobseekerCvPatchMutation,
} from '@talent-connect/data-access'
import {
  Button,
  FormInput,
  FormTextArea,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import { Element } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { Subject } from 'rxjs'
import * as Yup from 'yup'
import { useIsBusy } from '../../../hooks/useIsBusy'
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

  return (
    <AccordionForm
      title="Contact"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobseekerFormSectionImportantDetails
        tpJobseekerCvId={tpJobseekerCvId}
        setIsEditing={(isEditing) => {
          onClose()
        }}
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
  tpJobseekerCvId: string
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
}

type FormValues = Pick<
  TpJobseekerCv,
  'email' | 'telephoneNumber' | 'postalMailingAddress'
>

function JobseekerFormSectionImportantDetails({
  tpJobseekerCvId,
  setIsEditing,
  setIsFormDirty,
}: JobseekerFormSectionImportantDetailsProps) {
  const queryClient = useQueryClient()
  const cvQuery = useFindOneTpJobseekerCvQuery({ id: tpJobseekerCvId })
  const cvMutation = useTpJobseekerCvPatchMutation()
  const isBusy = useIsBusy()

  const cv = cvQuery?.data?.tpJobseekerCv

  const initialValues: FormValues = useMemo(
    () => ({
      email: cv?.email ?? '',
      telephoneNumber: cv?.telephoneNumber ?? '',
      postalMailingAddress: cv?.postalMailingAddress ?? '',
    }),
    [cv?.email, cv?.telephoneNumber, cv?.postalMailingAddress]
  )
  const onSubmit = async (values: FormValues) => {
    formik.setSubmitting(true)
    cvMutation.mutateAsync({
      input: {
        id: tpJobseekerCvId,
        email: values.email,
        telephoneNumber: values.telephoneNumber,
        postalMailingAddress: values.postalMailingAddress,
      },
    })
    formik.setSubmitting(false)
    setIsEditing(false)
    queryClient.invalidateQueries()
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

      <Button disabled={!formik.isValid || isBusy} onClick={formik.submitForm}>
        Save
      </Button>
      <Button simple disabled={isBusy} onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
    </>
  )
}
