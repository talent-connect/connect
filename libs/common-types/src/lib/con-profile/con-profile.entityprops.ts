import { Entity, EntityProps } from '../base-interfaces-types-classes'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  ConnectProfileLanguage,
  EducationLevel,
  OccupationCategory,
  RediCourse,
  RediLocation,
  UserType,
} from './enums'
import { Gender } from './enums/gender.enum'

@ObjectType('ConProfile')
export class ConProfileEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string //* DONE

  @Field((type) => UserType)
  userType: UserType //* DONE

  @Field((type) => RediLocation)
  rediLocation: RediLocation //* DONE
  mentor_occupation?: string //* DONE
  mentor_workPlace?: string //* DONE
  expectations?: string //* DONE
  @Field((type) => OccupationCategory) //* DONE
  mentee_occupationCategoryId?: OccupationCategory //* DONE
  mentee_occupationJob_placeOfEmployment?: string //* DONE
  mentee_occupationJob_position?: string //* DONE
  mentee_occupationStudent_studyPlace?: string //* DONE
  mentee_occupationStudent_studyName?: string //* DONE
  mentee_occupationLookingForJob_what?: string //* DONE
  mentee_occupationOther_description?: string //* DONE
  @Field((type) => EducationLevel) //* DONE
  mentee_highestEducationLevel?: EducationLevel //* DONE
  @Field((type) => RediCourse) //* DONE
  mentee_currentlyEnrolledInCourse: RediCourse //* DONE
  profileAvatarImageS3Key?: string //* DONE

  firstName: string //* DONE
  lastName: string //* DONE
  @Field((type) => Gender) //* DONE
  gender?: Gender //* DONE
  birthDate?: Date //* DONE

  @Field((type) => [ConnectProfileLanguage])
  languages?: Array<ConnectProfileLanguage>
  personalDescription?: string
  linkedInProfileUrl?: string
  githubProfileUrl?: string
  slackUsername?: string
  telephoneNumber?: string
  // categories: Array<CategoryKey> //! REMOVE IN FAVOUR OF MENTORING TOPICS
  // favouritedRedProfileIds: Array<string> //! REPLACED BY NEW JUNCTION OBJECT
  optOutOfMenteesFromOtherRediLocation: boolean

  createdAt: Date
  updatedAt: Date
  // userActivated?: boolean //! REINSTATE, COMPLEX CASE
  userActivatedAt?: Date
}
