import { Dispatch, SetStateAction } from 'react';
import { createComponentForm } from '@talent-connect/shared-utils';

interface ComponentFormProps {
  id: string;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  matchesMarkAsComplete: (redMatchId: string, mentorMessageOnComplete: string) => void
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    mentorMessageOnComplete: yup.string(),
  }))
  .initialValues(() => ({
    mentorMessageOnComplete: '',
  }))
  .onSubmit((
    { mentorMessageOnComplete },
    actions,
    { matchesMarkAsComplete, id, setModalActive }
  ) => {
    try {
      matchesMarkAsComplete(id, mentorMessageOnComplete)
      setModalActive(false)
    } catch (error) {
      console.log('error ', error)
    }
  })