import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { MeCompany } from './MeCompany'
import { MeJobSeeker } from './MeJobSeeker'

function Me () {
  const { data: jobSeekerProfile } = useTpJobseekerProfileQuery({
    retry: false,
  })
  const { data: companyProfile } = useTpCompanyProfileQuery({ retry: false })

  if (jobSeekerProfile) return <MeJobSeeker />
  if (companyProfile) return <MeCompany />

  return null
}

export default Me
