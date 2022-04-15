import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseDomainModel } from '../../core/models/generics/base-domain.model'
import { ConnectProfileLanguage } from '../enums/connect-profile-language.enum'
import { EducationLevel } from '../enums/education-level.enum'
import { Gender } from '../enums/gender.enum'
import { OccupationCategory } from '../enums/occupation-category.enum'
import { RediCourse } from '../enums/redi-course.enum'
import { RediLocation } from '../enums/redi-location.enum'
import { UserType } from '../enums/user-type.enum'
import { Contact } from './contact.entity'

@ObjectType()
export class ConProfile extends BaseDomainModel {
  @Field((type) => ID)
  id: string //* DONE

  @Field((type) => UserType)
  userType: UserType //* DONE

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
  profileAvatarImageS3Ke?: string //* DONE

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
