import { HrSummit2021JobFairCompanyJobPreferenceRecord, TpJobSeekerProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { v4 as uuidv4 } from 'uuid'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation';

const mutation = useTpJobSeekerProfileUpdateMutation()

function buildBlankHrSummit2021JobFairCompanyJobPreferences(): HrSummit2021JobFairCompanyJobPreferenceRecord[] {
  // Return exactly three elements since the job preferences consists of four priorities, reflected by the order of this array
  return [
    { uuid: uuidv4() },
    { uuid: uuidv4() },
    { uuid: uuidv4() },
    { uuid: uuidv4() },
  ]
}


interface ComponentFormProps {
  profile: Partial<TpJobSeekerProfile>;
  setIsEditing: (boolean: boolean) => void
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    hrSummit2021JobFairCompanyJobPreferences: yup.array()
      .of(yup.object().shape({
        uuid: yup.string(),
        jobPosition: yup.string()
          .required('Job position is required'),
        companyName: yup.string()
          .required('Company name is required'),
      })
    ),
  }))
  .initialValues(({ profile }) => ({
    hrSummit2021JobFairCompanyJobPreferences:
        profile?.hrSummit2021JobFairCompanyJobPreferences ||
        buildBlankHrSummit2021JobFairCompanyJobPreferences(),
  }))
  .formikConfig({
    validateOnMount: true,
  })
  .onSubmit((values, { setSubmitting }, { setIsEditing }) => {
    setSubmitting(true)
    mutation.mutate(values, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  })