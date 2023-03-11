import { ReactComponent as VisibilityPublic } from '../../../assets/images/visibility-public.svg'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'

export function EditableVisibility() {
  const queryHookResult = useTpJobseekerProfileEntityPropsQuery()
  const mutationHookResult = useTpjobseekerprofileUpdateMutation()
  const { data: profile } = queryHookResult

  return (
    <div style={{ marginBottom: '1.2rem', textAlign: 'right' }}>
      <VisibilityPublic />
    </div>
  )
}
