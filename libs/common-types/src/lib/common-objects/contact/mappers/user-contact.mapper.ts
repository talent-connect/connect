import { Injectable } from '@nestjs/common'
import {
  FirstPointOfTpContactOption,
  Gender,
  Mapper,
} from '@talent-connect/common-types'
import { ContactRecord } from '../contact.record'
import { ContactRecordProps } from '../contact.recordprops'
import { UserContactEntity } from '../user-contact.entity'
import { UserContactEntityProps } from '../user-contact.entityprops'

@Injectable()
export class UserContactMapper
  implements Mapper<UserContactEntity, ContactRecord>
{
  fromPersistence(raw: ContactRecord): UserContactEntity {
    const props = new UserContactEntityProps()

    props.id = raw.props.Id
    props.email = raw.props.ReDI_Email_Address__c
    props.loopbackUserId = raw.props.Loopback_User_ID__c
    props.firstName = String(raw.props.FirstName)
    props.lastName = raw.props.LastName

    const contactGender = raw.props.redi_Contact_Gender__c
      ? raw.props.redi_Contact_Gender__c
          .toLocaleLowerCase()
          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
      : undefined
    if (['Male', 'Female', 'Other'].includes(String(contactGender))) {
      props.gender = contactGender as Gender
    } else {
      props.gender = undefined
    }

    props.genderPronouns = raw.props.ReDI_Gender_Pronouns__c

    props.birthDate = raw.props.ReDI_Birth_Date__c
    props.linkedInProfileUrl = raw.props.LinkedIn_Profile__c
    props.githubProfileUrl = raw.props.ReDI_GitHub_Profile__c
    props.slackUsername = raw.props.ReDI_Slack_Username__c

    props.behanceUrl = raw.props.ReDI_Behance_URL__c
    props.dribbbleUrl = raw.props.ReDI_Dribbble_URL__c
    props.personalWebsite = raw.props.ReDI_Website_Portfolio__c
    props.stackOverflowUrl = raw.props.ReDI_Stack_Overflow_URL__c
    props.twitterUrl = raw.props.ReDI_Twitter_URL__c
    props.postalMailingAddress = raw.props.CON_TP_Mailing_Address__c

    props.howDidHearAboutRediKey = raw.props
      .ReDI_First_Point_of_Contact_Talent_Pool__c as FirstPointOfTpContactOption
    props.howDidHearAboutRediOtherText =
      raw.props.ReDI_First_Point_of_Contact_Other_TP__c

    props.telephoneNumber = raw.props.MobilePhone
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = UserContactEntity.create(props)

    return entity
  }

  public toPersistence(source: UserContactEntity): ContactRecord {
    const props = new ContactRecordProps()
    const srcProps = source.props

    props.Id = srcProps.id
    props.ReDI_Email_Address__c = srcProps.email
    props.Loopback_User_ID__c = srcProps.loopbackUserId
    props.FirstName = srcProps.firstName
    props.LastName = srcProps.lastName
    props.redi_Contact_Gender__c = srcProps.gender
    props.ReDI_Gender_Pronouns__c = srcProps.genderPronouns
    props.ReDI_Birth_Date__c = srcProps.birthDate
    props.LinkedIn_Profile__c = srcProps.linkedInProfileUrl
    props.ReDI_GitHub_Profile__c = srcProps.githubProfileUrl
    props.ReDI_Slack_Username__c = srcProps.slackUsername

    props.ReDI_Behance_URL__c = srcProps.behanceUrl
    props.ReDI_Dribbble_URL__c = srcProps.dribbbleUrl
    props.ReDI_Website_Portfolio__c = srcProps.personalWebsite
    props.ReDI_Stack_Overflow_URL__c = srcProps.stackOverflowUrl
    props.ReDI_Twitter_URL__c = srcProps.twitterUrl
    props.CON_TP_Mailing_Address__c = srcProps.postalMailingAddress

    props.ReDI_First_Point_of_Contact_Talent_Pool__c =
      srcProps.howDidHearAboutRediKey
    props.ReDI_First_Point_of_Contact_Other_TP__c =
      srcProps.howDidHearAboutRediOtherText

    props.MobilePhone = srcProps.telephoneNumber
    props.CreatedDate = srcProps.createdAt
    props.LastModifiedDate = srcProps.updatedAt

    const record = ContactRecord.create(props)

    return record
  }
}
