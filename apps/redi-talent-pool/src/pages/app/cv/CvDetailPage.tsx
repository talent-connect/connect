import React from 'react'

import { Columns } from 'react-bulma-components'

import { LoggedIn } from '../../../components/templates'

function CvDetailPage() {
  return (
    <LoggedIn>
      <Columns>
        <Columns.Column></Columns.Column>
        <Columns.Column></Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

export default CvDetailPage
