import { Injectable } from '@nestjs/common'
import { EmailService } from '../email/email.service'
import { CreateConProblemReportInput } from './dto/create-con-problem-report.entityinput'

@Injectable()
export class ConProblemReportService {
  constructor(private readonly emailService: EmailService) {}

  async create(createConProblemReportInput: CreateConProblemReportInput) {
    this.emailService.sendMenteePendingReviewAcceptedEmail({
      recipient: 'eric@binarylights.com',
      firstName: 'Eric',
      rediLocation: 'berlin',
    })
  }
}
