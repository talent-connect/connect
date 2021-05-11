import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useWindowResize } from 'beautiful-react-hooks'
import { useMachine } from '@xstate/react'
import { createMachine } from 'xstate'

import { LoggedIn } from '../../../components/templates'
import { CVPDFPreview } from '../../../components/molecules'

import {
  Container,
  Element,
  Columns,
  Form,
  Icon,
  Level,
} from 'react-bulma-components'
import './CVWizardContainer.scss'
import { PDFViewer, StyleSheet } from '@react-pdf/renderer'
import {
  Button,
  FormInput,
  FormSelect,
  FormTextArea,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { Languages as availableLanguages } from '@talent-connect/shared-config'
import { TpProfile } from '@talent-connect/talent-pool/types'
import {
  desiredPositions,
  yearsOfRelevantExperienceOptions,
  desiredEmploymentTypeOptions,
  availabilityOptions,
} from '@talent-connect/talent-pool/config'

import { useFormik } from 'formik'
import { keyBy, mapValues } from 'lodash'
import CVDownloadButton from 'apps/redi-talent-pool/src/components/molecules/CVDownloadButton'

/* eslint-disable-next-line */
export interface CVWizardContainerProps {}

const userCVData = {
  desiredPositions: ['Frontend Engineer'],
  firstName: 'Eric',
  lastName: 'Bolikowski',
  profileImage:
    'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  email: 'eric@binarylights.com',
  phoneNumber: '0176 4368 9941',
  address: 'Bla bla bla my address in Berlin',
  personalWebsite: 'https://binarylights.com',
  workingLanguage: ['Norwegian', 'English', 'Norwegian', 'English'],
  yearsOfRelevantExperience: '10+',
  desiredEmploymentType: 'Freelance',
  availability: 'Immediately',
  aboutYourself:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
  topSkills: ['jest', 'attentiveToDetail', 'jest', 'attentiveToDetail'],
  experience: [
    {
      title: 'Founder',
      company: 'Binary Lights',
      startDate: new Date(),
      endDate: new Date(),
      rolesResponsibilities: 'blabla',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: 'Founder',
      company: 'Binary Lights',
      startDate: new Date(),
      endDate: new Date(),
      rolesResponsibilities: 'blabla',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  ],
  education: [
    {
      type: 'High School',
      institutionName: 'St. Olav VGS',
      startDate: new Date(),
      endDate: new Date(),
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      type: 'High School',
      institutionName: 'St. Olav VGS',
      startDate: new Date(),
      endDate: new Date(),
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  ],
  projects: [
    {
      name: 'Project Name',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      link: 'https://project.de',
    },
  ],
  linkedin: 'https://linkedin.com/eric',
  github: 'https://github.com/eric',
}

const formPageNavigationMachine = createMachine({
  id: 'cvWizardFormPageNavigation',
  initial: 'overview',
  states: {
    overview: {
      on: { NEXT_PAGE: 'contact' },
      meta: { title: 'Interests & About', headline: 'Overview' },
    },
    contact: {
      on: { PREV_PAGE: 'overview', NEXT_PAGE: 'importantDetails' },
      meta: { title: '', headline: '' },
    },
    importantDetails: {
      on: { PREV_PAGE: 'contact', NEXT_PAGE: 'summary' },
      meta: {
        title: '',
        headline: '',
      },
    },
    summary: {
      on: { PREV_PAGE: 'importantDetails', NEXT_PAGE: 'experience' },
      meta: { title: '', headline: '' },
    },
    experience: {
      on: { PREV_PAGE: 'summary', NEXT_PAGE: 'education' },
      meta: { title: '', headline: '' },
    },
    education: {
      on: { PREV_PAGE: 'experience', NEXT_PAGE: 'projectsAwards' },
      meta: {
        title: '',
        headline: '',
      },
    },
    projectsAwards: {
      on: { PREV_PAGE: 'education' },
      meta: { title: '', headline: '' },
    },
  },
})

export function CVWizardContainer(props: CVWizardContainerProps) {
  const initialValues: Partial<TpProfile> = {
    desiredPositions: [],
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    personalWebsite: '',
    workingLanguages: [],
    yearsOfRelevantExperience: '',
    desiredEmploymentType: '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (e) => console.log(e),
  })

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
    ...formik.values,
    desiredPositions: formik.values.desiredPositions.map(
      (position) => desiredPositionsIdToLabelMap[position]
    ),
  }

  useWindowResize(() => {
    const elementWidth = cvContainerRef.current.clientWidth
    setCvPreviewElementWidth(elementWidth)
  })

  console.log(cvPreviewElementWidth)

  const pdfWidthToHeightRatio = 1.414 // A4 page ratio
  const cvContainerHeight = cvPreviewElementWidth * pdfWidthToHeightRatio

  const [currentFormPage, sendFormPageMessage] = useMachine(
    formPageNavigationMachine
  )

  const Pages = {
    overview: EditableOverview,
    contact: EditableContact,
    importantDetails: EditableImportantDetails,
    summary: EditableSummary,
    experience: EditableExperience,
    education: EditableEducation,
    projectsAwards: EditableProjectsAwards,
  }
  const Page = Pages[currentFormPage.value as string]

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
              style={{ overflow: 'hidden', height: `${cvContainerHeight}px` }}
            >
              <CVPDFPreview
                cvData={newUserData}
                pdfWidthPx={cvPreviewElementWidth}
              />
            </div>
            <CVDownloadButton cvData={newUserData} />
          </Columns.Column>
          <Columns.Column size={6} className="column--main-content">
            <Element renderAs="h4" textTransform="uppercase" textSize={6}>
              {Page.title}
            </Element>
            <Heading size="medium" border="bottomLeft">
              {Page.headline}
            </Heading>
            <Page formik={formik} />
            {currentFormPage.nextEvents.includes('PREV_PAGE') && (
              <Button
                onClick={() => sendFormPageMessage('PREV_PAGE')}
                // disabled={!(formik.dirty && formik.isValid)}
              >
                Previous
              </Button>
            )}
            {currentFormPage.nextEvents.includes('NEXT_PAGE') && (
              <Button
                onClick={() => sendFormPageMessage('NEXT_PAGE')}
                // disabled={!(formik.dirty && formik.isValid)}
              >
                Next
              </Button>
            )}
          </Columns.Column>
        </Columns>
      </Container>
    </LoggedIn>
  )
}

/* MOVE THESE TO APPROPRIATE FILES */

function EditableOverview({ formik }) {
  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Let's hear a little bit about what kind of jobs you're interested in.
      </Element>
      <FormSelect
        label="Desired position"
        name="desiredPositions"
        items={formDesiredPositions}
        {...formik}
        multiselect
      />
    </>
  )
}
EditableOverview.title = 'Interests & About'
EditableOverview.headline = 'Overview'

function EditableContact({ formik }) {
  return (
    <>
      <FormInput
        name="firstName"
        placeholder="Type your first name here..."
        label="First name"
        {...formik}
      />

      <FormInput
        name="lastName"
        placeholder="Type your last name here..."
        label="Your last name"
        {...formik}
      />
      <FormInput
        name="email"
        placeholder="awesome@redi.com"
        label="Email"
        {...formik}
      />
      <FormInput
        name="phoneNumber"
        placeholder="0176 1234 5678"
        label="Phone Number"
        {...formik}
      />
      <FormInput
        name="address"
        placeholder="123 Street, 10234 Berlin, Germany"
        label="Address"
        {...formik}
      />
      <FormInput
        name="personalWebsite"
        placeholder="https://www.mysite.com"
        label="Your website"
        {...formik}
      />
      <FormInput
        name="githubUrl"
        placeholder="https://github.com/myusername"
        label="Github URL"
        {...formik}
      />
      <FormInput
        name="linkedInUrl"
        placeholder="https://linkedin.com/in/firstname-lastname"
        label="LinkedIn Profile URL"
        {...formik}
      />
      <FormInput
        name="twitterUrl"
        placeholder="https://twitter.com/mytwitterpage"
        label="Your twitter page URL"
        {...formik}
      />
      <FormInput
        name="behanceUrl"
        placeholder="https://behance.net/mybehancepage"
        label="Your Behance page URL"
        {...formik}
      />
      <FormInput
        name="stackOverflowUrl"
        placeholder="https://stackoverflow.com/users/mypage"
        label="Your Stackoverflow profile"
        {...formik}
      />
      <FormInput
        name="dribbbleUrl"
        placeholder="https://dribbble.com/mypage"
        label="Your Dribbble Page"
        {...formik}
      />
      {/* <Form.Label size="small">Connect your social media</Form.Label>
      <Container>
        <Level
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Icon size="large">
            <i className="fab fa-lg fa-github" />
          </Icon>
          <Icon size="large">
            <i className="fab fa-lg fa-linkedin-in" />
          </Icon>
          <Icon size="large">
            <i className="fab fa-lg fa-twitter" />
          </Icon>
          <Icon size="large">
            <i className="fab fa-lg fa-behance" />
          </Icon>
          <Icon size="large">
            <i className="fab fa-lg fa-stack-overflow" />
          </Icon>
          <Icon size="large">
            <i className="fab fa-lg fa-dribbble" />
          </Icon>
        </Level>
      </Container> */}
    </>
  )
}
EditableContact.title = 'Help Employers Get In Touch'
EditableContact.headline = 'Contact'

function EditableImportantDetails({ formik }) {
  return (
    <>
      <Element renderAs="p" textSize={4} className="oneandhalf-bs">
        This is where employers can get the basics that they need to get in
        touch and see your work.
      </Element>
      <FormSelect
        label="Which of these languages do you speak?*"
        placeholder="Languages"
        name="workingLanguages"
        items={formLanguagesOptions}
        multiselect
        {...formik}
      />
      <FormSelect
        label="How many years of relevant experience do you have?"
        placeholder="Relevant experience (in years)"
        name="yearsOfRelevantExperience"
        items={formYearsOfRelevantExperienceOptions}
        {...formik}
      />
      <FormSelect
        label="What type of work are you looking for?"
        placeholder="Select employment type"
        name="desiredEmploymentType"
        items={formDesiredEmploymentTypeOptions}
        {...formik}
      />
      <FormSelect
        label="When are you available?"
        placeholder="Select availability"
        name="availability"
        items={formAvailabilityOptions}
        {...formik}
      />
    </>
  )
}
EditableImportantDetails.title = 'Work Preferences & Contact'
EditableImportantDetails.headline = 'Important Details'

function EditableSummary({ formik }) {
  return (
    <>
      <Element renderAs="p" textSize={4} className="oneandhalf-bs">
        Tell us a bit about yourself. This is a chance to introduce yourself and
        what you’re passionate about in your field.
      </Element>
      <FormTextArea
        label="About you"
        name="aboutYourself"
        rows={7}
        placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
        {...formik}
      />
    </>
  )
}
EditableSummary.title = 'About You'
EditableSummary.headline = 'Summary'

function EditableExperience({ formik }) {
  return null
}
EditableExperience.title = 'Work History'
EditableExperience.headline = 'Professional Experience'

function EditableEducation({ formik }) {
  return null
}
EditableEducation.title = 'Studies, Certifications, Courses'
EditableEducation.headline = 'Education'

function EditableProjectsAwards({ formik }) {
  return null
}
EditableProjectsAwards.title = 'Showcase'
EditableProjectsAwards.headline = 'Projects & Awards'

const desiredPositionsIdToLabelMap = mapValues(
  keyBy(desiredPositions, 'id'),
  'label'
)

const formDesiredPositions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))
const formYearsOfRelevantExperienceOptions = yearsOfRelevantExperienceOptions.map(
  ({ id, label }) => ({
    value: id,
    label,
  })
)
const formDesiredEmploymentTypeOptions = desiredEmploymentTypeOptions.map(
  ({ id, label }) => ({
    value: id,
    label,
  })
)
const formAvailabilityOptions = availabilityOptions.map(({ id, label }) => ({
  value: id,
  label,
}))

const formLanguagesOptions = availableLanguages.map((language) => ({
  value: language,
  label: language,
}))

export default CVWizardContainer
