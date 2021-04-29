import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer'

export interface UserCVData {
  position: string
  firstName: string
  lastName: string
  profileImage: string
}
interface CVPDFPreviewProps {
  cvData: UserCVData
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

export const CVPDFPreview = ({
  cvData: { firstName, lastName, position, profileImage },
}: CVPDFPreviewProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
}

export default CVPDFPreview
