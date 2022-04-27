import { Injectable } from '@nestjs/common'
import {
  ConnectProfileLanguage,
  ConProfileEntity,
  ConProfileEntityProps,
  ConProfilePersistence,
  ConProfilePersistenceProps,
  EducationLevel,
  Gender,
  Mapper,
  OccupationCategory,
  RediCourse,
  RediLocation,
  UserType,
} from '@talent-connect/common-types'
import { CategoryKey } from '@talent-connect/shared-config'
import { MentoringTopic } from 'libs/common-types/src/lib/con-profile/enums/mentoring-topic.enum'

@Injectable()
export class ConProfileMapper
  implements Mapper<ConProfileEntity, ConProfilePersistence>
{
  fromPersistence(raw: ConProfilePersistence): ConProfileEntity {
    const props = new ConProfileEntityProps()

    props.id = raw.props.Id
    props.userType = raw.props.RecordType.DeveloperName as UserType
    props.loopbackUserId = raw.props.Contact__r.Loopback_User_ID__c
    props.rediLocation = raw.props.ReDI_Location__c as RediLocation
    props.mentor_occupation = raw.props.Occupation__c
    props.mentor_workPlace = raw.props.Work_Place__c
    props.expectations = raw.props.Expectations__c
    props.mentee_occupationCategoryId = raw.props
      .Occupation_Category__c as OccupationCategory
    props.mentee_occupationJob_placeOfEmployment =
      raw.props.Place_of_Employment__c
    props.mentee_occupationJob_position = raw.props.Job_Title__c
    props.mentee_occupationStudent_studyPlace = raw.props.Study_Place__c
    props.mentee_occupationStudent_studyName = raw.props.Study_Name__c
    props.mentee_occupationLookingForJob_what = raw.props.Desired_Job__c
    props.mentee_occupationOther_description =
      raw.props.Main_Occupation_Other__c
    props.mentee_highestEducationLevel = raw.props
      .Education__c as EducationLevel
    props.mentee_currentlyEnrolledInCourse = raw.props
      .ReDI_Course__c as RediCourse
    props.profileAvatarImageS3Key = raw.props.Avatar_Image_URL__c

    props.firstName = String(raw.props.Contact__r.FirstName)
    props.lastName = raw.props.Contact__r.LastName

    const contactGender = raw.props.Contact__r.redi_Contact_Gender__c
      ? raw.props.Contact__r.redi_Contact_Gender__c
          .toLocaleLowerCase()
          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
      : undefined
    if (['Male', 'Female', 'Other'].includes(contactGender)) {
      props.gender = contactGender as Gender
    } else {
      props.gender = undefined
    }

    props.birthDate = raw.props.Contact__r.ReDI_Birth_Date__c
    props.languages =
      (raw.props.Languages__c?.split(';') as ConnectProfileLanguage[]) ??
      undefined
    props.personalDescription = raw.props.Personal_Description__c
    props.linkedInProfileUrl = raw.props.Contact__r.LinkedIn_Profile__c
    props.githubProfileUrl = raw.props.Contact__r.ReDI_GitHub_Profile__c
    props.slackUsername = raw.props.Contact__r.ReDI_Slack_Username__c
    props.telephoneNumber = raw.props.Contact__r.MobilePhone
    props.optOutOfMenteesFromOtherRediLocation =
      raw.props.Opt_Out_Mentees_From_Other_Locations__c
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate
    props.userActivatedAt = raw.props.Profile_First_Approved_At__c

    props.categories =
      (raw.props.Mentoring_Topics__c?.split(';') as MentoringTopic[]) ?? []

    const entity = ConProfileEntity.create(props)

    return entity
  }

  public toPersistence(source: ConProfileEntity): ConProfilePersistence {
    const props = new ConProfilePersistenceProps()
    const srcProps = source.props

    props.Id = srcProps.id
    // props.RecordType.DeveloperName = srcProps.RecordType.userType
    props.Contact__r.Loopback_User_ID__c = srcProps.loopbackUserId
    props.ReDI_Location__c = srcProps.rediLocation
    props.Occupation__c = srcProps.mentor_occupation
    props.Work_Place__c = srcProps.mentor_workPlace
    props.Expectations__c = srcProps.expectations
    props.Occupation_Category__c = srcProps.mentee_occupationCategoryId
    props.Place_of_Employment__c =
      srcProps.mentee_occupationJob_placeOfEmployment
    props.Job_Title__c = srcProps.mentee_occupationJob_position
    props.Study_Place__c = srcProps.mentee_occupationStudent_studyPlace
    props.Study_Name__c = srcProps.mentee_occupationStudent_studyName
    props.Desired_Job__c = srcProps.mentee_occupationLookingForJob_what
    props.Main_Occupation_Other__c = srcProps.mentee_occupationOther_description
    props.Education__c = srcProps.mentee_highestEducationLevel
    props.ReDI_Course__c = srcProps.mentee_currentlyEnrolledInCourse
    props.Avatar_Image_URL__c = srcProps.profileAvatarImageS3Key

    props.Contact__r.FirstName = srcProps.firstName
    props.Contact__r.LastName = srcProps.lastName
    props.Contact__r.redi_Contact_Gender__c = srcProps.gender

    props.Contact__r.ReDI_Birth_Date__c = srcProps.birthDate
    props.Languages__c = srcProps.languages?.join(';')
    props.Personal_Description__c = srcProps.personalDescription
    props.Contact__r.LinkedIn_Profile__c = srcProps.linkedInProfileUrl
    props.Contact__r.ReDI_GitHub_Profile__c = srcProps.githubProfileUrl
    props.Contact__r.ReDI_Slack_Username__c = srcProps.slackUsername
    props.Contact__r.MobilePhone = srcProps.telephoneNumber
    props.Opt_Out_Mentees_From_Other_Locations__c =
      srcProps.optOutOfMenteesFromOtherRediLocation
    props.CreatedDate = srcProps.createdAt
    props.LastModifiedDate = srcProps.updatedAt
    props.Profile_First_Approved_At__c = srcProps.userActivatedAt

    props.Mentoring_Topics__c = srcProps.categories?.join(';')

    const persistence = ConProfilePersistence.create(props)

    return persistence
  }
}
