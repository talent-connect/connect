import { createComponentForm } from '@talent-connect/shared-utils';

interface FormProps {
  profileAvatarImageS3Key: string;
}

export interface AvatarFormValues {
  id: string;
  profileAvatarImageS3Key: string;
  profileSaveStart: (profile: FormProps & { id: string; }) => void;
}

export const componentForm = createComponentForm<AvatarFormValues>()
  .validation((yup) => ({
    /** */
    profileAvatarImageS3Key: yup.string()
      .max(255),
  }))
  .initialValues((init) => init)
  .onSubmit((data, actions, { profileSaveStart, id }) => {
    profileSaveStart({ ...data, id })
  })
