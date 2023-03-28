import { Injectable, NotFoundException } from '@nestjs/common'
import {
  JobseekerProfileStatus,
  TpJobseekerProfileEntity,
  TpJobseekerProfileEntityProps,
  TpJobseekerProfileMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { EmailService } from '../email/email.service'
import { SfApiTpJobseekerProfileService } from '../salesforce-api/sf-api-tp-jobseeker-profile.service'
import { UserContactService } from '../user-contact/user-contact.service'
import { TpJobseekerProfilePatchInput } from './dto/tp-jobseeker-profile-patch.entityinput'
import { TpJobseekerProfileSignUpMutationDto } from './dto/tp-jobseeker-profile-sign-up.mutation-dtos'

@Injectable()
export class TpJobseekerProfileService {
  constructor(
    private readonly api: SfApiTpJobseekerProfileService,
    private readonly mapper: TpJobseekerProfileMapper,
    private readonly userContactService: UserContactService,
    private readonly emailService: EmailService
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
      throw new NotFoundException('TpJobseekerProfile not found with id: ' + id)
    }
  }

  async findOneByUserId(userId: string) {
    const entities = await this.findAll({
      Contact__c: userId,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobseekerProfile not found')
    }
  }

  async patch(
    input: TpJobseekerProfilePatchInput,
    currentUser: CurrentUserInfo
  ) {
    const existingEntity = await this.findOneByUserId(currentUser.userId)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = TpJobseekerProfileEntity.create(props)
    await this.api.update(this.mapper.toPersistence(entityToPersist))
  }

  async signUp(
    input: TpJobseekerProfileSignUpMutationDto,
    currentUser: CurrentUserInfo
  ) {
    await this.userContactService.patch(
      {
        firstName: input.firstName,
        lastName: input.lastName,
      },
      currentUser
    )

    const newEntityProps = new TpJobseekerProfileEntityProps()
    newEntityProps.userId = currentUser.userId
    newEntityProps.rediLocation = input.rediLocation
    newEntityProps.currentlyEnrolledInCourse = input.currentlyEnrolledInCourse
    newEntityProps.state = JobseekerProfileStatus.DRAFTING_PROFILE

    const entityToPersist = TpJobseekerProfileEntity.create(newEntityProps)
    await this.api.create(this.mapper.toPersistence(entityToPersist))

    this.emailService.sendJobseekerSignupCompleteEmail({
      recipient: currentUser.userProps.email,
      firstName: input.firstName,
    })
  }
}
