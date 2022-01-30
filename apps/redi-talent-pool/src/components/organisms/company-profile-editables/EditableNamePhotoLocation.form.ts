import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
  .validation((yup) => ({
    companyName: yup.string()
      .required('Your company name is required'),
    location: yup.string()
      .required('Your location is required'),
    tagline: yup.string()
  }))
  .initialValues(() => ({

  }))
  .formikConfig({
    enableReinitialize: true,
    validateOnMount: true,
  })
  .onSubmit(() => {

  })