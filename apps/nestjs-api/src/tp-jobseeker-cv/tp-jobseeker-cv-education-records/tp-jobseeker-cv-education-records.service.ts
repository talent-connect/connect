import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import {
  TpJobseekerCvEducationRecordEntity,
  TpJobseekerCvEducationRecordEntityProps,
  TpJobseekerCvEducationRecordMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUser } from '../../auth/current-user.decorator'
import { CurrentUserInfo } from '../../auth/current-user.interface'
import { SfApiTpJobseekerCvEducationRecordsService } from '../../salesforce-api/sf-api-tp-jobseeker-cv-education-records.service'
import { TpJobseekerCvReadService } from '../tp-jobseeker-cv.read.service'
import { TpJobseekerCvEducationRecordCreateInput } from './dtos/tp-jobseeker-cv-education-record-create.entityinput'
import { TpJobseekerCvEducationRecordDeleteInput } from './dtos/tp-jobseeker-cv-education-record-delete.entityinput'
import { TpJobseekerCvEducationRecordPatchInput } from './dtos/tp-jobseeker-cv-education-record-patch.entityinput'

@Injectable()
export class TpJobseekerCvEducationRecordsService {
  constructor(
    private readonly api: SfApiTpJobseekerCvEducationRecordsService,
    private readonly mapper: TpJobseekerCvEducationRecordMapper,
    private readonly cvReadService: TpJobseekerCvReadService
  ) {}

  async findAll(filter: any = {}) {
    const records =
      await this.api.getAllJobseekerCvLineItemsWithRecordTypeEducation(filter)

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
        'TpJobseekerCvEducationRecord not found with id: ' + id
      )
    }
  }

  async createFromInput(
    input: TpJobseekerCvEducationRecordCreateInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const cv = await this.cvReadService.findOne(input.tpJobseekerCvId)
    if (cv.props.userId !== currentUser.userId) {
      throw new UnauthorizedException(
        'You are not authorized to create a TpJobseekerCvLanguageRecord for this CV'
      )
    }

    const props = new TpJobseekerCvEducationRecordEntityProps()
    Object.assign(props, input)

    const entityToPersist = TpJobseekerCvEducationRecordEntity.create(props)

    return await this.create(entityToPersist)
  }

  async create(entity: TpJobseekerCvEducationRecordEntity) {
    const recordToPersist = this.mapper.toPersistence(entity)
    return await this.api.create(recordToPersist)
  }

  async patch(input: TpJobseekerCvEducationRecordPatchInput) {
    const existingEntity = await this.findOne(input.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerCvEducationRecordEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async delete(input: TpJobseekerCvEducationRecordDeleteInput) {
    const existingEntity = await this.findOne(input.id)
    const recordToDelete = this.mapper.toPersistence(existingEntity)
    await this.api.delete(recordToDelete)
  }
}
