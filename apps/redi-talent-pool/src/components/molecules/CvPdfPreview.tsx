import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  usePDF,
} from '@react-pdf/renderer'
import {
  Document as ReactPDFDocument,
  Page as ReactPDFPage,
} from 'react-pdf/dist/esm/entry.webpack'

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

const CVPDF = ({
  cvData: { firstName, lastName, position, profileImage },
}: CVPDFPreviewProps) => {
  return (
    <Document title={`${firstName}_${lastName}_CV.pdf`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText1}>{position}</Text>
          <Text style={styles.headerText2}>{firstName}</Text>
          <Text style={styles.headerText3}>{lastName}</Text>
          <Image style={styles.headerImg} src={profileImage} />
        </View>
      </Page>
    </Document>
  )
}

const CVPDFPreview = ({
  cvData,
  pdfWidthPx,
}: CVPDFPreviewProps & {
  pdfWidthPx: number
}) => {
  const [instance, updateInstance] = usePDF({
    document: <CVPDF cvData={cvData} />,
  })

  useEffect(() => updateInstance(), [cvData, updateInstance])

  const url = instance.blob ? URL.createObjectURL(instance.blob) : null

  return (
    <>
      {url && (
        <ReactPDFDocument file={url}>
          <ReactPDFPage pageNumber={1} width={pdfWidthPx} />
        </ReactPDFDocument>
      )}
      {!url && null}
    </>
  )
}

export default CVPDFPreview
