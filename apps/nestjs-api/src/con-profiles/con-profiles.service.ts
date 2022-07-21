import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ConnectProfileStatus,
  ConProfileEntity,
  ConProfileEntityProps,
  UserType,
} from '@talent-connect/common-types'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiConProfilesService } from '../salesforce-api/sf-api-con-profiles.service'
import { FindConProfilesArgs } from './args/find-con-profiles.args'
import { ConProfileSignUpInput } from './dtos/con-profile-sign-up.entityinput'
import { PatchConProfileInput } from './dtos/patch-con-profile.entityinput'
import { ConProfileMapper } from './mappers/con-profile.mapper'

@Injectable()
export class ConProfilesService {
  constructor(
    private readonly api: SfApiConProfilesService,
    private readonly mapper: ConProfileMapper
  ) {}

  async signUp(
    input: ConProfileSignUpInput,
    user: CurrentUserInfo
  ): Promise<ConProfileEntity> {
    const entityProps = new ConProfileEntityProps()
    entityProps._contactId = user.contactId
    entityProps.firstName = input.firstName
    entityProps.lastName = input.lastName

    const entity = ConProfileEntity.create(entityProps)

    const persistedRecord = await this.api.createConProfileForSignUp({
      contactId: user.contactId,
      firstName: input.firstName,
      lastName: input.lastName,
      loopbackUserId: user.loopbackUserId,
      profileStatus: ConnectProfileStatus.PENDING,
      rediLocation: input.rediLocation,
    })

    return this.mapper.fromPersistence(persistedRecord)
  }

  async findAll(filter: any = {}) {
    const persistedEntities = await this.api.getAllConProfiles(filter)

    const entities: ConProfileEntity[] = persistedEntities.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findAllAvailableMentors(_filter: FindConProfilesArgs) {
    const filter: any = {
      'RecordType.DeveloperName': UserType.MENTOR,
      Available_Mentorship_Slots__c: { $gte: 1 },
    }
    if (_filter.filter.name)
      filter['Contact__r.Name'] = { $like: `%${_filter.filter.name}%` }
    if (_filter.filter.categories)
      filter.Mentoring_Topics__c = { $includes: _filter.filter.categories }
    if (_filter.filter.locations)
      filter.ReDI_Location__c = { $in: _filter.filter.locations }
    if (_filter.filter.languages)
      filter.Languages__c = { $includes: _filter.filter.languages }
    return this.findAll(filter)
  }

  async findOneById(id: string) {
    const entities = await this.findAll({
      Id: id,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('ConProfile not found with id: ' + id)
    }
  }

  async findOne(filter: any = {}) {
    const entities = await this.findAll(filter)
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException(
        'ConProfile not found with filter: ' + JSON.stringify(filter)
      )
    }
  }

  async findOneByLoopbackUserId(loopbackUserId: string) {
    const entities = await this.findAll({
      'Contact__r.Loopback_User_ID__c': loopbackUserId,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('ConProfile not found')
    }
  }

  async update(updateConProfileInput: PatchConProfileInput) {
    const existingEntity = await this.findOneById(updateConProfileInput.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProps(updateConProfileInput)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = ConProfileEntity.create(props)
    const persistedObject = await this.api.updateConProfile(
      this.mapper.toPersistence(entityToPersist)
    )
    const updatedEntity = this.mapper.fromPersistence(persistedObject)

    return updatedEntity
  }

  remove(id: number) {
    return `This action removes a #${id} conProfile`
  }
}

function deleteUndefinedProps<T extends object>(obj: T): T {
  const returnObject = {}
  for (const key in obj) {
    if (obj[key] !== undefined) {
      Object.assign(returnObject, { [key]: obj[key] })
    }
  }
  return returnObject as T
}
