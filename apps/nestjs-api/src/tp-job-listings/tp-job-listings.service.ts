import { Injectable, NotFoundException } from '@nestjs/common'
import { TpJobseekerProfileMapper } from '@talent-connect/common-types'
import { SfApiTpJobListingsService } from '../salesforce-api/sf-api-tp-job-listings.service'
import { FindAllVisibleTpJobListingsArgs } from './args/find-all-visible-tp-jobseeker-profiles.args'

@Injectable()
export class TpJobListingsService {
  constructor(
    private readonly api: SfApiTpJobListingsService,
    private readonly mapper: TpJobseekerProfileMapper
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.findAllJobListings(filter)

    const entities = records.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findAllVisibleJobListings(_filter: FindAllVisibleTpJobListingsArgs) {
    const filter: any = {}
    if (_filter.filter.relatesToPositions?.length > 0) {
      filter.Relates_to_Positions__c = {
        $includes: _filter.filter.relatesToPositions,
      }
    }
    if (_filter.filter.skills?.length > 0) {
      filter.Ideal_Technical_Skills__c = {
        $includes: _filter.filter.skills,
      }
    }
    if (_filter.filter.employmentTypes?.length > 0) {
      filter.Employment_Type__c = {
        $includes: _filter.filter.employmentTypes
      }
    }
    if (_filter.filter.federalStates?.length > 0) {


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
    if (_filter.filter.isJobFair2023Participant) {
      filter.Jobseeker_Profiles__r.Is_Job_Fair_2023_Participant__c = true
    }

    const entities = await this.findAll(filter)

    return entities.filter((entity) => {
      const isLanguagesQueryEmpty =
        !_filter.filter.desiredLanguages ||
        _filter.filter.desiredLanguages.length === 0
      if (isLanguagesQueryEmpty) return true

      const doesJobseekerWorkingLanguagesOverlapWithLanguagesQuery =
        entity.props.workingLanguages?.some((langObj) =>
          _filter.filter.desiredLanguages.includes(langObj.language)
        )

      return doesJobseekerWorkingLanguagesOverlapWithLanguagesQuery
    })
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

  async findOneByUserId(userId: string) {
    const entities = await this.findAll({
      Id: userId,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerProfile not found')
    }
  }
}
