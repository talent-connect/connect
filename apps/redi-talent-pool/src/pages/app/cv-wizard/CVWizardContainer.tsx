import React from 'react'

import { LoggedIn } from '../../../components/templates'
import { CVPDFPreview } from '../../../components/molecules'

import {
  Container,
  Section,
  Columns,
  Content,
  Notification,
} from 'react-bulma-components'
import './CVWizardContainer.scss'
import { PDFViewer, StyleSheet } from '@react-pdf/renderer'

/* eslint-disable-next-line */
export interface CVWizardContainerProps {}

const UserData = {
  position: 'Front End Engineer',
  firstName: 'NNEKA',
  lastName: 'UMAR',
  profileImage:
    'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
}

const styles = StyleSheet.create({
  viewer: {
    width: '50vw',
    height: '100vh',
  },
})

export function CVWizardContainer(props: CVWizardContainerProps) {
  return (
    <LoggedIn>
      <Container className="cv-wizard-container">
        <Columns>
          <Columns.Column size={6} className="column--side-menu">
            <PDFViewer>
              <CVPDFPreview cvData={UserData} />
            </PDFViewer>
          </Columns.Column>
          <Columns.Column size={6} className="column--main-content">
            main content
          </Columns.Column>
        </Columns>
      </Container>
    </LoggedIn>
  )
}

export default CVWizardContainer
