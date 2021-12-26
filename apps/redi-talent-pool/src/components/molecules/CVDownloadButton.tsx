import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { FC } from 'react'
import { CVPDF } from './CvPdfPreview'

// Create styles
const styles = StyleSheet.create({
  downloadBtn: {},
})

interface CVDownloadButtonProps {
  // cvData: UserCVData
  cvData: any
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
