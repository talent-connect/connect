import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CacheModule, Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from '../auth/auth.module'
import { ConMenteeFavoritedMentorsModule } from '../con-mentee-favorited-mentors/con-mentee-favorited-mentors.module'
import { ConMentoringSessionsModule } from '../con-mentoring-sessions/con-mentoring-sessions.module'
import { ConMentorshipMatchesModule } from '../con-mentorship-matches/con-mentorship-matches.module'
import { ConProblemReportModule } from '../con-problem-report/con-problem-report.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { EmailModule } from '../email/email.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { SalesforceRecordEventsListenerModule } from '../salesforce-record-events-listener/salesforce-record-events-listener.module'
import { TpCompanyProfilesModule } from '../tp-company-profiles/tp-company-profiles.module'
import { TpCurrentUserDataModule } from '../tp-current-user-data/tp-current-user-data.module'
import { TpJobseekerDirectoryEntriesModule } from '../tp-jobseeker-directory-entries/tp-jobseeker-directory-entries.module'
import { TpJobseekerProfileEducationRecordsModule } from '../tp-jobseeker-profile-education-records/tp-jobseeker-profile-education-records.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { UserContactModule } from '../user-contact/user-contact.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(__dirname, '..', '..', 'schema.gql'),
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      debug: true,
    }),
    EventEmitterModule.forRoot(),
    CacheModule.register(),
    EmailModule,
    SfApiModule,
    SalesforceRecordEventsListenerModule,
    AuthModule,
    ConProfilesModule,
    ConMentoringSessionsModule,
    ConMentorshipMatchesModule,
    ConMenteeFavoritedMentorsModule,
    ConProblemReportModule,
    TpCompanyProfilesModule,
    TpJobseekerDirectoryEntriesModule,
    TpJobseekerProfileModule,
    TpCurrentUserDataModule,
    UserContactModule,
    TpJobseekerProfileEducationRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
