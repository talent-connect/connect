import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConMentoringSessionsModule } from '../con-mentoring-sessions/con-mentoring-sessions.module'
import { ConMentorshipMatchesModule } from '../con-mentorship-matches/con-mentorship-matches.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { ReminderEmailsController } from './reminder-emails.controller'
import { ReminderEmailsService } from './reminder-emails.service'

@Module({
  imports: [
    SfApiModule,
    ConProfilesModule,
    ConMentorshipMatchesModule,
    ConMentoringSessionsModule,
    ConfigModule,
  ],
  controllers: [ReminderEmailsController],
  providers: [ReminderEmailsService],
})
export class ReminderEmailsModule {}
