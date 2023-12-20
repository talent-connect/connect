import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EntraIdConfigProvider } from './entra-id-config.provider'
import { EntraIdController } from './entra-id.controller'
import { EntraIdService } from './entra-id.service'

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [EntraIdController],
  providers: [EntraIdConfigProvider, EntraIdService],
})
export class EntraIdModule {}
