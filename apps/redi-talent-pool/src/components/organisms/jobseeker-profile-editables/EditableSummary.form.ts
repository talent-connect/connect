import { TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { UseMutationResult } from 'react-query';

const [MIN_CHARS, MAX_CHARS] = [100, 600]

interface ComponentFormProps {
  profile: Partial<TpJobSeekerProfile | TpJobSeekerCv>;
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
    topSkills: yup.array()
      .of(yup.string())
      .min(1, 'Pick at least one top technical skill')
      .max(5, "Your profile can't contain too many skills - five at most"),
    aboutYourself: yup.string()
      .required()
      .min(MIN_CHARS, 'Write at least 100 characters about yourself.')
      .max(MAX_CHARS, 'The text about yourself can be up to 600 characters long.'),
  }))
  .initialValues(({ profile }) => ({
    aboutYourself: profile?.aboutYourself || '',
    topSkills: profile?.topSkills || [],
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