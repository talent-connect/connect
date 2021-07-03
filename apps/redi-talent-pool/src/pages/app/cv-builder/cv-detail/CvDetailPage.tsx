import React from 'react'

import {
  Heading,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Content } from 'react-bulma-components'

import { LoggedIn } from '../../../../components/templates'

function InlineButton() {
  return (
    <Button
      style={{
        transform: 'scale(0.5)',
        marginLeft: -24,
        marginRight: -16,
        pointerEvents: 'none',
      }}
    >
      Start
    </Button>
  )
}

function CvDetailPage() {
  return (
    <LoggedIn>
      <Columns>
        <Columns.Column size={5} style={{ borderRight: '2px solid #F7F7F7' }}>
          <Columns.Column size={8} paddingless>
            <Heading size="smaller">UPDATE YOUR CV</Heading>
            <Heading size="medium" border="bottomLeft">
              Select a section to edit your CV
            </Heading>
          </Columns.Column>
          <Columns.Column size={12} paddingless>
            <Content>
              Get to the essentials. Research has shown that recruiters spend 2
              minutes on screening a CV for the first time. That's why it is so
              important to cut to the chase and focus on vital information —
              reduced to 1 page to make an excellent first impression and get
              invited to an interview.
            </Content>
            <Content>
              There are two way to edit your CV. You can selecte a section by
              clicking the icon <b>or</b> you click the <InlineButton /> button
              to get walked through the different sections.
            </Content>
            <Content style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button>Start</Button>
            </Content>
          </Columns.Column>
        </Columns.Column>
        <Columns.Column size={7}>Sag</Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

export default CvDetailPage
