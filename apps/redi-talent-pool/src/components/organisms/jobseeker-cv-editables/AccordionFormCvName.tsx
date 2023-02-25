import {
  Button,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerCv } from '@talent-connect/shared-types'
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

export function AccordionFormCvName({
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
      title="Name"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <Form
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
  firstName: Yup.string().required('Your first name is required'),
  lastName: Yup.string().required('Your last name is required'),
})

interface FormProps {
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
  queryHookResult: UseQueryResult<Partial<TpJobseekerCv>, unknown>
  mutationHookResult: UseMutationResult<
    Partial<TpJobseekerCv>,
    unknown,
    Partial<TpJobseekerCv>,
    unknown
  >
}

function Form({
  setIsEditing,
  setIsFormDirty,
  queryHookResult,
  mutationHookResult,
}: FormProps) {
  const { data: profile } = queryHookResult
  const mutation = mutationHookResult

  const initialValues: Partial<TpJobseekerCv> = useMemo(
    () => ({
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
    }),
    [profile?.firstName, profile?.lastName]
  )
  const onSubmit = (values: Partial<TpJobseekerCv>) => {
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
