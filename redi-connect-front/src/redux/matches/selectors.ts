import { MatchesState } from './types';

export const getApplicants = (state: MatchesState) =>
  state.matches.filter(match => match.status === 'applied');
export const getMentees = (state: MatchesState) =>
  state.matches.filter(match => match.status === 'accepted');
