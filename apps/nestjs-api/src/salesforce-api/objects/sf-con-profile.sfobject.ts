import { Type } from 'class-transformer'
import { ConProfile } from '../../con-profiles/entities/con-profile.entity'
import { ConnectProfileLanguage } from '../../con-profiles/enums/connect-profile-language.enum'
import { EducationLevel } from '../../con-profiles/enums/education-level.enum'
import { Gender } from '../../con-profiles/enums/gender.enum'
import { OccupationCategory } from '../../con-profiles/enums/occupation-category.enum'
import { RediCourse } from '../../con-profiles/enums/redi-course.enum'
import { RediLocation } from '../../con-profiles/enums/redi-location.enum'
import { UserType } from '../../con-profiles/enums/user-type.enum'
import { SfContact } from './sf-contact.sfobject'
import { PicklistValue } from './types/picklist-value.type'
import { PicklistValues } from './types/picklist-values.type'
import { SfBaseObject } from './types/sf-base-object.interface'
import { ToDomainMapper } from './types/to-domain-mapper.interface'

export class SfConProfile implements SfBaseObject, ToDomainMapper<ConProfile> {
  readonly SALESFORCE_OBJECT_NAME = 'ReDI_Connect_Profile__c'
  readonly SALESFORCE_OBJECT_FIELDS = [
    'Id',
    'RecordType.DeveloperName', // Enum: MENTOR/MENTEE
    'Contact__r.FirstName',
    'Contact__r.LastName',
    'Contact__r.ReDI_Behance_URL__c',
    'Contact__r.ReDI_Birth_Date__c',
    'Contact__r.ReDI_Dribbble_URL__c',
    'Contact__r.ReDI_Preferred_Pronouns__c',
    'Contact__r.ReDI_Slack_Username__c',
    'Contact__r.ReDI_Stack_Overflow_URL__c',
    'Contact__r.LinkedIn_Profile__c',
    'Contact__r.ReDI_GitHub_Profile__c',
    'Contact__r.MobilePhone',
    'Contact__r.redi_Contact_Gender__c',
    'Avatar_Image_URL__c',
    'CreatedDate',
    'Desired_Job__c',
    'Education__c',
    'Expectations__c',
    'Job_Title__c',
    'Languages__c',
    'LastActivityDate',
    'LastModifiedDate',
    'Main_Occupation_Other__c',
    'Mentoring_Topics__c',
    'Name',
    'Occupation__c',
    'Occupation_Category__c',
    'Opt_Out_Mentees_From_Other_Locations__c',
    'Personal_Description__c',
    'Place_of_Employment__c',
    'Profile_First_Approved_At__c',
    'Profile_Status__c',
    'ReDI_Course__c',
    'ReDI_Location__c',
    'Study_Name__c',
    'Study_Place__c',
    'Work_Place__c',
  ]

  Id: string
  Avatar_Image_URL__c?: string
  @Type(() => Date)
  CreatedDate?: Date
  Desired_Job__c?: string
  Education__c?: PicklistValue
  Expectations__c?: string
  Job_Title__c?: string
  Languages__c?: string // comma-separated list of languages
  @Type(() => Date)
  LastModifiedDate: Date
  Main_Occupation_Other__c?: string
  Mentoring_Topics__c?: string
  Name: string
  Occupation__c?: string
  Occupation_Category__c?: PicklistValue
  @Type(() => Boolean)
  Opt_Out_Mentees_From_Other_Locations__c?: boolean
  Personal_Description__c?: string
  Place_of_Employment__c?: string
  Profile_First_Approved_At__c?: Date
  Profile_Status__c?: PicklistValue
  ReDI_Course__c: PicklistValue
  ReDI_Location__c: PicklistValue
  Study_Name__c?: string
  Study_Place__c?: string
  Work_Place__c?: string

  @Type(() => SfContact)
  Contact__r: SfContact

  RecordType: {
    DeveloperName: string
  }

  toDomain = () => {
    return {
      id: this.Id,
      userType: this.RecordType.DeveloperName as UserType,
      rediLocation: this.ReDI_Location__c as RediLocation,
      mentor_occupation: this.Occupation__c,
      mentor_workPlace: this.Work_Place__c,
      expectations: this.Expectations__c,
      mentee_occupationCategoryId: this
        .Occupation_Category__c as OccupationCategory,
      mentee_occupationJob_placeOfEmployment: this.Place_of_Employment__c,
      mentee_occupationJob_position: this.Job_Title__c,
      mentee_occupationStudent_studyPlace: this.Study_Place__c,
      mentee_occupationStudent_studyName: this.Study_Name__c,
      mentee_occupationLookingForJob_what: this.Desired_Job__c,
      mentee_occupationOther_description: this.Main_Occupation_Other__c,
      mentee_highestEducationLevel: this.Education__c as EducationLevel,
      mentee_currentlyEnrolledInCourse: this.ReDI_Course__c as RediCourse,
      profileAvatarImageS3Key: this.Avatar_Image_URL__c,

      firstName: String(this.Contact__r.FirstName),
      lastName: this.Contact__r.LastName,
      gender: this.Contact__r.redi_Contact_Gender__c as Gender,
      birthDate: this.Contact__r.ReDI_Birth_Date__c,
      languages:
        (this.Languages__c?.split(';') as ConnectProfileLanguage[]) ??
        undefined,
      personalDescription: this.Personal_Description__c,
      linkedInProfileUrl: this.Contact__r.LinkedIn_Profile__c,
      githubProfileUrl: this.Contact__r.ReDI_GitHub_Profile__c,
      slackUsername: this.Contact__r.ReDI_Slack_Username__c,
      telephoneNumber: this.Contact__r.MobilePhone,
      optOutOfMenteesFromOtherRediLocation:
        this.Opt_Out_Mentees_From_Other_Locations__c,
      createdAt: this.CreatedDate,
      updatedAt: this.LastModifiedDate,
      userActivatedAt: this.Profile_First_Approved_At__c,
    }
  }
}
