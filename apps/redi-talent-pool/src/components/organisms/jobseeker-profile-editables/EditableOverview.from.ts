import { TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { UseMutationResult } from 'react-query';

interface ComponentFormProps {
  profile: Partial<TpJobSeekerProfile | TpJobSeekerCv>
  setIsEditing: (boolean: boolean) => void
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    desiredPositions: yup.array()
      .of(yup.string())
      .min(1, 'At least one desired position is required')
      .max(3, 'You can select up to three desired positions'),
    currentlyEnrolledInCourse: yup.string()
  }))
  .initialValues(({ profile }) => ({
    desiredPositions: profile?.desiredPositions || [],
    currentlyEnrolledInCourse: profile?.currentlyEnrolledInCourse || ''
  }))
  .formikConfig({
    enableReinitialize: true,
    validateOnMount: true,
  })
  .onSubmit((values, { setSubmitting }, { mutationHookResult, setIsEditing }) => {
    setSubmitting(true)
    mutationHookResult.mutate(values, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  })