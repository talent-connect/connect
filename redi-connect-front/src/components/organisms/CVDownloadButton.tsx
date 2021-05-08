import React from 'react'

import { StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'
import { Button } from '../atoms'
import CVPDF, { UserCVData } from './CVPDF'

// Create styles
const styles = StyleSheet.create({
  downloadBtn: {}
})

interface CVDownloadButtonProps {
  cvData: UserCVData
}

const CVDownloadButton = ({ cvData }: CVDownloadButtonProps) => {
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
