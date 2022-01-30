import {
  Button,
  TextInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobSeekerCv } from '@talent-connect/shared-types'
import { useFormik } from 'formik'
import { FC, useEffect, useMemo } from 'react'
import { Element } from 'react-bulma-components'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Subject } from 'rxjs'
import * as Yup from 'yup'
import { useTpjobseekerCvUpdateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobSeekerCvByIdQuery } from '../../../react-query/use-tpjobseekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'

interface Props {
  tpJobSeekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export const AccordionFormCvName: FC<Props> = ({
  tpJobSeekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}) => {

  const queryHookResult = useTpJobSeekerCvByIdQuery(tpJobSeekerCvId)
  const mutationHookResult = useTpjobseekerCvUpdateMutation(tpJobSeekerCvId)

  return (
    <AccordionForm
      title="Name"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <Form
        setIsEditing={(isEditing) => {
          parentOnCloseCallback()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('Your first name is required'),
  lastName: Yup.string()
    .required('Your last name is required'),
})

interface FormProps {
  setIsEditing: (boolean: boolean) => void
  setIsFormDirty?: (boolean: boolean) => void
  queryHookResult: UseQueryResult<Partial<TpJobSeekerCv>, unknown>
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerCv>,
    unknown
  >
}

const Form: FC<FormProps> = ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult: { data: profile },
  mutationHookResult,
}) => {
  const initialValues = useMemo(() => ({
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
    }),
    [profile?.firstName, profile?.lastName]
  )

  const formik = useFormik<Partial<TpJobSeekerCv>>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      mutationHookResult.mutate(values, {
        onSettled: () => setSubmitting(false),
        onSuccess: () => setIsEditing(false),
      })
    },
  })

  useEffect(() => setIsFormDirty?.(formik.dirty), [
    formik.dirty,
    setIsFormDirty,
  ])

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
      <TextInput
        name="firstName"
        placeholder="James"
        label="First name*"
        {...formik}
      />
      <TextInput
        name="lastName"
        placeholder="Smith"
        label="Last name*"
        {...formik}
      />
      <Button
        disabled={!formik.isValid || mutationHookResult.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
      <Button
        simple
        disabled={mutationHookResult.isLoading}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </>
  )
}
