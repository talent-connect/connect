import { TpJobListing } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';

import { useTpJobListingCreateMutation } from '../../../react-query/use-tpjoblisting-create-mutation'
import { useTpJobListingUpdateMutation } from '../../../react-query/use-tpjoblisting-update-mutation'

interface ComponentFormProps {
  tpJobListingId: string
  jobListing: Partial<TpJobListing>;
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
      .of(yup.string())
      .min(1, 'Please select at least one related position'),
    idealTechnicalSkills: yup.array()
      .of(yup.string())
      .min(1, 'Please select at least one relevant technical skill')
      .max(6, 'Please select up to six skills'),
    employmentType: yup.string()
      .required('Please select an employment type'),
    languageRequirements: yup.string()
      .required('Please specify the language requirement(s)'),
  }))
  .initialValues(({ jobListing }) => ({
    employmentType: jobListing.employmentType || '',
    idealTechnicalSkills: jobListing.idealTechnicalSkills || [],
    languageRequirements: jobListing.languageRequirements || '',
    location: jobListing.location || '',
    relatesToPositions: jobListing.relatesToPositions || [],
    summary: jobListing.summary || '',
    title: jobListing.title || ''
  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit((values, { setSubmitting }, { tpJobListingId, setIsEditing }) => {
    setSubmitting(true);
    const mutation = !tpJobListingId
      ? useTpJobListingCreateMutation()
      : useTpJobListingUpdateMutation();
    mutation.mutate(values, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  })