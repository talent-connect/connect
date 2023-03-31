import { Injectable, NotFoundException } from '@nestjs/common'
import { TpJobseekerCvMapper } from '@talent-connect/common-types'
import { SfApiTpJobseekerCvService } from '../salesforce-api/sf-api-tp-jobseeker-cv.service'

@Injectable()
export class TpJobseekerCvReadService {
  constructor(
    private readonly api: SfApiTpJobseekerCvService,
    private readonly mapper: TpJobseekerCvMapper
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.findAll(filter)

    const entities = records.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findOne(id: string) {
    const entities = await this.findAll({
      Id: id,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerCv not found with id: ' + id)
    }
  }

  async findOneByUserId(userId: string) {
    const entities = await this.findAll({
      Contact__c: userId,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerCv not found')
    }
  }

  async findOneByFilter(filter: { [key: string]: any }) {
    const entities = await this.findAll(filter)
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerCv not found')
    }
  }
}
