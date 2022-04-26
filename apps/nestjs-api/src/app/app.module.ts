import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ConMentoringSessionsModule } from '../con-mentoring-sessions/con-mentoring-sessions.module'
import { ConMentorshipMatchesModule } from '../con-mentorship-matches/con-mentorship-matches.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

console.log(join(__dirname, '..', '..', 'schema.gql'))
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
    ConProfilesModule,
    ConMentoringSessionsModule,
    ConMentorshipMatchesModule,
    SalesforceApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
