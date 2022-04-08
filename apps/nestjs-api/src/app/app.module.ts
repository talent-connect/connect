import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: true,
    }),
    ConProfilesModule,
    SalesforceApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
