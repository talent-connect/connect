import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
  .validation((yup) => ({
    hrSummit2021JobFairCompanyJobPreferences: yup.array().of(
      yup.object().shape({
        jobPosition: yup.string().required('Job position is required'),
        companyName: yup.string().required('Company name is required'),
      })
    ),
  }))
  .initialValues(() => ({

  }))
  .onSubmit(() => {

  })