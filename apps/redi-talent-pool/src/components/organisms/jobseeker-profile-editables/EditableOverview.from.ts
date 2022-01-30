import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
  .validation((yup) => ({
    desiredPositions: yup.array()
      .min(1, 'At least one desired position is required')
      .max(3, 'You can select up to three desired positions'),
  }))
  .initialValues(() => ({

  }))
  .formikConfig({
    enableReinitialize: true,
    validateOnMount: true,
  })
  .onSubmit(() => {

  })