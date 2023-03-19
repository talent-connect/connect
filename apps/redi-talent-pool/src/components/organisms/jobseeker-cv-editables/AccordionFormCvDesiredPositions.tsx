import {
  Button,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { COURSES, REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { TpJobseekerCv, TpJobseekerProfile } from '@talent-connect/shared-types'
import { desiredPositions } from '@talent-connect/talent-pool/config'
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

export function AccordionFormCvDesiredPositions({
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
      title="Desired positions"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobseekerFormSectionOverview
        hideCurrentRediCourseField
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
  desiredPositions: Yup.array()
    .min(1, 'At least one desired position is required')
    .max(3, 'You can select up to three desired positions'),
})

interface JobseekerFormSectionOverviewProps {
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
  hideCurrentRediCourseField?: boolean
}

export function JobseekerFormSectionOverview({
  setIsEditing,
  setIsFormDirty,
  queryHookResult,
  mutationHookResult,
  hideCurrentRediCourseField,
}: JobseekerFormSectionOverviewProps) {
  const { data: profile } = queryHookResult
  const mutation = mutationHookResult
  const initialValues: Partial<TpJobseekerProfile> = useMemo(
    () => ({
      desiredPositions: profile?.desiredPositions ?? [],
      currentlyEnrolledInCourse: profile?.currentlyEnrolledInCourse ?? '',
    }),
    [profile?.currentlyEnrolledInCourse, profile?.desiredPositions]
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
        Let's hear a little bit about what kind of jobs you're interested in.
      </Element>
      <FormSelect
        label="Desired position* (pick 1-3)"
        name="desiredPositions"
        items={formDesiredPositions}
        {...formik}
        multiselect
        placeholder="Start typing and select positions"
        closeMenuOnSelect={false}
      />
      {hideCurrentRediCourseField ? null : (
        <FormSelect
          label="Current ReDI course"
          name="currentlyEnrolledInCourse"
          items={formCourses}
          {...formik}
        />
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

const formDesiredPositions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))

// TODO: merge this logic with the stuff in SignUp.tsx
const coursesWithAlumniDeduped = [
  ...COURSES.filter((c) => {
    return !c.id.includes('alumni')
  }),
  {
    id: 'alumni',
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'berlin',
  },
]

const formCourses = coursesWithAlumniDeduped.map((course) => {
  const label =
    course.id === 'alumni'
      ? course.label
      : `(ReDI ${REDI_LOCATION_NAMES[course.location]}) ${course.label}`
  return {
    value: course.id,
    label: label,
  }
})
