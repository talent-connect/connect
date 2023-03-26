import { Injectable } from '@nestjs/common'
import {
  sendMenteePendingReviewAcceptedEmail,
  sendMenteeSignupCompleteEmail,
  sendMentorCancelledMentorshipNotificationEmail,
  sendMentoringSessionLoggedEmail,
  sendMentorPendingReviewAcceptedEmail,
  sendMentorshipAcceptedEmail,
  sendMentorshipCompletionEmailToMentee,
  sendMentorshipCompletionEmailToMentor,
  sendMentorshipDeclinedEmail,
  sendMentorshipRequestReceivedEmail,
  sendMentorSignupCompleteEmail,
  sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted,
  sendPendingReviewDeclinedEmail,
  sendReportProblemEmail,
  sendToMentorConfirmationOfMentorshipCancelled,
} from './lib/email/email'

import {
  sendCompanySignupForExistingCompanyCompleteEmail,
  sendCompanySignupForNewCompanyCompleteEmail,
  sendJobseekerProfileApprovedEmail,
  sendJobseekerSignupCompleteEmail,
  sendTpCompanyProfileApprovedEmail,
} from './lib/email/tp-email'

@Injectable()
export class EmailService {
  sendReportProblemEmail(params) {
    return sendReportProblemEmail(params).subscribe()
  }

  sendMentorCancelledMentorshipNotificationEmail(params) {
    return sendMentorCancelledMentorshipNotificationEmail(params).subscribe()
  }

  sendToMentorConfirmationOfMentorshipCancelled(params) {
    return sendToMentorConfirmationOfMentorshipCancelled(params).subscribe()
  }

  sendMenteePendingReviewAcceptedEmail(params) {
    return sendMenteePendingReviewAcceptedEmail(params).subscribe()
  }

  sendMentorPendingReviewAcceptedEmail(params) {
    return sendMentorPendingReviewAcceptedEmail(params).subscribe()
  }

  sendPendingReviewDeclinedEmail(params) {
    return sendPendingReviewDeclinedEmail(params).subscribe()
  }

  sendMentorshipRequestReceivedEmail(params) {
    return sendMentorshipRequestReceivedEmail(params).subscribe()
  }

  sendMentorshipCompletionEmailToMentor(params) {
    return sendMentorshipCompletionEmailToMentor(params).subscribe()
  }
  sendMentorshipCompletionEmailToMentee(params) {
    return sendMentorshipCompletionEmailToMentee(params).subscribe()
  }

  sendMentorshipAcceptedEmail(params) {
    return sendMentorshipAcceptedEmail(params).subscribe()
  }
  sendMentorshipDeclinedEmail(params) {
    return sendMentorshipDeclinedEmail(params).subscribe()
  }

  sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted(
    params
  ) {
    return sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted(
      params
    ).subscribe()
  }

  sendMentoringSessionLoggedEmail(params) {
    return sendMentoringSessionLoggedEmail(params).subscribe()
  }

  sendMenteeSignupCompleteEmail(params) {
    return sendMenteeSignupCompleteEmail(params).subscribe()
  }

  sendMentorSignupCompleteEmail(params) {
    return sendMentorSignupCompleteEmail(params).subscribe()
  }

  sendCompanySignupForNewCompanyCompleteEmail(params) {
    return sendCompanySignupForNewCompanyCompleteEmail(params).subscribe()
  }
  sendCompanySignupForExistingCompanyCompleteEmail(params) {
    return sendCompanySignupForExistingCompanyCompleteEmail(params).subscribe()
  }
  sendJobseekerSignupCompleteEmail(params) {
    return sendJobseekerSignupCompleteEmail(params).subscribe()
  }
  sendTpCompanyProfileApprovedEmail(params) {
    return sendTpCompanyProfileApprovedEmail(params).subscribe()
  }
  sendJobseekerProfileApprovedEmail(params) {
    return sendJobseekerProfileApprovedEmail(params).subscribe()
  }
}
