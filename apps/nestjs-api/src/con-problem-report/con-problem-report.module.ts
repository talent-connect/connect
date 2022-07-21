import { Module } from '@nestjs/common'
import { ConProblemReportService } from './con-problem-report.service'
import { ConProblemReportResolver } from './con-problem-report.resolver'
import { EmailModule } from '../email/email.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { ConMentorshipMatchesModule } from '../con-mentorship-matches/con-mentorship-matches.module'

@Module({
  providers: [ConProblemReportResolver, ConProblemReportService],
  imports: [EmailModule, ConProfilesModule, ConMentorshipMatchesModule],
})
export class ConProblemReportModule {}
