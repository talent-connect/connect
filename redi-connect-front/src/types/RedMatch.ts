import { RedProfile } from './RedProfile'

export type RedMatch = {
  id?: string
  status: 'applied' | 'invalidated-as-other-mentor-accepted' | 'accepted' | 'completed' | 'cancelled'
  matchMadeActiveOn: string
  applicationText: string
  expectationText: string
  mentor?: RedProfile
  mentee?: RedProfile
};
