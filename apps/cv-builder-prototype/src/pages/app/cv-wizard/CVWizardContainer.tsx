import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useWindowResize } from 'beautiful-react-hooks'
import { useDebounce } from 'react-use'
import { useMachine } from '@xstate/react'
import { createMachine } from 'xstate'
import { v4 as uuidv4 } from 'uuid'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'

import { stringify, parse } from 'telejson'

import { LoggedIn } from '../../../components/templates'
import {
  CVPDFPreviewMemoized,
  CVPDFPreview,
} from '../../../components/molecules/CvPdfPreview'

import {
  Container,
  Content,
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
  Checkbox,
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextArea,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { Languages as availableLanguages } from '@talent-connect/shared-config'
import { CVFormData, TpProfile } from '@talent-connect/talent-pool/types'
import {
  desiredPositions,
  yearsOfRelevantExperienceOptions,
  desiredEmploymentTypeOptions,
  availabilityOptions,
} from '@talent-connect/talent-pool/config'

import { useFormik } from 'formik'
import { keyBy, mapValues } from 'lodash'
import CVDownloadButton from '../../../components/molecules/CVDownloadButton'
import { IconButton, RootRef } from '@material-ui/core'

/* eslint-disable-next-line */
export interface CVWizardContainerProps { }

// const userCVData: CVFormData = {
//   desiredPositions: ['Frontend Engineer'],
//   firstName: 'Eric',
//   lastName: 'Bolikowski',
//   profileImage:
//     'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
//   email: 'eric@binarylights.com',
//   phoneNumber: '0176 4368 9941',
//   address: 'Bla bla bla my address in Berlin',
//   personalWebsite: 'https://binarylights.com',
//   workingLanguages: ['Norwegian', 'English', 'Norwegian', 'English'],
//   yearsOfRelevantExperience: '10+',
//   desiredEmploymentType: 'Freelance',
//   availability: 'Immediately',
//   aboutYourself:
//     'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
//   topSkills: ['jest', 'attentiveToDetail', 'jest', 'attentiveToDetail'],
//   experience: [
//     {
//       title: 'Founder',
//       company: 'Binary Lights',
//       startDate: new Date(),
//       endDate: new Date(),
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
//     {
//       title: 'Founder',
//       company: 'Binary Lights',
//       startDate: new Date(),
//       endDate: new Date(),
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
//   ],
//   education: [
//     {
//       type: 'High School',
//       institutionName: 'St. Olav VGS',
//       startDate: new Date(),
//       endDate: new Date(),
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
//     {
//       type: 'High School',
//       institutionName: 'St. Olav VGS',
//       startDate: new Date(),
//       endDate: new Date(),
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
//   ],
//   projects: [
//     {
//       name: 'Project Name',
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
//       link: 'https://project.de',
//     },
//   ],
//   linkedInUrl: 'https://linkedin.com/eric',
//   githubUrl: 'https://github.com/eric',
// }

const userCVData: CVFormData = {
  desiredPositions: [],
  firstName: '',
  lastName: '',
  profileImage:
    'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  email: '',
  phoneNumber: '',
  address: '',
  personalWebsite: '',
  workingLanguages: [],
  yearsOfRelevantExperience: '',
  desiredEmploymentType: '',
  availability: '',
  aboutYourself: '',
  topSkills: [],
  experience: [],
  education: [],
  projects: [],
  linkedInUrl: '',
  githubUrl: '',
  twitterUrl: '',
  behanceUrl: '',
  dribbbleUrl: '',
}

const formPageNavigationMachine = createMachine({
  id: 'cvWizardFormPageNavigation',
  initial: 'overview',
  states: {
    overview: {
      on: { NEXT_PAGE: 'contact' },
    },
    contact: {
      on: { PREV_PAGE: 'overview', NEXT_PAGE: 'importantDetails' },
    },
    importantDetails: {
      on: { PREV_PAGE: 'contact', NEXT_PAGE: 'summary' },
    },
    summary: {
      on: { PREV_PAGE: 'importantDetails', NEXT_PAGE: 'experience' },
    },
    experience: {
      on: { PREV_PAGE: 'summary', NEXT_PAGE: 'education' },
    },
    education: {
      on: { PREV_PAGE: 'experience', NEXT_PAGE: 'projectsAwards' },
    },
    projectsAwards: {
      on: { PREV_PAGE: 'education' },
    },
  },
})

const buildCvPreviewData = (formValues: any) => ({
  ...userCVData,
  ...formValues,
  desiredPositions: formValues.desiredPositions.map(
    (position) => desiredPositionsIdToLabelMap[position]
  ),
})

let initialValues: CVFormData = userCVData
try {
  const stringifiedCV = localStorage.getItem('cvFormValues')
  if (stringifiedCV) {
    initialValues = parse(stringifiedCV)
  }
} catch (err) {
  localStorage.removeItem('cvFormValues')
}

export function CVWizardContainer(props: CVWizardContainerProps) {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (e) => console.log(e),
  })
  console.log(formik.values)

  const [cvPreviewElementWidth, setCvPreviewElementWidth] = useState<number>(0)
  const cvContainerRef = useRef<HTMLDivElement>(null)
  const cvContainerRefCallback = useCallback((containerNode) => {
    cvContainerRef.current = containerNode
    const elementWidth = containerNode.clientWidth
    setCvPreviewElementWidth(elementWidth)
  }, [])

  const [cvPreviewData, setCvPreviewData] = useState<CVFormData>(initialValues)

  const [leftColumnContentsHeight, setLeftColumnContentsHeight] = useState(null)

  useDebounce(
    () => {
      setCvPreviewData(buildCvPreviewData(formik.values))
    },
    600,
    [formik.values]
  )

  useWindowResize(() => {
    const elementWidth = cvContainerRef.current.clientWidth
    setCvPreviewElementWidth(elementWidth)
  })

  const pdfWidthToHeightRatio = 1.414 // A4 page ratio
  const cvContainerHeight = cvPreviewElementWidth * pdfWidthToHeightRatio

  const leftColumnHeight = cvContainerHeight * 0.575

  const leftColumnVerticalFillDegree =
    leftColumnContentsHeight / leftColumnHeight
  console.log(leftColumnVerticalFillDegree)
  console.log(leftColumnVerticalFillDegree)
  console.log(leftColumnVerticalFillDegree)
  console.log(leftColumnVerticalFillDegree)
  console.log(leftColumnVerticalFillDegree)

  const [currentFormPage, _sendFormPageMessage] = useMachine(
    formPageNavigationMachine
  )
  const sendFormPageMessage = (message: string) => {
    localStorage.setItem('cvFormValues', stringify(formik.values))
    _sendFormPageMessage(message)
  }

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
              <CVPDFPreviewMemoized
                cvData={cvPreviewData}
                pdfHeightPx={cvContainerHeight}
                pdfWidthPx={cvPreviewElementWidth}
                setLeftColumnContentsHeight={setLeftColumnContentsHeight}
              />
            </div>
            <CVDownloadButton cvData={cvPreviewData} />
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

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
})

function EditableExperience({ formik }) {
  const addExperience = useCallback(() => {
    formik.setFieldValue('experience', [
      ...formik.values.experience,
      {
        uuid: uuidv4(),
        title: '',
        description: '',
        company: '',
        startDate: null,
        endDate: null,
        current: false,
      },
    ])
  }, [formik])
  const removeExperience = useCallback(
    (experienceIndex) => {
      formik.setFieldValue(
        'experience',
        formik.values.experience.filter((_, index) => experienceIndex !== index)
      )
    },
    [formik]
  )
  const onDragEnd = useCallback(
    (result) => {
      console.log(result)
      const startIndex = result.source.index
      const endIndex = result.destination.index

      const newExperience = Array.from(formik.values.experience)

      const [removed] = newExperience.splice(startIndex, 1)
      newExperience.splice(endIndex, 0, removed)

      formik.setFieldValue('experience', newExperience)
    },
    [formik]
  )

  return (
    <>
      <Element renderAs="p" textSize={4} className="oneandhalf-bs">
        Add your most recent relevant experience, you can add more later - let’s
        just get started with what you’re currently up to.
      </Element>
      <Heading size="small">
        Work Experience{' '}
        <IconButton onClick={addExperience}>
          <AddIcon />
        </IconButton>
      </Heading>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              {formik.values.experience.map((experience, index) => (
                <Draggable
                  key={experience.uuid}
                  draggableId={experience.uuid}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Accordion
                      TransitionProps={{ ref: provided.innerRef }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {!experience.title && <span>Position {index + 1}</span>}
                        {experience.title && <span>{experience.title}</span>}
                      </AccordionSummary>
                      <AccordionDetails style={{ width: '100%' }}>
                        <Container>
                          <FormInput
                            name={`experience[${index}].title`}
                            placeholder="Frontend Developer, Backend Developer..."
                            label="Title of your position"
                            {...formik}
                          />
                          <FormInput
                            name={`experience[${index}].company`}
                            placeholder="Name of the company or place"
                            label="Company"
                            {...formik}
                          />
                          <FormTextArea
                            label="Roles & Responsibilities"
                            name={`experience[${index}].description`}
                            rows={5}
                            placeholder="Tell us a little bit about your day to day — what you worked on, projects you’re proud of, or what you learned…"
                            {...formik}
                          />
                          <Checkbox
                            name={`experience[${index}].current`}
                            checked={formik.values.experience[index].current}
                            {...formik}
                          >
                            I currently work here
                          </Checkbox>
                          <FormDatePicker
                            label="Started"
                            name={`experience[${index}].startDate`}
                            placeholder="When did you start working?"
                            dateFormat="dd MMMM yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            {...formik}
                          />
                          <FormDatePicker
                            label="Ended"
                            name={`experience[${index}].endDate`}
                            placeholder="When did you end working?"
                            dateFormat="dd MMMM yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            {...formik}
                          />
                          <Content>
                            <a onClick={() => removeExperience(index)}>
                              Delete position
                            </a>
                          </Content>
                        </Container>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
EditableExperience.title = 'Work History'
EditableExperience.headline = 'Professional Experience'

function EditableEducation({ formik }) {
  const addEducationItem = useCallback(() => {
    formik.setFieldValue('education', [
      ...formik.values.education,
      {
        uuid: uuidv4(),
        title: '',
        description: '',
        institutionName: '',
        startDate: null,
        endDate: null,
        current: false,
      },
    ])
  }, [formik])
  const removeEducationItem = useCallback(
    (projectIndex) => {
      formik.setFieldValue(
        'education',
        formik.values.education.filter((_, index) => projectIndex !== index)
      )
    },
    [formik]
  )
  const onDragEnd = useCallback(
    (result) => {
      console.log(result)
      const startIndex = result.source.index
      const endIndex = result.destination.index

      const newProject = Array.from(formik.values.education)

      const [removed] = newProject.splice(startIndex, 1)
      newProject.splice(endIndex, 0, removed)

      formik.setFieldValue('education', newProject)
    },
    [formik]
  )

  return (
    <>
      <Element renderAs="p" textSize={4} className="oneandhalf-bs">
        Add your most relevant and recent education first, then if you feel like
        some of your previous training is relevant and you have space — include
        it as well!
      </Element>
      <Heading size="small">
        Education history
        <IconButton onClick={addEducationItem}>
          <AddIcon />
        </IconButton>
      </Heading>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              {formik.values.education.map((educationItem, index) => (
                <Draggable
                  key={educationItem.uuid}
                  draggableId={educationItem.uuid}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Accordion
                      TransitionProps={{ ref: provided.innerRef }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {!educationItem.title && (
                          <span>Education history #{index + 1}</span>
                        )}
                        {educationItem.title && (
                          <span>{educationItem.title}</span>
                        )}
                      </AccordionSummary>
                      <AccordionDetails style={{ width: '100%' }}>
                        <Container>
                          <FormInput
                            name={`education[${index}].title`}
                            placeholder="Bachelor/Master of XYZ"
                            label="Title of your study"
                            {...formik}
                          />
                          <FormInput
                            name={`education[${index}].institutionName`}
                            placeholder="University ABC"
                            label="Name of the institution where you are studying"
                            {...formik}
                          />
                          <FormTextArea
                            label="Description"
                            name={`education[${index}].description`}
                            rows={5}
                            placeholder="Give a brief and relevant summary of what you are studying"
                            {...formik}
                          />
                          <Checkbox
                            name={`education[${index}].current`}
                            checked={formik.values.education[index].current}
                            {...formik}
                          >
                            I currently study here
                          </Checkbox>
                          <FormDatePicker
                            label="Started"
                            name={`education[${index}].startDate`}
                            placeholder="When did you start studying?"
                            dateFormat="dd MMMM yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            {...formik}
                          />
                          <FormDatePicker
                            label="Ended"
                            name={`education[${index}].endDate`}
                            placeholder="When did you finish studying?"
                            dateFormat="dd MMMM yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            {...formik}
                          />
                          <Content>
                            <a onClick={() => removeEducationItem(index)}>
                              Delete item
                            </a>
                          </Content>
                        </Container>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
EditableEducation.title = 'Studies, Certifications, Courses'
EditableEducation.headline = 'Education'

function EditableProjectsAwards({ formik }) {
  const addProject = useCallback(() => {
    formik.setFieldValue('projects', [
      ...formik.values.projects,
      {
        uuid: uuidv4(),
        title: '',
        description: '',
        link: '',
      },
    ])
  }, [formik])
  const removeProject = useCallback(
    (projectIndex) => {
      formik.setFieldValue(
        'projects',
        formik.values.projects.filter((_, index) => projectIndex !== index)
      )
    },
    [formik]
  )
  const onDragEnd = useCallback(
    (result) => {
      console.log(result)
      const startIndex = result.source.index
      const endIndex = result.destination.index

      const newProject = Array.from(formik.values.projects)

      const [removed] = newProject.splice(startIndex, 1)
      newProject.splice(endIndex, 0, removed)

      formik.setFieldValue('projects', newProject)
    },
    [formik]
  )

  return (
    <>
      <Element renderAs="p" textSize={4} className="oneandhalf-bs">
        Feel free to show off — if you have any awards, or projects that you’re
        working on that you feel showcase your skills it’s important to include
        them in your CV!
      </Element>
      <Heading size="small">
        Projects
        <IconButton onClick={addProject}>
          <AddIcon />
        </IconButton>
      </Heading>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              {formik.values.projects.map((project, index) => (
                <Draggable
                  key={project.uuid}
                  draggableId={project.uuid}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Accordion
                      TransitionProps={{ ref: provided.innerRef }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {!project.title && <span>Project {index + 1}</span>}
                        {project.title && <span>{project.title}</span>}
                      </AccordionSummary>
                      <AccordionDetails style={{ width: '100%' }}>
                        <Container>
                          <FormInput
                            name={`projects[${index}].title`}
                            placeholder="React front-end application"
                            label="Title of your project"
                            {...formik}
                          />
                          <FormInput
                            name={`projects[${index}].link`}
                            placeholder="https://myproject.com"
                            label="Project link"
                            {...formik}
                          />
                          <FormTextArea
                            label="Project description"
                            name={`projects[${index}].description`}
                            rows={5}
                            placeholder="Give a brief summary of your project"
                            {...formik}
                          />
                          <Content>
                            <a onClick={() => removeProject(index)}>
                              Delete project
                            </a>
                          </Content>
                        </Container>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
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
