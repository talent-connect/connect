import { FC } from 'react';

// import { useTpjobSeekerprofileUpdateMutation } from '../../../react-query/use-tpjobSeekerprofile-mutation'
// import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
// import { ReactComponent as VisibilityPrivate } from '../../../assets/images/visibility-private.svg'
import { ReactComponent as VisibilityPublic } from '../../../assets/images/visibility-public.svg'

export const EditableVisibility: FC = () => {
  // const { data: profile }  = useTpJobSeekerProfileQuery()
  // const mutationHookResult = useTpjobSeekerprofileUpdateMutation()

  return (
    <div style={{ marginBottom: '1.2rem', textAlign: 'right' }}>
      <VisibilityPublic />
    </div>
  )
}
