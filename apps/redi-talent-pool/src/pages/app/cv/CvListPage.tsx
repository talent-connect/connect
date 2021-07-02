import React from 'react'
import { useHistory } from 'react-router-dom'

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

function CvListPage() {
  const [showCvNameModal, setShowCvNameModal] = React.useState(false)
  const [newCvName, setNewCvName] = React.useState('')

  const history = useHistory()

  const { data: cvList } = useTpJobseekerCvQuery()
  const createMutation = useTpjobseekerCvCreateMutation()

  const setFocusOnRef = (ref: HTMLInputElement) => ref?.focus()

  const toggleCvNameModal = (isOpen) => {
    setShowCvNameModal(isOpen)

    if (!isOpen) {
      setNewCvName('')
    }
  }

  const handleCvNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCvName(e.target.value)

  const handleCreateNewCv = (): void => {
    createMutation.mutateAsync({ cvName: newCvName }).then((data) => {
      toggleCvNameModal(false)
      if (data?.id) history.push(`/app/cv-builder/${data.id}`)
    })
  }

  // TODO
  const handleExportCv = (): void => {
    return
  }

  /**
   * TODO: Fix hard-coded margins/paddings below, in favor of the spacing
   * clean-up task which is planned for after Talent Pool project is done
   */
  return (
    <LoggedIn>
      <Columns>
        <Columns.Column size={12} paddingless>
          <Columns.Column size={3} paddingless>
            <Heading size="smaller">CV BUILDER</Heading>
            <Heading size="medium" border="bottomLeft">
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
        {cvList?.length > 0 ? (
          <div>
            {cvList.map((cv) => (
              <CvListItem
                id={cv.id}
                name={cv.cvName}
                createdAt={cv.createdAt}
                handleExport={handleExportCv}
              />
            ))}
            <EmptySectionPlaceholder
              height="extra-slim"
              style={{ width: 300, margin: 'auto' }}
              text="Create a CV"
              onClick={() => toggleCvNameModal(true)}
            />
          </div>
        ) : (
          <EmptySectionPlaceholder
            height="tall"
            text="Create a CV"
            onClick={() => toggleCvNameModal(true)}
          />
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
