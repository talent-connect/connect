import { ExperienceRecord, TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { UseMutationResult } from 'react-query';
import { v4 as uuidv4 } from 'uuid'

export function buildBlankExperienceRecord(): ExperienceRecord {
  return {
    uuid: uuidv4(),
    title: '',
    company: '',
    city: '',
    country: '',
    description: '',
    current: false,
  }
}

interface ComponentFormProps {
  profile: Partial<TpJobSeekerProfile | TpJobSeekerCv>
  setIsEditing: (boolean: boolean) => void;
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    experience: yup.array().of(
      yup.object().shape({
        uuid: yup.string(),
        company: yup.string()
          .required('Company name is required!'),
        city: yup.string(),
        country: yup.string(),
        title: yup.string()
          .required('Please provide a job title!'),
        description: yup.string()
          .min(10, 'Please provide at least one sentence about the experience'),
        startDateMonth: yup.number()
          .required('Start date month is required'),
        endDateMonth: yup.number()
          .when('current', {
            is: false,
            then: yup.number()
              .required('End date month is required'),
          }),
        startDateYear: yup.number()
          .required('Start date year is required!'),
        current: yup.boolean(),
        endDateYear: yup.number()
          .when('current', {
            is: false,
            then: yup.number()
              .required('Provide an end date year or check the box!'),
        }),
      })
    ),
  }))
  .initialValues(({ profile }) => ({
    experience: profile?.experience || [buildBlankExperienceRecord()],
  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit((values, { setSubmitting }, { mutationHookResult, setIsEditing }) => {
    setSubmitting(true)
    mutationHookResult.mutate(values, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  })