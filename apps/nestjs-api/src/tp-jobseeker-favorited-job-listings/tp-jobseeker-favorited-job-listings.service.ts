import { Injectable, NotFoundException } from '@nestjs/common'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiRepository } from '../salesforce-api/sf-api.repository'
import { TpJobseekerProfileService } from '../tp-jobseeker-profile/tp-jobseeker-profile.service'
import { TpJobseekerFavoritedJobListingCreateMutationInputDto } from './dtos/tp-jobseeker-favorited-job-listing-create.mutation-dtos'
import { TpJobseekerFavoritedJobListingDeleteMutationInputDto } from './dtos/tp-jobseeker-favorited-job-listing-delete.mutation-dtos'
import { TpJobseekerFavoritedJobListingMapper } from './mappers/tp-jobseeker-favorited-job-listing.mapper'
import { TpJobseekerFavoritedJobListingEntity } from './tp-jobseeker-favorited-job-listing.entity'
import { TpJobseekerFavoritedJobListingEntityProps } from './tp-jobseeker-favorited-job-listing.entityprops'
import { TpJobseekerFavoritedJobListingRecord } from './tp-jobseeker-favorited-job-listing.record'

@Injectable()
export class TpJobseekerFavoritedJobListingsService {
  constructor(
    private readonly repository: SfApiRepository,
    private readonly tpJobseekerProfilesService: TpJobseekerProfileService,
    private readonly mapper: TpJobseekerFavoritedJobListingMapper
  ) {}

  async create(
    input: TpJobseekerFavoritedJobListingCreateMutationInputDto,
    user: CurrentUserInfo
  ) {
    const props = new TpJobseekerFavoritedJobListingEntityProps()
    const currentUserTpJobseekerProfile =
      await this.tpJobseekerProfilesService.findOneByUserId(user.userId)
    props.tpJobseekerProfileId = currentUserTpJobseekerProfile.props.id
    props.tpJobListingId = input.tpJoblistingId

    const entityToPersist = TpJobseekerFavoritedJobListingEntity.create(props)
    const recordToPersist = this.mapper.toPersistence(entityToPersist)

    await this.repository.createRecord(
      TpJobseekerFavoritedJobListingRecord.metadata.SALESFORCE_OBJECT_NAME,
      recordToPersist.props
    )

    return { ok: true }
  }

  async delete(
    input: TpJobseekerFavoritedJobListingDeleteMutationInputDto,
    user: CurrentUserInfo
  ) {
    const currentUserTpJobseekerProfile =
      await this.tpJobseekerProfilesService.findOneByUserId(user.userId)
    const tpJobseekerProfileId = currentUserTpJobseekerProfile.props.id

    const existingRecords = await this.repository.findRecordsOfObject({
      objectName:
        TpJobseekerFavoritedJobListingRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        TpJobseekerFavoritedJobListingRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: {
        Jobseeker_Profile__c: tpJobseekerProfileId,
        Job_Listing__c: input.tpJobListingId,
      },
    })
    if (existingRecords.length === 0) {
      throw new NotFoundException(
        "Didn't find any mathching TpJobseekerFavoritedJobListingRecord"
      )
    }

    const recordToDelete = existingRecords[0]

    await this.repository.deleteRecord(
      TpJobseekerFavoritedJobListingRecord.metadata.SALESFORCE_OBJECT_NAME,
      recordToDelete.Id
    )

    return { ok: true }
  }

  async findAllByTpJobseekerProfileId(tpJobseekerProfileId: string) {
    const data = await this.repository.findRecordsOfObject({
      objectName:
        TpJobseekerFavoritedJobListingRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        TpJobseekerFavoritedJobListingRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: { Jobseeker_Profile__c: tpJobseekerProfileId },
    })
    const records = data.map((props) =>
      TpJobseekerFavoritedJobListingRecord.create(props)
    )
    const entities: TpJobseekerFavoritedJobListingEntity[] = records.map(
      (source) => this.mapper.fromPersistence(source)
    )

    return entities
  }
}
