import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserType } from '@talent-connect/common-types'
import { CronjobAuthGuard } from '../auth/cronjob-auth.guard'
import { ReminderEmailsService } from './reminder-emails.service'

@Controller('reminder-emails')
@UseGuards(CronjobAuthGuard)
export class ReminderEmailsController {
  constructor(private readonly reminderEmailsService: ReminderEmailsService) {}

  @Get('/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentors-complete-profile')
  async sendMentorCompleteProfileReminders() {
    const mentorsWithDraftingProfile =
      await this.reminderEmailsService.getDraftingConProfiles({
        userType: UserType.MENTOR,
      })

    if (mentorsWithDraftingProfile.length > 0) {
      // send reminder emails
      mentorsWithDraftingProfile.forEach(async (mentor) => {
        await this.reminderEmailsService.sendCompleteProfileReminder({
          userType: UserType.MENTOR,
          email: mentor.props.email,
          firstName: mentor.props.firstName,
        })
      })
    }

    return {
      message: `Complete Profile reminder emails sent to ${mentorsWithDraftingProfile.length} mentors`,
    }
  }

  @Get('/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentees-complete-profile')
  async sendMenteeCompleteProfileReminders() {
    const menteesWithDrafingProfile =
      await this.reminderEmailsService.getDraftingConProfiles({
        userType: UserType.MENTEE,
      })

    if (menteesWithDrafingProfile.length > 0) {
      // send reminder emails
      menteesWithDrafingProfile.forEach(async (mentor) => {
        await this.reminderEmailsService.sendCompleteProfileReminder({
          userType: UserType.MENTEE,
          email: mentor.props.email,
          firstName: mentor.props.firstName,
        })
      })
    }

    return {
      message: `Complete Profile reminder emails sent to ${menteesWithDrafingProfile.length} mentees`,
    }
  }

  /**
   * Following reminders are implemented but not working as expected.
   * They will be tested and fixed in the next iterations.
   */

  // @Get('/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentees-apply-to-mentor')
  // async sendMenteeApplyToMentorReminders() {
  //   const firstReminderMentees =
  //     await this.reminderEmailsService.getApprovedMenteesWithNoMentorApplicationsByDays(
  //       {
  //         daysAgo: '7d',
  //       }
  //     )

  //   if (firstReminderMentees.length > 0) {
  //     // send reminder emails
  //     firstReminderMentees.forEach(async (mentee) => {
  //       await this.reminderEmailsService.sendApplyToMentorFirstReminder({
  //         email: mentee.props.email,
  //         firstName: mentee.props.firstName,
  //         location: mentee.props.rediLocation,
  //       })
  //     })
  //   }

  //   const secondReminderMentees =
  //     await this.reminderEmailsService.getApprovedMenteesWithNoMentorApplicationsByDays(
  //       {
  //         daysAgo: '14d',
  //       }
  //     )

  //   if (secondReminderMentees.length > 0) {
  //     // send reminder emails
  //     secondReminderMentees.forEach(async (mentee) => {
  //       await this.reminderEmailsService.sendApplyToMentorSecondReminder({
  //         email: mentee.props.email,
  //         firstName: mentee.props.firstName,
  //         location: mentee.props.rediLocation,
  //       })
  //     })
  //   }

  //   return {
  //     message: `First reminder emails to apply to a mentor sent to ${firstReminderMentees.length} mentees. Second reminder emails to apply to a mentor sent to ${secondReminderMentees.length} mentees`,
  //   }
  // }

  @Get('/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentorship-follow-up')
  async sendMentorshipFollowUpReminders() {
    const threeMonthsOldMentorshipMatches =
      await this.reminderEmailsService.getThreeMonthsOldMentorshipMatches()

    if (Object.keys(threeMonthsOldMentorshipMatches).length > 0) {
      threeMonthsOldMentorshipMatches.forEach(async (match) => {
        // Send reminder email to mentee
        await this.reminderEmailsService.sendMentorshipFollowUpReminder({
          userType: UserType.MENTEE,
          email: match.menteeEmail,
          firstName: match.menteeFirstName,
          menteeOrMentorFirstName: match.mentorFirstName,
        })

        // Send reminder email to mentor
        await this.reminderEmailsService.sendMentorshipFollowUpReminder({
          userType: UserType.MENTOR,
          email: match.mentorEmail,
          firstName: match.mentorFirstName,
          menteeOrMentorFirstName: match.menteeFirstName,
        })
      })
    }

    return {
      message: `Follow-up reminder emails sent to ${
        Object.keys(threeMonthsOldMentorshipMatches).length
      } mentorship matches`,
    }
  }

  // @Get('/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentees-platform-and-new-mentors')
  // async sendUnmatchedMenteesReminder() {
  //   const unmatchedMenteesWithApprovedProfiles =
  //     await this.reminderEmailsService.getUnmatchedMenteesWithApprovedProfiles()

  //   if (unmatchedMenteesWithApprovedProfiles.length > 0) {
  //     // send reminder emails
  //     unmatchedMenteesWithApprovedProfiles.forEach(async (mentee) => {
  //       await this.reminderEmailsService.sendMenteesPlatformAndNewMentorsReminder(
  //         {
  //           email: mentee.props.email,
  //           firstName: mentee.props.firstName,
  //         }
  //       )
  //     })
  //   }

  //   return {
  //     message: `Reminder emails sent to ${unmatchedMenteesWithApprovedProfiles.length} unmatched mentees with approved profiles`,
  //   }
  // }

  // @Get('/s3cr3t-3ndp01nt-t0-tr1gg3r-r3m1nd3r5/mentoring-sessions-logging')
  // async sendMentoringSessionsLoggingReminder() {
  //   const conProfilesWithMentoringSessionsToLog =
  //     await this.reminderEmailsService.getConProfilesWithMentorshipMatchesWithoutMentoringSessions(
  //       { mentorshipMatchAgeInDays: 402 }
  //     )

  //   if (conProfilesWithMentoringSessionsToLog.length > 0) {
  //     // send reminder emails
  //     conProfilesWithMentoringSessionsToLog.forEach(async (profile) => {
  //       await this.reminderEmailsService.sendLogMentoringSessionsReminder({
  //         email: profile.props.email,
  //         firstName: profile.props.firstName,
  //         userType: profile.props.userType,
  //         mentorshipMatchAgeInDays: 14,
  //       })
  //     })
  //   }
  // }
}
