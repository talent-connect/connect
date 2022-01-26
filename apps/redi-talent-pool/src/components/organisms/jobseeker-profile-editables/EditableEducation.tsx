import {
  Button,
  Caption,
  Checkbox,
  FormDraggableAccordion,
  TextInput,
  FormSelect,
  TextArea,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import {
  EducationRecord,
  TpJobSeekerCv,
  TpJobSeekerProfile,
} from '@talent-connect/shared-types'
import { formatDate, reorder } from '@talent-connect/shared-utils';
import {
  certificationTypes,
  formMonthsOptions,
} from '@talent-connect/talent-pool/config'
import { mapOptions } from '@talent-connect/typescript-utilities';
import { useFormik } from 'formik'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Columns, Content, Element } from 'react-bulma-components'
import ReactMarkdown from 'react-markdown'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Subject } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

interface Props {
  profile?: Partial<TpJobSeekerProfile>
  disableEditing?: boolean
}

export const EditableEducation: FC<Props> = ({
  profile: overridingProfile,
  disableEditing,
}) => {
  const queryHookResult = useTpJobSeekerProfileQuery({
    enabled: !disableEditing,
  })
  if (overridingProfile) queryHookResult.data = overridingProfile
  const mutationHookResult = useTpjobseekerprofileUpdateMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const { data: profile } = queryHookResult

  const isEmpty = EditableEducation.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Education"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            onClick={() => setIsEditing(true)}
          >
            Add your education
          </EmptySectionPlaceholder>
        ) : (
          profile?.education?.map((item) => (
            <div style={{ marginBottom: '2.8rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Caption>{item?.title}</Caption>
                <span style={{ color: '#979797' }}>
                  {formatDate(item.startDateMonth, item.startDateYear)} -{' '}
                  {item.current
                    ? 'Present'
                    : formatDate(item.endDateMonth, item.endDateYear)}
                </span>
              </div>
              <Content style={{ marginTop: '-0.5rem' }}>
                {item.institutionName ? (
                  <p style={{ color: '#979797' }}>{item.institutionName}</p>
                ) : null}
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p style={{ marginBottom: '0' }}>{children}</p>
                    ),
                  }}
                >
                  {item.description.replace(/\n/g, `\n\n`)}
                </ReactMarkdown>
              </Content>
            </div>
          ))
        )
      }
      modalTitle="Study, certifications, courses"
      modalHeadline="Education"
      modalBody={
        <JobSeekerFormSectionEducation
          {...{ setIsEditing, setIsFormDirty, queryHookResult, mutationHookResult }}
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

EditableEducation.isSectionFilled = (profile: Partial<TpJobSeekerProfile>) =>
  profile?.education?.length
EditableEducation.isSectionEmpty = (profile: Partial<TpJobSeekerProfile>) =>
  !EditableEducation.isSectionFilled(profile)

interface JobSeekerFormSectionEducationProps {
  setIsEditing: (boolean: boolean) => void
  setIsFormDirty?: (boolean: boolean) => void
  queryHookResult: UseQueryResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
}

export const JobSeekerFormSectionEducation: FC<JobSeekerFormSectionEducationProps> = ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult: { data: profile },
  mutationHookResult,
}) => {

  const closeAllAccordionsSignalSubject = useRef(new Subject<void>())

  const initialValues: Partial<TpJobSeekerProfile> = useMemo(() => ({
      education: profile?.education ?? [buildBlankEducationRecord()],
    }),
    [profile?.education]
  )

  const formik = useFormik<Partial<TpJobSeekerProfile>>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setSubmitting(true)
      mutationHookResult.mutate(values, {
        onSettled: () =>  formik.setSubmitting(false),
        onSuccess: () => setIsEditing(false),
      })
    },
  })

  useEffect(() => setIsFormDirty?.(formik.dirty), [
    formik.dirty,
    setIsFormDirty,
  ])

  const onClickAddEducation = useCallback(() => {
    formik.setFieldValue('education', [
      ...formik.values.education,
      buildBlankEducationRecord(),
    ])

    closeAllAccordionsSignalSubject.current.next()
  }, [formik])

  const onDragEnd = useCallback(({ destination, source }: any) => {
      if (!destination) return

      const reorderedEducation = reorder(
        formik.values.education,
        source.index,
        destination.index
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
              {formik?.values?.education.map(({ uuid, title }, index) => (
                <Draggable
                  key={uuid}
                  draggableId={uuid}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FormDraggableAccordion
                        title={title || 'Click me to add details'}
                        onRemove={() => onRemove(uuid)}
                        closeAccordionSignalSubject={
                          closeAllAccordionsSignalSubject.current
                        }
                      >
                        <TextInput
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
                        <TextInput
                          name={`education[${index}].institutionName`}
                          placeholder="ReDI School of Digital Integration"
                          label="The institution or school"
                          {...formik}
                        />
                        <TextArea
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
                          I currently study here
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
                            <TextInput
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
                              <TextInput
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
        Add education
      </div>

      <Button
        disabled={!formik.isValid || mutationHookResult.isLoading}
        onClick={formik.handleSubmit}
      >
        Save
      </Button>
      <Button
        simple
        disabled={mutationHookResult.isLoading}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </>
  )
}

const formCertificationTypes = mapOptions(certificationTypes)

function buildBlankEducationRecord(): EducationRecord {
  return {
    uuid: uuidv4(),
    title: '',
    institutionName: '',
    description: '',
    certificationType: '',
    current: false,
  }
}
