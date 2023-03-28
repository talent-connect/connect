import { Injectable, NotFoundException } from '@nestjs/common'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiRepository } from '../salesforce-api/sf-api.repository'
import { TpCompanyRepresentativeRelationshipsService } from '../tp-company-profiles/tp-company-representative-relationships.service'
import { TpCompanyFavoritedJobseekerProfileCreateMutationInputDto } from './dtos/tp-company-favorited-jobseeker-profile-create.mutation-dtos'
import { TpCompanyFavoritedJobseekerProfileDeleteMutationInputDto } from './dtos/tp-company-favorited-jobseeker-profile-delete.mutation-dtos'
import { TpCompanyFavoritedJobseekerProfileMapper } from './mappers/tp-company-favorited-jobseeker-profile.mapper'
import { TpCompanyFavoritedJobseekerProfileEntity } from './tp-company-favorited-jobseeker-profile.entity'
import { TpCompanyFavoritedJobseekerProfileEntityProps } from './tp-company-favorited-jobseeker-profile.entityprops'
import { TpCompanyFavoritedJobseekerProfileRecord } from './tp-company-favorited-jobseeker-profile.record'

@Injectable()
export class TpCompanyFavoritedJobseekerProfilesService {
  constructor(
    private readonly repository: SfApiRepository,
    private readonly tpCompanyRepresentativeRelationshipsService: TpCompanyRepresentativeRelationshipsService,
    private readonly mapper: TpCompanyFavoritedJobseekerProfileMapper
  ) {}

  async create(
    input: TpCompanyFavoritedJobseekerProfileCreateMutationInputDto,
    user: CurrentUserInfo
  ) {
    const currentUserTpCompanyRepresentativeRelationship =
      await this.tpCompanyRepresentativeRelationshipsService.findCompanyRepresentativeRelationshipByUser(
        user.userId
      )

    const props = new TpCompanyFavoritedJobseekerProfileEntityProps()
    props.tpCompanyProfileId =
      currentUserTpCompanyRepresentativeRelationship.props.tpCompanyProfileId
    props.favoritedTpJobseekerProfileId = input.tpJobseekerProfileId

    const entityToPersist =
      TpCompanyFavoritedJobseekerProfileEntity.create(props)
    const recordToPersist = this.mapper.toPersistence(entityToPersist)

    await this.repository.createRecord(
      TpCompanyFavoritedJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_NAME,
      recordToPersist.props
    )

    return { ok: true }
  }

  async delete(
    input: TpCompanyFavoritedJobseekerProfileDeleteMutationInputDto,
    user: CurrentUserInfo
  ) {
    const currentUserTpCompanyRepresentativeRelationship =
      await this.tpCompanyRepresentativeRelationshipsService.findCompanyRepresentativeRelationshipByUser(
        user.userId
      )

    const existingRecords = await this.repository.findRecordsOfObject({
      objectName:
        TpCompanyFavoritedJobseekerProfileRecord.metadata
          .SALESFORCE_OBJECT_NAME,
      objectFields:
        TpCompanyFavoritedJobseekerProfileRecord.metadata
          .SALESFORCE_OBJECT_FIELDS,
      filter: {
        Account__c:
          currentUserTpCompanyRepresentativeRelationship.props
            .tpCompanyProfileId,
        Favorited_Jobseeker_Profile__c: input.tpJobseekerProfileId,
      },
    })
    if (existingRecords.length === 0) {
      throw new NotFoundException(
        "Didn't find any mathching TpCompanyFavoritedJobseekerProfileRecord"
      )
    }

    const recordToDelete = existingRecords[0]

    await this.repository.deleteRecord(
      TpCompanyFavoritedJobseekerProfileRecord.metadata.SALESFORCE_OBJECT_NAME,
      recordToDelete.Id
    )

    return { ok: true }
  }

  async findAllByTpCompanyProfileId(toCompanyProfileId: string) {
    const data = await this.repository.findRecordsOfObject({
      objectName:
        TpCompanyFavoritedJobseekerProfileRecord.metadata
          .SALESFORCE_OBJECT_NAME,
      objectFields:
        TpCompanyFavoritedJobseekerProfileRecord.metadata
          .SALESFORCE_OBJECT_FIELDS,
      filter: { Account__c: toCompanyProfileId },
    })
    const records = data.map((props) =>
      TpCompanyFavoritedJobseekerProfileRecord.create(props)
    )
    const entities: TpCompanyFavoritedJobseekerProfileEntity[] = records.map(
      (source) => this.mapper.fromPersistence(source)
    )

    return entities
  }
}
