import {
  Button,
  Caption,
  Checkbox,
  FaqItem,
  FormDraggableAccordion,
  FormInput,
  FormSelect,
  FormTextArea,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import {
  EducationRecord,
  ExperienceRecord,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import {
  certificationTypes,
  formMonthsOptions,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useCallback, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Columns, Content, Element } from 'react-bulma-components'
import ReactMarkdown from 'react-markdown'
import { v4 as uuidv4 } from 'uuid'
import { useTpjobseekerprofileUpdateMutation } from '../../react-query/use-tpjobseekerprofile-mutation'
import { useTpjobseekerprofileQuery } from '../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../molecules/Editable'
import { EmptySectionPlaceholder } from '../molecules/EmptySectionPlaceholder'

function reorder<T>(list: Array<T>, startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function EditableEducation() {
  const { data: profile } = useTpjobseekerprofileQuery()
  const [isEditing, setIsEditing] = useState(false)

  const isEmpty = !(profile?.education?.length > 0)

  return (
    <Editable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      title="Education"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            text="Add your education"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          profile?.education?.map((item) => (
            <div style={{ marginBottom: '2.2rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Caption>{item?.title}</Caption>
                <span style={{ color: '#979797' }}>
                  {moment()
                    .month(item.startDateMonth)
                    .year(item.startDateYear)
                    .format('MMMM YYYY')}{' '}
                  -{' '}
                  {item.current
                    ? 'Present'
                    : moment()
                        .month(item.endDateMonth)
                        .year(item.endDateYear)
                        .format('MMMM YYYY')}
                </span>
              </div>
              <Content>
                {item.institutionName ? (
                  <p style={{ color: '#979797' }}>{item.institutionName}</p>
                ) : null}
                {item.description ? (
                  <p>
                    <ReactMarkdown>{item.description}</ReactMarkdown>
                  </p>
                ) : null}
              </Content>
            </div>
          ))
        )
      }
      modalTitle="Study, certifications, courses"
      modalHeadline="Education"
      modalBody={<Form setIsEditing={setIsEditing} />}
      modalStyles={{ minHeight: 700 }}
    />
  )
}

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpjobseekerprofileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()

  const initialValues: Partial<TpJobseekerProfile> = {
    education: profile?.education ?? [buildBlankEducationRecord()],
  }
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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnMount: true,
  })

  const onClickAddEducation = useCallback(() => {
    formik.setFieldValue('education', [
      ...formik.values.education,
      buildBlankEducationRecord(),
    ])
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
                      >
                        <FormInput
                          name={`education[${index}].title`}
                          placeholder="Bachelor of Computer Science"
                          label="Title of your course/study/certification"
                          {...formik}
                        />
                        <FormSelect
                          name={`education[${index}].certificationType`}
                          label="The type of certification"
                          items={formCertificationTypes}
                          {...formik}
                        />
                        <FormInput
                          name={`education[${index}].institutionName`}
                          placeholder="ReDI School of Digital Integration"
                          label="The institution or school"
                          {...formik}
                        />
                        <FormTextArea
                          label="Description (optional)"
                          name={`education[${index}].description`}
                          rows={7}
                          placeholder="Tell us a little bit about your course, what you learned and what you excelled at."
                          {...formik}
                        />

                        <Checkbox.Form
                          name={`education[${index}].current`}
                          checked={formik.values.education[index].current}
                          {...formik}
                        >
                          I currently work here
                        </Checkbox.Form>

                        <Columns>
                          <Columns.Column size={6}>
                            <FormSelect
                              name={`education[${index}].startDateMonth`}
                              label="Started in month"
                              items={formMonthsOptions}
                              {...formik}
                            />
                          </Columns.Column>
                          <Columns.Column size={6}>
                            <FormInput
                              name={`education[${index}].startDateYear`}
                              label="Started in year"
                              type="number"
                              {...formik}
                            />
                          </Columns.Column>
                        </Columns>

                        {!formik.values.education[index].current ? (
                          <Columns>
                            <Columns.Column size={6}>
                              <FormSelect
                                name={`education[${index}].endDateMonth`}
                                label="Ended in month"
                                items={formMonthsOptions}
                                {...formik}
                              />
                            </Columns.Column>
                            <Columns.Column size={6}>
                              <FormInput
                                name={`education[${index}].endDateYear`}
                                label="Ended in year"
                                type="number"
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
        Add another position
      </div>

      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.handleSubmit}
      >
        Save
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
    certificationType: '',
    startDateMonth: undefined,
    startDateYear: undefined,
    endDateMonth: undefined,
    endDateYear: undefined,
    current: false,
  }
}