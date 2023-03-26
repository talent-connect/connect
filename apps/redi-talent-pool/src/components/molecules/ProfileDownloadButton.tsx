import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer'
import {
  TpJobseekerCv,
  TpJobseekerCvEducationRecord,
  TpJobseekerCvExperienceRecord,
  TpJobseekerCvLanguageRecord,
  TpJobseekerDirectoryEntry,
} from '@talent-connect/data-access'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { CVPDF } from './CvPdfPreview'

// Create styles
const styles = StyleSheet.create({
  downloadBtn: {},
})

interface ProfileDownloadButtonProps {
  profile: TpJobseekerDirectoryEntry
}

const ProfileDownloadButton = ({ profile }: ProfileDownloadButtonProps) => {
  if (profile) {
    // TODO: there's a lot of britle lazy casting here. Makt it typesafe.
    return (
      <PDFDownloadLink
        style={styles.downloadBtn}
        document={
          <CVPDF
            cvData={
              {
                ...profile,
              } as unknown as TpJobseekerCv
            }
            cvExperienceRecords={
              profile.experience as unknown as TpJobseekerCvExperienceRecord[]
            }
            cvEducationRecords={
              profile.education as unknown as TpJobseekerCvEducationRecord[]
            }
            languageRecords={
              profile.workingLanguages as unknown as TpJobseekerCvLanguageRecord[]
            }
          />
        }
        fileName={`${profile.firstName} ${profile.lastName} Profile.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : <Button>Download Profile</Button>
        }
      </PDFDownloadLink>
    )
  } else {
    return <Button disabled>Download Profile</Button>
  }
}

export default ProfileDownloadButton
