import { addMonths, subYears } from 'date-fns'
import { Element } from 'react-bulma-components'
import { useCallback } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  Button,
  Checkbox,
  FormDatePicker,
  FormInput,
  FormSelect,
  Heading,
  Modal,
  TextEditor,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobListing, TpJobseekerProfile } from '@talent-connect/shared-types'
import {
  desiredPositions,
  employmentTypes,
  germanFederalStates,
  topSkills,
} from '@talent-connect/talent-pool/config'
import { objectEntries } from '@talent-connect/typescript-utilities'

import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobListingCreateMutation } from '../../../react-query/use-tpjoblisting-create-mutation'
import { useTpJobListingDeleteMutation } from '../../../react-query/use-tpjoblisting-delete-mutation'
import { useTpJobListingOneOfCurrentUserQuery } from '../../../react-query/use-tpjoblisting-one-query'
import { useTpJobListingUpdateMutation } from '../../../react-query/use-tpjoblisting-update-mutation'

interface ModalFormProps {
  tpJobListingId: string
  isEditing: boolean
  setIsEditing: (boolean) => void
}

export function EditableJobPostingForm({
  isEditing,
  setIsEditing,
  tpJobListingId,
}: ModalFormProps) {
  const { data, isLoading: isLoadingJobListing } =
    useTpJobListingOneOfCurrentUserQuery(tpJobListingId)

  const { data: currentUserTpCompanyProfile } = useTpCompanyProfileQuery()

  const jobListing = tpJobListingId
    ? data
    : buildBlankJobListing(currentUserTpCompanyProfile?.id)

  const createMutation = useTpJobListingCreateMutation()
  const updateMutation = useTpJobListingUpdateMutation(tpJobListingId)
  const deleteMutation = useTpJobListingDeleteMutation()

  const onSubmit = (values: Partial<TpJobseekerProfile>, { resetForm }) => {
    if (tpJobListingId === null) {
      // create new
      formik.setSubmitting(true)
      createMutation.mutate(values, {
        onSettled: () => {
          formik.setSubmitting(false)
        },
        onSuccess: () => {
          setIsEditing(false)
          resetForm()
        },
      })
    } else {
      // update existing
      formik.setSubmitting(true)
      updateMutation.mutate(values, {
        onSettled: () => {
          formik.setSubmitting(false)
        },
        onSuccess: () => {
          setIsEditing(false)
          resetForm()
        },
      })
    }
  }

  const initialValues: Partial<TpJobListing> = {
    ...jobListing,
    expiresAt: jobListing?.expiresAt ? new Date(jobListing.expiresAt) : null,
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  })

  const handleDelete = useCallback(() => {
    if (
      window.confirm('Are you certain you wish to delete this job posting?')
    ) {
      deleteMutation.mutate(tpJobListingId, {
        onSuccess: () => {
          setIsEditing(false)
        },
      })
      setIsEditing(false)
    }
  }, [deleteMutation, setIsEditing, tpJobListingId])

  if (!formik.values || isLoadingJobListing) return null

  return (
    <Modal
      title=""
      show={isEditing}
      stateFn={setIsEditing}
      confirm={formik.dirty}
    >
      {formik.values && (
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
            Add the job postings you want to publish to jobseekers at ReDI
            School.
          </Element>
          <FormInput
            name="title"
            placeholder="Junior Frontend Developer"
            label="Job Title*"
            {...formik}
          />
          <FormInput
            name="location"
            placeholder="Where is the position based"
            label="Location*"
            {...formik}
          />
          <FormSelect
            name="federalState"
            label="Location (Federal State in Germany)"
            items={federalStatesOptions}
            placeholder="Select federal states"
            {...formik}
          />
          <Checkbox.Form
            name="isRemotePossible"
            checked={formik.values?.isRemotePossible}
            {...formik}
          >
            Remote working is possible for this job listing
          </Checkbox.Form>
          <TextEditor
            name="summary"
            label="Job Summary*"
            placeholder="Tell us a bit about the position, expectations & ideal candidate."
            minChar={MIN_CHARS_COUNT}
            formik={formik}
          />
          <Element
            renderAs="p"
            textSize={6}
            responsive={{ mobile: { textSize: { value: 5 } } }}
            className="oneandhalf-bs"
          >
            We use a standardised list of skills and positions to help with the
            matching process of our candidates. Please select the top 6 skills
            you think are necessary for succeeding in this job, and up to 3
            position titles that match this job. We will use those to suggest
            potential matches.
          </Element>
          <FormSelect
            label="Related positions*"
            name="relatesToPositions"
            items={formRelatedPositions}
            {...formik}
            multiselect
            placeholder="Start typing and select positions"
            closeMenuOnSelect={false}
          />
          <FormSelect
            label="Ideal technical skills*"
            name="idealTechnicalSkills"
            items={formTopSkills}
            {...formik}
            multiselect
            placeholder="Start typing and select skills"
            closeMenuOnSelect={false}
          />
          <FormSelect
            label="Employment type*"
            name="employmentType"
            items={formEmploymentType}
            {...formik}
          />
          <FormInput
            name="languageRequirements"
            placeholder="German C1, English B2, French B1..."
            label="Language requirements*"
            {...formik}
          />
          <FormInput
            label="Salary range"
            placeholder="€40K - €52K"
            name="salaryRange"
            {...formik}
          />
          <FormDatePicker
            label="Expiry Date"
            name="expiresAt"
            placeholder="Add expiry date for the job"
            dateFormat="dd MMMM yyyy"
            minDate={subYears(new Date(), 0)}
            maxDate={addMonths(new Date(), 6)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            isClearable
            {...formik}
          />

          <div style={{ height: '30px' }} />

          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>
              <Button
                disabled={!formik.isValid || updateMutation.isLoading}
                onClick={formik.handleSubmit}
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
            {tpJobListingId ? (
              <Button
                simple
                disabled={updateMutation.isLoading}
                onClick={handleDelete}
              >
                Delete
              </Button>
            ) : null}
          </div>
        </Modal.Body>
      )}
    </Modal>
  )
}

const MIN_CHARS_COUNT = 200

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Please provide a job title'),
  location: Yup.string().required('Please provide a location'),
  summary: Yup.string()
    .required('Please provide job description')
    .min(MIN_CHARS_COUNT),
  relatesToPositions: Yup.array().min(
    1,
    'Please select at least one related position'
  ),
  idealTechnicalSkills: Yup.array()
    .min(1, 'Please select at least one relevant technical skill')
    .max(6, 'Please select up to six skills'),
  employmentType: Yup.mixed().required('Please select an employment type'),
  languageRequirements: Yup.string().required(
    'Please specify the language requirement(s)'
  ),
  expiresAt: Yup.date().nullable(true).label('Expiry Date'),
})

function buildBlankJobListing(
  tpCompanyProfileId: string
): Partial<TpJobListing> {
  return {
    title: '',
    location: '',
    summary: '',
    relatesToPositions: [],
    idealTechnicalSkills: [],
    employmentType: '',
    languageRequirements: '',
    salaryRange: '',
    tpCompanyProfileId,
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

const federalStatesOptions = objectEntries(germanFederalStates).map(
  ([value, label]) => ({
    value,
    label,
  })
)
