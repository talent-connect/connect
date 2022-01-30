import { RedProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';

interface LanguagesFormValues {
  languages: string[]
}

export interface ComponentFormProps {
  profile: RedProfile
  profileSaveStart: (arg: LanguagesFormValues & { id: string }) => void
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    languages: yup.array()
      .of(yup.string().max(255))
      .min(1)
      .label('Languages'),
  }))
  .initialValues(({ profile: { languages }}) => ({
    languages,
  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit((languagesContacts, _, { profile: { id }, profileSaveStart}) => {
    profileSaveStart({ ...languagesContacts, id })
  })