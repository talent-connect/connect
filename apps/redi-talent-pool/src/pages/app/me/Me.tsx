import { FC } from 'react'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { MeCompany } from './MeCompany'
import { MeJobSeeker } from './MeJobSeeker'

const Me: FC = () => {
  const { data: jobSeekerProfile } = useTpJobSeekerProfileQuery({
    retry: false,
  })
  const { data: companyProfile } = useTpCompanyProfileQuery({ retry: false })

  if (jobSeekerProfile) return <MeJobSeeker />
  if (companyProfile) return <MeCompany />

  return null
}

export default Me
