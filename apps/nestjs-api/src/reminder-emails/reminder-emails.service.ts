import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ConnectProfileStatus,
  MentorshipMatchStatus,
  RediLocation,
  UserType,
} from '@talent-connect/common-types'
import * as AWS from 'aws-sdk'
import * as jsforce from 'jsforce'
import { ConMentorshipMatchesService } from '../con-mentorship-matches/con-mentorship-matches.service'
import { ConProfilesService } from '../con-profiles/con-profiles.service'
import { SfApiEmailTemplatesService } from '../salesforce-api/sf-api-email-templates.service'

const isProductionOrDemonstration = () =>
  ['production', 'demonstration', 'staging'].includes(process.env.NODE_ENV)

@Injectable()
export class ReminderEmailsService {
  private ses: AWS.SES

  constructor(
    private readonly emailTemplatesService: SfApiEmailTemplatesService,
    private readonly conProfilesService: ConProfilesService,
    private readonly conMentorshipMatchesService: ConMentorshipMatchesService,
    private readonly config: ConfigService
  ) {
    this.ses = new AWS.SES({
      accessKeyId: this.config.get('NX_EMAILER_AWS_ACCESS_KEY'),
      secretAccessKey: this.config.get('NX_EMAILER_AWS_SECRET_KEY'),
      region: this.config.get('NX_EMAILER_AWS_REGION'),
    })
  }

  async getDraftingConProfiles({ userType }: { userType: UserType }) {
    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - 14)

    return this.conProfilesService.findAll({
      'RecordType.DeveloperName': userType,
      Profile_Status__c: ConnectProfileStatus.DRAFTING_PROFILE,
      Created_Date_Without_Time__c: {
        $eq: jsforce.SfDate.toDateLiteral(createdDate),
      },
    })
  }

  async getApprovedMenteesWithNoMentorApplicationsByDaysAndLocation({
    daysAgo,
  }: {
    daysAgo: '7d' | '14d'
  }) {
    const approvedDate = new Date()
    approvedDate.setDate(approvedDate.getDate() - parseInt(daysAgo)) // Interestingly, parseInt is able to parse 7d and 14d to 7 and 14 respectively

    return this.conProfilesService.findAll({
      'RecordType.DeveloperName': UserType.MENTEE,
      Profile_Status__c: ConnectProfileStatus.APPROVED,
      Profile_First_Approved_At__c: {
        $eq: jsforce.SfDate.toDateLiteral(approvedDate),
      },
      'Contact__r.ReDI_Active_Mentorship_Matches_Mentee__c': null,
    })
  }

  async getConProfilesWithThreeMonthsOldMentorshipMatches() {
    const NinetyDaysAgo = new Date().setDate(new Date().getDate() - 90)

    const threeMonthsOldMentorshipMatches =
      await this.conMentorshipMatchesService.findAll({
        Status__c: MentorshipMatchStatus.ACCEPTED,
        Start_Date__c: {
          $eq: jsforce.SfDate.toDateLiteral(NinetyDaysAgo),
        },
      })

    const menteeIds = threeMonthsOldMentorshipMatches.map(
      (match) => match.props.menteeId
    )
    const mentorIds = threeMonthsOldMentorshipMatches.map(
      (match) => match.props.mentorId
    )

    if ([...menteeIds, ...mentorIds].length > 0) {
      return await this.conProfilesService.findAll({
        'Contact__r.Id': {
          $in: [...menteeIds, ...mentorIds],
        },
      })
    }

    return []
  }

  async sendCompleteProfileReminder({
    userType,
    email,
    firstName,
  }: {
    userType: UserType
    email: string
    firstName: string
  }) {
    const sfEmailTemplateDeveloperName =
      userType === UserType.MENTOR
        ? 'Mentor_Profile_Completion_Reminder_1711714790523'
        : userType === UserType.MENTEE
        ? 'Mentee_Profile_Completion_Reminder_1695974601621'
        : null

    const template = await this.emailTemplatesService.getEmailTemplate(
      sfEmailTemplateDeveloperName
    )

    if (!template) {
      throw new Error(
        `Email template not found: ${sfEmailTemplateDeveloperName}`
      )
    }

    const sanitizedHtml = template.HtmlValue.replace(
      /{{{Recipient\.FirstName}}}/g,
      `${firstName} ${email}`
    )

    const params = {
      Destination: {
        ToAddresses: isProductionOrDemonstration()
          ? ['anilakarsu93@gmail.com']
          : [this.config.get('NX_DEV_MODE_EMAIL_RECIPIENT')],
      },
      Message: {
        Body: {
          Html: { Data: sanitizedHtml },
        },
        Subject: { Data: template.Subject },
      },
      Source: 'career@redi-school.org',
    }

    this.ses.sendEmail(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else console.log(data)
    })

    return { message: 'Email sent' }
  }

  async sendApplyToMentorFirstReminder({ email, firstName, location }) {
    const sfEmailTemplateDeveloperName =
      location === RediLocation.CYBERSPACE
        ? 'Cyberspace_Mentee_Apply_To_A_Mentor_Reminder_1_1711037205143'
        : 'Mentee_Apply_To_A_Mentor_Reminder_1_1695975263767'

    const template = await this.emailTemplatesService.getEmailTemplate(
      sfEmailTemplateDeveloperName
    )

    if (!template) {
      throw new Error(
        `Email template not found: ${sfEmailTemplateDeveloperName}`
      )
    }

    const sanitizedHtml = template.HtmlValue.replace(
      /${menteeFirstName}/g,
      `${firstName}`
    ).replace(/{{{Recipient\.FirstName}}}/g, `${firstName} ${email}`)

    const params = {
      Destination: {
        ToAddresses: isProductionOrDemonstration()
          ? ['anilakarsu93@gmail.com']
          : [this.config.get('NX_DEV_MODE_EMAIL_RECIPIENT')],
      },
      Message: {
        Body: {
          Html: { Data: sanitizedHtml },
        },
        Subject: { Data: template.Subject },
      },
      Source: 'career@redi-school.org',
    }

    this.ses.sendEmail(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else console.log(data)
    })

    return { message: 'Email sent' }
  }

  async sendApplyToMentorSecondReminder({ email, firstName, location }) {
    const sfEmailTemplateDeveloperName =
      location === RediLocation.CYBERSPACE
        ? 'Cyberspace_Mentee_Apply_To_A_Mentor_Reminder_2_1711109460383'
        : 'Mentee_Apply_To_A_Mentor_Reminder_2_1695975868066'

    const template = await this.emailTemplatesService.getEmailTemplate(
      sfEmailTemplateDeveloperName
    )

    if (!template) {
      throw new Error(
        `Email template not found: ${sfEmailTemplateDeveloperName}`
      )
    }

    const sanitizedHtml = template.HtmlValue.replace(
      /{{{Recipient\.FirstName}}}/g,
      `${firstName} ${email}`
    )

    const params = {
      Destination: {
        ToAddresses: isProductionOrDemonstration()
          ? ['anilakarsu93@gmail.com']
          : [this.config.get('NX_DEV_MODE_EMAIL_RECIPIENT')],
      },
      Message: {
        Body: {
          Html: { Data: sanitizedHtml },
        },
        Subject: { Data: template.Subject },
      },
      Source: 'career@redi-school.org',
    }

    this.ses.sendEmail(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else console.log(data)
    })

    return { message: 'Email sent' }
  }

  async mentorshipFollowUpReminder({ email, firstName, userType }) {
    const sfEmailTemplateDeveloperName =
      userType === UserType.MENTOR
        ? 'Mentor_Follow_Up_On_Long_Term_Mentorship_1711363451370'
        : 'Mentee_Follow_Up_On_The_Long_Term_Mentorship_1711363823265'

    const template = await this.emailTemplatesService.getEmailTemplate(
      sfEmailTemplateDeveloperName
    )

    if (!template) {
      throw new Error(
        `Email template not found: ${sfEmailTemplateDeveloperName}`
      )
    }

    const sanitizedHtml = template.HtmlValue.replace(
      /{{{Recipient\.FirstName}}}/g,
      `${firstName} ${email}`
    )

    const params = {
      Destination: {
        ToAddresses: isProductionOrDemonstration()
          ? ['anilakarsu93@gmail.com']
          : [this.config.get('NX_DEV_MODE_EMAIL_RECIPIENT')],
      },
      Message: {
        Body: {
          Html: { Data: sanitizedHtml },
        },
        Subject: { Data: template.Subject },
      },
      Source: 'career@redi-school.org',
    }

    this.ses.sendEmail(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else console.log(data)
    })

    return { message: 'Email sent' }
  }
}
