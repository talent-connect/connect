import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ConProfileEntity,
  ConProfileMapper,
  ConnectProfileStatus,
  UserType,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { groupBy } from 'lodash'
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
      profileStatus: ConnectProfileStatus.PENDING,
      rediLocation: input.rediLocation,
      userType: input.userType,
      menteeCountCapacity: input.userType === UserType.MENTOR ? 1 : 0,
      mentor_isPartnershipMentor: input.mentor_isPartnershipMentor,
      mentor_workPlace: input.mentor_workPlace,
    })
  }

  async findAll(filter: any = {}) {
    const persistedRecords = await this.api.getAllConProfiles(filter)

    let entities: ConProfileEntity[] = persistedRecords.map((source) =>
      this.mapper.fromPersistence(source)
    )

    entities = this.whenMultipleProfilesExcludeDeactivatedOnes(entities)

    return entities
  }

  whenMultipleProfilesExcludeDeactivatedOnes(profiles: ConProfileEntity[]) {
    const groupedProfiles = groupBy(profiles, (profile) => profile.props.userId)
    for (const key in groupedProfiles) {
      let profileGroup = groupedProfiles[key].sort((a, b) => {
        // Sort by createdDate, so that the most recent profile is first
        return (
          new Date(b.props.createdAt).getTime() -
          new Date(a.props.createdAt).getTime()
        )
      })

      let selectedProfile: ConProfileEntity

      for (const profile of profileGroup) {
        if (!selectedProfile) {
          selectedProfile = profile
          return
        }
        if (
          selectedProfile.props.profileStatus ===
            ConnectProfileStatus.DEACTIVATED &&
          profile.props.profileStatus !== ConnectProfileStatus.DEACTIVATED
        ) {
          selectedProfile = profile
          return
        }
      }

      let deactivatedProfilePreviouslyFound = false
      profileGroup = profileGroup.filter((profile) => {
        const isThisProfileDeactivated =
          profile.props.profileStatus === ConnectProfileStatus.DEACTIVATED
        if (isThisProfileDeactivated && deactivatedProfilePreviouslyFound) {
          return false
        }
        if (isThisProfileDeactivated) {
          deactivatedProfilePreviouslyFound = true
        }
        return true
      })
    }

    return Array.from(profileMap.values())
  }

  async findAllAvailableMentors(_filter: FindConProfilesArgs) {
    const filter: any = {
      'RecordType.DeveloperName': UserType.MENTOR,
      Available_Mentorship_Slots__c: { $gte: 1 },
      Profile_Status__c: ConnectProfileStatus.APPROVED,
    }
    if (_filter.filter.name)
      filter['Contact__r.Name'] = { $like: `%${_filter.filter.name}%` }
    if (_filter.filter.categories?.length > 0)
      filter.Mentoring_Topics__c = { $includes: _filter.filter.categories }
    if (_filter.filter.locations?.length > 0)
      filter.ReDI_Location__c = { $in: _filter.filter.locations }
    if (_filter.filter.languages?.length > 0)
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
}
