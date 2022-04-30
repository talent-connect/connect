import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { SalesforceApiModule } from '../salesforce-api/salesforce-api.module'
import { GqlJwtAuthGuard } from './gql-jwt-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    SalesforceApiModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('NX_JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard, GqlJwtAuthGuard],
  exports: [JwtAuthGuard, GqlJwtAuthGuard],
})
export class AuthModule {}
