import { useMyTpDataQuery } from '@talent-connect/data-access'
import { Loader } from '@talent-connect/shared-atomic-design-components'
import { Redirect, useHistory } from 'react-router-dom'
import { logout } from '../../../services/api/api'
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
    case 'REJECTED':
    case 'DEACTIVATED':
      logout()
      history.push('/front/signup-email-verification-success')
    case 'APPROVED':
      return <MeCompany />
  }

  return null
}

export default Me
