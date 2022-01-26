import { RedProfile } from './RedProfile';

export type UserRole = 'mentor' | 'mentee'

export type UserType =
  | UserRole 
  | `public-sign-up-${UserRole}-pending-review`
  | `public-sign-up-${UserRole}-rejected`;


export type MentorMenteeRefs = {
  [Role in UserRole]: RedProfile;
};

export type MentorMenteeIds = {
  [Role in UserRole as `${Role}Id`]: RedProfile['id'];
};
