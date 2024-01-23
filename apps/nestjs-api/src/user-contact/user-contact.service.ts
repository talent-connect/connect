import { Injectable, NotFoundException } from '@nestjs/common'
import {
    UserContactEntity,
    UserContactMapper,
} from '@talent-connect/common-types'
import { deleteUndefinedProperties } from '@talent-connect/shared-utils'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiContactService } from '../salesforce-api/sf-api-contact.service'
import { UserContactPatchInput } from './dtos/user-contact-patch.entityinput'

@Injectable()
export class UserContactService {
  constructor(
    private readonly api: SfApiContactService,
    private readonly mapper: UserContactMapper
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.getAllContacts(filter)

    const entities: UserContactEntity[] = records.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findOneById(id: string) {
    const entities = await this.findAll({
      Id: id,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('UserContact not found')
    }
  }

  async patch(input: UserContactPatchInput, currentUser: CurrentUserInfo) {
    const existingEntity = await this.findOneById(currentUser.userId)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProperties(input)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = UserContactEntity.create(props)
    await this.api.updateContact(this.mapper.toPersistence(entityToPersist))
  }
}
