import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import {
  TpJobseekerProfileLanguageRecordEntity,
  TpJobseekerProfileLanguageRecordEntityProps,
  TpJobseekerProfileLanguageRecordMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiTpContactLanguageRecordsService } from '../salesforce-api/sf-api-tp-jobseeker-profile-language-records.service'
import { TpJobseekerProfileService } from '../tp-jobseeker-profile/tp-jobseeker-profile.service'
import { TpJobseekerProfileLanguageRecordCreateInput } from './dtos/tp-jobseeker-profile-language-record-create.entityinput'
import { TpJobseekerProfileLanguageRecordDeleteInput } from './dtos/tp-jobseeker-profile-language-record-delete.entityinput'
import { TpJobseekerProfileLanguageRecordPatchInput } from './dtos/tp-jobseeker-profile-language-record-patch.entityinput'

@Injectable()
export class TpJobseekerProfileLanguageRecordsService {
  constructor(
    private readonly api: SfApiTpContactLanguageRecordsService,
    private readonly mapper: TpJobseekerProfileLanguageRecordMapper,
    private readonly tpJobseekerProfileService: TpJobseekerProfileService
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.getAll(filter)

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
      throw new NotFoundException(
        'TpJobseekerProfileLanguageRecord not found with id: ' + id
      )
    }
  }

  async create(
    input: TpJobseekerProfileLanguageRecordCreateInput,
    user: CurrentUserInfo
  ) {
    const props = new TpJobseekerProfileLanguageRecordEntityProps()
    Object.assign(props, input)

    props.userId = user.userId

    const entityToPersist = TpJobseekerProfileLanguageRecordEntity.create(props)
    const recordToPersist = this.mapper.toPersistence(entityToPersist)

    return await this.api.create(recordToPersist)
  }

  async patch(
    input: TpJobseekerProfileLanguageRecordPatchInput,
    currentUser: CurrentUserInfo
  ) {
    const existingEntity = await this.findOne(input.id)

    if (existingEntity.props.userId !== currentUser.userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this record'
      )
    }

    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerProfileLanguageRecordEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(
    input: TpJobseekerProfileLanguageRecordDeleteInput,
    currentUser: CurrentUserInfo
  ) {
    const existingEntity = await this.findOne(input.id)

    if (existingEntity.props.userId !== currentUser.userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this record'
      )
    }

    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}
