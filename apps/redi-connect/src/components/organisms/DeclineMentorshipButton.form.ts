import { RedMatch } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { Dispatch, SetStateAction } from 'react';

export type DeclineMentorshipFormValues = Record<`ifDeclinedByMentor_${
  | 'chosenReasonForDecline'
  | 'ifReasonIsOther_freeText'
  | 'optionalMessageToMentee'
  }`, string>

interface ComponentFormProps {
  redMatchId: RedMatch['id']
  matchesDeclineMentorshipStart: (options: DeclineMentorshipFormValues & { redMatchId: string; }) => void;
  setModalActive: Dispatch<SetStateAction<boolean>>
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    ifDeclinedByMentor_chosenReasonForDecline: yup.string()
      .required('Please pick an option'),
    ifDeclinedByMentor_ifReasonIsOther_freeText: yup.string(),
    ifDeclinedByMentor_optionalMessageToMentee: yup.string(),
  }))
  .initialValues(() => ({
    ifDeclinedByMentor_chosenReasonForDecline: '',
    ifDeclinedByMentor_ifReasonIsOther_freeText: '',
    ifDeclinedByMentor_optionalMessageToMentee: '',
  }))
  .onSubmit((values, actions, { redMatchId, matchesDeclineMentorshipStart, setModalActive }) => {
    try {
      matchesDeclineMentorshipStart({ redMatchId, ...values })
      setModalActive(false)
    } catch (error) {
      console.log('error ', error)
    }
  })