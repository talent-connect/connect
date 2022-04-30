import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AuthModule } from '../auth/auth.module'
import { ConMentoringSessionsModule } from '../con-mentoring-sessions/con-mentoring-sessions.module'
import { ConMentorshipMatchesModule } from '../con-mentorship-matches/con-mentorship-matches.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { TpCompanyProfilesModule } from '../tp-company-profiles/tp-company-profiles.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(__dirname, '..', '..', 'schema.gql'),
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      debug: true,
    }),
    ConProfilesModule,
    ConMentoringSessionsModule,
    ConMentorshipMatchesModule,
    TpCompanyProfilesModule,
    SalesforceApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
