import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ConnectProfileStatus,
  MentorshipMatchStatus,
  UserType,
} from '@talent-connect/common-types'
import * as AWS from 'aws-sdk'
import * as jsforce from 'jsforce'
import transform from 'lodash/transform'
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

  // async getApprovedMenteesWithNoMentorApplicationsByDays({
  //   daysAgo,
  // }: {
  //   daysAgo: '7d' | '14d'
  // }) {
  //   const approvedDate = new Date()
  //   approvedDate.setDate(approvedDate.getDate() - parseInt(daysAgo)) // Interestingly, parseInt is able to parse 7d and 14d to 7 and 14 respectively

  //   return this.conProfilesService.findAll({
  //     'RecordType.DeveloperName': UserType.MENTEE,
  //     Profile_Status__c: ConnectProfileStatus.APPROVED,
  //     Profile_First_Approved_At__c: {
  //       $eq: jsforce.SfDate.toDateLiteral(approvedDate),
  //     },
  //     // When there are no applications, this field is not 0 but null/undefined
  //     'Contact__r.ReDI_Active_Mentorship_Matches_Mentee__c': null,
  //   })
  // }

  async getThreeMonthsOldMentorshipMatches() {
    const threeMonthsOldMentorshipMatches =
      await this.conMentorshipMatchesService.findAll({
        Status__c: MentorshipMatchStatus.ACCEPTED,
        Mentorship_Match_Age_In_Days__c: 90,
      })

    const reducedMatches = threeMonthsOldMentorshipMatches.reduce(
      (acc, match) => {
        acc[match.props.id] = {
          menteeId: match.props.menteeId,
          mentorId: match.props.mentorId,
        }

        return acc
      },
      {}
    )

    const menteeIds = threeMonthsOldMentorshipMatches.map(
      (match) => match.props.menteeId
    )
    const mentorIds = threeMonthsOldMentorshipMatches.map(
      (match) => match.props.mentorId
    )

    let matchConProfiles = []

    if ([...menteeIds, ...mentorIds].length > 0) {
      matchConProfiles = await this.conProfilesService.findAll({
        'Contact__r.Id': {
          $in: [...menteeIds, ...mentorIds],
        },
      })
    }

    /**
     * Some holy moly is happening here. The idea is, transforming the map of mentorship matches
     * to a map of mentorship matches with the first names and emails of the mentee and mentor.
     * See here for lodash/transform: https://lodash.com/docs/4.17.15#transform
     */
    const transformedReducedMatches = transform(
      reducedMatches,
      (result, value, key) => {
        const mentee = matchConProfiles.find(
          (profile) => profile?.props.userId === value['menteeId']
        )

        const mentor = matchConProfiles.find(
          (profile) => profile?.props.userId === value['mentorId']
        )

        result[key] = {
          menteeFirstName: mentee?.props.firstName,
          menteeEmail: mentee?.props.email,
          mentorFirstName: mentor?.props.firstName,
          mentorEmail: mentor?.props.email,
        }
      },
      []
    )

    return transformedReducedMatches
  }

  // async getUnmatchedMenteesWithApprovedProfiles() {
  //   const approvedDate = new Date()
  //   approvedDate.setDate(approvedDate.getDate() - 45) // Interestingly, parseInt is able to parse 7d and 14d to 7 and 14 respectively

  //   return await this.conProfilesService.findAll({
  //     'RecordType.DeveloperName': UserType.MENTEE,
  //     Profile_Status__c: ConnectProfileStatus.APPROVED,
  //     Profile_First_Approved_At__c: {
  //       $eq: jsforce.SfDate.toDateLiteral(approvedDate),
  //     },
  //     'Contact__r.ReDI_Active_Mentorship_Matches_Mentee__c': null,
  //   })
  // }

  // async getConProfilesWithMentorshipMatchesWithoutMentoringSessions({
  //   mentorshipMatchAgeInDays,
  // }: {
  //   mentorshipMatchAgeInDays: number
  // }) {
  //   const matches = await this.conMentorshipMatchesService.findAll({
  //     Status__c: MentorshipMatchStatus.ACCEPTED,
  //     Mentorship_Match_Age_In_Days__c: mentorshipMatchAgeInDays,
  //     of_Sessions__c: 0,
  //   })

  //   const menteeIds = matches.map((match) => match.props.menteeId)
  //   const mentorIds = matches.map((match) => match.props.mentorId)

  //   if ([...menteeIds, ...mentorIds].length > 0) {
  //     return await this.conProfilesService.findAll({
  //       'Contact__r.Id': {
  //         $in: [...menteeIds, ...mentorIds],
  //       },
  //     })
  //   }

  //   return []
  // }

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
      `${firstName}`
    )

    const params = {
      Destination: {
        ToAddresses: isProductionOrDemonstration()
          ? [email]
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

  // async sendApplyToMentorFirstReminder({ email, firstName, location }) {
  //   const sfEmailTemplateDeveloperName =
  //     location === RediLocation.CYBERSPACE
  //       ? 'Cyberspace_Mentee_Apply_To_A_Mentor_Reminder_1_1711037205143'
  //       : 'Mentee_Apply_To_A_Mentor_Reminder_1_1695975263767'

  //   const template = await this.emailTemplatesService.getEmailTemplate(
  //     sfEmailTemplateDeveloperName
  //   )

  //   if (!template) {
  //     throw new Error(
  //       `Email template not found: ${sfEmailTemplateDeveloperName}`
  //     )
  //   }

  //   const sanitizedSubject = template.Subject.replace(
  //     /\${menteeFirstName}/g,
  //     `${firstName}`
  //   )

  //   const sanitizedHtml = template.HtmlValue.replace(
  //     /\${menteeFirstName}/g,
  //     `${firstName}`
  //   ).replace(/{{{Recipient\.FirstName}}}/g, `${firstName}`)

  //   const params = {
  //     Destination: {
  //       ToAddresses: isProductionOrDemonstration()
  //         ? [email]
  //         : [this.config.get('NX_DEV_MODE_EMAIL_RECIPIENT')],
  //     },
  //     Message: {
  //       Body: {
  //         Html: { Data: sanitizedHtml },
  //       },
  //       Subject: { Data: sanitizedSubject },
  //     },
  //     Source: 'career@redi-school.org',
  //   }

  //   this.ses.sendEmail(params, (err, data) => {
  //     if (err) console.log(err, err.stack)
  //     else console.log(data)
  //   })

  //   return { message: 'Email sent' }
  // }

  // async sendApplyToMentorSecondReminder({ email, firstName, location }) {
  //   const sfEmailTemplateDeveloperName =
  //     location === RediLocation.CYBERSPACE
  //       ? 'Cyberspace_Mentee_Apply_To_A_Mentor_Reminder_2_1711109460383'
  //       : 'Mentee_Apply_To_A_Mentor_Reminder_2_1695975868066'

  //   const template = await this.emailTemplatesService.getEmailTemplate(
  //     sfEmailTemplateDeveloperName
  //   )

  //   if (!template) {
  //     throw new Error(
  //       `Email template not found: ${sfEmailTemplateDeveloperName}`
  //     )
  //   }

  //   const sanitizedHtml = template.HtmlValue.replace(
  //     /{{{Recipient\.FirstName}}}/g,
  //     `${firstName}`
  //   )

  //   const params = {
  //     Destination: {
  //       ToAddresses: isProductionOrDemonstration()
  //         ? [email]
  //         : [this.config.get('NX_DEV_MODE_EMAIL_RECIPIENT')],
  //     },
  //     Message: {
  //       Body: {
  //         Html: { Data: sanitizedHtml },
  //       },
  //       Subject: { Data: template.Subject },
  //     },
  //     Source: 'career@redi-school.org',
  //   }

  //   this.ses.sendEmail(params, (err, data) => {
  //     if (err) console.log(err, err.stack)
  //     else console.log(data)
  //   })

  //   return { message: 'Email sent' }
  // }

  async sendMentorshipFollowUpReminder({
    email,
    firstName,
    menteeOrMentorFirstName,
    userType,
  }) {
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
      firstName
    )
      .replace(/\${menteeFirstName}/g, menteeOrMentorFirstName)
      .replace(/\${mentorFirstName}/g, menteeOrMentorFirstName)

    const params = {
      Destination: {
        ToAddresses: isProductionOrDemonstration()
          ? [email]
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

  // async sendMenteesPlatformAndNewMentorsReminder({ email, firstName }) {
  //   const sfEmailTemplateDeveloperName =
  //     'Mentee_Platform_And_New_Mentors_Reminder_1711367982313'

  //   const template = await this.emailTemplatesService.getEmailTemplate(
  //     sfEmailTemplateDeveloperName
  //   )

  //   if (!template) {
  //     throw new Error(
  //       `Email template not found: ${sfEmailTemplateDeveloperName}`
  //     )
  //   }

  //   const sanitizedHtml = template.HtmlValue.replace(
  //     /{{{Recipient\.FirstName}}}/g,
  //     `${firstName} ${email}`
  //   )

  //   const params = {
  //     Destination: {
  //       ToAddresses: isProductionOrDemonstration()
  //         ? ['anilakarsu93@gmail.com']
  //         : [this.config.get('NX_DEV_MODE_EMAIL_RECIPIENT')],
  //     },
  //     Message: {
  //       Body: {
  //         Html: { Data: sanitizedHtml },
  //       },
  //       Subject: { Data: template.Subject },
  //     },
  //     Source: 'career@redi-school.org',
  //   }

  //   this.ses.sendEmail(params, (err, data) => {
  //     if (err) console.log(err, err.stack)
  //     else console.log(data)
  //   })

  //   return { message: 'Email sent' }
  // }

  // async sendLogMentoringSessionsReminder({
  //   email,
  //   firstName,
  //   userType,
  //   mentorshipMatchAgeInDays,
  // }) {
  //   const sfEmailTemplateDeveloperName =
  //     userType === UserType.MENTOR
  //       ? // Mentor Emails for 2 and 4 weeks
  //         mentorshipMatchAgeInDays === 14
  //         ? 'Mentor_Log_Mentoring_Sessions_Reminder_1_1711110740940'
  //         : 'Mentor_Log_Mentoring_Sessions_Reminder_2_1711112496532'
  //       : // Mentee Emails for 2 and 4 weeks
  //       mentorshipMatchAgeInDays === 14
  //       ? 'Mentee_Log_Mentoring_Sessions_Reminder_1_1711114670729'
  //       : 'Mentee_Log_Mentoring_Sessions_Reminder_2_1711115347143'

  //   const template = await this.emailTemplatesService.getEmailTemplate(
  //     sfEmailTemplateDeveloperName
  //   )

  //   if (!template) {
  //     throw new Error(
  //       `Email template not found: ${sfEmailTemplateDeveloperName}`
  //     )
  //   }

  //   const sanitizedHtml = template.HtmlValue.replace(
  //     /{{{Recipient\.FirstName}}}/g,
  //     `${firstName} ${email}`
  //   )

  //   const params = {
  //     Destination: {
  //       ToAddresses: isProductionOrDemonstration()
  //         ? ['anilakarsu93@gmail.com']
  //         : [this.config.get('NX_DEV_MODE_EMAIL_RECIPIENT')],
  //     },
  //     Message: {
  //       Body: {
  //         Html: { Data: sanitizedHtml },
  //       },
  //       Subject: { Data: template.Subject },
  //     },
  //     Source: 'career@redi-school.org',
  //   }

  //   this.ses.sendEmail(params, (err, data) => {
  //     if (err) console.log(err, err.stack)
  //     else console.log(data)
  //   })

  //   return { message: 'Email sent' }
  // }
}
