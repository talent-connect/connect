import { TpCompanyProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation';

const mutation = useTpCompanyProfileUpdateMutation()

interface ComponentFormProps {
  setIsEditing: (boolean: boolean) => void;
  profile: Partial<TpCompanyProfile>;
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    companyName: yup.string()
      .required('Your company name is required'),
    location: yup.string()
      .required('Your location is required'),
    tagline: yup.string()
  }))
  .initialValues(({ profile }) => ({
    companyName: profile?.companyName || '',
      location: profile?.location || '',
      tagline: profile?.tagline || '',
  }))
  .formikConfig({
    enableReinitialize: true,
    validateOnMount: true,
  })
  .onSubmit((values, { setSubmitting }, { setIsEditing }) => {
    setSubmitting(true)
    mutation.mutate(values, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  })