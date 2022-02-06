import {
  Button,
  TextInput,
  FormSelect,
  TextArea,
  Heading,
  Icon,
  Modal,
  Checkbox,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobListing } from '@talent-connect/shared-types'
import {
  desiredPositions,
  employmentTypes,
  topSkills,
} from '@talent-connect/talent-pool/config'
import { mapOptions } from '@talent-connect/typescript-utilities';
import { useCallback, useState, useEffect } from 'react'
import { Columns, Element } from 'react-bulma-components'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobListingAllQuery } from '../../../react-query/use-tpjoblisting-all-query'
import { useTpJobListingDeleteMutation } from '../../../react-query/use-tpjoblisting-delete-mutation'
import { useTpJobListingOneOfCurrentUserQuery } from '../../../react-query/use-tpjoblisting-one-query'
import { useTpJobListingUpdateMutation } from '../../../react-query/use-tpjoblisting-update-mutation'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { JobListingCard } from '../JobListingCard'
import JobPlaceholderCardUrl from './job-placeholder-card.svg'
import { get } from 'lodash'
import { componentForm } from './EditableJobPostings.form';

interface Props {
  isJobPostingFormOpen: boolean
  setIsJobPostingFormOpen: (value: boolean) => void
}

export function EditableJobPostings ({
  isJobPostingFormOpen,
  setIsJobPostingFormOpen,
}: Props) {
  const { data: jobListings } = useTpJobListingAllQuery()
  const [isEditing, setIsEditing] = useState(false)
  const [idOfTpJobListingBeingEdited, setIdOfTpJobListingBeingEdited] =
    useState<string | null>(null) // null = "new"

  const startAdding = useCallback(() => {
    setIdOfTpJobListingBeingEdited(null) // means "new"
    setIsEditing(true)
  }, [])
  const startEditing = useCallback((id: string) => {
    setIdOfTpJobListingBeingEdited(id)
    setIsEditing(true)
  }, [])

  useEffect(() => {
    if (isJobPostingFormOpen) setIsEditing(true)
  }, [isJobPostingFormOpen])

  useEffect(() => {
    if (!isEditing) setIsJobPostingFormOpen(false)
  }, [isEditing, setIsJobPostingFormOpen])

  return (
    <>
      <div className="profile-section">
        <div className="profile-section--title is-flex is-flex-direction-row">
          <Element
            renderAs="h4"
            textSize={4}
            responsive={{ mobile: { textSize: { value: 7 } } }}
            className="is-flex-grow-1"
            style={{ flexGrow: 1 }}
          >
            Job postings
          </Element>
          <div className="icon__button" onClick={startAdding}>
            <Icon icon="plus" />
          </div>
        </div>

        <div className="profile-section--body">
          {!(jobListings?.length) ? (
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
            <Columns>
              {jobListings?.map((jobListing) => (
                <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
                  <JobListingCard
                    key={jobListing.id}
                    jobListing={jobListing}
                    onClick={() => startEditing(jobListing.id)}
                  />
                </Columns.Column>
              ))}
            </Columns>
          )}
        </div>
      </div>
      <ModalForm
        tpJobListingId={idOfTpJobListingBeingEdited}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  )
}

interface ModalFormProps {
  tpJobListingId: string
  isEditing: boolean
  setIsEditing: (boolean: boolean) => void
}

function ModalForm ({
  isEditing,
  setIsEditing,
  tpJobListingId
}: ModalFormProps) {
  const { data } = useTpJobListingOneOfCurrentUserQuery(tpJobListingId)
  const { data: currentUserTpCompanyProfile } = useTpCompanyProfileQuery()
  const jobListing = tpJobListingId
    ? data
    : buildBlankJobListing(currentUserTpCompanyProfile?.id)

  const updateMutation = useTpJobListingUpdateMutation() // TODO: has "tpJobListingId" as param. Why?
  const deleteMutation = useTpJobListingDeleteMutation()

  const formik = componentForm({
    jobListing,
    setIsEditing,
    tpJobListingId
  }) 

  const handleDelete = useCallback(() => {
    const confirmation = window.confirm('Are you certain you wish to delete this job posting?')
    if (confirmation) {
      deleteMutation.mutate(tpJobListingId, {
        onSuccess: () => setIsEditing(false),
      })
      setIsEditing(false)
    }
  }, [deleteMutation, setIsEditing, tpJobListingId])

  return (
    <Modal
      title=""
      show={isEditing}
      stateFn={setIsEditing}
      confirm={formik.dirty}
    >
      <Modal.Body>
        <Element renderAs="h4" textTransform="uppercase" textSize={6}>
          Publish job postings on Talent Pool
        </Element>
        <Heading size="medium" border="bottomLeft">
          Job Posting
        </Heading>
        <Element
          renderAs="p"
          textSize={4}
          responsive={{ mobile: { textSize: { value: 5 } } }}
          className="oneandhalf-bs"
        >
          Add the job postings you want to publish to jobSeekers at ReDI School.
        </Element>
        {/* TODO: This Checkbox is added only for JobFair 2022. Please remove after 11.02.2022 */}
        <Checkbox.Form
          name="isJobFair2022JobListing"
          checked={get(formik.values, 'isJobFair2022JobListing', false)}
          handleChange={formik.handleChange}
          {...formik}
        >
          We will recruit for this job listing at the ReDI Job Fair on 11
          February 2022
        </Checkbox.Form>

        <TextInput
          name={`title`}
          placeholder="Junior Frontend Developer"
          label="Job Title*"
          {...formik}
        />
        <TextInput
          name={`location`}
          placeholder="Where is the position based"
          label="Location*"
          {...formik}
        />
        <TextArea
          label="Job Summary*"
          name={`summary`}
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
          We use a standardized list of skills and positions to help with the
          matching process of our candidates. Please select the top 6 skills you
          think are necessary for succeeding in this job, and up to 3 position
          titles that match this job. We will use those to suggest potential
          matches.
        </Element>
        <FormSelect
          label="Related positions*"
          name={`relatesToPositions`}
          items={formRelatedPositions}
          {...formik}
          multiSelect
        />
        <FormSelect
          label="Ideal technical skills*"
          name={`idealTechnicalSkills`}
          items={formTopSkills}
          {...formik}
          multiSelect
        />
        <FormSelect
          label="Employment type*"
          name={`employmentType`}
          items={formEmploymentType}
          {...formik}
        />
        <TextInput
          name={`languageRequirements`}
          placeholder="German C1, English B2, French B1..."
          label="Language requirements*"
          {...formik}
        />
        <TextInput
          label="Salary range"
          placeholder="€40K - €52K"
          name={`salaryRange`}
          {...formik}
        />

        <div style={{ height: '30px' }} />

        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <Button
              disabled={!formik.isValid || updateMutation.isLoading}
              onClick={(e) => formik.handleSubmit(e)}
            >
              Save
            </Button>
            <Button
              simple
              disabled={updateMutation.isLoading}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
          {tpJobListingId && (
            <Button
              simple
              disabled={updateMutation.isLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

function buildBlankJobListing(tpCompanyProfileId: string): Partial<TpJobListing> {
  return {
    title: '',
    location: '',
    summary: '',
    relatesToPositions: [],
    idealTechnicalSkills: [],
    employmentType: '',
    languageRequirements: '',
    desiredExperience: '',
    salaryRange: '',
    tpCompanyProfileId,
  }
}

const formTopSkills = mapOptions(topSkills)

const formEmploymentType = mapOptions(employmentTypes)

const formRelatedPositions = mapOptions(desiredPositions)
