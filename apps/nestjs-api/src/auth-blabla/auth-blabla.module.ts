import { Module } from '@nestjs/common'
import { AuthBlablaController } from './auth-blabla.controller'

@Module({
  controllers: [AuthBlablaController],
  providers: [AuthBlablaController],
  exports: [AuthBlablaController],
})
export class AuthBlablaModule {}
