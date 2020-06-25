import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { Heading } from '../../../components/atoms'
import { ProfileCard, MContacts, MSessions, ReportProblem } from '../../../components/organisms'
import { Columns, Content, Element } from 'react-bulma-components'

import { RedMentoringSession } from '../../../types/RedMentoringSession'

// import { Avatar } from '../../../../components/Avatar'
import { LogMentoringSessionBtn } from '../../../components/LogMentoringSessionBtn'
import { MentoringSessionsLog } from '../../../components/MentoringSessionsLog'
import { ProfileCourse } from '../../../components/ProfileCourse'
import { ProfileOccupation } from '../../../components/ProfileOccupation'
import { ProfileWorkPlace } from '../../../components/ProfileWorkPlace'
import { RootState } from '../../../redux/types'
import { RedProfile } from '../../../types/RedProfile'
import { profilesFetchOneStart } from '../../../redux/profiles/actions'
import { LoggedIn } from '../../../components/templates'
import { getMatches } from '../../../redux/matches/selectors'

interface RouteParams {
  profileId: string
}
interface Props {
  profile: RedProfile
  currentUser: RedProfile
  matches: any
  profilesFetchOneStart: any
}

// TODO: ': any' to be replaced with proper type
const Mentorship = ({ profile, matches, currentUser, profilesFetchOneStart }: any) => {
  // const match = profile.redMatchesWithCurrentUser && profile.redMatchesWithCurrentUser[0];
  const { profileId } = useParams<RouteParams>()

  useEffect(() => {
    profilesFetchOneStart(profileId)
  }, [profileId])

  if (!profile) return <>...</>

  const profileType = currentUser.userType === 'mentee' ? 'mentor' : 'mentee'
  const myMatch = matches.find((match: any) => match[`${profileType}Id`] === profileId)
  // const profile = myMatch && myMatch[profileType]
  const occupation = profile && occupationFormatter(profile)
  const workPlace = profile && workPlaceFormatter(profile)
  const currentUserIsMentor = currentUser.userType === 'mentor'
  const currentUserIsMentee = currentUser.userType === 'mentee'

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="double-bs">My Mentorship</Heading>
      <Content size="medium" renderAs="p" responsive={{ mobile: { hide: { value: true } } }}>
        Below you can see your ongoing mentorship with your mentor <strong>{profile?.firstName} {profile?.lastName}</strong>.
      </Content>

      <Columns>
        <Columns.Column size={4}>
          <ProfileCard
            profile={profile} />

          {/* maybe for mentee
          <ProfileCourse
            courseId={profile?.mentee_currentlyEnrolledInCourse}
          />

          {occupation && <ProfileOccupation occupation={occupation} />}
          {workPlace && <ProfileWorkPlace workPlace={workPlace} />}
          */}
          {/* {currentUserIsMentor && (
            <LogMentoringSessionBtn menteeId={profile?.id} />
          )} */}

          <MSessions
            sessions={profile?.redMentoringSessionsWithCurrentUser}
            menteeId={profile.id}
            editable={currentUserIsMentor}
          />

          <ReportProblem
            type={currentUser?.userType}
            redProfileId={profile?.id}
          />
        </Columns.Column>
        <Columns.Column size={8}>
          <MContacts profile={profile as RedProfile} />
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

const occupationFormatter = (mentee: RedProfile) => {
  switch (mentee.mentee_occupationCategoryId) {
    case 'job':
      return (
        'Job' +
        (mentee.mentee_occupationJob_position
          ? ` (${mentee.mentee_occupationJob_position})`
          : '')
      )
    case 'student':
      return (
        'Student' +
        (mentee.mentee_occupationStudent_studyName
          ? ` (${mentee.mentee_occupationStudent_studyName})`
          : '')
      )
    case 'lookingForJob':
      return (
        'Looking for a job' +
        (mentee.mentee_occupationLookingForJob_what
          ? ` ${mentee.mentee_occupationLookingForJob_what})`
          : '')
      )
    case 'other':
      return mentee.mentee_occupationOther_description
    default:
      return undefined
  }
}

const workPlaceFormatter = (mentee: RedProfile) => {
  switch (mentee.mentee_occupationCategoryId) {
    case 'job':
      return mentee.mentee_occupationJob_placeOfEmployment
    case 'student':
      return mentee.mentee_occupationStudent_studyPlace
    case 'lookingForJob':
    case 'other':
    default:
      return undefined
  }
}

const mapStateToProps = (state: RootState) => ({
  currentUser: state.user.profile,
  profile: state.profiles.oneProfile,
  matches: getMatches(state.matches)
})

const mapDispatchToProps = (dispatch: any) => ({
  profilesFetchOneStart: (profileId: string) => dispatch(profilesFetchOneStart(profileId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentorship)
