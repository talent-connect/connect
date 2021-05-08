import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useWindowResize } from 'beautiful-react-hooks'

import { LoggedIn } from '../../../components/templates'
import { CVPDFPreview } from '../../../components/molecules'

import { Container, Element, Columns } from 'react-bulma-components'
import './CVWizardContainer.scss'
import { PDFViewer, StyleSheet } from '@react-pdf/renderer'
import {
  FormSelect,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'

/* eslint-disable-next-line */
export interface CVWizardContainerProps {}

const userCVData = {
  position: 'Front End Engineer',
  firstName: 'NNEKA',
  lastName: 'UMAR',
  profileImage:
    'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
}

interface CVFormValues {
  desiredPosition?: string
}

export function CVWizardContainer(props: CVWizardContainerProps) {
  const [cvPreviewElementWidth, setCvPreviewElementWidth] = useState<number>(0)
  const cvContainerRef = useRef<HTMLDivElement>(null)
  const cvContainerRefCallback = useCallback((containerNode) => {
    cvContainerRef.current = containerNode
    const elementWidth = containerNode.clientWidth
    setCvPreviewElementWidth(elementWidth)
  }, [])

  const [counter, setCounter] = useState(0)
  useEffect(() => {
    // setInterval(() => setCounter((counter) => counter + 1), 1000)
  }, [])

  const newUserData = {
    ...userCVData,
    firstName: `${userCVData.firstName} ${counter}`,
  }

  useWindowResize(() => {
    const elementWidth = cvContainerRef.current.clientWidth
    setCvPreviewElementWidth(elementWidth)
  })

  const initialValues: CVFormValues = {
    desiredPosition: null,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (e) => console.log(e),
  })

  return (
    <LoggedIn>
      <Container className="cv-wizard-container">
        <Columns breakpoint="mobile">
          <Columns.Column
            size={6}
            className="column--side-menu cv-wizard-container__column-cv-preview"
          >
            <div
              className="cv-wizard-container__cv-container"
              ref={cvContainerRefCallback}
              style={{ overflow: 'hidden' }}
            >
              <CVPDFPreview
                cvData={newUserData}
                pdfWidthPx={cvPreviewElementWidth}
              />
            </div>
          </Columns.Column>
          <Columns.Column size={6} className="column--main-content">
            <Element
              renderAs="h4"
              textTransform="uppercase"
              textSize={6}
              responsive={{ mobile: { textSize: { value: 7 } } }}
            >
              Interest & About
            </Element>
            <Heading size="medium" border="bottomLeft">
              Overview
            </Heading>
            <Element
              renderAs="p"
              textSize={4}
              responsive={{ mobile: { textSize: { value: 5 } } }}
              className="oneandhalf-bs"
            >
              Let's hear a little bit about what kind of jobs you're interested
              in.
            </Element>
            <FormSelect
              label="Which of these languages do you speak?*"
              name="desiredPosition"
              items={formDesiredPositions}
              {...formik}
            />
          </Columns.Column>
        </Columns>
      </Container>
    </LoggedIn>
  )
}

/* MOVE THESE TO APPROPRIATE FILES */

const desiredPositions = [
  { id: 'frontendDeveloper', label: 'Frontend Developer' },
  { id: 'backendDeveloper', label: 'Backend Developer' },
  { id: 'nodejsDeveloper', label: 'Node.js Developer' },
  { id: 'React Developer', label: 'React Developer' },
]
const formDesiredPositions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))

export default CVWizardContainer
