import { useMyTpDataQuery } from '@talent-connect/data-access'
import { LoggedIn } from '../../../components/templates'
import './Browse.scss'
import { BrowseCompany } from './BrowseCompany'
import { BrowseJobseeker } from './BrowseJobseeker'

function Browse() {
  const myTpData = useMyTpDataQuery()
  const jobseekerProfile =
    myTpData?.data?.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
  const companyProfile =
    myTpData?.data?.tpCurrentUserDataGet?.representedCompany

  if (jobseekerProfile) return <BrowseJobseeker />
  if (companyProfile) return <BrowseCompany />

  return <LoggedIn></LoggedIn>
}

export default Browse
