import { combineEpics } from "redux-observable";

import { userEpics } from "./user/epics";
import { matchesEpics } from "./matches/epics";
import { mentoringSessionsEpics } from "./mentoringSessions/epics";
import { profilesEpics } from "./profiles/epics";

export const rootEpic = combineEpics(
  ...Object.values(userEpics),
  ...Object.values(matchesEpics),
  ...Object.values(mentoringSessionsEpics),
  ...Object.values(profilesEpics)
);
