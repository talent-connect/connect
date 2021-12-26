import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { ReactComponent as VisibilityPrivate } from '../../../assets/images/visibility-private.svg'
import { ReactComponent as VisibilityPublic } from '../../../assets/images/visibility-public.svg'
import { FC } from 'react';

export const EditableVisibility: FC = () => {
  const { data: profile }  = useTpJobseekerProfileQuery()
  const mutationHookResult = useTpjobseekerprofileUpdateMutation()

  return (
    <div style={{ marginBottom: '1.2rem', textAlign: 'right' }}>
      <VisibilityPublic />
    </div>
  )
}
