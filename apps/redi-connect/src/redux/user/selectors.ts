import { UserState } from './types'

export const getHasReachedMenteeLimit = (state: UserState) => {
  const profile = state.profile
  if (!profile) return false
  return !profile.currentFreeMenteeSpots
}
