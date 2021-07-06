import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Columns, Content, Box, Section } from 'react-bulma-components'

import {
  Heading,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { CVFormData } from '@talent-connect/talent-pool/types'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'

import { LoggedIn } from '../../../../components/templates'
import { CVPDFPreviewMemoized } from '../../../../components/molecules'
import { useTpJobseekerCvByIdQuery } from '../../../../react-query/use-tpjobseekercv-query'

import './CvDetailPage.scss'

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

function InlinePencilIcon() {
  return (
    <CreateOutlinedIcon style={{ color: '#EA5B25', margin: '0 12px -5px' }} />
  )
}

interface ParamTypes {
  id: string
}

function CvDetailPage() {
  const history = useHistory()
  const { id: cvId } = useParams<ParamTypes>()

  const { data: cvData } = useTpJobseekerCvByIdQuery(cvId)

  const handleCloseClick = () => history.push('/app/cv-builder')

  return (
    <LoggedIn>
      <Columns>
        <Columns.Column size={5} style={{ borderRight: '2px solid #F7F7F7' }}>
          <Columns.Column size={8} paddingless>
            <Section paddingless style={{ marginBottom: 100 }}>
              <Heading size="smaller" className="cv-name-heading">
                {cvData?.cvName?.toUpperCase()}
              </Heading>
            </Section>
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
              clicking the icon <InlinePencilIcon />
              <b>or</b> you click the <InlineButton /> button to get walked
              through the different sections.
            </Content>
            <Content style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button>Start</Button>
            </Content>
          </Columns.Column>
        </Columns.Column>
        <Columns.Column size={7}>
          {cvData && (
            <Box paddingless style={{ width: 595 }}>
              <CVPDFPreviewMemoized cvData={cvData} />
            </Box>
          )}
        </Columns.Column>
      </Columns>
      <Section style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleCloseClick}>Close</Button>
      </Section>
    </LoggedIn>
  )
}

export default CvDetailPage
