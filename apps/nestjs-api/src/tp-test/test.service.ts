import { Injectable } from '@nestjs/common'
import { TpJobseekerProfileService } from '../tp-jobseeker-profile/tp-jobseeker-profile.service'

Injectable()
export class TestService {
  constructor(
    // private readonly api: SfApiTpJobseekerProfileEducationRecordsService,
    // private readonly mapper: TpJobseekerProfileEducationRecordMapper,
    private readonly tpJobseekerProfileService: TpJobseekerProfileService
  ) {
    console.log('constructing TestService')
    // console.log(api)
    // console.log(mapper)
    console.log(tpJobseekerProfileService)
  }

  async foo() {
    console.log('foo')
  }
}
