import { FC } from 'react'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { BrowseCompany } from './BrowseCompany'
import { BrowseJobSeeker } from './BrowseJobSeeker'
import './Browse.scss'

const Browse: FC = () => {
  const { data: jobSeekerProfile } = useTpJobSeekerProfileQuery({
    retry: false,
  })
  const { data: companyProfile } = useTpCompanyProfileQuery({ retry: false })

  if (jobSeekerProfile) return <BrowseJobSeeker />
  if (companyProfile) return <BrowseCompany />

  return null
}

export default Browse
