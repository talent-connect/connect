import { Button, Tooltip } from '@material-ui/core'
import classnames from 'clsx'
import React from 'react'
import { Columns, Element } from 'react-bulma-components'
import { EditableAbout } from '../../../components/organisms/company-profile-editables/EditableAbout'
import { EditableContact } from '../../../components/organisms/company-profile-editables/EditableContact'
import { EditableDetails } from '../../../components/organisms/company-profile-editables/EditableDetails'
import { EditableNamePhotoLocation } from '../../../components/organisms/company-profile-editables/EditableNamePhotoLocation'
import { LoggedIn } from '../../../components/templates'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'

export function MeCompany() {
  const { data: profile } = useTpCompanyProfileQuery()

  console.log(profile)

  return (
    <LoggedIn>
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <EditableNamePhotoLocation />
          <EditableAbout />
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <EditableDetails />
          <EditableContact />
        </Columns.Column>
      </Columns>
      {/* <EditableJobPostings /> */}
    </LoggedIn>
  )
}
