import {
  Button,
  Caption,
  FormDraggableAccordion,
  TextInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobSeekerProfile } from '@talent-connect/shared-types'
import { reorder } from '@talent-connect/shared-utils';
import { useCallback, useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Content, Element } from 'react-bulma-components'
import { Subject } from 'rxjs'
import * as Yup from 'yup'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobSeekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { componentForm } from './EditableJobPreferences.form';

interface EditableJobPreferencesProps {
  profile: Partial<TpJobSeekerProfile>
  triggerModalSignal?: Subject<void>
}

export function EditableJobPreferences ({ profile, triggerModalSignal }: EditableJobPreferencesProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableJobPreferences.isSectionEmpty(profile)

  useEffect(() => {
    const sub = triggerModalSignal?.subscribe(() => setIsEditing(true))
    return () => sub?.unsubscribe()
  }, [triggerModalSignal])

  return (
    <Editable
      title="Job Preferences"
      modalTitle="Help us to match you"
      modalHeadline="Job Preferences"
      {...{ isEditing, isFormDirty, setIsEditing }}
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
            {profile.hrSummit2021JobFairCompanyJobPreferences?.map(
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
      modalBody={<ModalForm {...{ setIsEditing, setIsFormDirty }}/>}
      modalStyles={{ minHeight: 700 }}
    />
  )
}

EditableJobPreferences.isSectionFilled = (profile: Partial<TpJobSeekerProfile>) =>
  profile.hrSummit2021JobFairCompanyJobPreferences?.length === 4 &&
  validationSchema.isValidSync(profile);

EditableJobPreferences.isSectionEmpty = (profile: Partial<TpJobSeekerProfile>) =>
  !EditableJobPreferences.isSectionFilled(profile);

// #################################################################################

const validationSchema = Yup.object({
  hrSummit2021JobFairCompanyJobPreferences: Yup.array().of(
    Yup.object().shape({
      jobPosition: Yup.string()
        .required('Job position is required'),
      companyName: Yup.string()
        .required('Company name is required'),
    })
  ),
})

interface ModalFormProps {
  setIsEditing: (boolean: boolean) => void
  setIsFormDirty: (boolean: boolean) => void
}

function ModalForm ({
  setIsEditing,
  setIsFormDirty,
}: ModalFormProps) {
  const { data: profile } = useTpJobseekerProfileQuery()
  const mutation = useTpJobSeekerProfileUpdateMutation()

  const closeAllAccordionsSignalSubject = useRef(new Subject<void>())
  
  const formik = componentForm({
    profile,
    setIsEditing,
  })

  useEffect(() => setIsFormDirty?.(formik.dirty), [
    formik.dirty,
    setIsFormDirty,
  ])

  const onDragEnd = useCallback(({ destination, source }: any) => {
      if (!destination) return

      const reorderedHrSummit2021JobFairCompanyJobPreferences = reorder(
        formik.values.hrSummit2021JobFairCompanyJobPreferences,
        source.index,
        destination.index
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
                          <TextInput
                            name={`hrSummit2021JobFairCompanyJobPreferences[${index}].jobPosition`}
                            label="Job Position*"
                            placeholder="The title of the job you found"
                            {...formik}
                          />
                          <TextInput
                            name={`hrSummit2021JobFairCompanyJobPreferences[${index}].jobId`}
                            label="Job ID"
                            placeholder="Did you see an ID for the job?"
                            {...formik}
                          />
                          <TextInput
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

