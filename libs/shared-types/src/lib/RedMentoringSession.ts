import { RedProfile } from './RedProfile'

export type RedMentoringSession = {
  id?: string
  mentor?: RedProfile
  mentee?: RedProfile
  mentorId?: string
  menteeId?: string
  date: Date
  minuteDuration: number
}
