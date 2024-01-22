import { Tooltip } from '@mui/material'
import {
  CompanyTalentPoolState,
  MyTpDataQuery,
  TpJobListingStatus,
  useMyTpDataQuery,
  usePatchTpCompanyProfileMutation,
} from '@talent-connect/data-access'
import {
  Button,
  Checkbox,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { AllTpCompanyProfileFieldsFragment } from 'libs/data-access/src/lib/tp/company-profiles/tp-company-profile.fragment.generated'
import { Columns, Content, Notification } from 'react-bulma-components'
import CareerPartnerBanner from '../../../components/organisms/CareerPartnerBanner'
import { ExpiredJobListings } from '../../../components/organisms/ExpiredJobListings'
import { EditableAbout } from '../../../components/organisms/company-profile-editables/EditableAbout'
import { EditableContact } from '../../../components/organisms/company-profile-editables/EditableContact'
import { EditableDetails } from '../../../components/organisms/company-profile-editables/EditableDetails'
import { EditableJobPostings } from '../../../components/organisms/company-profile-editables/EditableJobPostings'
import { EditableNamePhotoLocation } from '../../../components/organisms/company-profile-editables/EditableNamePhotoLocation'
import { LoggedIn } from '../../../components/templates'
import { queryClient } from '../../../services/api/api'
import { OnboardingSteps } from './TpCompanyProfileOnboardingSteps'

export function MeCompany() {
  const myData = useMyTpDataQuery()

  const mutation = usePatchTpCompanyProfileMutation()

  const {
    companyRepresentativeRelationship: representativeRelationship,
    representedCompany: companyProfile,
    jobListings,
    userContact,
  } = myData.data.tpCurrentUserDataGet

  const activeJobListings = jobListings?.filter(
    (jobListing) => jobListing.status === TpJobListingStatus.Active
  )
  const expiredJobListings = jobListings?.filter(
    (jobListing) => jobListing.status === TpJobListingStatus.Expired
  )

  const onHideFromJobseekersCheckboxChange = async () => {
    await mutation.mutateAsync({
      input: {
        isProfileVisibleToJobseekers:
          !companyProfile.isProfileVisibleToJobseekers,
      },
    })
    queryClient.invalidateQueries()
  }

  const onDusseldorf24WinterJobFairParticipateChange = async () => {
    await mutation.mutateAsync({
      input: {
        joinsDusseldorf24WinterJobFair:
          !companyProfile.joinsDusseldorf24WinterJobFair,
      },
    })
    queryClient.invalidateQueries()
  }

  // Hidden until the new date announced
  // const onMunich24SummerJobFairParticipateChange = async () => {
  //   await mutation.mutateAsync({
  //     input: {
  //       joinsMunich24SummerJobFair: !companyProfile.joinsMunich24SummerJobFair,
  //     },
  //   })
  //   queryClient.invalidateQueries()
  // }

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
          <EditableNamePhotoLocation companyProfile={companyProfile} />
          <div style={{ marginBottom: '1.5rem' }}>
            <Checkbox
              checked={companyProfile.joinsDusseldorf24WinterJobFair}
              customOnChange={onDusseldorf24WinterJobFairParticipateChange}
            >
              My company will attend the{' '}
              <b>ReDI Winter Job Fair in Düsseldorf</b> on <b>02/02/2024</b>.
            </Checkbox>
            {/* Hidden until the next Job Fair date announced */}
            {/* <Checkbox
              checked={companyProfile.joinsMunich24SummerJobFair}
              customOnChange={onMunich24SummerJobFairParticipateChange}
            >
              My company will attend the <b>ReDI Winter Job Fair in Munich</b>{' '}
              on <b>22/02/2024</b>.
            </Checkbox> */}
          </div>
          {companyProfile.isCareerPartner ? (
            <CareerPartnerBanner
              partnerSince={new Date(2024, 0, 1)} // Passing a date in 2024. The Day and Month are ignored
              jobsPosted={jobListings?.length ?? 0}
            />
          ) : null}
          <EditableAbout companyProfile={companyProfile} />
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <div className="is-hidden-mobile">
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <CallToActionButton profile={companyProfile} />
            </div>
            {!isProfileApproved && (
              <OnboardingSteps
                profile={companyProfile}
                isProfileComplete={isProfileComplete(
                  companyProfile,
                  userContact
                )}
                hasJobListing={jobListings?.length > 0}
              />
            )}
          </div>
          <EditableDetails companyProfile={companyProfile} />
          <EditableContact
            companyProfile={companyProfile}
            userContact={userContact}
          />
          <Checkbox
            checked={!companyProfile.isProfileVisibleToJobseekers}
            customOnChange={onHideFromJobseekersCheckboxChange}
          >
            Hide job listings from jobseekers
          </Checkbox>
        </Columns.Column>
      </Columns>
      <EditableJobPostings jobListings={activeJobListings} />
      {expiredJobListings?.length > 0 && (
        <ExpiredJobListings jobListings={expiredJobListings} />
      )}
    </LoggedIn>
  )
}

function isProfileComplete(
  companyProfile: MyTpDataQuery['tpCurrentUserDataGet']['representedCompany'],
  userContact: MyTpDataQuery['tpCurrentUserDataGet']['userContact']
): boolean {
  const requiredSectionsComplete = [
    EditableNamePhotoLocation.isSectionFilled,
    EditableNamePhotoLocation.isPhotoSelected,
    EditableContact.isSectionFilled,
    EditableDetails.isWebsiteSectionFilled,
  ]
    .map((checkerFn) => checkerFn(companyProfile, userContact))
    .every((p) => p)

  return requiredSectionsComplete
}

function SendProfileForReviewButton() {
  const myData = useMyTpDataQuery()

  const companyProfile = myData.data?.tpCurrentUserDataGet?.representedCompany
  const userContact = myData.data?.tpCurrentUserDataGet?.userContact
  const jobListings = myData.data?.tpCurrentUserDataGet?.jobListings

  const mutation = usePatchTpCompanyProfileMutation()

  const enabled =
    companyProfile?.state === CompanyTalentPoolState.DraftingProfile &&
    isProfileComplete(companyProfile, userContact) &&
    jobListings?.length > 0

  const getTooltipText = () => {
    if (companyProfile.state !== CompanyTalentPoolState.SubmittedForReview) {
      return isProfileComplete(companyProfile, userContact)
        ? 'You need to post a job listing before you can send it for review'
        : 'You need to complete your profile before you can send it for review'
    }

    return 'Your profile is currently being reviewed'
  }

  const onClick = async () => {
    if (!window.confirm('Would you like to submit your profile for review?'))
      return

    // TODO: we should have a use case for this change instead of this patch
    await mutation.mutateAsync({
      input: {
        state: CompanyTalentPoolState.SubmittedForReview,
      },
    })
    queryClient.invalidateQueries()
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
  profile: Pick<AllTpCompanyProfileFieldsFragment, 'state'>
}) =>
  profile &&
  profile.state &&
  [
    CompanyTalentPoolState.DraftingProfile,
    CompanyTalentPoolState.SubmittedForReview,
  ].includes(profile.state as any) ? (
    <SendProfileForReviewButton />
  ) : null
