import {
  Button,
  Caption,
  FormDraggableAccordion,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import {
  HrSummit2021JobFairCompanyJobPreferenceRecord,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import { useFormik } from 'formik'
import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Content, Element } from 'react-bulma-components'
import { Subject } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
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
  profile: Partial<TpJobseekerProfile>
  triggerModalSignal?: Subject<void>
}

export const EditableJobPreferences: FunctionComponent<Props> = ({ profile, triggerModalSignal }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableJobPreferences.isSectionEmpty(profile)

  useEffect(() => {
    const sub = triggerModalSignal?.subscribe(() => setIsEditing(true))
    return () => sub?.unsubscribe()
  }, [triggerModalSignal])

  return (
    <Editable
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Job Preferences"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="slim"
            onClick={() => setIsEditing(true)}
          >
            Add your job preferences
          </EmptySectionPlaceholder>
        ) : (
          <Content>
            {profile?.hrSummit2021JobFairCompanyJobPreferences?.map(
              ({ uuid, jobPosition, jobId, companyName }, index) => (
                <div key={uuid} style={{ marginBottom: '2rem' }}>
                  <Caption>Priority {index + 1}</Caption>
                  <div style={{ color: '#979797', marginTop: '-0.7rem' }}>
                    {jobPosition}
                    {jobId ? ` (${jobId})` : null} | {companyName}
                  </div>
                </div>
              )
            )}
          </Content>
        )
      }
      modalTitle="Help us to match you"
      modalHeadline="Job Preferences"
      modalBody={
        <ModalForm
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

EditableJobPreferences.isSectionFilled = (
  profile: Partial<TpJobseekerProfile>
) =>
  profile?.hrSummit2021JobFairCompanyJobPreferences?.length === 4 &&
  validationSchema.isValidSync(profile)
EditableJobPreferences.isSectionEmpty = (
  profile: Partial<TpJobseekerProfile>
) => !EditableJobPreferences.isSectionFilled(profile)

// TODO: put this one in config file
const MAX_LANGUAGES = 6

const validationSchema = Yup.object({
  hrSummit2021JobFairCompanyJobPreferences: Yup.array().of(
    Yup.object().shape({
      jobPosition: Yup.string().required('Job position is required'),
      companyName: Yup.string().required('Company name is required'),
    })
  ),
})

interface ModalFormProps {
  setIsEditing: (boolean) => void
  setIsFormDirty: (boolean) => void
}

const ModalForm: FunctionComponent<ModalFormProps> = ({
  setIsEditing,
  setIsFormDirty,
}) => {
  const { data: profile } = useTpJobseekerProfileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()

  const closeAllAccordionsSignalSubject = useRef(new Subject<void>())

  const initialValues: Partial<TpJobseekerProfile> = useMemo(
    () => ({
      hrSummit2021JobFairCompanyJobPreferences:
        profile?.hrSummit2021JobFairCompanyJobPreferences ??
        buildBlankHrSummit2021JobFairCompanyJobPreferences(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
  })
  useEffect(() => setIsFormDirty?.(formik.dirty), [
    formik.dirty,
    setIsFormDirty,
  ])

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      const reorderedHrSummit2021JobFairCompanyJobPreferences = reorder(
        formik.values.hrSummit2021JobFairCompanyJobPreferences,
        result.source.index,
        result.destination.index
      )

      formik.setFieldValue(
        'hrSummit2021JobFairCompanyJobPreferences',
        reorderedHrSummit2021JobFairCompanyJobPreferences
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
        <p>
          Open this list of all open job postings and companies, then share your
          4 top preferences with us. This information will be used to match you
          for interviews.{' '}
          <strong>It will only be visible to you and the ReDI team.</strong>
        </p>
        <p style={{ marginTop: '1.2rem' }}>
          <a
            href="/assets/downloadeables/hr-summit-2021-job-fair-jobs-talent-pool.pdf"
            target="_blank"
            className="color-secondary"
          >
            hr-summit-2021-job-fair-jobs-talent-pool.pdf
          </a>
        </p>
      </Element>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="id">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formik?.values?.hrSummit2021JobFairCompanyJobPreferences?.map(
                (item, index) => (
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
                          title={`Priority ${index + 1}${
                            item.companyName ? ` - ${item.companyName}` : ''
                          }`}
                          closeAccordionSignalSubject={
                            closeAllAccordionsSignalSubject.current
                          }
                        >
                          <FormInput
                            name={`hrSummit2021JobFairCompanyJobPreferences[${index}].jobPosition`}
                            label="Job Position*"
                            placeholder="The title of the job you found"
                            {...formik}
                          />
                          <FormInput
                            name={`hrSummit2021JobFairCompanyJobPreferences[${index}].jobId`}
                            label="Job ID"
                            placeholder="Did you see an ID for the job?"
                            {...formik}
                          />
                          <FormInput
                            name={`hrSummit2021JobFairCompanyJobPreferences[${index}].companyName`}
                            label="Company Name*"
                            placeholder="What's the name of the company?"
                            {...formik}
                          />
                        </FormDraggableAccordion>
                      </div>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div style={{ height: '30px' }} />

      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.submitForm}
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

function buildBlankHrSummit2021JobFairCompanyJobPreferences(): HrSummit2021JobFairCompanyJobPreferenceRecord[] {
  // Return exactly three elements since the job preferences consists of four priorities, relfected by the order of this array
  return [
    { uuid: uuidv4() },
    { uuid: uuidv4() },
    { uuid: uuidv4() },
    { uuid: uuidv4() },
  ]
}
