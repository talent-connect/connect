import { LanguageRecord, TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { UseMutationResult } from 'react-query';
import { v4 as uuidv4 } from 'uuid'

export function buildBlankLanguageRecord(): LanguageRecord {
  return {
    uuid: uuidv4(),
    language: '',
    proficiencyLevelId: '',
  }
}

interface ComponentFormProps {
  profile: Partial<TpJobSeekerProfile | TpJobSeekerCv>;
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
    workingLanguages: yup.array()
      .of(yup.object().shape({
        uuid: yup.string(),
        language: yup.string()
          .required("Please select a language from the menu!"),
        proficiencyLevelId: yup.string()
          .required("Please choose your level of proficiency!")
      }))
      .min(1)
      .max(6)
  }))
  .initialValues(({ profile }) => ({
    workingLanguages: profile?.workingLanguages || [buildBlankLanguageRecord()],
  }))
  .onSubmit((values, { setSubmitting }, { setIsEditing, mutationHookResult }) => {
    setSubmitting(true)
    mutationHookResult.mutate(values, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  })