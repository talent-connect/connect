import { Module } from '@nestjs/common'
import { ConProblemReportService } from './con-problem-report.service'
import { ConProblemReportResolver } from './con-problem-report.resolver'
import { EmailModule } from '../email/email.module'

@Module({
  providers: [ConProblemReportResolver, ConProblemReportService],
  imports: [EmailModule],
})
export class ConProblemReportModule {}
