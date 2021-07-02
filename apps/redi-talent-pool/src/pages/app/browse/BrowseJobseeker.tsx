import React from 'react'
import { LoggedIn } from '../../../components/templates'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'

export function BrowseJobseeker() {
  const { data: profile } = useTpJobseekerProfileQuery()

  return <LoggedIn>Browse jobseeker</LoggedIn>
}
