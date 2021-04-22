import { UserState } from './user/types'
import { MatchesState } from './matches/types'
import { MentoringSessionsState } from './mentoringSessions/types'
import { ProfilesState } from './profiles/types'

export interface RootState {
  user: UserState
  matches: MatchesState
  mentoringSessions: MentoringSessionsState
  profiles: ProfilesState
}
