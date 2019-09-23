import { UserState } from "./types";

export const getHasReachedMenteeLimit = (state: UserState) => {
  const profile = state.profile;
  if (!profile) return;
  return profile.currentFreeMenteeSpots === 0;
};
