import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
  .validation((yup) => ({

  }))
  .initialValues(() => ({

  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit(() => {

  })