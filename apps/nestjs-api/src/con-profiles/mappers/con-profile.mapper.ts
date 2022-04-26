import { Injectable } from '@nestjs/common'
import {
  ConnectProfileLanguage,
  ConProfileEntity,
  ConProfileEntityProps,
  ConProfilePersistence,
  EducationLevel,
  Gender,
  Mapper,
  OccupationCategory,
  RediCourse,
  RediLocation,
  UserType,
} from '@talent-connect/common-types'

@Injectable()
export class ConProfileMapper
  implements Mapper<ConProfileEntity, ConProfilePersistence>
{
  fromPersistence(raw: ConProfilePersistence): ConProfileEntity {
    const props = new ConProfileEntityProps()

    props.id = raw.props.Id
    props._contactId = raw.props.Contact__r.Id
    props.userType = raw.props.RecordType.DeveloperName as UserType
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

    const entity = ConProfileEntity.create(props)

    return entity
  }
}
