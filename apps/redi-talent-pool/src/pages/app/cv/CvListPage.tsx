import React from 'react'

import {
  Heading,
  Button,
  Modal,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { Section, Columns, Content } from 'react-bulma-components'

import { useTpjobseekerCvCreateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobseekerCvQuery } from '../../../react-query/use-tpjobseekercv-query'

import { LoggedIn } from '../../../components/templates'
import { EmptySectionPlaceholder } from '../../../components/molecules/EmptySectionPlaceholder'
import CvListItem from './CvListItem'

const autofocusOnCvNameInput = (): void => {
  // Setting timeout to make sure the modal and input is rendered in the DOM
  setTimeout(() => {
    document.getElementById('newCvNameInput').focus()
  }, 100)
}

const CvListPage: React.FC = () => {
  const [showCvNameModal, setShowCvNameModal] = React.useState(false)
  const [newCvName, setNewCvName] = React.useState('')

  const { data: cvList } = useTpJobseekerCvQuery()
  const createMutation = useTpjobseekerCvCreateMutation()

  const handleShowCvNameModal = () => {
    setShowCvNameModal(true)
    autofocusOnCvNameInput()
  }

  const handleCvNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCvName(e.target.value)

  const handleCreateNewCv = (): void => {
    createMutation.mutate({ cvName: newCvName })
  }

  const handleEditCv = () => {}

  const handleExportCv = () => {}

  return (
    <LoggedIn>
      <Columns className="is-6 is-variable">
        <Columns.Column>
          <div style={{ marginBottom: 72 }}>
            <Heading size="smaller">CV BUILDER</Heading>
            <div style={{ width: 300 }}>
              <Heading size="medium" border="bottomLeft">
                Welcome to the CV Builder tool!
              </Heading>
            </div>
            <div style={{ width: 700 }}>
              <Content>
                We build that tool to help you create, fast and easy, a perfect
                CV to download and apply for your desired position.
              </Content>
            </div>
          </div>
          <div style={{ width: 300, marginBottom: 120 }}>
            <Button fullWidth onClick={handleShowCvNameModal}>
              Create a CV
            </Button>
          </div>
          <div
            style={{
              paddingBottom: 10,
              borderBottom: '1px solid #DADADA',
              marginBottom: 32,
            }}
          >
            <Heading size="small">Your CVs</Heading>
          </div>
          {cvList?.length > 0 ? (
            <Section paddingless>
              {cvList.map((cv) => (
                <CvListItem
                  id={cv.id}
                  name={cv.cvName}
                  createdAt={cv.createdAt}
                  handleEdit={handleEditCv}
                  handleExport={handleExportCv}
                />
              ))}
              <EmptySectionPlaceholder
                height="extra-slim"
                style={{ width: 300, margin: 'auto' }}
                text="Create a CV"
                onClick={handleShowCvNameModal}
              />
            </Section>
          ) : (
            <EmptySectionPlaceholder
              height="tall"
              text="Create a CV"
              onClick={handleShowCvNameModal}
            />
          )}
        </Columns.Column>
      </Columns>
      <Modal
        show={showCvNameModal}
        stateFn={setShowCvNameModal}
        title="Create a CV"
      >
        <Modal.Body>
          <FormInput
            name="newCvNameInput"
            label="Name of the CV"
            values={{ newCvNameInput: newCvName }}
            handleChange={handleCvNameChange}
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
