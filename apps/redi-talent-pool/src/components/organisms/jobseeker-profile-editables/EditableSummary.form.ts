import { createComponentForm } from '@talent-connect/shared-utils';

const [MIN_CHARS, MAX_CHARS] = [100, 600]

export const componentForm = createComponentForm()
  .validation((yup) => ({

  }))
  .initialValues(() => ({

  }))
  .formikConfig({
    enableReinitialize: true,
    validateOnMount: true,
  })
  .onSubmit(() => {

  })