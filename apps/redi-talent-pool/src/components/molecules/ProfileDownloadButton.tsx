import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerCv } from '@talent-connect/shared-types'
import React from 'react'
import { CVPDF } from './CvPdfPreview'

// Create styles
const styles = StyleSheet.create({
  downloadBtn: {},
})

interface ProfileDownloadButtonProps {
  cvData: Partial<TpJobseekerCv>
}

const ProfileDownloadButton = ({ cvData }: ProfileDownloadButtonProps) => {

  if (cvData) {
   return (
     <PDFDownloadLink
       style={styles.downloadBtn}
       document={<CVPDF cvData={cvData} />}
       fileName={`${cvData.firstName}_${cvData.lastName}_Profile.pdf`}
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
