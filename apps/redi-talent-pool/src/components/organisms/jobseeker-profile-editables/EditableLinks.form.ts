import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
  .validation((yup) => ({
    personalWebsite: yup.string()
      .url()
      .label('Personal website URL'),
    githubUrl: yup.string()
      .url()
      .label('Github profile URL'),
    linkedInUrl: yup.string()
      .url()
      .label('LinkedIn profile URL'),
    twitterUrl: yup.string()
      .url()
      .label('Twitter profile URL'),
    behanceUrl: yup.string()
      .url()
      .label('Behance profile URL'),
    stackOverflowUrl: yup.string()
      .url()
      .label('Stackoverflow profile URL'),
    dribbbleUrl: yup.string()
      .url()
      .label('Dribbble profile URL'),
  }))
  .initialValues(() => ({

  }))
  .onSubmit(() => {

  })