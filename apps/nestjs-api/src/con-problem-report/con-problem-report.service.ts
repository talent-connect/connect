import { Injectable } from '@nestjs/common'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { ConMentorshipMatchesService } from '../con-mentorship-matches/con-mentorship-matches.service'
import { ConProfilesService } from '../con-profiles/con-profiles.service'
import { EmailService } from '../email/email.service'
import { CreateConProblemReportInput } from './dto/create-con-problem-report.entityinput'

@Injectable()
export class ConProblemReportService {
  constructor(
    private readonly emailService: EmailService,
    private readonly profilesService: ConProfilesService,
    private readonly mentorshipMatchesService: ConMentorshipMatchesService
  ) {}

  async create(
    input: CreateConProblemReportInput,
    currentUser: CurrentUserInfo
  ) {
    this.emailService.sendReportProblemEmail({
      sendingUserEmail: currentUser.userProps.email,
      message: input.problemDescription,
    })

    if (input.ifFromMentor_cancelMentorshipImmediately) {
      await this.mentorshipMatchesService.cancelMentorshipFromProblemReport(
        currentUser.userId,
        input.reporteeId
      )

      const menteeProfile = await this.profilesService.findOne({
        'Contact__r.Id': input.reporteeId,
      })

      this.emailService.sendMentorCancelledMentorshipNotificationEmail({
        recipient: menteeProfile.props.email,
        firstName: menteeProfile.props.firstName,
      })
      this.emailService.sendToMentorConfirmationOfMentorshipCancelled({
        recipient: currentUser.userProps.email,
        mentorFirstName: currentUser.userProps.firstName,
        menteeFullName: menteeProfile.props.fullName,
      })
    }
  }
}
