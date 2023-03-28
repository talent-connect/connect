import { Module } from '@nestjs/common'
import { TpJobseekerDirectoryEntryMapper } from '@talent-connect/common-types'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { TpJobseekerDirectoryEntriesResolver } from './tp-jobseeker-directory-entries.resolver'
import { TpJobseekerDirectoryEntriesService } from './tp-jobseeker-directory-entries.service'

@Module({
  providers: [
    TpJobseekerDirectoryEntriesResolver,
    TpJobseekerDirectoryEntriesService,
    TpJobseekerDirectoryEntryMapper,
  ],
  imports: [SfApiModule],
  exports: [TpJobseekerDirectoryEntriesService],
})
export class TpJobseekerDirectoryEntriesModule {}
