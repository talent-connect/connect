import { createComponentForm } from '@talent-connect/shared-utils';

interface ComponentFormProps {
  tpJobListingId: string
  setIsEditing: (boolean: boolean) => void
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    title: yup.string()
      .required('Please provide a job title'),
    location: yup.string()
      .required('Please provide a location'),
    summary: yup.string()
      .required('Please enter a short description of the job')
      .min(200, 'Job summary should be at least 200 characters'),
    relatesToPositions: yup.array()
      .min(1, 'Please select at least one related position'),
    idealTechnicalSkills: yup.array()
      .min(1, 'Please select at least one relevant technical skill')
      .max(6, 'Please select up to six skills'),
    employmentType: yup.mixed()
      .required('Please select an employment type'),
    languageRequirements: yup.string()
      .required('Please specify the language requirement(s)'),
  }))
  .initialValues(() => ({

  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit((values, { setSubmitting }, { tpJobListingId, setIsEditing }) => {
    setSubmitting(true);
    const mutation = !tpJobListingId
      ? createMutation
      : updateMutation;
    mutation.mutate(values, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  })