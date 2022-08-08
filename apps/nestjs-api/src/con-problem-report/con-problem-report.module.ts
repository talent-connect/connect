import { Module } from '@nestjs/common'
import { ConMentorshipMatchesModule } from '../con-mentorship-matches/con-mentorship-matches.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { EmailModule } from '../email/email.module'
import { ConProblemReportResolver } from './con-problem-report.resolver'
import { ConProblemReportService } from './con-problem-report.service'

@Module({
  providers: [ConProblemReportResolver, ConProblemReportService],
  imports: [EmailModule, ConProfilesModule, ConMentorshipMatchesModule],
})
export class ConProblemReportModule {}
