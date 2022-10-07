import { Injectable, NotFoundException } from '@nestjs/common'
import {
  JobseekerProfileStatus,
  TpJobseekerProfileMapper,
} from '@talent-connect/common-types'
import { SfApiTpJobseekerProfilesService } from '../salesforce-api/sf-api-tp-jobseeker-profiles.service'
import { FindAllVisibleTpJobseekerProfilesArgs } from './args/find-all-visible-tp-jobseeker-profiles.args'

@Injectable()
export class TpJobseekerProfilesService {
  constructor(
    private readonly api: SfApiTpJobseekerProfilesService,
    private readonly mapper: TpJobseekerProfileMapper
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.findAllJobseekerProfiles(filter)

    const entities = records.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findAllVisibleJobseekers(
    _filter: FindAllVisibleTpJobseekerProfilesArgs
  ) {
    const filter: any = {
      Jobseeker_Profiles__r: {
        Profile_Status__c: JobseekerProfileStatus.PROFILE_APPROVED,
        Is_Visible_to_Companies__c: true,
      },
    }
    if (_filter.filter.name) {
      filter.Name = { $like: `%${_filter.filter.name}%` }
    }
    if (_filter.filter.desiredPositions?.length > 0) {
      filter.Jobseeker_Profiles__r.Desired_Positions__c = {
        $includes: _filter.filter.desiredPositions,
      }
    }
    if (_filter.filter.employmentTypes?.length > 0) {
      filter.Jobseeker_Profiles__r.Desired_Employment_Type__c = {
        $includes: _filter.filter.employmentTypes,
      }
    }
    if (_filter.filter.skills?.length > 0) {
      filter.Jobseeker_Profiles__r.Top_Skills__c = {
        $includes: _filter.filter.skills,
      }
    }
    if (_filter.filter.federalStates?.length > 0) {
      filter.Jobseeker_Profiles__r.Federal_State__c = {
        $in: _filter.filter.federalStates,
      }
    }
    if (_filter.filter.isJobFair2022Participant) {
      filter.Jobseeker_Profiles__r.Is_Job_Fair_2022_Participant__c = true
    }

    return this.findAll(filter)
  }

  async findOne(id: string) {
    const entities = await this.findAll({
      Id: id,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerProfile not found with id: ' + id)
    }
  }
}
