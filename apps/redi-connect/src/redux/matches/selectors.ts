import { MatchesState } from './types'

export const getApplicants = (state: MatchesState) => state.matches
export const getMatches = (state: MatchesState) =>
  state.matches.filter((match) => match.status === 'accepted')
