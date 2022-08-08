import { Module } from '@nestjs/common'
import { TpCurrentUserDataResolver } from './tp-current-user-data.resolver'

@Module({
  providers: [TpCurrentUserDataResolver],
})
export class TpCurrentUserDataModule {}
