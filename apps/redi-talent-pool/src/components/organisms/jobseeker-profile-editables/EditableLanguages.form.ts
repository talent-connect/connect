import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
  .validation((yup) => ({
    workingLanguages: yup.array()
      .min(1)
      .max(6)
      .of(yup.object().shape({
        language: yup.string()
          .required("Please select a language from the menu!"),
        proficiencyLevelId: yup.string()
          .required("Please choose your level of proficiency!")
      })
  ),
  }))
  .initialValues(() => ({

  }))
  .onSubmit(() => {

  })