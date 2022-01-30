import { RedMatch } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';
import { useHistory } from 'react-router-dom'

interface ComponentFormProps {
  matchesAcceptMentorshipStart: (redMatchId: string, mentorReplyMessageOnAccept: string) => void;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
  match: RedMatch;
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    mentorReplyMessageOnAccept: yup.string()
      .required('Write at least 250 characters to introduce yourself to your mentee.')
      .min(250, 'Write at least 250 characters to introduce yourself to your mentee.')
      .max(600, 'The introduction text can be up to 600 characters long.'),
  }))
  .initialValues(() => ({
    mentorReplyMessageOnAccept: '',
  }))
  .onSubmit(async (
    { mentorReplyMessageOnAccept },
    actions,
    { matchesAcceptMentorshipStart, setModalActive, match }
  ) => {
    try {
      matchesAcceptMentorshipStart(match.id, mentorReplyMessageOnAccept)
      setModalActive(false)
      useHistory().push(`/app/mentorships/${match.id}`)
    } catch (error) {
      console.log('error ', error)
    }
  })