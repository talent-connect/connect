import { RedProfile } from '@talent-connect/shared-types';
import { RootState } from '../redux/types';

/** */
export function mapStateToProps ({ user: { profile } }: RootState): { profile: RedProfile } {
  return { profile };
}