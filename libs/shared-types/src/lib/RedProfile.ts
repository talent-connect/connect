import { RedMatch } from './RedMatch'
import { RedMentoringSession } from './RedMentoringSession'
import { UserType } from './UserType'
import { SignupSource } from './SignupSource'
import { RediLocation } from './RediLocation'
import {
  CategoryKey,
  CourseKey,
  EducationLevelKey,
  GenderKey,
  Language,
  MenteeOccupationCategoryKey,
} from '@talent-connect/shared-config'

export type RedProfile = {
  id: string
  userType: UserType
  rediLocation: RediLocation
  signupSource: SignupSource
  mentor_occupation: string
  mentor_workPlace: string
  expectations: string // Field was used in Mentor typeform, as of today 14.05.2019 not asked in sign-up flow
  mentor_ifTypeForm_submittedAt: Date // TODO: delete
  mentee_ifTypeForm_preferredMentorSex: 'male' | 'female' | 'none' // TODO: delete
  ifTypeForm_additionalComments: string // TODO: delete
  mentee_currentCategory: 'student' | 'rediAlumnus' // TODO: not used
  mentee_occupationCategoryId: MenteeOccupationCategoryKey // TODO: do TS magic to make this a union type
  mentee_occupationJob_placeOfEmployment: string
  mentee_occupationJob_position: string
  mentee_occupationStudent_studyPlace: string
  mentee_occupationStudent_studyName: string
  mentee_occupationLookingForJob_what: string
  mentee_occupationOther_description: string
  mentee_highestEducationLevel: EducationLevelKey
  mentee_currentlyEnrolledInCourse: CourseKey
  profileAvatarImageS3Key: string
  firstName: string
  lastName: string
  gender: GenderKey
  age: number
  birthDate: Date
  languages: Array<Language>
  otherLanguages: string // TODO: remove
  personalDescription: string
  contactEmail: string
  linkedInProfileUrl: string
  githubProfileUrl: string
  slackUsername: string
  telephoneNumber: string
  categories: Array<CategoryKey>
  favouritedRedProfileIds: Array<string>
  optOutOfMenteesFromOtherRediLocation: boolean

  createdAt: Date
  updatedAt: Date
  userActivated?: boolean
  userActivatedAt?: Date
  gaveGdprConsentAt: Date

  // Computed properties returned by loopback
  currentApplicantCount: number
  menteeCountCapacity: number
  currentMenteeCount: number
  currentFreeMenteeSpots: number
  numberOfPendingApplicationWithCurrentUser: number
  redMatchesWithCurrentUser: Array<RedMatch>
  redMentoringSessionsWithCurrentUser: Array<RedMentoringSession>
  ifUserIsMentee_hasActiveMentor: boolean
  ifUserIsMentee_activeMentor: RedProfile
}
