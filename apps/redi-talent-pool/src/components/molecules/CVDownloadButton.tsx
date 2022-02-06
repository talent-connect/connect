import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { TpJobSeekerCv } from '@talent-connect/shared-types';
import { CVPDF } from './CvPdfPreview'

// Create styles
const styles = StyleSheet.create({
  downloadBtn: {},
})

interface CVDownloadButtonProps {
  // cvData: UserCVData
  cvData: TpJobSeekerCv
}

function CVDownloadButton ({ cvData }: CVDownloadButtonProps) {
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
