import { Module } from '@nestjs/common'
import { ConProfilesService } from './con-profiles.service'
import { ConProfilesResolver } from './con-profiles.resolver'

@Module({
  providers: [ConProfilesResolver, ConProfilesService],
})
export class ConProfilesModule {}
