import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import {
  Button,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { AWS_PROFILE_AVATARS_BUCKET_BASE_URL } from '@talent-connect/shared-config'
import React, { useCallback, useRef } from 'react'
import { Box, Columns, Content, Section } from 'react-bulma-components'
import { useHistory, useParams } from 'react-router-dom'
import { Subject } from 'rxjs'
import { CVPDFPreviewMemoized } from '../../../../components/molecules'
import { AccordionFormCvDesiredPositions } from '../../../../components/organisms/jobseeker-cv-editables/AccordionFormCvDesiredPositions'
import { AccordionFormCvDisplayCase } from '../../../../components/organisms/jobseeker-cv-editables/AccordionFormCvDisplayCase'
import { AccordionFormCvEducation } from '../../../../components/organisms/jobseeker-cv-editables/AccordionFormCvEducation'
import { AccordionFormCvImportantDetails } from '../../../../components/organisms/jobseeker-cv-editables/AccordionFormCvImportantDetails'
import { AccordionFormCvLanguages } from '../../../../components/organisms/jobseeker-cv-editables/AccordionFormCvLanguages'
import { AccordionFormCvName } from '../../../../components/organisms/jobseeker-cv-editables/AccordionFormCvName'
import { AccordionFormCvProfessionalExperience } from '../../../../components/organisms/jobseeker-cv-editables/AccordionFormCvProfessionalExperience'
import { AccordionFormCvSummary } from '../../../../components/organisms/jobseeker-cv-editables/AccordionFormCvSummary'
import { LoggedIn } from '../../../../components/templates'
import { useTpJobseekerCvByIdQuery } from '../../../../react-query/use-tpjobseekercv-query'
import { useTpJobseekerProfileQuery } from '../../../../react-query/use-tpjobseekerprofile-query'
import './CvDetailPage.scss'
import placeholderImage from '../../../../assets/img-placeholder.png'

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

  const {
    data: profile,
    isSuccess: profileLoadSuccess,
  } = useTpJobseekerProfileQuery()
  const { data: cvData, isSuccess: cvLoadSuccess } = useTpJobseekerCvByIdQuery(
    cvId,
    {
      enabled: profileLoadSuccess,
    }
  )
  if (profileLoadSuccess && cvLoadSuccess) {
    cvData.profileAvatarImageS3Key = profile.profileAvatarImageS3Key
      ? AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profile.profileAvatarImageS3Key
      : placeholderImage
    console.log(cvData.profileAvatarImageS3Key)
  }

  const handleCloseClick = () => history.push('/app/cv-builder')

  const [
    cvPreviewElementWidth,
    setCvPreviewElementWidth,
  ] = React.useState<number>(0)
  const cvContainerRef = React.useRef<HTMLDivElement>(null)
  const cvContainerRefCallback = React.useCallback((containerNode) => {
    cvContainerRef.current = containerNode
    const elementWidth = containerNode?.clientWidth
    setCvPreviewElementWidth(elementWidth)
  }, [])

  const pdfWidthToHeightRatio = 1.414 // A4 page ratio
  const cvContainerHeight = cvPreviewElementWidth * pdfWidthToHeightRatio

  const onClose = useCallback(
    () => closeAllAccordionsSignalSubjectRef.current?.next(),
    []
  )
  const closeAllAccordionsSignalSubjectRef = useRef(new Subject<void>())

  return (
    <LoggedIn hideNavigation>
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
            <AccordionFormCvName
              tpJobseekerCvId={cvId}
              onClose={onClose}
              closeAccordionSignalSubject={
                closeAllAccordionsSignalSubjectRef.current
              }
            />
            <AccordionFormCvDesiredPositions
              tpJobseekerCvId={cvId}
              onClose={onClose}
              closeAccordionSignalSubject={
                closeAllAccordionsSignalSubjectRef.current
              }
            />
            <AccordionFormCvSummary
              tpJobseekerCvId={cvId}
              onClose={onClose}
              closeAccordionSignalSubject={
                closeAllAccordionsSignalSubjectRef.current
              }
            />

            <AccordionFormCvLanguages
              tpJobseekerCvId={cvId}
              onClose={onClose}
              closeAccordionSignalSubject={
                closeAllAccordionsSignalSubjectRef.current
              }
            />
            {/* <AccordionFormCvDisplayCase
              tpJobseekerCvId={cvId}
              onClose={onClose}
              closeAccordionSignalSubject={
                closeAllAccordionsSignalSubjectRef.current
              }
            /> */}
            <AccordionFormCvImportantDetails
              tpJobseekerCvId={cvId}
              onClose={onClose}
              closeAccordionSignalSubject={
                closeAllAccordionsSignalSubjectRef.current
              }
            />
            <AccordionFormCvProfessionalExperience
              tpJobseekerCvId={cvId}
              onClose={onClose}
              closeAccordionSignalSubject={
                closeAllAccordionsSignalSubjectRef.current
              }
            />
            <AccordionFormCvEducation
              tpJobseekerCvId={cvId}
              onClose={onClose}
              closeAccordionSignalSubject={
                closeAllAccordionsSignalSubjectRef.current
              }
            />
          </Columns.Column>
        </Columns.Column>
        <Columns.Column size={7}>
          {cvData && (
            <Box
              domRef={cvContainerRefCallback}
              paddingless
              style={{ overflow: 'hidden' }}
            >
              <CVPDFPreviewMemoized
                cvData={cvData}
                pdfHeightPx={cvContainerHeight}
                pdfWidthPx={cvPreviewElementWidth}
              />
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
