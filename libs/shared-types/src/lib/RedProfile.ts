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
  MentoringGoalKey,
  MentoringTopicKey,
  FieldOfExperienceKey,
} from '@talent-connect/shared-config'

export type RedProfile = {
  id: string
  userType: UserType
  rediLocation: RediLocation
  signupSource: SignupSource
  mentor_occupation: string
  mentor_workPlace: string
  expectations: string // Field was used in Mentor typeform, as of today 14.05.2019 not asked in sign-up flow
  mentor_ifTypeForm_submittedAt: Date
  mentee_ifTypeForm_preferredMentorSex: 'male' | 'female' | 'none'
  ifTypeForm_additionalComments: string
  mentee_currentCategory: 'student' | 'rediAlumnus'
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
  otherLanguages: string
  personalDescription: string
  contactEmail: string
  linkedInProfileUrl: string
  githubProfileUrl: string
  slackUsername: string
  telephoneNumber: string
  categories: Array<CategoryKey>
  favouritedRedProfileIds: Array<string>
  optOutOfMenteesFromOtherRediLocation: boolean

  mentor_mentoringTopics: Array<MentoringTopicKey>
  mentor_mentoringGoals: Array<MentoringTopicKey>
  mentor_professionalExperienceFields: Array<FieldOfExperienceKey>

  mentee_mentoringGoal: MentoringGoalKey
  mentee_overarchingMentoringTopics: Array<MentoringTopicKey>
  mentee_primaryRole_fieldOfExpertise: FieldOfExperienceKey
  mentee_primaryRole_mentoringTopics: Array<MentoringTopicKey>
  mentee_secondaryRole_fieldOfExpertise: FieldOfExperienceKey
  mentee_secondaryRole_mentoringTopics: Array<MentoringTopicKey>
  mentee_toolsAndFrameworks_mentoringTopics: Array<MentoringTopicKey>

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
