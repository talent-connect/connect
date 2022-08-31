import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { Gender } from '../common-objects/contact/enums/gender.enum'
import { ConMentoringSessionEntityProps } from '../con-mentoring-session'
import { ConMentorshipMatchEntityProps } from '../con-mentorship-match'
import {
  ConnectProfileLanguage,
  EducationLevel,
  OccupationCategory,
  RediCourse,
  RediLocation,
  UserType,
} from './enums'
import { ConnectProfileStatus } from './enums/connect-profile-status.enum'
import { MentoringTopic } from './enums/mentoring-topic.enum'

@ObjectType('ConProfile')
export class ConProfileEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string
  userId: string
  email: string
  @Field((type) => UserType)
  userType: UserType
  @Field((type) => RediLocation)
  rediLocation: RediLocation
  mentor_occupation?: string
  mentor_workPlace?: string
  expectations?: string
  @Field((type) => OccupationCategory)
  mentee_occupationCategoryId?: OccupationCategory
  mentee_occupationJob_placeOfEmployment?: string
  mentee_occupationJob_position?: string
  mentee_occupationStudent_studyPlace?: string
  mentee_occupationStudent_studyName?: string
  mentee_occupationLookingForJob_what?: string
  mentee_occupationOther_description?: string
  @Field((type) => EducationLevel)
  mentee_highestEducationLevel?: EducationLevel
  @Field((type) => RediCourse)
  mentee_currentlyEnrolledInCourse?: RediCourse
  profileAvatarImageS3Key?: string
  firstName: string
  lastName: string
  @Field((type) => Gender)
  gender?: Gender
  birthDate?: Date
  @Field((type) => [ConnectProfileLanguage])
  languages?: Array<ConnectProfileLanguage>
  personalDescription?: string
  linkedInProfileUrl?: string
  githubProfileUrl?: string
  slackUsername?: string
  telephoneNumber?: string
  @Field((type) => [MentoringTopic])
  categories: Array<MentoringTopic>
  // favouritedRedProfileIds: Array<string> //! REPLACED BY NEW JUNCTION OBJECT
  optOutOfMenteesFromOtherRediLocation: boolean
  @Field((type) => [ConMentoringSessionEntityProps])
  mentoringSessions: ConMentoringSessionEntityProps[]
  mentorshipMatches: ConMentorshipMatchEntityProps[]
  loopbackUserId: string
  createdAt: Date
  updatedAt: Date
  @Field((type) => ConnectProfileStatus)
  profileStatus: ConnectProfileStatus
  @Field((type) => Int)
  menteeCountCapacity?: number
  // userActivated?: boolean //! REINSTATE, COMPLEX CASE
  userActivatedAt?: Date

  // The next ones are computed fields in Salesforce
  age?: number
  fullName: string
}
