import {
  Button,
  Caption,
  Checkbox,
  FaqItem,
  FormDraggableAccordion,
  TextInput,
  FormSelect,
  TextArea,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import {
  ExperienceRecord,
  TpJobseekerCv,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import { formMonthsOptions } from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import moment from 'moment'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Columns, Content, Element } from 'react-bulma-components'
import ReactMarkdown from 'react-markdown'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Subject } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

function reorder<T>(list: Array<T>, startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

interface Props {
  profile?: Partial<TpJobseekerProfile>
  disableEditing?: boolean
}

export const  EditableProfessionalExperience: FC<Props> = ({
  profile: overridingProfile,
  disableEditing,
}) => {
  const queryHookResult = useTpJobseekerProfileQuery({
    enabled: !disableEditing,
  })
  if (overridingProfile) queryHookResult.data = overridingProfile
  const mutationHookResult = useTpjobseekerprofileUpdateMutation()
  const { data: profile } = queryHookResult
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableProfessionalExperience.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Professional experience"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            onClick={() => setIsEditing(true)}
          >
            Add your experience
          </EmptySectionPlaceholder>
        ) : (
          profile?.experience?.map((item) => (
            <div style={{ marginBottom: '2.8rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Caption>{item?.title}</Caption>
                {/* TODO: put this color (and all places it is used) into gloal css */}
                <span style={{ color: '#979797' }}>
                  {formatDate(item.startDateMonth, item.startDateYear)} -{' '}
                  {item.current
                    ? 'Present'
                    : formatDate(item.endDateMonth, item.endDateYear)}
                </span>
              </div>
              <Content style={{ marginTop: '-0.5rem' }}>
                {item.company ? (
                  <p style={{ color: '#979797' }}>{item.company}</p>
                ) : null}
                {item.description ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p style={{ marginBottom: '0' }}>{children}</p>
                      ),
                    }}
                  >
                    {item.description.replace(/\n/g, `\n\n`)}
                  </ReactMarkdown>
                ) : null}
              </Content>
            </div>
          ))
        )
      }
      modalTitle="Work history"
      modalHeadline="Professional experience"
      modalBody={
        <JobseekerFormSectionProfessionalExperience
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
          queryHookResult={queryHookResult}
          mutationHookResult={mutationHookResult}
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

EditableProfessionalExperience.isSectionFilled = (profile: Partial<TpJobseekerProfile>) =>
  profile?.experience?.length;
EditableProfessionalExperience.isSectionEmpty = (profile: Partial<TpJobseekerProfile>) =>
  !EditableProfessionalExperience.isSectionFilled(profile);

function formatDate (month?: number, year?: number): string {
  if (year) {
    return month ? moment().month(month).year(year).format('MMMM YYYY') : String(year)
  } else {
    if (month) return moment().month(month).format('MMMM')
  }
  return ''
}

interface JobseekerFormSectionProfessionalExperienceProps {
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

export const JobseekerFormSectionProfessionalExperience: FC<JobseekerFormSectionProfessionalExperienceProps> = ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult: { data: profile },
  mutationHookResult,
}) => {

  const closeAllAccordionsSignalSubject = useRef(new Subject<void>())

  const initialValues: Partial<TpJobseekerProfile> = useMemo(() => ({
      experience: profile?.experience ?? [buildBlankExperienceRecord()],
    }),
    [profile?.experience]
  )
  const onSubmit = (values: Partial<TpJobseekerProfile>) => {
    formik.setSubmitting(true)
    mutationHookResult.mutate(values, {
      onSettled: () => formik.setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
  })

  useEffect(() => setIsFormDirty?.(formik.dirty), [
    formik.dirty,
    setIsFormDirty,
  ])

  const onClickAddExperience = useCallback(() => {
    formik.setFieldValue('experience', [
      ...formik.values.experience,
      buildBlankExperienceRecord(),
    ])
    closeAllAccordionsSignalSubject.current.next()
  }, [formik])

  const onDragEnd = useCallback(({ destination, source }: any) => {
      if (!destination) return

      const reorderedExperience = reorder(
        formik.values.experience,
        source.index,
        destination.index
      )

      formik.setFieldValue('experience', reorderedExperience)
    },
    [formik]
  )

  const onRemove = useCallback(
    (uuid: string) => {
      formik.setFieldValue(
        'experience',
        formik.values?.experience?.filter((item) => item.uuid !== uuid)
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
        Add your relevant experience.
      </Element>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="id">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formik?.values?.experience.map((item, index) => (
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
                        <TextInput
                          name={`experience[${index}].title`}
                          placeholder="Junior Frontend Developer"
                          label="Title of your position"
                          {...formik}
                        />
                        <TextInput
                          name={`experience[${index}].company`}
                          placeholder="Microsoft"
                          label="Company"
                          {...formik}
                        />
                        <TextArea
                          label="Roles & Responsibilities"
                          name={`experience[${index}].description`}
                          rows={7}
                          placeholder={rolesAndResponsibilitiesPlaceholderText}
                          {...formik}
                        />
                        <FaqItem
                          question={rolesAndResponsibilitiesQuestion}
                          answer={rolesAndResponsibilitiesAnswer}
                        />

                        <Checkbox.Form
                          name={`experience[${index}].current`}
                          checked={formik.values.experience[index].current}
                          {...formik}
                        >
                          I currently work here
                        </Checkbox.Form>

                        <Columns>
                          <Columns.Column size={6}>
                            <FormSelect
                              name={`experience[${index}].startDateMonth`}
                              label="Started in month"
                              items={formMonthsOptions}
                              {...formik}
                            />
                          </Columns.Column>
                          <Columns.Column size={6}>
                            <TextInput
                              name={`experience[${index}].startDateYear`}
                              label="Started in year"
                              type="number"
                              {...formik}
                            />
                          </Columns.Column>
                        </Columns>

                        {!formik.values.experience[index].current ? (
                          <Columns>
                            <Columns.Column size={6}>
                              <FormSelect
                                name={`experience[${index}].endDateMonth`}
                                label="Ended in month"
                                items={formMonthsOptions}
                                {...formik}
                              />
                            </Columns.Column>
                            <Columns.Column size={6}>
                              <TextInput
                                name={`experience[${index}].endDateYear`}
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
        onClick={() => onClickAddExperience()}
      >
        <Icon
          icon="tpPlus"
          style={{ width: '36px', height: '36px', marginRight: '20px' }}
        />
        Add position
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

function buildBlankExperienceRecord(): ExperienceRecord {
  return {
    uuid: uuidv4(),
    title: '',
    company: '',
    description: '',
    startDateMonth: undefined,
    startDateYear: undefined,
    endDateMonth: undefined,
    endDateYear: undefined,
    current: false,
  }
}

const rolesAndResponsibilitiesPlaceholderText = `Example:

• Supported the Visual Studio Team by creating wireframes using storyboarding and customer mapping.
• Validated design decisions by conducting remote usability, resulted in an increase of conversion rate by 10%.`

const rolesAndResponsibilitiesQuestion =
  'Our tips for writing Roles and Responsibilities'
const rolesAndResponsibilitiesAnswer = `• Write a list of 2-3 bullet points.<br />
• Begin sentences with action verbs, such as designed, created, provided, resolved, etc.<br />
• Focus on skills and accomplishments.<br />
• Quantify as much information as you can. (Example: Resolved customer complaints. --> Resolved customer complaints, answering approximately 200 calls per week.`
