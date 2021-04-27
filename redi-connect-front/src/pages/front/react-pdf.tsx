import React from 'react'
import CVPDFPreview, {
  UserCVData
} from '../../components/organisms/CVPDFPreview'
import { Columns } from 'react-bulma-components'
import { PDFViewer, StyleSheet } from '@react-pdf/renderer'
import CVDownloadButton from '../../components/organisms/CVDownloadButton'

const ReactPdf = () => {
  const UserData: UserCVData = {
    position: 'Front End Engineer',
    firstName: 'NNEKA',
    lastName: 'UMAR',
    profileImage:
      'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
  }

  const styles = StyleSheet.create({
    viewer: {
      width: '50vw',
      height: '100vh'
    }
  })

  return (
    <Columns>
      <Columns.Column>
        <PDFViewer style={styles.viewer}>
          <CVPDFPreview cvData={UserData} />
        </PDFViewer>
      </Columns.Column>
      <Columns.Column>
        <CVDownloadButton cvData={UserData} />
      </Columns.Column>
    </Columns>
  )
}

export default ReactPdf
