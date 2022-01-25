import { RedProfile } from './RedProfile'

export type RedMatch = {
  id: string
  status:
    | 'applied'
    | 'invalidated-as-other-mentor-accepted'
    | 'declined-by-mentor'
    | 'accepted'
    | 'completed'
    | 'cancelled'
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
  mentor: RedProfile
  mentee: RedProfile
  mentorId: string
  menteeId: string
  createdAt: string
}
