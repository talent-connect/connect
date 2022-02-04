import { TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { UseMutationResult } from 'react-query';

interface ComponentFormProps {
  setIsEditing: (boolean: boolean) => void;
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >;
  profile: Partial<TpJobSeekerProfile | TpJobSeekerCv>
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    availability: yup.string(),
    desiredEmploymentType: yup.array()
      .of(yup.string())
      .max(3, 'You can select up to three desired positions'),
    contactEmail: yup.string(),
    phoneNumber: yup.string(),
    postalMailingAddress: yup.string(),
    ifAvailabilityIsDate_date: yup.date(),
    immigrationStatus: yup.string(),
  }))
  .initialValues(({ profile }) => ({
    availability: profile?.availability || '',
    desiredEmploymentType: profile?.desiredEmploymentType || [],
    contactEmail: profile?.contactEmail || '',
    phoneNumber: profile?.phoneNumber || '',
    postalMailingAddress: profile?.postalMailingAddress || '',
    ifAvailabilityIsDate_date: profile?.ifAvailabilityIsDate_date
      ? new Date(profile.ifAvailabilityIsDate_date)
      : null,
    immigrationStatus: profile?.immigrationStatus || ''
  }))
  .onSubmit((values, { setSubmitting }, { setIsEditing, mutationHookResult }) => {
    setSubmitting(true)
    mutationHookResult.mutate(values, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  })