import { Injectable } from '@nestjs/common'
import {
  sendReportProblemEmail,
  sendMenteePendingReviewAcceptedEmail,
} from './lib/email/email'

@Injectable()
export class EmailService {
  sendReportProblemEmail(params) {
    return sendReportProblemEmail(params).subscribe()
  }

  sendMenteePendingReviewAcceptedEmail(params) {
    return sendMenteePendingReviewAcceptedEmail(params).subscribe()
  }
}
