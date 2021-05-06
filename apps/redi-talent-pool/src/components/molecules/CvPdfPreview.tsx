import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  usePDF,
} from '@react-pdf/renderer'
import { useEffect, useState } from 'react'

export interface UserCVData {
  position: string
  firstName: string
  lastName: string
  profileImage: string
}
interface CVPDFPreviewProps {
  cvData: UserCVData
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  header: {
    color: '#fff',
    height: '200px',
    backgroundColor: '#09375A',
    position: 'relative',
  },
  headerText1: {
    top: '50px',
    left: '270px',
    position: 'absolute',
    fontSize: '13px',
    marginBottom: '10px',
  },
  headerText2: {
    top: '70px',
    left: '270px',
    position: 'absolute',
    fontSize: '40px',
    textTransform: 'uppercase',
  },
  headerText3: {
    top: '110px',
    left: '270px',
    position: 'absolute',
    fontSize: '40px',
    textTransform: 'uppercase',
  },
  headerImg: {
    top: '50px',
    left: '50px',
    position: 'absolute',
    width: '170px',
    height: '250px',
  },
})

// const CVPDF = ({
//   cvData: { firstName, lastName, position, profileImage },
// }: CVPDFPreviewProps) => {
const CVPDF = () => {
  const firstName = 'Eric',
    lastName = 'Bolikowski',
    position = 'yo ho',
    profileImage =
      'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   setInterval(() => setCount((count) => count + 1), 2000)
  // }, [])
  return (
    <Document title={`${firstName}_${lastName}_CV.pdf`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText1}>
            {/* {count} */}
            {position}
          </Text>
          <Text style={styles.headerText2}>{firstName}</Text>
          <Text style={styles.headerText3}>{lastName}</Text>
          <Image style={styles.headerImg} src={profileImage} />
        </View>
      </Page>
    </Document>
  )
}

const CVPDFPreview = ({
  cvData: { firstName, lastName, position, profileImage },
  styles,
}: CVPDFPreviewProps & { styles?: any }) => {
  const [instance, updateInstance] = usePDF({ document: <CVPDF /> })
  const [count, setCount] = useState(0)
  console.log(instance.blob)
  return <div style={styles}>hello</div>
}

export default CVPDFPreview
