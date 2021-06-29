import {
  Button,
  Caption,
  FormDraggableAccordion,
  FormInput,
  FormSelect,
  FormTextArea,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import {
  TpCompanyProfile,
  TpJobListingRecord,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import {
  desiredPositions,
  employmentTypes,
  topSkills,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Content, Element } from 'react-bulma-components'
import ReactMarkdown from 'react-markdown'
import { Subject } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { ReactComponent as JobPlaceholderCard } from './job-placeholder-card.svg'
import JobPlaceholderCardUrl from './job-placeholder-card.svg'

function reorder<T>(list: Array<T>, startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function EditableJobPostings() {
  const { data: profile } = useTpCompanyProfileQuery()
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableJobPostings.isSectionEmpty(profile)

  return (
    <Editable
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Job postings"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="none"
            onClick={() => setIsEditing(true)}
            style={{ padding: '0.7rem 1.2rem 1.7rem 1.2rem' }}
          >
            <div
              style={{
                backgroundImage: `url(${JobPlaceholderCardUrl})`,
                backgroundRepeat: 'x-repeat',
                backgroundSize: 'contain',
                height: '13rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #58ADC4',
                  color: '#58ADC4',
                  padding: '0.5rem 5rem',
                }}
              >
                Add your job postings
              </div>
            </div>
          </EmptySectionPlaceholder>
        ) : (
          profile?.jobListings?.map((item) => (
            <div style={{ marginBottom: '2.8rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Caption>{item?.title}</Caption>
                <span style={{ color: '#979797' }}>{item?.location}</span>
              </div>
              <Content style={{ marginTop: '-0.5rem' }}>
                {item.summary ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p style={{ marginBottom: '0' }}>{children}</p>
                      ),
                    }}
                  >
                    {item.summary.replace(/\n/g, `\n\n`)}
                  </ReactMarkdown>
                ) : null}
              </Content>
            </div>
          ))
        )
      }
      modalTitle="Publish job postings on Talent Pool"
      modalHeadline="Job Postings"
      modalBody={
        <ModalForm
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
        />
      }
    />
  )
}

EditableJobPostings.isSectionFilled = (profile: Partial<TpCompanyProfile>) =>
  profile?.jobListings?.length > 0
EditableJobPostings.isSectionEmpty = (profile: Partial<TpCompanyProfile>) =>
  !EditableJobPostings.isSectionFilled(profile)

const validationSchema = Yup.object({
  jobListings: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Please provide a job title'),
      idealTechnicalSkills: Yup.array().max(
        6,
        'Please select up to six skills'
      ),
    })
  ),
})

function ModalForm({
  setIsEditing,
  setIsFormDirty,
}: {
  setIsEditing: (boolean) => void
  setIsFormDirty: (boolean) => void
}) {
  const { data: profile } = useTpCompanyProfileQuery()
  const mutation = useTpCompanyProfileUpdateMutation()

  const closeAllAccordionsSignalSubject = useRef(new Subject<void>())

  const initialValues: Partial<TpCompanyProfile> = useMemo(
    () => ({
      jobListings: profile?.jobListings ?? [buildBlankJobListingRecord()],
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
    onSubmit,
    validationSchema,
  })
  useEffect(() => setIsFormDirty(formik.dirty), [formik.dirty, setIsFormDirty])

  const onClickAddJobListing = useCallback(() => {
    formik.setFieldValue('jobListings', [
      ...formik.values.jobListings,
      buildBlankJobListingRecord(),
    ])
    closeAllAccordionsSignalSubject.current.next()
  }, [formik])

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      const reorderedJobListings = reorder(
        formik.values.jobListings,
        result.source.index,
        result.destination.index
      )

      formik.setFieldValue('jobListings', reorderedJobListings)
    },
    [formik]
  )

  const onRemove = useCallback(
    (uuid: string) => {
      formik.setFieldValue(
        'jobListings',
        formik.values?.jobListings?.filter((item) => item.uuid !== uuid)
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
        Add the job postings you want to publish to jobseekers at ReDI School.
      </Element>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="id">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formik?.values?.jobListings.map((item, index) => (
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
                          name={`jobListings[${index}].title`}
                          placeholder="Junior Frontend Developer"
                          label="Job Title*"
                          {...formik}
                        />
                        <FormInput
                          name={`jobListings[${index}].location`}
                          placeholder="Where is the position based"
                          label="Location"
                          {...formik}
                        />
                        <FormTextArea
                          label="Job Summary"
                          name={`jobListings[${index}].summary`}
                          rows={7}
                          placeholder="Tell us a bit about the position, expectations & ideal candidate."
                          {...formik}
                        />
                        <Element
                          renderAs="p"
                          textSize={6}
                          responsive={{ mobile: { textSize: { value: 5 } } }}
                          className="oneandhalf-bs"
                        >
                          We use a standardised list of skills and positions to
                          help with the matching process of our candidates.
                          Please select the top 6 skills you think are necessary
                          for succeeding in this job, and up to 3 position
                          titles that match this job. We will use those to
                          suggest potential matches.
                        </Element>
                        <FormSelect
                          label="Related positions"
                          name={`jobListings[${index}].relatesToPositions`}
                          items={formRelatedPositions}
                          {...formik}
                          multiselect
                        />
                        <FormSelect
                          label="Ideal technical skills"
                          name={`jobListings[${index}].idealTechnicalSkills`}
                          items={formTopSkills}
                          {...formik}
                          multiselect
                        />
                        <FormSelect
                          label="Employment type"
                          name={`jobListings[${index}].employmentType`}
                          items={formEmploymentType}
                          {...formik}
                        />
                        <FormInput
                          name={`jobListings[${index}].languageRequirements`}
                          placeholder="German C1, English B2, French B1..."
                          label="Language requirements"
                          {...formik}
                        />
                        <FormInput
                          label="Salary range"
                          placeholder="€40K - €52K"
                          name={`jobListings[${index}].salaryRange`}
                          {...formik}
                        />
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
        onClick={() => onClickAddJobListing()}
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

function buildBlankJobListingRecord(): TpJobListingRecord {
  return {
    uuid: uuidv4(),
    title: '',
    location: '',
    summary: '',
    relatesToPositions: [],
    idealTechnicalSkills: [],
    employmentType: '',
    languageRequirements: '',
    desiredExperience: '',
    salaryRange: '',
  }
}

const formTopSkills = topSkills.map(({ id, label }) => ({
  value: id,
  label,
}))

const formEmploymentType = employmentTypes.map(({ id, label }) => ({
  value: id,
  label,
}))

const formRelatedPositions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))
