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
  signupSource: SignupSource //! DEPRECATE
  mentor_occupation: string
  mentor_workPlace: string
  expectations: string
  mentor_ifTypeForm_submittedAt: Date //! DEPRECATE
  mentee_ifTypeForm_preferredMentorSex: 'male' | 'female' | 'none' //! DEPRECATE
  ifTypeForm_additionalComments: string //! DEPRECATE
  mentee_currentCategory: 'student' | 'rediAlumnus' //! DEPRECATE
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
  age: number //! DEPRECATE - this is a computed field
  birthDate: Date
  languages: Array<Language>
  otherLanguages: string //! DEPRECATE
  personalDescription: string
  contactEmail: string //! DEPRECATE - move to user level somehow
  linkedInProfileUrl: string
  githubProfileUrl: string
  slackUsername: string
  telephoneNumber: string
  categories: Array<CategoryKey> //! REMOVE IN FAVOUR OF MENTORING TOPICS
  favouritedRedProfileIds: Array<string> //! REPLACED BY NEW JUNCTION OBJECT
  optOutOfMenteesFromOtherRediLocation: boolean

  createdAt: Date
  updatedAt: Date
  userActivated?: boolean
  userActivatedAt?: Date
  gaveGdprConsentAt: Date //! DEPRECATE

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
