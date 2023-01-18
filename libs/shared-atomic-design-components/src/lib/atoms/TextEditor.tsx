import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { get } from 'lodash'
import { FormikValues } from 'formik'
import { Content } from 'react-bulma-components'

import './TextEditor.scss'

const modules = {
  toolbar: [
    'bold',
    'italic',
    'underline',
    { list: 'ordered' },
    { list: 'bullet' },
    { align: [] },
    'link',
  ],
}

interface TextEditorProps {
  name: string
  label?: string
  placeholder?: string
  formik: FormikValues
}

const TextEditor = (props: TextEditorProps) => {
  const {
    name,
    label,
    placeholder,
    formik: { values, setFieldValue, touched },
  } = props

  console.log('formik', props.formik)
  console.log('values', values)

  const isTouched = !!get(touched, name)
  console.log('isTouched', isTouched)

  return (
    <>
      <Content size="small" className="label">
        {label}
      </Content>
      <ReactQuill
        theme="snow"
        value={values[name]}
        onChange={(content) => setFieldValue(name, content)}
        placeholder={placeholder}
        modules={modules}
      />
    </>
  )
}

export default TextEditor
