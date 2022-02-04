import { combineEpics } from 'redux-observable'

import { userEpics } from './user/epics'
import { matchesEpics } from './matches/epics'
import { mentoringSessionsEpics } from './mentoringSessions/epics'
import { profilesEpics } from './profiles/epics'
import { objectValues } from '@talent-connect/typescript-utilities';

export const rootEpic = combineEpics(
  ...objectValues(userEpics),
  ...objectValues(matchesEpics),
  ...objectValues(mentoringSessionsEpics),
  ...objectValues(profilesEpics)
)
