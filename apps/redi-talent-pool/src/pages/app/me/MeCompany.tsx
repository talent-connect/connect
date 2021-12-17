import { FunctionComponent, useCallback, useState } from 'react'
import { Tooltip } from '@material-ui/core'
import { Button, Icon } from '@talent-connect/shared-atomic-design-components'
import { Columns, Notification, Content } from 'react-bulma-components'
import { EditableAbout } from '../../../components/organisms/company-profile-editables/EditableAbout'
import { EditableContact } from '../../../components/organisms/company-profile-editables/EditableContact'
import { EditableDetails } from '../../../components/organisms/company-profile-editables/EditableDetails'
import { EditableNamePhotoLocation } from '../../../components/organisms/company-profile-editables/EditableNamePhotoLocation'
import { EditableJobPostings } from '../../../components/organisms/company-profile-editables/EditableJobPostings'
import { LoggedIn } from '../../../components/templates'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpJobListingAllQuery } from '../../../react-query/use-tpjoblisting-all-query'
import {
  TpCompanyProfile,
  TpCompanyProfileState,
} from '@talent-connect/shared-types'
import { OnboardingSteps } from './TpCompanyProfileOnboardingSteps'

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

const SendProfileForReviewButton: FunctionComponent = () => {
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

const CallToActionButton: FunctionComponent<{ profile: Partial<TpCompanyProfile>; }> = ({ profile }) => {
  return profile.state &&
  [
    TpCompanyProfileState['drafting-profile'],
    TpCompanyProfileState['submitted-for-review'],
  ].includes(profile.state as any) ? (
    <SendProfileForReviewButton />
  ) : null
}

export const MeCompany: FunctionComponent = () => {
  const { data: profile } = useTpCompanyProfileQuery()
  const { data: jobListings } = useTpJobListingAllQuery()

  const [isJobPostingFormOpen, setIsJobPostingFormOpen] = useState(false)

  const isProfileApproved = profile?.state === 'profile-approved'

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
        </Columns.Column>
      </Columns>
      <EditableJobPostings
        isJobPostingFormOpen={isJobPostingFormOpen}
        setIsJobPostingFormOpen={setIsJobPostingFormOpen}
      />
    </LoggedIn>
  )
}
