/**
 * TODO: This component is only used in CvListPage, thus it makes sense to
 * have it located here. However, upon further discussion, this co-locating
 * must be standardized within the project.
 */

import { PDFDownloadLink } from '@react-pdf/renderer'
import { format as formatDate } from 'date-fns'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { Chip } from '@material-ui/core'
import {
  Button,
  FormInput,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import { Box, Content } from 'react-bulma-components'
import placeholderImage from '../../../../assets/img-placeholder.png'

import {
  useFindAllTpJobseekerCvEducationRecordsQuery,
  useFindAllTpJobseekerCvExperienceRecordsQuery,
  useFindAllTpJobseekerCvLanguageRecordsQuery,
  useFindOneTpJobseekerCvQuery,
  useMyTpDataQuery,
  useTpJobseekerCvCreateMutation,
  useTpJobseekerCvDeleteMutation,
  useTpJobseekerCvEducationRecordCreateMutation,
  useTpJobseekerCvExperienceRecordCreateMutation,
  useTpJobseekerCvLanguageRecordCreateMutation,
  useTpJobseekerCvPatchMutation,
} from '@talent-connect/data-access'
import { CVPDF } from '../../../../components/molecules/CvPdfPreview'
import { CvListItemMoreOptionsMenu } from './CvListItemMoreOptionsMenu'

const CREATED_AT_DATE_FORMAT = 'dd.MM.yyyy'

interface CvListItemProps {
  id: string
  name: string
  createdAt: Date
}

interface CvListItemBoxProps {
  children: React.ReactNode
}

export function CvListItemBox({ children }: CvListItemBoxProps) {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '24px 32px',
        color: '#000000',
      }}
    >
      {children}
    </Box>
  )
}

interface CvListItemChipProps {
  label: string
  onClick?(): void
  disabled?: boolean
  className?: string
}

function CvListItemChip(props: CvListItemChipProps) {
  return (
    <Chip
      style={{ width: 128, height: 40, marginRight: 32, fontSize: 16 }}
      {...props}
    />
  )
}

const CvListItem = (props: CvListItemProps) => {
  const [showCvNameModal, setShowCvNameModal] = React.useState(false)
  const [newCvName, setNewCvName] = React.useState(props.name || '')
  const [profileImageLoaded, setProfileImageLoaded] = React.useState(false)

  const history = useHistory()

  const cvQuery = useFindOneTpJobseekerCvQuery({ id: props.id })
  const cvData = cvQuery.data?.tpJobseekerCv
  const cvLoadSuccess = cvQuery.isSuccess
  const myTpData = useMyTpDataQuery()
  const profileData =
    myTpData?.data?.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
  const profileLoadSuccess = myTpData.isSuccess

  const createMutation = useTpJobseekerCvCreateMutation()
  const updateMutation = useTpJobseekerCvPatchMutation()
  const deleteMutation = useTpJobseekerCvDeleteMutation()

  const cvJobseekerExperienceRecordsQuery =
    useFindAllTpJobseekerCvExperienceRecordsQuery({ tpJobseekerCvId: props.id })
  const cvJobseekerEducationRecordsQuery =
    useFindAllTpJobseekerCvEducationRecordsQuery({ tpJobseekerCvId: props.id })
  const cvJobseekerLanguageRecordsQuery =
    useFindAllTpJobseekerCvLanguageRecordsQuery({ tpJobseekerCvId: props.id })
  const createCvJobseekerExperienceRecordMutation =
    useTpJobseekerCvExperienceRecordCreateMutation()
  const createCvJobseekerEducationRecordMutation =
    useTpJobseekerCvEducationRecordCreateMutation()
  const createCvJobseekerLanguageRecordMutation =
    useTpJobseekerCvLanguageRecordCreateMutation()

  const setFocusOnRef = (ref: HTMLInputElement) => ref?.focus()

  React.useEffect(() => {
    if (profileLoadSuccess && cvLoadSuccess) {
      cvData.profileAvatarImageS3Key = profileData.profileAvatarImageS3Key
        ? profileData.profileAvatarImageS3Key
        : placeholderImage

      setProfileImageLoaded(true)
    }
  }, [profileLoadSuccess, cvLoadSuccess, cvData, profileData])

  const handleShowCvNameModal = () => {
    setShowCvNameModal(true)
  }

  const handleEditClick = (): void => {
    history.push(`/app/cv-builder/${props.id}`)
  }

  const handleDelete = (): void => {
    deleteMutation.mutate({ input: { id: props.id } })
  }

  const handleRename = (): void => {
    if (newCvName !== props.name) {
      updateMutation
        .mutateAsync({ input: { id: props.id, cvName: newCvName } })
        .then(() => setShowCvNameModal(false))
    }
  }

  // Clumsy duplicate. First we duplicate the CV, then we duplicate each of
  // the associated records... experience, education and language.
  const handleDuplicate = async () => {
    const allCvRecordsLoaded =
      cvJobseekerExperienceRecordsQuery.isSuccess &&
      cvJobseekerEducationRecordsQuery.isSuccess &&
      cvJobseekerLanguageRecordsQuery.isSuccess
    if (!allCvRecordsLoaded) return // TODO: we just "bail out" here, but better would be a "defer until all records are loaded" approach
    const newCvResult = createMutation.mutateAsync({
      input: { ...cvData, cvName: `${props.name} - Duplicate` },
    })
    const newCvId = (await newCvResult).tpJobseekerCvCreate.id
    const newCvExperienceRecordsPromises =
      cvJobseekerExperienceRecordsQuery.data?.tpJobseekerCvExperienceRecords.map(
        (record) =>
          createCvJobseekerExperienceRecordMutation.mutateAsync({
            input: {
              ...record,
              tpJobseekerCvId: newCvId,
            },
          })
      )
    const newCvEducationRecordsPromises =
      cvJobseekerEducationRecordsQuery.data?.tpJobseekerCvEducationRecords.map(
        (record) =>
          createCvJobseekerEducationRecordMutation.mutateAsync({
            input: {
              ...record,
              tpJobseekerCvId: newCvId,
            },
          })
      )
    const newCvLanguageRecordsPromises =
      cvJobseekerLanguageRecordsQuery.data?.tpJobseekerCvLanguageRecords.map(
        (record) =>
          createCvJobseekerLanguageRecordMutation.mutateAsync({
            input: {
              ...record,
              tpJobseekerCvId: newCvId,
            },
          })
      )
    await Promise.all([
      ...newCvExperienceRecordsPromises,
      ...newCvEducationRecordsPromises,
      ...newCvLanguageRecordsPromises,
    ])
  }

  return (
    <>
      <CvListItemBox>
        <Content style={{ display: 'flex', alignItems: 'center' }} marginless>
          <Content
            marginless
            style={{ borderRight: '1px solid black', paddingRight: 10 }}
          >
            {props.name}
          </Content>
          <Content marginless style={{ paddingLeft: 10 }}>
            {formatDate(new Date(props.createdAt), CREATED_AT_DATE_FORMAT)}
          </Content>
        </Content>
        <Content style={{ display: 'flex', alignItems: 'center' }}>
          <CvListItemChip label="Edit" onClick={handleEditClick} />
          {cvData && (
            <PDFDownloadLink
              document={
                <CVPDF
                  cvData={cvData}
                  cvExperienceRecords={
                    cvJobseekerExperienceRecordsQuery.data
                      ?.tpJobseekerCvExperienceRecords
                  }
                  cvEducationRecords={
                    cvJobseekerEducationRecordsQuery.data
                      ?.tpJobseekerCvEducationRecords
                  }
                  languageRecords={
                    cvJobseekerLanguageRecordsQuery.data
                      ?.tpJobseekerCvLanguageRecords
                  }
                />
              }
              fileName={`${cvData?.firstName}_${cvData?.lastName}_CV.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading || !profileImageLoaded ? (
                  <CvListItemChip label="Export" disabled />
                ) : (
                  <CvListItemChip
                    label="Export"
                    className="MuiButtonBase-root MuiChip-root MuiChip-clickable"
                  />
                )
              }
            </PDFDownloadLink>
          )}
          <CvListItemMoreOptionsMenu
            handleDeleteClick={handleDelete}
            handleRenameClick={handleShowCvNameModal}
            handleDuplicateClick={handleDuplicate}
          />
        </Content>
      </CvListItemBox>
      <Modal
        show={showCvNameModal}
        stateFn={setShowCvNameModal}
        title="Rename CV"
      >
        <Modal.Body>
          <FormInput
            name="newCvNameInput"
            label="Name of the CV"
            placeholder="CV for Microsoft Frontend Developer Internship"
            values={{ newCvNameInput: newCvName }}
            handleChange={(e) => setNewCvName(e.target.value)}
            domRef={setFocusOnRef}
          />
        </Modal.Body>
        <Modal.Foot>
          <Button disabled={!newCvName} onClick={handleRename}>
            Save
          </Button>
        </Modal.Foot>
      </Modal>
    </>
  )
}

export default CvListItem
