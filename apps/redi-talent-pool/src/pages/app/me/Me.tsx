import { useMyTpDataQuery } from '@talent-connect/data-access'
import { Loader } from '@talent-connect/shared-atomic-design-components'
import { purgeAllSessionData } from 'apps/redi-connect/src/services/auth/auth'
import { Redirect, useHistory } from 'react-router-dom'
import { MeCompany } from './MeCompany'

function Me() {
  const { data, isLoading } = useMyTpDataQuery()

  const history = useHistory()

  if (isLoading) return <Loader loading />

  const {
    tpCurrentUserDataGet: {
      companyRepresentativeRelationship,
      tpJobseekerDirectoryEntry,
    },
  } = data

  if (tpJobseekerDirectoryEntry)
    return (
      <Redirect to={`/app/jobseeker-profile/${tpJobseekerDirectoryEntry.id}`} />
    )

  switch (companyRepresentativeRelationship?.status) {
    case 'PENDING':
      history.push('/front/signup-complete')
      break
    case 'REJECTED':
    case 'DEACTIVATED':
      purgeAllSessionData()
      history.push('/front/login-result')
      break
    case 'APPROVED':
      return <MeCompany />
  }

  return null
}

export default Me
