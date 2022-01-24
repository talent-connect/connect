import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerCv } from '@talent-connect/shared-types';
import { FC } from 'react'
import { CVPDF } from './CvPdfPreview'

// Create styles
const styles = StyleSheet.create({
  downloadBtn: {},
})

interface CVDownloadButtonProps {
  // cvData: UserCVData
  cvData: TpJobseekerCv
}

const CVDownloadButton: FC<CVDownloadButtonProps> = ({ cvData }) => {
  return (
    <PDFDownloadLink
      style={styles.downloadBtn}
      document={<CVPDF cvData={cvData} />}
      fileName={`${cvData.firstName}_${cvData.lastName}_CV.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : <Button>Download CV</Button>
      }
    </PDFDownloadLink>
  )
}

export default CVDownloadButton
