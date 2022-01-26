import { FC } from 'react'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { MeCompany } from './MeCompany'
import { MeJobSeeker } from './MeJobSeeker'

const Me: FC = () => {
  const { data: jobseekerProfile } = useTpJobSeekerProfileQuery({
    retry: false,
  })
  const { data: companyProfile } = useTpCompanyProfileQuery({ retry: false })

  if (jobseekerProfile) return <MeJobSeeker />
  if (companyProfile) return <MeCompany />

  return null
}

export default Me
