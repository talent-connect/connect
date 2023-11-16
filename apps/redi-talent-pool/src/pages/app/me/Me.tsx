import { useMyTpDataQuery } from '@talent-connect/data-access'
import { Loader } from '@talent-connect/shared-atomic-design-components'
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

  // If the user has-a JobseekerProfile, we assume that user is a jobseeker, and show them the "me"
  // page for jobseekers
  if (tpJobseekerDirectoryEntry)
    return (
      <Redirect to={`app/jobseeker-profile/${tpJobseekerDirectoryEntry.id}`} />
    )

  // If, on the other hadn, the user has-a CompanyRepresentativeRelationship, we assume that user is
  // company representative, and show them the "me" page for Companies
  switch (companyRepresentativeRelationship?.status) {
    case 'PENDING':
    case 'REJECTED':
    case 'DEACTIVATED':
      history.push('/front/signup-email-verification-success')
    case 'APPROVED':
      return <MeCompany />
  }

  return null
}

export default Me
