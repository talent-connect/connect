import {
  TpJobseekerCv,
  useFindOneTpJobseekerCvQuery,
  useTpJobseekerCvPatchMutation,
} from '@talent-connect/data-access'
import {
  Button,
  FaqItem,
  FormSelect,
  FormTextArea,
} from '@talent-connect/shared-atomic-design-components'
import { topSkills } from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import { Element } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { Subject } from 'rxjs'
import * as Yup from 'yup'
import { useIsBusy } from '../../../hooks/useIsBusy'
import { AccordionForm } from '../../molecules/AccordionForm'
import { summaryTips } from '../jobseeker-profile-editables/EditableSummary'
interface Props {
  tpJobseekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export function AccordionFormCvSummary({
  tpJobseekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}: Props) {
  const onClose = () => {
    parentOnCloseCallback()
  }

  return (
    <AccordionForm
      title="About you and skills"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobseekerFormSectionSummary
        tpJobseekerCvId={tpJobseekerCvId}
        setIsEditing={(isEditing) => {
          onClose()
        }}
      />
    </AccordionForm>
  )
}

const formTopSkills = topSkills.map(({ id, label }) => ({
  value: id,
  label,
}))

const MIN_CHARS_COUNT = 100
const MAX_CHARS_COUNT = 600

const validationSchema = Yup.object({
  topSkills: Yup.array()
    .min(1, 'Pick at least one top technical skill')
    .max(5, "Your profile can't contain too many skills - five at most"),
  aboutYourself: Yup.string()
    .required()
    .min(MIN_CHARS_COUNT)
    .max(MAX_CHARS_COUNT),
})

interface JobseekerFormSectionSummaryProps {
  tpJobseekerCvId: string
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
}

type FormValues = Pick<TpJobseekerCv, 'aboutYourself' | 'topSkills'>

export function JobseekerFormSectionSummary({
  tpJobseekerCvId,
  setIsEditing,
  setIsFormDirty,
}: JobseekerFormSectionSummaryProps) {
  const queryClient = useQueryClient()
  const cvQuery = useFindOneTpJobseekerCvQuery({ id: tpJobseekerCvId })
  const cvMutation = useTpJobseekerCvPatchMutation()
  const isBusy = useIsBusy()

  const cv = cvQuery?.data?.tpJobseekerCv

  const initialValues: FormValues = useMemo(
    () => ({
      aboutYourself: cv?.aboutYourself ? cv.aboutYourself : '',
      topSkills: cv?.topSkills ?? [],
    }),
    [cv?.aboutYourself, cv?.topSkills]
  )
  const onSubmit = async (values: FormValues) => {
    formik.setSubmitting(true)
    await cvMutation.mutateAsync({
      input: {
        id: tpJobseekerCvId,
        aboutYourself: values.aboutYourself,
        topSkills: values.topSkills,
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
        Tell us a bit about yourself. This is a chance to introduce yourself and
        what you’re passionate about in your field.
      </Element>
      <FormSelect
        label="Your top technical skills (pick 1-5 skills)"
        name="topSkills"
        items={formTopSkills}
        formik={formik}
        multiselect
        placeholder="Start typing and select skills"
        closeMenuOnSelect={false}
      />
      <FormTextArea
        label="About you* (100-600 characters)"
        name="aboutYourself"
        rows={7}
        placeholder="Example: UX Designer with an academic background in Psychology. Experienced in negotiating with different kinds of clients and resolving customer complaints with a high level of empathy. Committed to understanding the human mind and designing impactful products by leveraging a strong sense of analytical and critical thinking."
        minChar={MIN_CHARS_COUNT}
        maxLength={MAX_CHARS_COUNT}
        formik={formik}
      />
      <FaqItem
        question="Our tips for writing your Summary"
        answer={summaryTips}
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
