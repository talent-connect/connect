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

  if (isLoading) return <Loader loading />

  debugger

  if (jobseekerProfile) return <MeJobseeker />

  const companyRepresentativeStatus =
    myTpUserData?.tpCurrentUserDataGet?.companyRepresentativeStatus?.status

  switch (companyRepresentativeStatus) {
    case 'PENDING':
    case 'REJECTED':
    case 'DEACTIVATED':
      history.push('/front/signup-complete')
    case 'APPROVED':
      return <MeCompany />
  }

  return null
}

export default Me
