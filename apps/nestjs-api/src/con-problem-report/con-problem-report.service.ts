import { Injectable } from '@nestjs/common'
import { EmailService } from '../email/email.service'
import { CreateConProblemReportInput } from './dto/create-con-problem-report.entityinput'

@Injectable()
export class ConProblemReportService {
  constructor(private readonly emailService: EmailService) {}

  async create(createConProblemReportInput: CreateConProblemReportInput) {
    const lib = this.emailService.emailLib()
    console.log('tets')
  }
}
