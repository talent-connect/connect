import {
  Button,
  FaqItem,
  FormSelect,
  FormTextArea,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerCv, TpJobseekerProfile } from '@talent-connect/shared-types'
import { topSkills } from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import { Element } from 'react-bulma-components'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Subject } from 'rxjs'
import * as Yup from 'yup'
import { useTpjobseekerCvUpdateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobseekerCvByIdQuery } from '../../../react-query/use-tpjobseekercv-query'
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

  const queryHookResult = useTpJobseekerCvByIdQuery(tpJobseekerCvId)
  const mutationHookResult = useTpjobseekerCvUpdateMutation(tpJobseekerCvId)

  return (
    <AccordionForm
      title="About you and skills"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobseekerFormSectionSummary
        setIsEditing={(isEditing) => {
          onClose()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
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
}

export function JobseekerFormSectionSummary({
  setIsEditing,
  setIsFormDirty,
  queryHookResult,
  mutationHookResult,
}: JobseekerFormSectionSummaryProps) {
  const { data: profile } = queryHookResult
  const mutation = mutationHookResult
  const initialValues: Partial<TpJobseekerProfile> = useMemo(
    () => ({
      aboutYourself: profile?.aboutYourself ? profile.aboutYourself : '',
      topSkills: profile?.topSkills ?? [],
    }),
    [profile?.aboutYourself, profile?.topSkills]
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
        Tell us a bit about yourself. This is a chance to introduce yourself and
        what you’re passionate about in your field.
      </Element>
      <FormSelect
        label="Your top technical skills (pick 1-5 skills)"
        name="topSkills"
        items={formTopSkills}
        {...formik}
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
