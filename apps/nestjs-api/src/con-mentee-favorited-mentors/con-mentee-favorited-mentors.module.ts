import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { ConMenteeFavoritedMentorsResolver } from './con-mentee-favorited-mentors.resolver'
import { ConMenteeFavoritedMentorsService } from './con-mentee-favorited-mentors.service'
import { ConMenteeFavoritedMentorMapper } from './mappers/con-mentee-favorited-mentor.mapper'

@Module({
  imports: [SfApiModule, AuthModule, ConProfilesModule],
  providers: [
    ConMenteeFavoritedMentorsResolver,
    ConMenteeFavoritedMentorsService,
    ConMenteeFavoritedMentorMapper,
  ],
  exports: [],
})
export class ConMenteeFavoritedMentorsModule {}
