import { combineReducers } from 'redux'
import { matchesReducer } from './matches/reducer'
import { mentoringSessionsReducer } from './mentoringSessions/reducer'
import { profilesReducer } from './profiles/reducer'
import { userReducer } from './user/reducer'

export const rootReducer = combineReducers({
  user: userReducer,
  matches: matchesReducer,
  mentoringSessions: mentoringSessionsReducer,
  profiles: profilesReducer,
})
