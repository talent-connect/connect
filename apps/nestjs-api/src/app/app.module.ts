import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CacheModule, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import {
  GraphqlInterceptor,
  SentryModule,
} from '@travelerdev/nestjs-sentry-graphql'
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
import { TpJobseekerCvEducationRecordsModule } from '../tp-jobseeker-cv-education-records/tp-jobseeker-cv-education-records.module'
import { TpJobseekerCvExperienceRecordsModule } from '../tp-jobseeker-cv-experience-records/tp-jobseeker-cv-experience-records.module'
import { TpJobseekerCvLanguageRecordsModule } from '../tp-jobseeker-cv-language-records/tp-jobseeker-cv-language-records.module'
import { TpJobseekerCvModule } from '../tp-jobseeker-cv/tp-jobseeker-cv.module'
import { TpJobseekerDirectoryEntriesModule } from '../tp-jobseeker-directory-entries/tp-jobseeker-directory-entries.module'
import { TpJobseekerProfileEducationRecordsModule } from '../tp-jobseeker-profile-education-records/tp-jobseeker-profile-education-records.module'
import { TpJobseekerProfileExperienceRecordsModule } from '../tp-jobseeker-profile-experience-records/tp-jobseeker-profile-experience-records.module'
import { TpJobseekerProfileLanguageRecordsModule } from '../tp-jobseeker-profile-language-records/tp-jobseeker-profile-language-records.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { UserContactModule } from '../user-contact/user-contact.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    SentryModule.forRoot({
      dsn: 'https://257e31f5f7d64850a10857fe626853b6@o4504842693836800.ingest.sentry.io/4504842714284032',
      debug: true, //! TODO: turn off for prod?
      environment: 'dev', //! TODO: customize to actual env
      release: 'some_release', //! TODO add me
      logLevels: ['debug'],
    }),
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
    TpJobseekerProfileExperienceRecordsModule,
    TpJobseekerProfileLanguageRecordsModule,
    TpJobseekerCvModule,
    TpJobseekerCvEducationRecordsModule,
    TpJobseekerCvExperienceRecordsModule,
    TpJobseekerCvLanguageRecordsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new GraphqlInterceptor(),
    },
  ],
})
export class AppModule {}
