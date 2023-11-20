import { useMyTpDataQuery } from '@talent-connect/data-access'
import { Loader } from '@talent-connect/shared-atomic-design-components'
import { useParams } from 'react-router-dom'
import JobseekerProfileForCompanyEyes from './JobseekerProfileForCompanyEyes'
import { JobseekerProfileForJobseekerEyes } from './JobseekerProfileForJobseekerEyes'

function JobseekerProfile() {
  const { tpJobseekerProfileId }: { tpJobseekerProfileId: string } = useParams()

  const { data, isLoading } = useMyTpDataQuery()

  if (isLoading) return <Loader loading />

  const {
    tpCurrentUserDataGet: { tpJobseekerDirectoryEntry },
  } = data

  const profileIsThatOfCurrentUser =
    tpJobseekerProfileId === tpJobseekerDirectoryEntry?.id

  if (profileIsThatOfCurrentUser) return <JobseekerProfileForJobseekerEyes />
  else return <JobseekerProfileForCompanyEyes />
}

export default JobseekerProfile
