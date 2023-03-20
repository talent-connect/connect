import {
  TpJobseekerCv,
  useFindOneTpJobseekerCvQuery,
  useTpJobseekerCvPatchMutation,
} from '@talent-connect/data-access'
import {
  Button,
  FormInput,
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

export function AccordionFormCvName({
  tpJobseekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}: Props) {
  const onClose = () => {
    parentOnCloseCallback()
  }

  return (
    <AccordionForm
      title="Name"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <Form
        tpJobseekerCvId={tpJobseekerCvId}
        setIsEditing={(isEditing) => {
          onClose()
        }}
      />
    </AccordionForm>
  )
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('Your first name is required'),
  lastName: Yup.string().required('Your last name is required'),
})

interface FormProps {
  tpJobseekerCvId: string
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
}

type FormValues = Pick<TpJobseekerCv, 'firstName' | 'lastName'>

function Form({ tpJobseekerCvId, setIsEditing, setIsFormDirty }: FormProps) {
  const queryClient = useQueryClient()
  const cvQuery = useFindOneTpJobseekerCvQuery({ id: tpJobseekerCvId })
  const cvMutation = useTpJobseekerCvPatchMutation()
  const isBusy = useIsBusy()

  const cv = cvQuery.data?.tpJobseekerCv

  const initialValues: FormValues = useMemo(
    () => ({
      firstName: cv?.firstName ?? '',
      lastName: cv?.lastName ?? '',
    }),
    [cv?.firstName, cv?.lastName]
  )
  const onSubmit = (values: FormValues) => {
    formik.setSubmitting(true)
    cvMutation.mutateAsync({
      input: {
        id: tpJobseekerCvId,
        firstName: values.firstName,
        lastName: values.lastName,
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
        Add your name to your CV.
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
      <Button disabled={!formik.isValid || isBusy} onClick={formik.submitForm}>
        Save
      </Button>
      <Button simple disabled={isBusy} onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
    </>
  )
}
