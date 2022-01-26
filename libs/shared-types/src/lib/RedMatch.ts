import { MentorMenteeRefs, MentorMenteeIds } from './UserType';

type RedMatchStatus =
  | 'applied'
  | 'invalidated-as-other-mentor-accepted'
  | 'declined-by-mentor'
  | 'accepted'
  | 'completed'
  | 'cancelled'

export type RedMatch =
  & MentorMenteeRefs
  & MentorMenteeIds
  & {
    id: string
    status: RedMatchStatus
    matchMadeActiveOn: string
    applicationText: string
    expectationText: string
    mentorReplyMessageOnAccept: string
    mentorMessageOnComplete: string
    hasMenteeDismissedMentorshipApplicationAcceptedNotification: boolean
    ifDeclinedByMentor_chosenReasonForDecline: string
    ifDeclinedByMentor_ifReasonIsOther_freeText: string
    ifDeclinedByMentor_optionalMessageToMentee: string
    ifDeclinedByMentor_dateTime: string
    createdAt: string
  }
