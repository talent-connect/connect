import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { matchesReducer } from './matches/reducer';
import { mentoringSessionsReducer } from './mentoringSessions/reducer';
import { profilesReducer } from './profiles/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  matches: matchesReducer,
  mentoringSessions: mentoringSessionsReducer,
  profiles: profilesReducer
});
