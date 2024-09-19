import React from 'react'
import { useHistory } from 'react-router-dom'

import {
  Button,
  Caption,
  FormInput,
  Heading,
  Icon,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import { Box, Columns, Content, Element, Section } from 'react-bulma-components'

import { EmptySectionPlaceholder } from '../../../../components/molecules/EmptySectionPlaceholder'
import { LoggedIn } from '../../../../components/templates'
import CvListItem from './CvListItem'

import {
  TpJobseekerCvCreateInput,
  TpJobseekerDirectoryEntry,
  useFindAllTpJobseekerCvsQuery,
  useMyTpDataQuery,
  useTpJobseekerCvCreateFromCurrentUserJobseekerProfileMutation,
} from '@talent-connect/data-access'
import './CvListPage.scss'

function CvListPage() {
  const [showCvNameModal, setShowCvNameModal] = React.useState(false)
  const [newCvName, setNewCvName] = React.useState('')

  const history = useHistory()

  const myTpData = useMyTpDataQuery()
  const profile =
    myTpData?.data?.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
  const myCvsQuery = useFindAllTpJobseekerCvsQuery()
  const cvList = myCvsQuery.data?.tpJobseekerCvs

  const createMutation =
    useTpJobseekerCvCreateFromCurrentUserJobseekerProfileMutation()

  const setFocusOnRef = (ref: HTMLInputElement) => ref?.focus()

  const toggleCvNameModal = (isOpen) => {
    setShowCvNameModal(isOpen)

    if (!isOpen) {
      setNewCvName('')
    }
  }

  const handleCvNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCvName(e.target.value)

  const handleCreateNewCv = async () => {
    const result = await createMutation.mutateAsync({
      input: { cvName: newCvName },
    })
    toggleCvNameModal(false)
    history.push(
      `/app/cv-builder/${result.tpJobseekerCreateFromCurrentUserJobseekerProfile.id}`
    )
  }

  /**
   * TODO: Fix hard-coded margins/paddings below, in favor of the spacing
   * clean-up task which is planned for after Talent Pool project is done
   */
  return (
    <LoggedIn>
      <Columns className="heading-section">
        <Columns.Column size={12} paddingless>
          <Columns.Column size={4} paddingless>
            <Caption>CV Builder</Caption>
            <Heading subtitle size="small" border="bottomLeft">
              Welcome to the CV Builder tool!
            </Heading>
          </Columns.Column>
        </Columns.Column>
        <Columns.Column desktop={{ size: 12 }} paddingless>
          <Columns.Column
            desktop={{ size: 6 }}
            mobile={{ size: 12 }}
            paddingless
            style={{ marginBottom: 60 }}
          >
            <Content>
              We build that tool to help you create, fast and easy, a perfect CV
              to download and apply for your desired position.
            </Content>
          </Columns.Column>
        </Columns.Column>
        <Columns.Column
          desktop={{ size: 3 }}
          mobile={{ size: 7 }}
          paddingless
          style={{ marginBottom: 60 }}
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
        <Element renderAs="h4" textSize={4}>
          Your CVs
        </Element>
      </Section>
      <Section paddingless>
        {cvList?.length > 0 ? (
          <div>
            {cvList.map((cv) => (
              <CvListItem
                key={cv.id}
                id={cv.id}
                name={cv.cvName}
                createdAt={cv.createdAt}
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
          <FormInput
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

function convertProfileToNewCv(
  profile: TpJobseekerDirectoryEntry
): TpJobseekerCvCreateInput {
  return {
    aboutYourself: profile.aboutYourself,
    desiredPositions: profile.desiredPositions,
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    postalMailingAddress: profile.postalMailingAddress,
    telephoneNumber: profile.telephoneNumber,
    topSkills: profile.topSkills,
  }
}
