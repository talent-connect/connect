import { forwardRef, Module } from '@nestjs/common'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerProfileModule } from '../tp-jobseeker-profile/tp-jobseeker-profile.module'
import { TestService } from './test.service'

@Module({
  providers: [TestService],
  imports: [SfApiModule, forwardRef(() => TpJobseekerProfileModule)],
  exports: [],
})
export class Testmodule {}
