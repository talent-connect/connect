import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { get } from 'lodash'
import { FormikValues } from 'formik'
import { Form, Content, Columns } from 'react-bulma-components'

import './TextEditor.scss'

const MODULES = {
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

const FORMATS = [
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'align',
  'link',
]

interface TextEditorProps {
  name: string
  label?: string
  minChar?: number
  placeholder?: string
  formik: FormikValues
}

const TextEditor = (props: TextEditorProps) => {
  const {
    name,
    label,
    minChar,
    placeholder,
    formik: { values, setFieldValue, setFieldTouched, touched, errors },
  } = props

  const editorsHtmlOutput = values[name]

  const charactersLength = new DOMParser().parseFromString(
    editorsHtmlOutput,
    'text/html'
  ).body.textContent.length

  const isMinCharAmountReached =
    minChar && values[name] && charactersLength >= minChar

  const isTouched = Boolean(get(touched, name))

  const hasError =
    isTouched && !isMinCharAmountReached && Boolean(get(errors, name))

  const numberOfCharsRequiredToMinAmount = minChar - charactersLength

  const isFieldFresh = !isTouched && !values[name]

  const isSelectedAndBelowMinCharAmount =
    !isTouched &&
    values[name] &&
    charactersLength < minChar &&
    !isMinCharAmountReached

  const wasVisitedAndBelowMinCharAmount =
    isTouched && (!values[name] || charactersLength < minChar)

  const defineEditorOutlineColor = () => {
    if (isMinCharAmountReached) return 'valid'

    if (hasError || wasVisitedAndBelowMinCharAmount) return 'invalid'

    return null
  }

  const editorOutlineColor = defineEditorOutlineColor()

  return (
    <Form.Field>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control className={isMinCharAmountReached ? 'textarea-clean' : ''}>
        <ReactQuill
          theme="snow"
          value={get(values, name)}
          onChange={(content) => setFieldValue(name, content)}
          placeholder={placeholder}
          className={editorOutlineColor}
          modules={MODULES}
          formats={FORMATS}
          onBlur={() => setFieldTouched(name, true)}
        />
      </Form.Control>
      <Form.Help
        color="danger"
        className={hasError && !minChar ? 'help--show' : ''}
      >
        {hasError && <>{get(errors, name)}</>}
      </Form.Help>
      <Columns>
        <Columns.Column>
          {minChar && isFieldFresh && (
            <Content
              textColor="grey-dark"
              className="help help--show help-text"
            >
              min {minChar} characters required
            </Content>
          )}

          {minChar && isSelectedAndBelowMinCharAmount && (
            <Content
              textColor="grey-dark"
              className="help help--show help-text"
            >
              {numberOfCharsRequiredToMinAmount} more{' '}
              {numberOfCharsRequiredToMinAmount > 1
                ? 'characters'
                : 'character'}{' '}
              required
            </Content>
          )}
          {minChar && wasVisitedAndBelowMinCharAmount && (
            <Content textColor="danger" className="help help--show help-text">
              {numberOfCharsRequiredToMinAmount} more{' '}
              {numberOfCharsRequiredToMinAmount > 1
                ? 'characters'
                : 'character'}{' '}
              required
            </Content>
          )}
        </Columns.Column>
      </Columns>
    </Form.Field>
  )
}

export default TextEditor
