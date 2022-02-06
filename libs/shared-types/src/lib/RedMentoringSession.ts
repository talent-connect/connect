import { MentoringSessionDurationOption } from '@talent-connect/shared-config'
import { MentorMenteeIds, MentorMenteeRefs } from './UserType';

export type RedMentoringSession = 
  & Partial<MentorMenteeRefs>
  & Partial<MentorMenteeIds>
  & {
    id?: string
    date: Date
    minuteDuration: MentoringSessionDurationOption
  }
