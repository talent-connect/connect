import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { BrowseCompany } from './BrowseCompany'
import { BrowseJobSeeker } from './BrowseJobSeeker'
import './Browse.scss'

function Browse () {
  const { data: jobSeekerProfile } = useTpJobseekerProfileQuery({
    retry: false,
  })
  const { data: companyProfile } = useTpCompanyProfileQuery({ retry: false })

  if (jobSeekerProfile) return <BrowseJobSeeker />
  if (companyProfile) return <BrowseCompany />

  return null
}

export default Browse
