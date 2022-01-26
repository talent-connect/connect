import { FC, useState, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Heading,
  Button,
  Modal,
  TextInput,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { Section, Columns, Content, Box } from 'react-bulma-components'

import { useTpjobseekerCvCreateMutation } from '../../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobSeekerCvQuery } from '../../../../react-query/use-tpjobseekercv-query'

import { LoggedIn } from '../../../../components/templates'
import { EmptySectionPlaceholder } from '../../../../components/molecules/EmptySectionPlaceholder'
import CvListItem from './CvListItem'
import { useTpJobSeekerProfileQuery } from '../../../../react-query/use-tpjobseekerprofile-query'
import { TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types'

import './CvListPage.scss'

const CvListPage: FC = () => {
  const [showCvNameModal, setShowCvNameModal] = useState(false)
  const [newCvName, setNewCvName] = useState('')

  const history = useHistory()

  const { data: profile } = useTpJobSeekerProfileQuery()
  const { data: cvList } = useTpJobSeekerCvQuery()
  const createMutation = useTpjobseekerCvCreateMutation()

  const setFocusOnRef = (ref: HTMLInputElement) => ref?.focus()

  const toggleCvNameModal = (isOpen) => {
    setShowCvNameModal(isOpen)
    if (!isOpen) setNewCvName('')
  }

  const handleCvNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewCvName(e.target.value)

  const handleCreateNewCv = (): void => {
    createMutation
      .mutateAsync({ ...convertProfileToCv(profile), cvName: newCvName })
      .then((data) => {
        toggleCvNameModal(false)
        if (data?.id) history.push(`/app/cv-builder/${data.id}`)
      })
  }

  /**
   * TODO: Fix hard-coded margins/paddings below, in favor of the spacing
   * clean-up task which is planned for after Talent Pool project is done
   */
  return (
    <LoggedIn>
      <Columns>
        <Columns.Column size={12} paddingless>
          <Columns.Column size={4} paddingless>
            <Heading size="smaller" className="heading">
              CV BUILDER
            </Heading>
            <Heading size="medium" border="bottomLeft" className="heading">
              Welcome to the CV Builder tool!
            </Heading>
          </Columns.Column>
        </Columns.Column>
        <Columns.Column desktop={{ size: 12 }} mobile={{ size: 6 }} paddingless>
          <Columns.Column size={6} paddingless style={{ marginBottom: 60 }}>
            <Content>
              We build that tool to help you create, fast and easy, a perfect CV
              to download and apply for your desired position.
            </Content>
          </Columns.Column>
        </Columns.Column>
        <Columns.Column
          desktop={{ size: 3 }}
          mobile={{ size: 6 }}
          paddingless
          style={{ marginBottom: 100 }}
        >
          <Button fullWidth onClick={() => toggleCvNameModal(true)}>
            Create a CV
          </Button>
        </Columns.Column>
      </Columns>
      <Section
        style={{
          padding: '0 0 10px 0',
          borderBottom: '1px solid #DADADA',
          marginBottom: 32,
        }}
      >
        <Heading size="small">Your CVs</Heading>
      </Section>
      <Section paddingless>
        {cvList?.length ? (
          <div>
            {cvList.map(({ id, cvName, createdAt }) => (
              <CvListItem
                key={id}
                id={id}
                name={cvName}
                createdAt={createdAt}
              />
            ))}
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 70px',
                maxWidth: 300,
                margin: 'auto',
                border: 'none',
                cursor: 'pointer',
              }}
              renderAs="button"
              onClick={() => toggleCvNameModal(true)}
            >
              <Icon
                icon="tpPlus"
                style={{ width: '36px', height: '36px', marginRight: '20px' }}
              />
              Create a CV
            </Box>
          </div>
        ) : (
          <EmptySectionPlaceholder
            height="tall"
            onClick={() => toggleCvNameModal(true)}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 70px',
              }}
            >
              <Icon
                icon="tpPlus"
                style={{ width: '36px', height: '36px', marginRight: '20px' }}
              />
              Create a CV
            </Box>
          </EmptySectionPlaceholder>
        )}
      </Section>
      <Modal
        show={showCvNameModal}
        stateFn={toggleCvNameModal}
        title="Create a CV"
      >
        <Modal.Body>
          <TextInput
            name="newCvNameInput"
            label="Name of the CV"
            placeholder="CV for Microsoft Frontend Developer Internship"
            values={{ newCvNameInput: newCvName }}
            handleChange={handleCvNameChange}
            domRef={setFocusOnRef}
          />
        </Modal.Body>
        <Modal.Foot>
          <Button disabled={!newCvName} onClick={handleCreateNewCv}>
            Save
          </Button>
        </Modal.Foot>
      </Modal>
    </LoggedIn>
  )
}

export default CvListPage

function convertProfileToCv(
  profile: Partial<TpJobSeekerProfile>
): Partial<TpJobSeekerCv> {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    contactEmail: profile.contactEmail,
    desiredPositions: profile.desiredPositions,
    phoneNumber: profile.phoneNumber,
    postalMailingAddress: profile.postalMailingAddress,
    personalWebsite: profile.personalWebsite,
    githubUrl: profile.githubUrl,
    linkedInUrl: profile.linkedInUrl,
    twitterUrl: profile.twitterUrl,
    behanceUrl: profile.behanceUrl,
    stackOverflowUrl: profile.stackOverflowUrl,
    dribbbleUrl: profile.dribbbleUrl,
    workingLanguages: profile.workingLanguages,
    aboutYourself: profile.aboutYourself,
    topSkills: profile.topSkills,
    experience: profile.experience,
    education: profile.education,
    projects: profile.projects,
  }
}
