import { useParams } from 'react-router-dom'
import { Columns } from 'react-bulma-components'
import { LoggedIn } from '../../../components/templates'
import { useTpJobSeekerProfileByIdQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { EditableLanguages } from '../../../components/organisms/jobSeeker-profile-editables/EditableLanguages'
import { EditableImportantDetails } from '../../../components/organisms/jobSeeker-profile-editables/EditableImportantDetails'
import { EditableLinks } from '../../../components/organisms/jobSeeker-profile-editables/EditableLinks'
import { EditableOverview } from '../../../components/organisms/jobSeeker-profile-editables/EditableOverview'
import { EditableSummary } from '../../../components/organisms/jobSeeker-profile-editables/EditableSummary'
import { EditableProfessionalExperience } from '../../../components/organisms/jobSeeker-profile-editables/EditableProfessionalExperience'
import { EditableEducation } from '../../../components/organisms/jobSeeker-profile-editables/EditableEducation'
import { EditableNamePhotoLocation } from '../../../components/organisms/jobSeeker-profile-editables/EditableNamePhotoLocation'
import { FC } from 'react';

export const JobSeekerProfile: FC = () => {
  const { tpJobSeekerProfileId } = useParams<{ tpJobSeekerProfileId: string }>()
  const { data: jobSeekerProfile } = useTpJobSeekerProfileByIdQuery(tpJobSeekerProfileId)

  console.log(jobSeekerProfile)

  return (
    <LoggedIn>
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <EditableNamePhotoLocation
            profile={jobSeekerProfile}
            disableEditing
          />
          <EditableOverview profile={jobSeekerProfile} disableEditing />
          <EditableSummary profile={jobSeekerProfile} disableEditing />
          <EditableProfessionalExperience
            profile={jobSeekerProfile}
            disableEditing
          />
          <EditableEducation profile={jobSeekerProfile} disableEditing />
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <EditableImportantDetails profile={jobSeekerProfile} disableEditing />
          <EditableLanguages profile={jobSeekerProfile} disableEditing />
          <EditableLinks profile={jobSeekerProfile} disableEditing />
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

export default JobSeekerProfile
