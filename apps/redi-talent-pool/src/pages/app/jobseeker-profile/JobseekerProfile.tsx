import { Columns } from 'react-bulma-components'
import { useParams } from 'react-router-dom'
import { EditableEducation } from '../../../components/organisms/jobseeker-profile-editables/EditableEducation'
import { EditableImportantDetails } from '../../../components/organisms/jobseeker-profile-editables/EditableImportantDetails'
import { EditableLanguages } from '../../../components/organisms/jobseeker-profile-editables/EditableLanguages'
import { EditableLinks } from '../../../components/organisms/jobseeker-profile-editables/EditableLinks'
import { EditableNamePhotoLocation } from '../../../components/organisms/jobseeker-profile-editables/EditableNamePhotoLocation'
import { EditableOverview } from '../../../components/organisms/jobseeker-profile-editables/EditableOverview'
import { EditableProfessionalExperience } from '../../../components/organisms/jobseeker-profile-editables/EditableProfessionalExperience'
import { EditableSummary } from '../../../components/organisms/jobseeker-profile-editables/EditableSummary'
import { LoggedIn } from '../../../components/templates'
import { useTpJobseekerProfileByIdQuery } from '../../../react-query/use-tpjobseekerprofile-query'

export function JobseekerProfile() {
  const { tpJobseekerProfileId }: { tpJobseekerProfileId: string } = useParams()
  const { data: jobseekerProfile } =
    useTpJobseekerProfileByIdQuery(tpJobseekerProfileId)

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
      </Columns>
    </LoggedIn>
  )
}

export default JobseekerProfile
