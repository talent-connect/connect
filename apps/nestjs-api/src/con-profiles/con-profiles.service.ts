import { Injectable } from '@nestjs/common'
import { ConProfilesRepository } from './con-profiles.repository'
import { CreateConProfileInput } from './dto/create-con-profile.input'
import { UpdateConProfileInput } from './dto/update-con-profile.input'
import { ConProfile } from './entities/con-profile.entity'

@Injectable()
export class ConProfilesService {
  constructor(private readonly repository: ConProfilesRepository) {}

  create(createConProfileInput: CreateConProfileInput) {
    return 'This action adds a new conProfile'
  }

  async findAll() {
    const results = await this.repository.findAll()
    return results
  }

  findOne(id: number) {
    return `This action returns a #${id} conProfile`
  }

  update(id: number, updateConProfileInput: UpdateConProfileInput) {
    return `This action updates a #${id} conProfile`
  }

  remove(id: number) {
    return `This action removes a #${id} conProfile`
  }
}
