import { Module } from '@nestjs/common'
import { AuthEntraIdController } from './auth-entra-id.controller'
import { AuthEntraIdService } from './auth-entra-id.service'

@Module({
  imports: [],
  controllers: [AuthEntraIdController],
  providers: [AuthEntraIdService, AuthEntraIdController],
  exports: [AuthEntraIdController]
})
export class AuthEntraIdModule {}
