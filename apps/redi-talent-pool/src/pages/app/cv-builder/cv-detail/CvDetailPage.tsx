import React from 'react'
import { useHistory } from 'react-router-dom'
import { Columns, Content, Box, Section } from 'react-bulma-components'

import {
  Heading,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { CVFormData } from '@talent-connect/talent-pool/types'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'

import { LoggedIn } from '../../../../components/templates'
import { CVPDFPreviewMemoized } from '../../../../components/molecules'

const userCVData: CVFormData = {
  desiredPositions: ['Desired Position', 'Desired Position'],
  firstName: 'Name',
  lastName: 'Name',
  profileImage:
    'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  email: 'steve.wiliams@web.de',
  phoneNumber: '123-123-123',
  address: '123 Anywhere Street, City, Berlin, Germany 12345',
  personalWebsite: 'https://www.hello.com',
  githubUrl: 'https://www.github.com',
  linkedInUrl: 'https://www.linkedin.com',
  twitterUrl: 'https://www.twitter.com',
  workingLanguages: [
    'English - Native',
    'German - Professional proficiency',
    'Russian - Beginner',
  ],
  yearsOfRelevantExperience: '5',
  desiredEmploymentType: 'Full Time',
  availability: 'Immediately',
  aboutYourself:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  topSkills: ['React', 'Redux'],
  experience: [
    {
      title: 'Tech Lead',
      company: 'ReDI',
      startDate: new Date(Date.parse('01 Jul 2021')),
      current: true,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
    },
    {
      title: 'Job Title',
      company: 'Company',
      startDate: new Date(Date.parse('01 May 2018')),
      endDate: new Date(Date.parse('01 Jul 2021')),
      current: false,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
    },
  ],
  education: [
    {
      type: 'Cerfication',
      institutionName: 'School',
      startDate: new Date(Date.parse('01 Sep 2012')),
      endDate: new Date(Date.parse('01 Jun 2016')),
      current: false,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
    },
    {
      type: 'Cerfication',
      institutionName: 'School',
      startDate: new Date(Date.parse('01 Sep 2012')),
      endDate: new Date(Date.parse('01 Jun 2016')),
      current: false,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
    },
  ],
  projects: [
    {
      title: 'Certification',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
      link: 'http://project-link.de',
    },
  ],
}

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

function CvDetailPage() {
  const history = useHistory()

  const handleCloseClick = () => history.push('/app/cv-builder')

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
          <Box paddingless style={{ width: 595 }}>
            <CVPDFPreviewMemoized cvData={userCVData} />
          </Box>
        </Columns.Column>
      </Columns>
      <Section style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleCloseClick}>Close</Button>
      </Section>
    </LoggedIn>
  )
}

export default CvDetailPage
