import { RedProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';

interface ContactsFormValues {
  firstName: string
  lastName: string
  contactEmail: string
  telephoneNumber: string
}

export interface ComponentFormProps {
  profile: RedProfile
  profileSaveStart: (arg: ContactsFormValues & { id: string }) => void
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    firstName: yup.string()
      .required()
      .max(255),
    lastName: yup.string()
      .required()
      .max(255),
    contactEmail: yup.string()
      .email()
      .required()
      .max(255)
      .label('Contact email'),
    telephoneNumber: yup.string()
      .max(255)
      .label('Telephone number'),
  }))
  .initialValues(({ profile: { firstName, lastName, contactEmail, telephoneNumber } }) => ({
    firstName,
    lastName,
    contactEmail,
    telephoneNumber,
  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit((profileContacts, _,  { profile: { id }, profileSaveStart}) => {
    profileSaveStart({ ...profileContacts, id })
  })