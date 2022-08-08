import { ReactComponent as VisibilityPublic } from '../../../assets/images/visibility-public.svg'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'

export function EditableVisibility() {
  const queryHookResult = useTpJobseekerProfileQuery()
  const mutationHookResult = useTpjobseekerprofileUpdateMutation()
  const { data: profile } = queryHookResult

  return (
    <div style={{ marginBottom: '1.2rem', textAlign: 'right' }}>
      <VisibilityPublic />
    </div>
  )
}
