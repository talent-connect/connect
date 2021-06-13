import React from 'react'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { MeCompany } from './MeCompany'
import { MeJobseeker } from './MeJobseeker'

function Me() {
  const { data: jobseekerProfile } = useTpJobseekerProfileQuery({
    retry: false,
  })
  const { data: companyProfile } = useTpCompanyProfileQuery({ retry: false })

  if (jobseekerProfile) return <MeJobseeker />
  if (companyProfile) return <MeCompany />

  return null
}

export default Me
