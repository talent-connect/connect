import { useMyTpDataQuery } from '@talent-connect/data-access'
import { Loader } from '@talent-connect/shared-atomic-design-components'
import { useHistory } from 'react-router-dom'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { MeCompany } from './MeCompany'
import { MeJobseeker } from './MeJobseeker'

function Me() {
  const { data: myTpUserData, isLoading } = useMyTpDataQuery()
  const { data: jobseekerProfile } = useTpJobseekerProfileQuery({
    retry: false,
  })

  const history = useHistory()

  const companyRepresentativeStatus =
    myTpUserData?.tpCurrentUserDataGet?.companyRepresentativeStatus?.status

  if (isLoading) return <Loader loading />

  if (companyRepresentativeStatus === 'PENDING') {
    history.push('/front/signup-complete')
  }

  if (jobseekerProfile) return <MeJobseeker />
  if (companyRepresentativeStatus === 'APPROVED') return <MeCompany />

  return null
}

export default Me
