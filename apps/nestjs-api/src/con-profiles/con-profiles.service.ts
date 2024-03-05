import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ConProfileEntity,
  ConProfileMapper,
  ConnectProfileStatus,
  RediLocation,
  UserType,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiConProfilesService } from '../salesforce-api/sf-api-con-profiles.service'
import { FindConProfilesArgs } from './args/find-con-profiles.args'
import { ConProfileSignUpInput } from './dtos/con-profile-sign-up.entityinput'
import { PatchConProfileInput } from './dtos/patch-con-profile.entityinput'

@Injectable()
export class ConProfilesService {
  constructor(
    private readonly api: SfApiConProfilesService,
    private readonly mapper: ConProfileMapper
  ) {}

  async signUp(
    input: ConProfileSignUpInput,
    user: CurrentUserInfo
  ): Promise<string> {
    return await this.api.createConProfileForSignUp({
      userId: user.userId,
      loopbackUserId: user.loopbackUserId,
      profileStatus: ConnectProfileStatus.DRAFTING_PROFILE,
      rediLocation: input.rediLocation,
      userType: input.userType,
      menteeCountCapacity: input.userType === UserType.MENTOR ? 1 : 0,
      mentor_isPartnershipMentor: input.mentor_isPartnershipMentor,
      mentor_workPlace: input.mentor_workPlace,
    })
  }

  async findAll(filter: any = {}) {
    const persistedRecords = await this.api.getAllConProfiles(filter)

    const entities: ConProfileEntity[] = persistedRecords.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findAllAvailableMentors(
    _filter: FindConProfilesArgs,
    currentUser: CurrentUserInfo
  ) {
    const currentUserConProfile = await this.findOneByLoopbackUserId(
      currentUser.loopbackUserId
    )

    const filter: any = {
      'RecordType.DeveloperName': UserType.MENTOR,
      Available_Mentorship_Slots__c: { $gte: 1 },
      Profile_Status__c: ConnectProfileStatus.APPROVED,
    }
    if (_filter.filter.name)
      filter['Contact__r.Name'] = { $like: `%${_filter.filter.name}%` }
    if (_filter.filter.categories?.length > 0)
      filter.Mentoring_Topics__c = { $includes: _filter.filter.categories }
    if (_filter.filter.locations?.length > 0) {
      filter.ReDI_Location__c = { $in: _filter.filter.locations }
    } else {
      filter.ReDI_Location__c = { $in: [] }
    }
    if (_filter.filter.languages?.length > 0)
      filter.Languages__c = { $includes: _filter.filter.languages }

    // Business requirement added in February 2024: we isolate Sweden and Germany,
    // meaning mentees in Sweden can only see mentors in Sweden and mentees in
    // Germany can only see mentors in Germany
    const swedenLocations = [RediLocation.MALMO]
    const germanyLocations = [
      RediLocation.BERLIN,
      RediLocation.CYBERSPACE,
      RediLocation.HAMBURG,
      RediLocation.MUNICH,
      RediLocation.NRW,
    ]
    const currentUserBelongsToRediSweden = swedenLocations.includes(
      currentUserConProfile.props.rediLocation
    )
    const currentUserBelongsToRediGermany = germanyLocations.includes(
      currentUserConProfile.props.rediLocation
    )
    if (currentUserBelongsToRediSweden) {
      filter.ReDI_Location__c.$in = filter.ReDI_Location__c.$in.filter(
        (location) => swedenLocations.includes(location)
      )
    } else if (currentUserBelongsToRediGermany) {
      filter.ReDI_Location__c.$in = filter.ReDI_Location__c.$in.filter(
        (location) => germanyLocations.includes(location)
      )
    } else {
      throw new Error(
        'ConProfilesService:findAllAvailableMentors(): ' +
          "Couldn't categorize current user's Connect " +
          ' Profile as belonging to either Sweden or Germany.'
      )
    }

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

  async patch(
    updateConProfileInput: PatchConProfileInput,
    currentUser: CurrentUserInfo
  ) {
    const existingEntity = await this.findOneByLoopbackUserId(
      currentUser.loopbackUserId
    )
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(updateConProfileInput)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = ConProfileEntity.create(props)

    return this.update(entityToPersist)
  }

  async update(entity: ConProfileEntity) {
    const persistedObject = await this.api.updateConProfile(
      this.mapper.toPersistence(entity)
    )
    const updatedEntity = this.mapper.fromPersistence(persistedObject)

    return updatedEntity
  }

  async submitForReview(currentUser: CurrentUserInfo) {
    const existingEntity = await this.findOneByLoopbackUserId(
      currentUser.loopbackUserId
    )
    const props = existingEntity.props

    if (
      existingEntity.props.profileStatus ===
      ConnectProfileStatus.DRAFTING_PROFILE
    ) {
      props.profileStatus = ConnectProfileStatus.SUBMITTED_FOR_REVIEW
    }

    const entityToPersist = ConProfileEntity.create(props)

    return this.update(entityToPersist)
  }
}
