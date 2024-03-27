import {
  TpJobseekerCv,
  useFindOneTpJobseekerCvQuery,
  useTpJobseekerCvPatchMutation,
} from '@talent-connect/data-access'
import {
  Button,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { desiredPositions } from '@talent-connect/talent-pool/config'
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

export function AccordionFormCvDesiredPositions({
  tpJobseekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}: Props) {
  const onClose = () => {
    parentOnCloseCallback()
  }

  return (
    <AccordionForm
      title="Desired positions"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobseekerFormSectionOverview
        tpJobseekerCvId={tpJobseekerCvId}
        setIsEditing={(isEditing) => {
          onClose()
        }}
      />
    </AccordionForm>
  )
}

const validationSchema = Yup.object({
  desiredPositions: Yup.array()
    .min(1, 'At least one desired position is required')
    .max(3, 'You can select up to three desired positions'),
})

interface JobseekerFormSectionOverviewProps {
  tpJobseekerCvId: string
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
}

type FormValues = Pick<TpJobseekerCv, 'desiredPositions'>

export function JobseekerFormSectionOverview({
  tpJobseekerCvId,
  setIsEditing,
  setIsFormDirty,
}: JobseekerFormSectionOverviewProps) {
  const queryClient = useQueryClient()
  const cvQuery = useFindOneTpJobseekerCvQuery({ id: tpJobseekerCvId })
  const cvMutation = useTpJobseekerCvPatchMutation()
  const isBusy = useIsBusy()

  const cv = cvQuery?.data?.tpJobseekerCv

  const initialValues: FormValues = useMemo(
    () => ({
      desiredPositions: cv?.desiredPositions ?? [],
    }),
    [cv?.desiredPositions]
  )

  const onSubmit = async (values: FormValues) => {
    formik.setSubmitting(true)
    await cvMutation.mutateAsync({
      input: {
        id: tpJobseekerCvId,
        desiredPositions: values.desiredPositions,
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
        Let's hear a little bit about what kind of jobs you're interested in.
      </Element>
      <FormSelect
        label="Desired position* (pick 1-3)"
        name="desiredPositions"
        items={formDesiredPositions}
        formik={formik}
        multiselect
        placeholder="Start typing and select positions"
        closeMenuOnSelect={false}
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

const formDesiredPositions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))
