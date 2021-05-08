import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true
}

const CVPDFSample = () => {
  const [state, setState] = useState({
    file: './sample.pdf',
    numPages: null
  })

  const onFileChange = (event: any) => {
    setState({
      ...state,
      file: event.target.files[0]
    })
  }

  const onDocumentLoadSuccess = (numPages: any) => {
    const num = numPages._pdfInfo.numPages
    setState({ ...state, numPages: num })
  }

  const { file, numPages } = state

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={(e) => onFileChange(e)} type="file" />
        </div>
        <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  )
}

export default CVPDFSample
