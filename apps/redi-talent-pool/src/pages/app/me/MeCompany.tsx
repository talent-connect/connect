import { Tooltip } from '@material-ui/core'
import {
  Button,
  Checkbox,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import {
  TpCompanyProfile,
  TpCompanyProfileState,
} from '@talent-connect/shared-types'
import { useCallback, useState } from 'react'
import { Columns, Content, Notification } from 'react-bulma-components'
import { EditableAbout } from '../../../components/organisms/company-profile-editables/EditableAbout'
import { EditableContact } from '../../../components/organisms/company-profile-editables/EditableContact'
import { EditableDetails } from '../../../components/organisms/company-profile-editables/EditableDetails'
import { EditableJobPostings } from '../../../components/organisms/company-profile-editables/EditableJobPostings'
import { EditableNamePhotoLocation } from '../../../components/organisms/company-profile-editables/EditableNamePhotoLocation'
import { LoggedIn } from '../../../components/templates'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobListingAllQuery } from '../../../react-query/use-tpjoblisting-all-query'
import { OnboardingSteps } from './TpCompanyProfileOnboardingSteps'

export function MeCompany() {
  const { data: profile } = useTpCompanyProfileQuery()
  const { data: jobListings } = useTpJobListingAllQuery()
  const mutation = useTpCompanyProfileUpdateMutation()

  const [isJobPostingFormOpen, setIsJobPostingFormOpen] = useState(false)

  const isProfileApproved = profile?.state === 'profile-approved'

  const onHideFromJobseekersCheckboxChange = () =>
    mutation.mutate({
      ...profile,
      isProfileVisibleToJobseekers: !profile.isProfileVisibleToJobseekers,
    })

  const onJobFair2023ParticipateChange = () =>
    mutation.mutate({
      ...profile,
      isJobFair2023Participant: !profile.isJobFair2023Participant,
    })

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
          <EditableNamePhotoLocation profile={profile} />
          <div style={{ marginBottom: '1.5rem' }}>
            <Checkbox
              checked={profile.isJobFair2023Participant}
              customOnChange={onJobFair2023ParticipateChange}
            >
              My company will attend the <strong>ReDI Job Fair</strong>{' '}
              happening on <strong>15/02/2023</strong>.
            </Checkbox>
          </div>
          <EditableAbout profile={profile} />
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <div className="is-hidden-mobile">
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <CallToActionButton profile={profile} />
            </div>
            {!isProfileApproved && (
              <OnboardingSteps
                profile={profile}
                isProfileComplete={isProfileComplete(profile)}
                hasJobListing={jobListings?.length > 0}
              />
            )}
          </div>
          <EditableDetails profile={profile} />
          <EditableContact profile={profile} />
          <Checkbox
            checked={!profile.isProfileVisibleToJobseekers}
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
  const { data: profile } = useTpCompanyProfileQuery()
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

  const onClick = useCallback(() => {
    if (!window.confirm('Would you like to submit your profile for review?'))
      return

    mutation.mutate({ ...profile, state: 'submitted-for-review' })
  }, [mutation, profile])

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
  profile: Partial<TpCompanyProfile>
}) =>
  profile &&
  profile.state &&
  [
    TpCompanyProfileState['drafting-profile'],
    TpCompanyProfileState['submitted-for-review'],
  ].includes(profile.state as any) ? (
    <SendProfileForReviewButton />
  ) : null
