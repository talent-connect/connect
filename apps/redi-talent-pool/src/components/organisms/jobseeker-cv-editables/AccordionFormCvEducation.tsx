import {
  EducationRecord,
  TpJobseekerCv,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import {
  certificationTypes,
  formMonthsOptions,
} from '@talent-connect/talent-pool/config'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Subject } from 'rxjs'
import { useTpjobseekerCvUpdateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobseekerCvByIdQuery } from '../../../react-query/use-tpjobseekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'

import {
  Button,
  Checkbox,
  FormDraggableAccordion,
  FormInput,
  FormSelect,
  FormTextArea,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'
import { Columns, Element } from 'react-bulma-components'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
interface Props {
  tpJobseekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export function AccordionFormCvEducation({
  tpJobseekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}: Props) {
  const onClose = () => {
    parentOnCloseCallback()
  }

  const queryHookResult = useTpJobseekerCvByIdQuery(tpJobseekerCvId)
  const mutationHookResult = useTpjobseekerCvUpdateMutation(tpJobseekerCvId)

  return (
    <AccordionForm
      title="Education"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobseekerFormSectionEducation
        setIsEditing={(isEditing) => {
          onClose()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}

function reorder<T>(list: Array<T>, startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

interface JobseekerFormSectionEducationeProps {
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
  queryHookResult: UseQueryResult<
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown
  >
  mutationHookResult: UseMutationResult<
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown,
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown
  >
}

function JobseekerFormSectionEducation({
  setIsEditing,
  setIsFormDirty,
  queryHookResult,
  mutationHookResult,
}: JobseekerFormSectionEducationeProps) {
  const { data: profile } = queryHookResult

  const mutation = mutationHookResult

  const closeAllAccordionsSignalSubject = useRef(new Subject<void>())

  const initialValues: Partial<TpJobseekerProfile> = useMemo(
    () => ({
      education: profile?.education ?? [buildBlankEducationRecord()],
    }),
    [profile?.education]
  )
  const onSubmit = (values: Partial<TpJobseekerProfile>) => {
    formik.setSubmitting(true)
    mutation.mutate(values, {
      onSettled: () => {
        formik.setSubmitting(false)
      },
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }

  const validationSchema = Yup.object().shape({
    education: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Please provide a title'),
        certificationType: Yup.string().required(
          'Please select a certification type'
        ),
        institutionName: Yup.string().required(
          'Please provide an institution name'
        ),
        startDateMonth: Yup.number().required('Please select the start month'),
        startDateYear: Yup.number()
          .typeError('Please enter a valid year value')
          .integer('Please enter a valid year value')
          .positive('Please enter a valid year value')
          .required('Please provide the start year')
          .max(new Date().getFullYear(), 'Please enter a valid year value')
          .min(
            new Date().getFullYear() - 100,
            'Please enter a valid year value'
          ),
        endDateMonth: Yup.number().when('current', {
          is: false,
          then: Yup.number().required('Please select the end month'),
        }),
        endDateYear: Yup.number().when('current', {
          is: false,
          then: Yup.number()
            .typeError('Please enter a valid year value')
            .integer('Please enter a valid year value')
            .positive('Please enter a valid year value')
            .required('Please provide the end year')
            .max(new Date().getFullYear(), 'Please enter a valid year value')
            .min(
              new Date().getFullYear() - 100,
              'Please enter a valid year value'
            ),
        }),
      })
    ),
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  })
  useEffect(
    () => setIsFormDirty?.(formik.dirty),
    [formik.dirty, setIsFormDirty]
  )

  const onClickAddEducation = useCallback(() => {
    formik.setFieldValue('education', [
      ...formik.values.education,
      buildBlankEducationRecord(),
    ])

    closeAllAccordionsSignalSubject.current.next()
  }, [formik])

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      const reorderedEducation = reorder(
        formik.values.education,
        result.source.index,
        result.destination.index
      )

      formik.setFieldValue('education', reorderedEducation)
    },
    [formik]
  )

  const onRemove = useCallback(
    (uuid: string) => {
      formik.setFieldValue(
        'education',
        formik.values?.education?.filter((item) => item.uuid !== uuid)
      )
    },
    [formik]
  )

  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Add your relevant education.
      </Element>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="id">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formik?.values?.education.map((item, index) => (
                <Draggable
                  key={item.uuid}
                  draggableId={item.uuid}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FormDraggableAccordion
                        title={
                          item.title ? item.title : 'Click me to add details'
                        }
                        onRemove={() => onRemove(item.uuid)}
                        closeAccordionSignalSubject={
                          closeAllAccordionsSignalSubject.current
                        }
                      >
                        <FormInput
                          name={`education[${index}].title`}
                          placeholder="Bachelor of Computer Science"
                          label="Title of your course/study/certification*"
                          {...formik}
                        />
                        <FormSelect
                          name={`education[${index}].certificationType`}
                          label="The type of certification*"
                          items={formCertificationTypes}
                          {...formik}
                        />
                        <FormInput
                          name={`education[${index}].institutionName`}
                          placeholder="ReDI School of Digital Integration"
                          label="The institution or school*"
                          {...formik}
                        />
                        <FormInput
                          name={`education[${index}].institutionCity`}
                          placeholder="Munich"
                          label="The city of institution or school"
                          {...formik}
                        />
                        <FormInput
                          name={`education[${index}].institutionCountry`}
                          placeholder="Germany"
                          label="The country of institution or school"
                          {...formik}
                        />
                        <FormTextArea
                          label="Description (optional)"
                          name={`education[${index}].description`}
                          rows={7}
                          placeholder="Tell us a little bit about your course, what you learned and what you excelled at."
                          formik={formik}
                        />

                        <Checkbox.Form
                          name={`education[${index}].current`}
                          checked={formik.values.education[index].current}
                          {...formik}
                        >
                          I currently study here
                        </Checkbox.Form>

                        <Columns>
                          <Columns.Column size={6}>
                            <FormSelect
                              name={`education[${index}].startDateMonth`}
                              label="Started in month*"
                              items={formMonthsOptions}
                              {...formik}
                            />
                          </Columns.Column>
                          <Columns.Column size={6}>
                            <FormInput
                              name={`education[${index}].startDateYear`}
                              label="Started in year*"
                              {...formik}
                            />
                          </Columns.Column>
                        </Columns>

                        {!formik.values.education[index].current ? (
                          <Columns>
                            <Columns.Column size={6}>
                              <FormSelect
                                name={`education[${index}].endDateMonth`}
                                label="Ended in month*"
                                items={formMonthsOptions}
                                {...formik}
                              />
                            </Columns.Column>
                            <Columns.Column size={6}>
                              <FormInput
                                name={`education[${index}].endDateYear`}
                                label="Ended in year*"
                                {...formik}
                              />
                            </Columns.Column>
                          </Columns>
                        ) : null}
                      </FormDraggableAccordion>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div style={{ height: '30px' }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
          marginBottom: '30px',
        }}
        onClick={() => onClickAddEducation()}
      >
        <Icon
          icon="tpPlus"
          style={{ width: '36px', height: '36px', marginRight: '20px' }}
        />
        Add education
      </div>

      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.handleSubmit}
      >
        Save
      </Button>
      <Button
        simple
        disabled={mutation.isLoading}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </>
  )
}

const formCertificationTypes = certificationTypes.map(({ id, label }) => ({
  value: id,
  label,
}))

function buildBlankEducationRecord(): EducationRecord {
  return {
    uuid: uuidv4(),
    title: '',
    institutionName: '',
    description: '',
    institutionCity: '',
    institutionCountry: '',
    certificationType: '',
    startDateMonth: undefined,
    startDateYear: undefined,
    endDateMonth: undefined,
    endDateYear: undefined,
    current: false,
  }
}
