import { Tooltip } from '@material-ui/core'
import {
  CompanyTalentPoolState,
  useMyTpDataQuery,
} from '@talent-connect/data-access'
import {
  Button,
  Checkbox,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import {
  TpCompanyProfile,
  TpCompanyProfileState,
} from '@talent-connect/shared-types'
import { useState } from 'react'
import { Columns, Content, Notification } from 'react-bulma-components'
import { EditableAbout } from '../../../components/organisms/company-profile-editables/EditableAbout'
import { EditableContact } from '../../../components/organisms/company-profile-editables/EditableContact'
import { EditableDetails } from '../../../components/organisms/company-profile-editables/EditableDetails'
import { EditableJobPostings } from '../../../components/organisms/company-profile-editables/EditableJobPostings'
import { EditableNamePhotoLocation } from '../../../components/organisms/company-profile-editables/EditableNamePhotoLocation'
import { LoggedIn } from '../../../components/templates'
import { useIsBusy } from '../../../hooks/useIsBusy'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpJobListingAllQuery } from '../../../react-query/use-tpjoblisting-all-query'
import { OnboardingSteps } from './TpCompanyProfileOnboardingSteps'

export function MeCompany() {
  const isBusy = useIsBusy()
  const myData = useMyTpDataQuery()
  const { data: jobListings } = useTpJobListingAllQuery() //TODO: replace
  const mutation = useTpCompanyProfileUpdateMutation() //TODO: replace

  const [isJobPostingFormOpen, setIsJobPostingFormOpen] = useState(false)

  // const onHideFromJobseekersCheckboxChange = () =>
  //   mutation.mutate({
  //     ...profile,
  //     isProfileVisibleToJobseekers: !profile.isProfileVisibleToJobseekers,
  //   })

  // TODO: finish function
  const onJobFair2023ParticipateChange = () => {}
  // mutation.mutate({
  //   ...profile,
  //   isJobFair2023Participant: !profile.isJobFair2023Participant,
  // })

  if (isBusy) return null

  const {
    companyRepresentativeRelationship: representativeRelationship,
    representedCompany: companyProfile,
  } = myData.data.tpCurrentUserDataGet

  const isProfileApproved =
    companyProfile.state === CompanyTalentPoolState.ProfileApproved

  return (
    <LoggedIn>
      {isProfileApproved ? (
        <Notification className="account-not-active double-bs">
          <Icon
            className="account-not-active__icon"
            icon="search"
            size="large"
            space="right"
          />
          <Content size="small">
            <strong>Great, your profile is approved!</strong> You can now{' '}
            <span
              onClick={() => setIsJobPostingFormOpen(true)}
              style={{
                textDecoration: 'underline',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              create additional job postings
            </span>{' '}
            or <a href="/app/browse">browse our talent pool</a>!
          </Content>
        </Notification>
      ) : null}
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <EditableNamePhotoLocation profile={companyProfile} />
          <div style={{ marginBottom: '1.5rem' }}>
            <Checkbox
              checked={companyProfile.isJobFair2023Participant}
              customOnChange={onJobFair2023ParticipateChange}
            >
              My company will attend the <strong>ReDI Job Fair</strong>{' '}
              happening on <strong>15/02/2023</strong>.
            </Checkbox>
          </div>
          <EditableAbout profile={companyProfile} />
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <div className="is-hidden-mobile">
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <CallToActionButton profile={companyProfile} />
            </div>
            {!isProfileApproved && (
              <OnboardingSteps
                profile={companyProfile}
                isProfileComplete={isProfileComplete(companyProfile)}
                hasJobListing={jobListings?.length > 0}
              />
            )}
          </div>
          <EditableDetails profile={companyProfile} />
          <EditableContact profile={companyProfile} />
          <Checkbox
            checked={!companyProfile.isProfileVisibleToJobseekers}
            customOnChange={onHideFromJobseekersCheckboxChange}
          >
            Hide job listings from jobseekers
          </Checkbox>
        </Columns.Column>
      </Columns>
      <EditableJobPostings
        isJobPostingFormOpen={isJobPostingFormOpen}
        setIsJobPostingFormOpen={setIsJobPostingFormOpen}
      />
    </LoggedIn>
  )
}

function isProfileComplete(profile: Partial<TpCompanyProfile>): boolean {
  const requiredSectionsComplete = [
    EditableNamePhotoLocation.isSectionFilled,
    EditableNamePhotoLocation.isPhotoSelected,
    EditableContact.isSectionFilled,
    EditableDetails.isWebsiteSectionFilled,
  ]
    .map((checkerFn) => checkerFn(profile))
    .every((p) => p)

  return requiredSectionsComplete
}

function SendProfileForReviewButton() {
  const isBusy = useIsBusy()
  const myData = useMyTpDataQuery()

  // const { data: profile } = useTpCompanyProfileQuery()
  const { data: jobListings } = useTpJobListingAllQuery()
  const mutation = useTpCompanyProfileUpdateMutation()

  const enabled =
    profile?.state === 'drafting-profile' &&
    isProfileComplete(profile) &&
    jobListings?.length > 0

  const getTooltipText = () => {
    if (profile.state !== 'submitted-for-review') {
      return isProfileComplete(profile)
        ? 'You need to post a job listing before you can send it for review'
        : 'You need to complete your profile before you can send it for review'
    }

    return 'Your profile is currently being reviewed'
  }

  const onClick = () => {
    if (!window.confirm('Would you like to submit your profile for review?'))
      return

    mutation.mutate({ ...profile, state: 'submitted-for-review' })
  }

  if (enabled) {
    return <Button onClick={onClick}>Send profile to review</Button>
  } else {
    return (
      <Tooltip title={getTooltipText()}>
        <span>
          <Button disabled style={{ pointerEvents: 'none' }}>
            Send profile to review
          </Button>
        </span>
      </Tooltip>
    )
  }
}

const CallToActionButton = ({
  profile,
}: {
  profile: Pick<TpCompanyProfile, 'state'>
}) =>
  profile &&
  profile.state &&
  [
    TpCompanyProfileState['drafting-profile'],
    TpCompanyProfileState['submitted-for-review'],
  ].includes(profile.state as any) ? (
    <SendProfileForReviewButton />
  ) : null
