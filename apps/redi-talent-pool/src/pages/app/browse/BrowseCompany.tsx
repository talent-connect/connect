import React from 'react'
import { LoggedIn } from '../../../components/templates'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'

export function BrowseCompany() {
  const { data: profile } = useTpCompanyProfileQuery()

  return <LoggedIn>Browse company</LoggedIn>
}
