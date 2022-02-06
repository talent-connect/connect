import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Columns, Content, Element } from 'react-bulma-components'
import ReactMarkdown from 'react-markdown'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Subject } from 'rxjs'
import {
  Button,
  Caption,
  Checkbox,
  FaqItem,
  FormDraggableAccordion,
  TextInput,
  FormSelect,
  Icon,
  TextArea,
  NumberInput,
} from '@talent-connect/shared-atomic-design-components'
import {
  TpJobSeekerCv,
  TpJobSeekerProfile,
} from '@talent-connect/shared-types'
import { formMonthsOptions } from '@talent-connect/talent-pool/config'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobSeekerprofile-mutation'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { Location } from '../../molecules/Location'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { formatDate, reorder } from '@talent-connect/shared-utils';
import { buildBlankExperienceRecord, componentForm } from './EditableProfessionalExperience.form';

interface Props {
  profile?: Partial<TpJobSeekerProfile>
  disableEditing?: boolean
}

interface EditableProfessionalExperienceHelpers {
  isSectionFilled: (profile: Partial<TpJobSeekerProfile>) => boolean;
  isSectionEmpty: (profile: Partial<TpJobSeekerProfile>) => boolean;
}

export const  EditableProfessionalExperience: FC<Props> & EditableProfessionalExperienceHelpers = ({
  profile: overridingProfile,
  disableEditing,
}) => {
  const queryHookResult = useTpJobSeekerProfileQuery({ enabled: !disableEditing })
  if (overridingProfile) queryHookResult.data = overridingProfile
  const mutationHookResult = useTpJobSeekerProfileUpdateMutation()
  const { data: profile } = queryHookResult
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableProfessionalExperience.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      title="Professional experience"
      modalTitle="Work history"
      modalHeadline="Professional experience"
      {...{ disableEditing, isEditing, isFormDirty, setIsEditing }}
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
                <Location
                  institution={item?.company}
                  city={item?.city}
                  country={item?.country}
                />
                {item.description && (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p style={{ marginBottom: '0' }}>{children}</p>
                      ),
                    }}
                  >
                    {item.description.replace(/\n/g, `\n\n`)}
                  </ReactMarkdown>
                )}
              </Content>
            </div>
          ))
        )
      }
      modalBody={
        <JobSeekerFormSectionProfessionalExperience
          {...{ setIsEditing, queryHookResult, setIsFormDirty, mutationHookResult }}
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

EditableProfessionalExperience.isSectionFilled = (profile: Partial<TpJobSeekerProfile>) =>
  !!profile?.experience?.length;

EditableProfessionalExperience.isSectionEmpty = (profile: Partial<TpJobSeekerProfile>) =>
  !EditableProfessionalExperience.isSectionFilled(profile);

// ############################################################################################

interface JobSeekerFormSectionProfessionalExperienceProps {
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

export const JobSeekerFormSectionProfessionalExperience: FC<JobSeekerFormSectionProfessionalExperienceProps> = ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult: { data: profile },
  mutationHookResult,
}) => {

  const closeAllAccordionsSignalSubject = useRef(new Subject<void>())

  // const initialValues = useMemo(() => ({
  //     experience: profile?.experience ?? [buildBlankExperienceRecord()],
  //   }),
  //   [profile?.experience]
  // )

  const formik = componentForm({
    mutationHookResult,
    profile,
    setIsEditing,
  })

  useEffect(
    () => setIsFormDirty?.(formik.dirty),
    [formik.dirty, setIsFormDirty]
  )

  const onClickAddExperience = useCallback(() => {
    formik.setFieldValue('experience', [
      ...formik.values.experience,
      buildBlankExperienceRecord(),
    ])
    closeAllAccordionsSignalSubject.current.next()
  }, [formik])

  const onDragEnd = useCallback(({ destination, source }: any) => { // TODO: type
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
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {formik?.values?.experience.map((item, index) => (
                <Draggable
                  key={item.uuid}
                  draggableId={item.uuid}
                  index={index}
                >
                  {(provided) => (
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
                        <TextInput
                          name={`experience[${index}].city`}
                          placeholder="Berlin"
                          label="City"
                          {...formik}
                        />
                        <TextInput
                          name={`experience[${index}].country`}
                          placeholder="Germany"
                          label="Country"
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
                            <NumberInput
                              name={`experience[${index}].startDateYear`}
                              label="Started in year"
                              {...formik}
                            />
                          </Columns.Column>
                        </Columns>

                        {!formik.values.experience[index].current && (
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
                              <NumberInput
                                name={`experience[${index}].endDateYear`}
                                label="Ended in year"
                                {...formik}
                              />
                            </Columns.Column>
                          </Columns>
                        )}
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
        onClick={(e) => formik.handleSubmit(e)}
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


const rolesAndResponsibilitiesPlaceholderText = `Example:

• Supported the Visual Studio Team by creating wireframes using storyboarding and customer mapping.
• Validated design decisions by conducting remote usability, resulted in an increase of conversion rate by 10%.`

const rolesAndResponsibilitiesQuestion =
  'Our tips for writing Roles and Responsibilities'

const rolesAndResponsibilitiesAnswer = (
  <>
    • Write a list of 2 - 3 bullet points.< br />
    • Begin sentences with action verbs, such as designed, created, provided, resolved, etc.<br />
    • Focus on skills and accomplishments.<br />
    • Quantify as much information as you can. (Example: Resolved customer complaints. --&gt; Resolved customer complaints, answering approximately 200 calls per week.
  </>
)
