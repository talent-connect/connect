import { Injectable } from '@nestjs/common'
import { CreateConProfileInput } from './dto/create-con-profile.input'
import { UpdateConProfileInput } from './dto/update-con-profile.input'
import { ConProfile } from './entities/con-profile.entity'

@Injectable()
export class ConProfilesService {
  create(createConProfileInput: CreateConProfileInput) {
    return 'This action adds a new conProfile'
  }

  findAll() {
    return [
      {
        exampleField: 3,
        expectations: 'test',
        personalDescription: 'test',
      },
    ] as ConProfile[]
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
