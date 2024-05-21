import {
  Caption,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import {
  employmentTypesIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import moment from 'moment'
import { Columns, Content, Element, Tag } from 'react-bulma-components'
import { useParams } from 'react-router-dom'
import Avatar from '../../../components/organisms/Avatar'
import { LoggedIn } from '../../../components/templates'
import { useFindOneJobListingQuery } from './JobListing.generated'
import './JobListing.scss'
import LocationIcon from '../../../../../../libs/shared-atomic-design-components/src/assets/images/location.svg'
import { TpJobListing } from '@talent-connect/data-access'

const JobListingLocation = ({
  location,
  remote,
}: {
  location: string
  remote: boolean
}) => {
  const locationArr = location.split(',')
  const newLocationsString =
    locationArr.length > 3
      ? locationArr.slice(0, 3).join(',') + '...'
      : location

  return (
    <div className="jobListing-header--location-container">
      <img
        src={LocationIcon}
        alt="Location"
        className="jobListing-header--location-icon"
      />
      <p className="jobListing-header--location-text">
        {newLocationsString}
        {remote ? ' | Remote' : ''}
      </p>
    </div>
  )
}

const JobListingHeader = ({ jobListing }: { jobListing: TpJobListing }) => {
  return (
    <div className="jobListing-header">
      <div className="jobListing-header--avatar">
        {jobListing ? (
          <Avatar profile={jobListing?.companyProfile} shape="circle" />
        ) : null}
      </div>
      <div>
        <p className="jobListing-header--title">{jobListing?.title}</p>
        <p className="jobListing-header--subtitle">
          at {jobListing?.companyProfile.companyName}. Last updated{' '}
          {moment(jobListing?.updatedAt).format('DD.MM.YYYY')}
        </p>
        <div>
          <JobListingLocation
            location={jobListing?.location || ''}
            remote={jobListing?.isRemotePossible}
          />
        </div>
      </div>
    </div>
  )
}

const JobListingAboutTheRole = ({
  jobListing,
}: {
  jobListing: TpJobListing
}) => {
  return (
    <div className="profile-section">
      <div className="profile-section--title is-flex is-flex-direction-row">
        <p>ABOUT THE ROLE</p>
      </div>
      <div className="profile-section--body">
        <div className="profile-section--body">
          <Element
            className="quill-editor-output"
            dangerouslySetInnerHTML={{ __html: jobListing?.summary }}
          />
        </div>
      </div>
    </div>
  )
}

const JobListingImportantDetails = ({
  jobListing,
}: {
  jobListing: TpJobListing
}) => {
  return (
    <div className="profile-section">
      <div className="profile-section--title is-flex is-flex-direction-row">
        <p>IMPORTANT DETAILS</p>
      </div>

      <div className="profile-section--body">
        <div>
          <p className="profile-section--caption">INDUSTRY</p>
          <p className="profile-section--content">
            {jobListing?.companyProfile.industry
              ? jobListing?.companyProfile.industry
              : 'N/A'}
          </p>
        </div>

        <div>
          <p className="profile-section--caption">EMPLOYMENT TYPE</p>
          <p className="profile-section--content">
            {jobListing?.employmentType
              ? employmentTypesIdToLabelMap[jobListing.employmentType]
              : 'N/A'}
          </p>
        </div>

        <div>
          <p className="profile-section--caption">LANGUAGE REQUIREMENTS</p>
          <p className="profile-section--content">
            {jobListing?.languageRequirements
              ? jobListing.languageRequirements
              : 'N/A'}
          </p>
        </div>

        <div>
          <p className="profile-section--caption">SALARY RANGE</p>
          <p className="profile-section--content">
            {jobListing?.salaryRange ? jobListing.salaryRange : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

const JobListingContact = ({ jobListing }: { jobListing: TpJobListing }) => {
  return (
    <div>
      <div className="profile-section--title">
        <p>CONTACT</p>
      </div>

      <div className="profile-section--body">
        <div>
          <div>
            <p className="profile-section--caption">NAME</p>
            <p className="profile-section--content">
              {jobListing?.contactFirstName} {jobListing?.contactLastName}
            </p>
          </div>

          <div>
            <p className="profile-section--caption">E-MAIL</p>
            <p className="profile-section--content">
              {jobListing?.contactEmailAddress ? (
                <a href={jobListing?.contactEmailAddress}>
                  {jobListing?.contactEmailAddress}
                </a>
              ) : (
                'N/A'
              )}
            </p>
          </div>

          <div>
            <p className="profile-section--caption">LINKS</p>
            <p className="profile-section--content">
              {jobListing?.contactPhoneNumber ? (
                <a href={jobListing.contactPhoneNumber}>
                  {jobListing.contactPhoneNumber}
                </a>
              ) : (
                'N/A'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const JobListingIdealTechnicalSkills = ({
  jobListing,
}: {
  jobListing: TpJobListing
}) => {
  return (
    <div className="profile-section">
      <div className="profile-section--title is-flex is-flex-direction-row">
        <p>IDEAL TECHNICAL SKILLS</p>
      </div>

      <div className="profile-section--body">
        {jobListing?.idealTechnicalSkills?.length > 0 ? (
          <Tag.Group>
            {jobListing?.idealTechnicalSkills.map((skill) => (
              <Tag key={skill}>{topSkillsIdToLabelMap[skill]}</Tag>
            ))}
          </Tag.Group>
        ) : (
          'N/A'
        )}
      </div>
    </div>
  )
}

const JobListingAboutTheCompany = ({
  jobListing,
}: {
  jobListing: TpJobListing
}) => {
  return (
    <div className="profile-section">
      <div className="profile-section--title is-flex is-flex-direction-row">
        <p>ABOUT THE COMPANY</p>
      </div>

      <div className="profile-section--body">
        {/* <ReactMarkdown>{jobListing?.companyProfile.about}</ReactMarkdown> */}
        <p>{jobListing?.companyProfile.about}</p>
      </div>
    </div>
  )
}

export function JobListing() {
  const { tpJobListingId }: { tpJobListingId: string } = useParams()

  const jobListingQuery = useFindOneJobListingQuery({
    filter: { id: tpJobListingId },
  })

  const jobListing = jobListingQuery.data?.tpJobListing

  return (
    <LoggedIn>
      <div className="jobListing">
        <JobListingHeader jobListing={jobListing} />
        <div className="jobListing--columns">
          <div className="jobListing--left-column">
            <div>
              <JobListingAboutTheRole jobListing={jobListing} />
            </div>
            <div>
              <JobListingIdealTechnicalSkills jobListing={jobListing} />
            </div>
            <div>
              <JobListingAboutTheCompany jobListing={jobListing} />
            </div>
          </div>
          <div className="jobListing--right-column">
            <JobListingImportantDetails jobListing={jobListing} />
            <JobListingContact jobListing={jobListing} />
          </div>
        </div>
      </div>
    </LoggedIn>
  )
}

export default JobListing
