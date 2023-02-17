import { TpJobseekerCv, TpJobseekerProfile } from '@talent-connect/shared-types'
import React from 'react'
import { Columns } from 'react-bulma-components'
import { useParams } from 'react-router-dom'
import ProfileDownloadButton from '../../../components/molecules/ProfileDownloadButton'
import { EditableEducation } from '../../../components/organisms/jobseeker-profile-editables/EditableEducation'
import { EditableImportantDetails } from '../../../components/organisms/jobseeker-profile-editables/EditableImportantDetails'
import { EditableLanguages } from '../../../components/organisms/jobseeker-profile-editables/EditableLanguages'
import { EditableLinks } from '../../../components/organisms/jobseeker-profile-editables/EditableLinks'
import { EditableNamePhotoLocation } from '../../../components/organisms/jobseeker-profile-editables/EditableNamePhotoLocation'
import { EditableOverview } from '../../../components/organisms/jobseeker-profile-editables/EditableOverview'
import { EditableProfessionalExperience } from '../../../components/organisms/jobseeker-profile-editables/EditableProfessionalExperience'
import { EditableSummary } from '../../../components/organisms/jobseeker-profile-editables/EditableSummary'
import { LoggedIn } from '../../../components/templates'
import { convertProfileToCv } from '../../../pages/app/cv-builder/cv-list/CvListPage'
import { useTpJobseekerProfileByIdQuery } from '../../../react-query/use-tpjobseekerprofile-query'

export function JobseekerProfile() {
  const { tpJobseekerProfileId }: { tpJobseekerProfileId: string } = useParams()
  const { data: jobseekerProfile, isSuccess: profileLoadSuccess } =
    useTpJobseekerProfileByIdQuery(tpJobseekerProfileId)
  const [cvData, setCvData] = React.useState<
    Partial<TpJobseekerCv> | undefined
  >(undefined)

  return (
    <LoggedIn>
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <EditableNamePhotoLocation
            profile={jobseekerProfile}
            disableEditing
          />
          <EditableOverview profile={jobseekerProfile} disableEditing />
          <EditableSummary profile={jobseekerProfile} disableEditing />
          <EditableProfessionalExperience
            profile={jobseekerProfile}
            disableEditing
          />
          <EditableEducation profile={jobseekerProfile} disableEditing />
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <EditableImportantDetails profile={jobseekerProfile} disableEditing />
          <EditableLanguages profile={jobseekerProfile} disableEditing />
          <EditableLinks profile={jobseekerProfile} disableEditing />
        </Columns.Column>
        <ProfileDownloadButton cvData={cvData} />
      </Columns>
    </LoggedIn>
  )
}

function getTpProfileCvData(
  jobseekerProfile: Partial<TpJobseekerProfile>,
  profileAvatarImageS3Key: string
) {
  var cvData = convertProfileToCv(jobseekerProfile)
  cvData.profileAvatarImageS3Key = profileAvatarImageS3Key
  return cvData
}

export default JobseekerProfile
