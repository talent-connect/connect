import { useMediaQuery } from '@mui/material'
import { TpJobListing, TpJobListingStatus } from '@talent-connect/data-access'
import { Chip, SVGImage } from '@talent-connect/shared-atomic-design-components'
import {
  employmentTypesIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import moment from 'moment'
import { Element } from 'react-bulma-components'
import { Link, useHistory, useParams } from 'react-router-dom'
import Avatar from '../../../components/organisms/Avatar'
import { LoggedIn } from '../../../components/templates'
import { useFindOneJobListingQuery } from './JobListing.generated'
import './JobListing.scss'

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
      <SVGImage image="location" className="jobListing-header--location-icon" />
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
      <div className="profile-section--title ">
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
  isMobile,
}: {
  jobListing: TpJobListing
  isMobile?: boolean
}) => {
  return (
    <div className="profile-section responsive-section">
      <div className="profile-section--title">
        <p>IMPORTANT DETAILS</p>
      </div>

      <div className="profile-section--body">
        <div className="profile-section--detail-section">
          <p className="profile-section--caption">INDUSTRY</p>
          <p className="profile-section--content">
            {jobListing?.companyProfile.industry
              ? jobListing?.companyProfile.industry
              : 'N/A'}
          </p>
        </div>

        <div className="profile-section--detail-section">
          <p className="profile-section--caption">EMPLOYMENT TYPE</p>
          <p className="profile-section--content">
            {jobListing?.employmentType
              ? employmentTypesIdToLabelMap[jobListing.employmentType]
              : 'N/A'}
          </p>
        </div>

        <div className="profile-section--detail-section">
          <p className="profile-section--caption">LANGUAGE REQUIREMENTS</p>
          <p className="profile-section--content">
            {jobListing?.languageRequirements
              ? jobListing.languageRequirements
              : 'N/A'}
          </p>
        </div>

        <div className="profile-section--detail-section">
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
    <div className="profile-section responsive-section">
      <div className="profile-section--title">
        <p>CONTACT</p>
      </div>

      <div className="profile-section--body">
        <div className="profile-section--detail-section">
          <p className="profile-section--caption">NAME</p>
          <p className="profile-section--content">
            {jobListing?.contactFirstName} {jobListing?.contactLastName}
          </p>
        </div>

        <div className="profile-section--detail-section">
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

        <div className="profile-section--detail-section">
          <p className="profile-section--caption">LINKS</p>
          <ul className="profile-section--content">
            {[
              jobListing?.companyProfile?.website,
              jobListing?.companyProfile?.linkedInUrl,
            ]
              .filter((l) => l)
              .map((link, idx) => (
                <li key={idx}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {link.replace(/http(s)?:\/\//g, '')}
                  </a>
                </li>
              ))}
          </ul>
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
  const formattedSkills = jobListing?.idealTechnicalSkills?.map(
    (item) => topSkillsIdToLabelMap[item]
  )
  return (
    <div className="profile-section">
      <div className="profile-section--title">
        <p>IDEAL TECHNICAL SKILLS</p>
      </div>

      <div className="profile-section--body">
        {jobListing?.idealTechnicalSkills?.length > 0 ? (
          <div className="profile-section--tag-container">
            {formattedSkills.map((chip) => (
              <Chip key={chip} chip={chip} />
            ))}
          </div>
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
      <div className="profile-section--title ">
        <p>ABOUT THE COMPANY</p>
      </div>

      <div className="profile-section--body">
        <p>{jobListing?.companyProfile.about}</p>
      </div>
    </div>
  )
}

const ExpiredJobListingOverlay = () => {
  return (
    <div className="expired-job-listing-overlay">
      <div className="expired-job-listing-message">
        <p>
          Hey there! It looks like this job listing has expired. You can save
          this link to check if the job becomes available again, or you can{' '}
          <Link to="/app/browse">browse other job openings</Link>. If you have
          any questions in the meantime, feel free to check out the{' '}
          <Link to="/faq">FAQ</Link>.
        </p>
      </div>
    </div>
  )
}

export function JobListing() {
  const { tpJobListingId }: { tpJobListingId: string } = useParams()

  const jobListingQuery = useFindOneJobListingQuery({
    filter: { id: tpJobListingId },
  })

  const history = useHistory()

  const jobListing = jobListingQuery.data?.tpJobListing
  const isExpired = jobListing?.status === TpJobListingStatus.Expired
  const isDesktop = useMediaQuery('(min-width:1024px)')

  if (
    jobListingQuery.isError ||
    jobListing?.companyProfile?.isProfileVisibleToJobseekers === false
  ) {
    history.replace('/app/404')
  }

  return (
    <LoggedIn>
      <div className="jobListing" style={{ position: 'relative' }}>
        {isDesktop ? (
          <>
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
          </>
        ) : (
          <>
            <JobListingHeader jobListing={jobListing} />
            <div className="jobListing--columns--mobile">
              <JobListingAboutTheRole jobListing={jobListing} />
              <JobListingImportantDetails jobListing={jobListing} />
              <JobListingIdealTechnicalSkills jobListing={jobListing} />
              <JobListingAboutTheCompany jobListing={jobListing} />
              <JobListingContact jobListing={jobListing} />
            </div>
          </>
        )}
        {isExpired && <ExpiredJobListingOverlay />}
      </div>
    </LoggedIn>
  )
}

export default JobListing
