import React, { useState } from 'react'

import { usePDF } from '@react-pdf/renderer'

import CVPDF from './CVPDF'
import {
  Document as ReactPDFDocument,
  Page as ReactPDFPage,
  pdfjs
} from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export interface UserCVData {
  position: string
  firstName: string
  lastName: string
  profileImage: string
}
interface CVPDFPreviewProps {
  cvData: UserCVData
}

const CVPDFPreview = ({ cvData }: CVPDFPreviewProps & { styles?: any }) => {
  const [instance, updateInstance] = usePDF({
    document: <CVPDF cvData={cvData} />
  })

  const documentOptions = {
    cMapUrl: 'cmaps/',
    cMapPacked: true
  }

  const url = instance.blob ? URL.createObjectURL(instance.blob) : null
  const [numberOfPages, setNumberOfPages] = useState(0)

  const onDocumentLoadSuccess = (numberOfPages: any) => {
    const num = numberOfPages._pdfInfo.numPages
    setNumberOfPages(num)
  }

  return (
    <div>
      {url && (
        <ReactPDFDocument
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          options={documentOptions}
        >
          {Array.from(new Array(numberOfPages), (el, index) => (
            <ReactPDFPage
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={700}
            />
          ))}
        </ReactPDFDocument>
      )}
    </div>
  )
}

export default CVPDFPreview
