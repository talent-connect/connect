import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EntraIdConfigProvider } from './entra-id-config.provider'
import { EntraIdLoginMiddleware } from './entra-id-login.middleware'
import { EntraIdController } from './entra-id.controller'
import { EntraIdService } from './entra-id.service'

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [EntraIdController],
  providers: [EntraIdConfigProvider, EntraIdService, EntraIdLoginMiddleware],
})
export class EntraIdModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EntraIdLoginMiddleware)
      .forRoutes('auth/entra-id');
  }
}
