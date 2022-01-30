import { EducationRecord, TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { UseMutationResult } from 'react-query';

interface ComponentFormProps {
  education: EducationRecord[];
  setIsEditing: (boolean: boolean) => void;
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >;
}

// export const componentForm = createComponentForm<ComponentFormProps>()
//   .validation((yup) => ({
//     education: yup.array().of(
//       yup.object().shape({
//         institutionName: yup.string()
//           .required('Nme of Institution is required!'),
//         certificationType: yup.string()
//           .required('Please choose a certification type'),
//         institutionCity: yup.string(),
//         institutionCountry: yup.string(),
//         title: yup.string()
//           .required('Title is required'),
//         description: yup.string()
//           .min(10, 'Description is too short'),
//         startDateMonth: yup.number()
//           .required('Start date month is required'),
//         startDateYear: yup.number()
//           .required('Start date year is required'),
//         current: yup.boolean(),
//         endDateYear: yup.number()
//           .when('current', {
//           is: false,
//             then: yup.number()
//               .required('Provide an end date year or check the box'),
//         }),
//         endDateMonth: yup.number()
//           .when('current', {
//             is: false,
//             then: yup.number()
//               .required('End date month is required'),
//         }),
//       })
//     ),
//   }))
//   .initialValues(({ education }) => ({
//     education
//   }))
//   .onSubmit((values, { setSubmitting }, { mutationHookResult, setIsEditing }) => {
//     setSubmitting(true)
//     mutationHookResult.mutate(values, {
//       onSettled: () => setSubmitting(false),
//       onSuccess: () => setIsEditing(false),
//     })
//   })