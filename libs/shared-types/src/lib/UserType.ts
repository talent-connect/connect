export type UserRole = 'mentor' | 'mentee'

export type UserType =
  | UserRole 
  | `public-sign-up-${UserRole}-pending-review`
  | `public-sign-up-${UserRole}-rejected`;
