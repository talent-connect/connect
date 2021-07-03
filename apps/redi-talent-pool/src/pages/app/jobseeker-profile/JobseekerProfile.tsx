import { useParams } from 'react-router-dom'
import { LoggedIn } from '../../../components/templates'
import { useTpJobseekerProfileByIdQuery } from '../../../react-query/use-tpjobseekerprofile-query'

export function JobseekerProfile() {
  const { tpJobseekerProfileId }: { tpJobseekerProfileId: string } = useParams()
  const { data: jobseekerProfile } = useTpJobseekerProfileByIdQuery(
    tpJobseekerProfileId
  )

  console.log(jobseekerProfile)

  return <LoggedIn>jobseeker profile comes here</LoggedIn>
}

export default JobseekerProfile
