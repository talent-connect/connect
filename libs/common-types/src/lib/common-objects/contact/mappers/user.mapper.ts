import { Injectable } from '@nestjs/common'
import { Gender, Mapper } from '@talent-connect/common-types'
import { ContactRecord } from '../contact.record'
import { ContactRecordProps } from '../contact.recordprops'
import { UserEntity } from '../user.entity'
import { UserEntityProps } from '../user.entityprops'

@Injectable()
export class UserMapper implements Mapper<UserEntity, ContactRecord> {
  fromPersistence(raw: ContactRecord): UserEntity {
    const props = new UserEntityProps()

    props.id = raw.props.Id
    props.email = raw.props.Email
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

    props.birthDate = raw.props.ReDI_Birth_Date__c
    props.linkedInProfileUrl = raw.props.LinkedIn_Profile__c
    props.githubProfileUrl = raw.props.ReDI_GitHub_Profile__c
    props.slackUsername = raw.props.ReDI_Slack_Username__c

    props.behanceUrl = raw.props.ReDI_Behance_URL__c
    props.dribbbleUrl = raw.props.ReDI_Dribbble_URL__c
    props.stackOverflowUrl = raw.props.ReDI_Stack_Overflow_URL__c
    props.postalMailingAddress = raw.props.CON_TP_Mailing_Address__c

    props.telephoneNumber = raw.props.MobilePhone
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = UserEntity.create(props)

    return entity
  }

  public toPersistence(source: UserEntity): ContactRecord {
    const props = new ContactRecordProps()
    const srcProps = source.props

    props.Id = srcProps.id
    props.Email = srcProps.email
    props.Loopback_User_ID__c = srcProps.loopbackUserId
    props.FirstName = srcProps.firstName
    props.LastName = srcProps.lastName
    props.redi_Contact_Gender__c = srcProps.gender
    props.ReDI_Birth_Date__c = srcProps.birthDate
    props.LinkedIn_Profile__c = srcProps.linkedInProfileUrl
    props.ReDI_GitHub_Profile__c = srcProps.githubProfileUrl
    props.ReDI_Slack_Username__c = srcProps.slackUsername

    props.ReDI_Behance_URL__c = srcProps.behanceUrl
    props.ReDI_Dribbble_URL__c = srcProps.dribbbleUrl
    props.ReDI_Stack_Overflow_URL__c = srcProps.stackOverflowUrl
    props.CON_TP_Mailing_Address__c = srcProps.postalMailingAddress

    props.MobilePhone = srcProps.telephoneNumber
    props.CreatedDate = srcProps.createdAt
    props.LastModifiedDate = srcProps.updatedAt

    const record = ContactRecord.create(props)

    return record
  }
}
